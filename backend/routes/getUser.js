const express = require('express');
const { getUser } = require("../utils/auth");
const { getLoggedInUser } = require('../controllers/authController');
const getuserRoute = express.Router();

getuserRoute.route('/').post(getLoggedInUser)

module.exports = getuserRoute;
