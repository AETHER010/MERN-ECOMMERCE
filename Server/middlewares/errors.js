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

        res.status(err.statusCode).json({
            success:false,
            message: error.message || 'Internal Server Error'
        })
    }
}