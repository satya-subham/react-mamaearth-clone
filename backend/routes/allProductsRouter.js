const express = require("express");
const {
  getAllProducts,
  insertProduct,
  getSpecificProduct
} = require("../controllers/allProductsController");

const allProductsRouter = express.Router();

allProductsRouter.route("/").get(getAllProducts);
allProductsRouter.route('/:id').get(getSpecificProduct)

module.exports = {
  allProductsRouter,
};
