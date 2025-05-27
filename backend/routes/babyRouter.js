const express = require('express');
const { getBabyProducts } = require('../controllers/babyController');

const babyProductsRouter = express.Router();

babyProductsRouter.route('/').get(getBabyProducts);

module.exports = {
    babyProductsRouter
}