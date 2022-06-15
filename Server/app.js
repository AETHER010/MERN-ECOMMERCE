const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//importing all the routes here

//for products
const products = require("./routes/product");
//for the users
const auth = require("./routes/auth");

app.use("/api/v1", products);
app.use("/api/v1", auth);

//middleware to error handler
app.use(errorMiddleware);

module.exports = app;
