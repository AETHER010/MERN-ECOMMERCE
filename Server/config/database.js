const mongoose = require("mongoose");

//connect to database
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then((conn) => {
      console.log(
        `database connected successfully with ${conn.connection.host}`
      );
    })
    .catch((err) => {
      console.log("ERROR IS CONNECTING THE DATABASE");
    });
};

module.exports = connectDatabase;
