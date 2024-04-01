const express = require('express');
const { signUpHandler, logInHandler, cartHandler, getUserCartData, deleteUserCartData } = require('../controllers/authController');

const authRoute = express.Router();

authRoute.route('/signup').post(signUpHandler);
authRoute.route('/login').post(logInHandler);
authRoute.route('/cart').post(cartHandler);
authRoute.route('/cart/:email').get(getUserCartData).delete(deleteUserCartData);


module.exports = authRoute;