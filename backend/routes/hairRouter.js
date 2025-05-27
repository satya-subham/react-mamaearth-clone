const express = require('express');
const { getHairProducts } = require('../controllers/hairController');


const hairProductRouter = express.Router();

hairProductRouter.route('/').get(getHairProducts)

module.exports = {
    hairProductRouter
}