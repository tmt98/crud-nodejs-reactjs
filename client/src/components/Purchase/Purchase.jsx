import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { Form, Button, FormControl } from "react-bootstrap";
import "./Purchase.scss";
import { useSelector } from "react-redux";
// Custom styling can be passed to options when creating an Element.
const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
const CheckoutForm = ({ success }) => {
  const stripe = useStripe();
  const elements = useElements();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.currentUser);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;
      console.log(cart);
      try {
        const { data } = await axios.post(
          "http://localhost:9999/api/doPayment",
          {
            payment_method_id: id,
            cart,
            _id: currentUser._id,
            amount: 1099,
          }
        );
        console.log(data);
        handleServerResponse(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleServerResponse = async (response) => {
    if (response.error) {
      // Show error from server on payment form
      alert(response.error);
    } else if (response.requires_action) {
      // Use Stripe.js to handle the required card action
      const {
        error: errorAction,
        paymentIntent,
      } = await stripe.handleCardAction(response.payment_intent_client_secret);

      if (errorAction) {
        // Show error from Stripe.js in payment form
        console.log(errorAction);
        alert(errorAction.message);
      } else {
        // The card action has been handled
        // The PaymentIntent can be confirmed again on the server
        const serverResponse = await fetch(
          "http://localhost:9999/api/doPayment",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
          }
        );
        console.log(serverResponse);
        if (!serverResponse.error) {
          handleServerResponse(await serverResponse.json());
        }
      }
    } else {
      // Show success message
      console.log(response);
      alert(response.order_id);
      localStorage.removeItem("CART");
      // success(response.order_id);
      window.location = "/order/" + response.order_id;
    }
  };
  return (
    <>
      <Form
        className="mt-5"
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <h2>Shipping To</h2>
        <Form.Label>Name:</Form.Label>
        <FormControl></FormControl>
        <Form.Label>Email:</Form.Label>
        <FormControl></FormControl>
        <Form.Label>Phone:</Form.Label>
        <FormControl></FormControl>
        <Form.Label>Address:</Form.Label>
        <FormControl></FormControl>
        <Form.Label>Fill card:</Form.Label>
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        <br />
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
        <br />
      </Form>
      <br />
    </>
  );
};
const stripePromise = loadStripe("pk_test_PWwjOUvsMt8kofJNhVdiBiem00TQ0IOTy1");
const Purchase = () => {
  const [status, setStatus] = React.useState("ready");
  const [orderID, setOrderID] = React.useState(null);
  if (status === "success") {
    return <Redirect to={{ pathname: "order/" + orderID }} />;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        success={(data) => {
          console.log(data);
          setOrderID(data);
          setStatus("success");
        }}
      />
    </Elements>
  );
};

export default Purchase;
