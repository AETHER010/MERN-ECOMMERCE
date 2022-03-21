const errorHandler = require("../utils/errorHandler");

module.exports = (err, req,res,next) =>{
    err.statusCode = err.statusCode || 500; 
    
    if(process.env.NODE_ENV === "DEVELOPMENT"){
        res.status(err.statusCode).json({
            success:false,
            errMessage : err.Message,
            stack: err.stack
        })
    }

    if(process.env.NODE_ENV === "PRODUCTION"){
        let error = {...err};
        error.Message= err.Message;

        //if Wrong mongo id error
        if(err.name === 'CastError'){
            const message = `Resource not found : Invalid : ${err.path}`;
            error = new errorHandler(message, 400);
        }

        //Handling mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map(values => values.message);
            error = new errorHandler(message, 400);
        }

        //

        res.status(err.statusCode).json({
            success:false,
            message: error.message || 'Internal Server Error'
        })
    }
}