const express = require('express');
const { getFaceproducts } = require('../controllers/faceController');

const faceProductRouter = express.Router();

faceProductRouter.route('/').get(getFaceproducts)

module.exports = {
    faceProductRouter
}