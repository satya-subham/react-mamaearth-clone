const express = require('express');
const { getMakeupProducts } = require('../controllers/makeupController');

const makeupRouter = express.Router();

makeupRouter.route('/').get(getMakeupProducts);

module.exports = {
    makeupRouter
}