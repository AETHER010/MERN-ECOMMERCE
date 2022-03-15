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
            ]
        }
    }
    
})

module.exports = mongoose.model('Product', productSchema);