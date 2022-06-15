const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//Handle uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log(err.stack);
  console.log("shutting down deu to uncaught exception");
  process.exit(1);
});

//config setting
dotenv.config();

//database connections

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(process.env.NODE_ENV + ` mode`);
  console.log(
    `server is running on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});

//handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`ERROR : ${err.message}`);
  console.log("shutting down the server deu to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
