const express = require('express');
const { getUser } = require("../utils/auth");
const { getLoggedInUser, loggoutUser } = require('../controllers/authController');
const { restrictToLoggedinUserOnly } = require('../middleware/auth');
const getuserRoute = express.Router();

getuserRoute.route('/').get(restrictToLoggedinUserOnly, getLoggedInUser)
getuserRoute.route('/logout').get(loggoutUser)

module.exports = getuserRoute;
