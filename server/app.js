const dotenv = require("dotenv");
dotenv.config();

// Cloudinary
const cloudinary = require("cloudinary").v2;
if (typeof process.env.CLOUDINARY_URL === "undefined") {
  console.warn("!! cloudinary config is undefined !!");
  console.warn("export CLOUDINARY_URL or set dotenv file");
} else {
  console.log("cloudinary config:");
  console.log(cloudinary.config());
}
console.log(
  "-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --"
);
//
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SK);
//
const path = require("path");
const express = require("express");
const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorHandler = require("errorhandler");
const mongoose = require("mongoose");
const sequelize = require("./config/connect");
const jwt = require("jsonwebtoken");

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === "production";

const app = express();
app.use(fileupload({ useTempFiles: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "ThucTapThucTe2020",
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
  })
);
if (!isProduction) {
  app.use(errorHandler());
}
// Sequilize
sequelize
  .authenticate()
  .then(() => console.log("MySQL Connected"))
  .catch((err) => console.log("Error: " + err));
(async () => {
  await sequelize.sync();
})();
//
// --> Mongoose
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
});
mongoose.set("debug", true);
// -->
app.set("superSecrect", "jsonwebtoken");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Add models

// Add routes
app.use("/public", express.static("public"));
// app.use("/user", authMiddleware.isAuth, userRoute);
app.use("/user", require("./routes/user.route"));
app.use("/auth", require("./routes/auth.route"));
app.use("/category", require("./routes/category.route"));
app.use("/product", require("./routes/product.route"));
app.use("/order", require("./routes/orther.route"));
// --> Stripe
app.use("/api", require("./routes/payment.route"));
// --> End Stripe
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

const server = app.listen(process.env.PORT, () =>
  console.log("Server started on http://localhost:9999")
);
