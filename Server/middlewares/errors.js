const errorHandler = require("../utils/errorHandler");

//errorHandler
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      errMessage: err.Message,
      stack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };
    error.Message = err.Message;

    //if Wrong mongo id error
    if (err.name === "CastError") {
      const message = `Resource not found : Invalid : ${err.path}`;
      error = new errorHandler(message, 400);
    }

    //Handling mongoose validation error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((values) => values.message);
      error = new errorHandler(message, 400);
    }

    //handling duplicate keys error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new errorHandler(message, 400);
    }

    //handling jtw token Wrong
    if (err.code === "JsonWebTokenError") {
      const message = `JSON WEB TOKEN IS INVALID. TRY AGAIN!!!`;
      error = new errorHandler(message, 400);
    }

    //handling jtw token EXPIRED
    if (err.code === "TokenExpiredError") {
      const message = `JSON WEB TOKEN IS EXPIRED. TRY AGAIN!!!`;
      error = new errorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
