const Product = require('../models/product');


exports.newProducts = async (req,res,next)=>{
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    })
}

exports.getProducts = (req, res, next)=>{
    res.status(200).json({
        success: true,
        Message : 'this shows the product data from database'
    })
} 

//single product information retreval

exports.getSingleProduct = async (req,res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message: 'product not found'
        })
    }

    res.status(200).json({
        success:true,
        product
    })
}

//updating the products 

exports.updateProduct = async (req,res,next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message: 'product not found'
        })
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
}

//delete the product from admin
exports.deleteProduct= async(req,res,next)=>{

    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(404).json({
            success:false,
            message: 'product not found'
        })
    }

    await product.remove();
     res.status(200).json({
         success:true,
         message: "product is deleted"
     })
}