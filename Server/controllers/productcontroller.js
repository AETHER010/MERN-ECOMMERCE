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