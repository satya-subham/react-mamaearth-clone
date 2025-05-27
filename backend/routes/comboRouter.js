const express = require('express');
const { getComboProducts } = require('../controllers/comboController');

const comboProductsRouter = express.Router();

comboProductsRouter.route('/').get(getComboProducts);

module.exports = {
    comboProductsRouter
}