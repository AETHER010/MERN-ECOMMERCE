const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

//importing all the routes here

const product = require("./routes/product");
const auth = require("./routes/auth");
const order = require("./routes/order");
//productes
app.use("/api/v1", product);
app.use("/api/v1", auth);
//for order

app.use("/api/v1", order);

//middleware to error handler
app.use(errorMiddleware);

module.exports = app;
