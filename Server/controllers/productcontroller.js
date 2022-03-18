const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');



//adding new products
exports.newProducts = catchAsyncErrors( async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}
)

//getting the products from the database

exports.getProducts = catchAsyncErrors( (req, res, next)=>{
    res.status(200).json({
        success: true,
        Message : 'this shows the product data from database'
    })
} )


//single product information retreval
exports.getSingleProduct =catchAsyncErrors( async (req,res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('product not found', 404));
    }

    res.status(200).json({
        success:true,
        product
    })
}
)

//updating the products 

exports.updateProduct =catchAsyncErrors( async (req,res,next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('product not found', 404));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindandModify: false
    })
    
    res.status(200).json({
        success: true,
        product
    })
})

//delete the product from admin
exports.deleteProduct=catchAsyncErrors( async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler('product not found', 404));
    }

    await product.remove();
     res.status(200).json({
         success:true,
         message: "product is deleted"
     })
})