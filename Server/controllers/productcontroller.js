
exports.getProducts = (req, res, next)=>{
    res.status(200).json({
        success: true,
        Message : 'this shows the product data from database'
    })
}