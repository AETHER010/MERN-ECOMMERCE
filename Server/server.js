const app = require('./app');
const dotenv=require('dotenv');
const connectDatabase = require('./config/database');


//config setting
dotenv.config();

//database connections

connectDatabase();



app.listen(process.env.PORT , ()=>{
    console.log(process.env.NODE_ENV + ` mode`);
    console.log(`server is running on PORT : ${process.env.PORT } in ${process.env.NODE_ENV} mode`);
})