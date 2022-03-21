const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Enter the your name'],
        maxLength: [30, 'your name cannot exceed 30 characters']
    },
    email: {
        type: String,
         required:[true, 'Enter your email address'],
         unique: true,
         validator: [validator.isEmail, 'please enter a valid email address']
        },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        minlength: [6, 'your password must be at least 6 characters long'],
        select:false
    },
    avatar: {
        public_id:{
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

//Encrypting the password

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next();

    }
    
    this.password = await bcrypt.hash(this.password, 10);
})

module.exports = mongoose.model('User',userSchema);