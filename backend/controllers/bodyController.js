const { BodyProducts } = require("../models/bodyModel");
const ApiErrorHandler = require("../utils/ApiErrorHandler");
const WrapperHandler = require("../utils/WrapperHandler");

const getBodyProducts = WrapperHandler(async (req, res, next) => {
  const products = await BodyProducts.find({});

  if (products.length === 0) {
    return next(new ApiErrorHandler("No body products found.", 404));
  }

  res.status(200).send({
    message: "Products Fetchedn Successfully",
    products,
    count: products.length,
  });
});

module.exports = {
  getBodyProducts,
};
