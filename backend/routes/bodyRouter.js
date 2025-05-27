const express = require('express');
const { getBodyProducts } = require('../controllers/bodyController');

const bodyProductsRouter = express.Router();

bodyProductsRouter.route('/').get(getBodyProducts);

module.exports = {
    bodyProductsRouter
}