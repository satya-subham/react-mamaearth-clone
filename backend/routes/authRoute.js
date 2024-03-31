const express = require('express');
const { signUpHandler, logInHandler, cartHandler, getUserCartData } = require('../controllers/authController');

const authRoute = express.Router();

authRoute.route('/signup').post(signUpHandler);
authRoute.route('/login').post(logInHandler);
authRoute.route('/cart').post(cartHandler);
authRoute.route('/cart/:email').get(getUserCartData);


module.exports = authRoute;