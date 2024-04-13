const express = require("express");
const CORS = require("cors");
const { allProductsRouter } = require("./routes/allProductsRouter");
const { homeRouter } = require("./routes/homeRouter");
const ErrorHandler = require("./utils/ErrorHandler");
const authRoute = require("./routes/authRoute");
const cookieParser = require('cookie-parser')

const getuserRoute = require("./routes/getUser");


const app = express();

app.use(cookieParser()); // cookieParser() always has to be declared at the top level of the routes else it will return [Object: null prototype] {} 
app.use(express.json());
app.use(CORS({ origin: 'http://localhost:5173' , credentials: true}));

app.use("/api/v1/home", homeRouter);
app.use("/api/v1/allproducts", allProductsRouter);


// authentication routes
app.use("/api/v1/users", authRoute);
app.use('/api/v1/users/loggedInUser', getuserRoute);

app.use("*", (req, res, next) =>{
  next({
    status: "not found",
    message: "path does not exist",
  })
});

app.use(ErrorHandler)

module.exports = {
  app,
};
