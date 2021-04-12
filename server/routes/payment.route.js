const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SK);
const ProductModel = require("../models/product.model");
const Order = require("../models/order.model");
const OrderDetail = require("../models/order-detail.model");
const accountSid = "ACb3103b2b2f016e4037e7b93ea7c61233";
const authToken = "0f0869ce9de7e2641ce9edee3301628b";
const client = require("twilio")(accountSid, authToken);

router.post("/doPayment", async (req, res) => {
  const generateResponse = (intent) => {
    if (
      intent.status === "requires_action" &&
      intent.next_action.type === "use_stripe_sdk"
    ) {
      console.log("Require action");
      return {
        requires_action: true,
        payment_intent_client_secret: intent.client_secret,
      };
    } else if (intent.status === "succeeded") {
      console.log(intent);
      return {
        success: true,
        order_id: intent.metadata.order_id,
      };
    } else {
      console.log("Invalid PaymentIntent status");
      return {
        error: "Invalid PaymentIntent status",
      };
    }
  };
  const { payment_method_id, amount, cart, _id } = req.body;

  try {
    let payment;
    if (payment_method_id) {
      var total = 0;
      var bill = await Promise.all(
        cart.map(async (cart, index) => {
          const product = await ProductModel.findByPk(cart.product.product_id);
          return { product: product.dataValues, quantity: cart.quantity };
        })
      );
      var total = 0;
      for (let i = 0; i < bill.length; i++) {
        total = total + bill[i].quantity * bill[i].product.sellprice;
      }
      console.log(bill);
      console.log(total);
      const order = await Order.create({ _id: _id, total: total });
      console.log(order.dataValues);
      bill.map((bill, index) => {
        OrderDetail.create({
          order_id: order.dataValues.order_id,
          product_id: bill.product.product_id,
          quantity: bill.quantity,
          current_sellprice: bill.product.sellprice,
          current_buyprice: bill.product.buyprice,
        });
      });

      payment = await stripe.paymentIntents.create({
        amount: total,
        currency: "USD",
        description: "Payment Orders " + order.dataValues.order_id,
        payment_method: payment_method_id,
        confirmation_method: "manual",
        confirm: true,
        receipt_email: "tranminhtai1998@gmail.com",
        metadata: {
          order_id: order.dataValues.order_id,
        },
      });
    } else if (req.body.payment_intent_id) {
      payment = await stripe.paymentIntents.confirm(req.body.payment_intent_id);
    }
    console.log(payment);
    if (payment.status === "succeeded") {
      console.log("send");
      client.messages
        .create({
          body:
            "New Order " +
            payment.metadata.order_id +
            ": " +
            payment.amount +
            "$",
          from: "+17867323968",
          to: "+84394113000",
        })
        .then((message) => console.log(message.sid));
    }
    res.send(generateResponse(payment));
    // return res.status(200).json({
    //   confirm: payment.client_secret,
    // });
  } catch (e) {
    console.log(e);
    return res.send({ error: e.message });
  }
});

module.exports = router;
