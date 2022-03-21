const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

//register a user

exports.registerUser = catchAsyncErrors ( async (req, res, next) =>{
    const {name, email, password}= req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:'me/profile12',
            url: 'https://exploringbits.com/wp-content/uploads/2021/12/anime-boy-pfp-2.jpg?ezimgfmt=rs:352x365/rscb3/ng:webp/ngcb3'
        }
    })
    res.status(201).json({
        success:true,
        user
    })
})