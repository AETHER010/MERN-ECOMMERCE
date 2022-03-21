const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: [true, 'Enter the product name'],
        trim:true

    },
    price:{
        type: Number,
        required: [true, 'Enter the product price'],
        trim:true,
        default: 0.0
    },
    description:{
        type: String,
        required: [true, 'Enter the product description']

    },
    ratings:{
        type: Number,
        default: 0

    },
    images:[
        {
            public_id:{
                type:Number,
                required: true
            },
            url:{
                type:String,
                required: true
            }
        }
    ],
    category:{
        type:String,
        required: [true, 'Select the category of the of the product'],
        enum:{
            values:[
                'Electronics',
                'Cameras',
                'Laptop',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Beauty/Health',
                'Clothes/Shoes',
                'Sports',
                'Outdoors',
                'Home'
            ],
            message:'please select the category for the product'
        }
    },
    seller:{
        type:String,
        required:[true,'please enter the seller details']
    },
    
    stock:{
        type:Number,
        required: [true, 'enter the stock for the selected product'],
        maxLength:[4, 'product stock cannot be more than required'],
        default: 0
    },
    noOfReviews:{
        type:Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type:String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type: String,
                required: true
            }

        }
    ],
    createdAt:{
        type:Date,
        default: Date.now
    }

    
})

module.exports = mongoose.model('Product', productSchema);
