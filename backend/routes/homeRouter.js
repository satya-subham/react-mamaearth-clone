const express = require('express');
const { homeController, getSpecificHomeProduct } = require('../controllers/homeController');

const homeRouter = express.Router();

homeRouter.route('/').get(homeController);


module.exports = {
    homeRouter
}