const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');

const products = require('../data/data');

//setting environment variable
dotenv.config();

//database connection
connectDatabase();



//updating database using dummydata from data/data.json
const seedProducts = async() =>{
    try{
        await Product.deleteMany();
    console.log("Products deleted successfully");

    await Product.insertMany(products);
    console.log("products inserted sucessfully");
    process.exit();
    }
    catch(error){
        console.log(error.message);
        process.exit();
    }
}

seedProducts();
