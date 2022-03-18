const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/errors');

app.use(express.json());

//importing all the routes here
const products = require('./routes/product');


app.use('/api/v1', products);

//middleware to error handler
app.use(errorMiddleware);


module.exports = app;