const { FaceProducts } = require("../models/faceModel");
const ApiErrorHandler = require("../utils/ApiErrorHandler");
const WrapperHandler = require("../utils/WrapperHandler");

const getFaceproducts = WrapperHandler(async (req, res, next) => {
  const faceProducts = await FaceProducts.find({});

  if (faceProducts.length === 0) {
    return next(new ApiErrorHandler("Products not found", 404));
  }
  res.status(200).send({
    message: "Products fetched successfully",
    faceProducts,
    count: faceProducts.length,
  });
});


module.exports = {
    getFaceproducts
}