
const { AllProducts } = require("../models/allProductsModel");
const WrapperHandler = require("../utils/WrapperHandler");
const ApiErrorHandler = require("../utils/ApiErrorHandler");

const getAllProducts = WrapperHandler(async (req, res, next) => {

  const products = await AllProducts.find({});
  if(products.length === 0) {
    return next(new ApiErrorHandler("Products not found", 404))
  }
  res.status(200).send({
    message: "Products fetched successfully",
    products,
    count: products.length,
  });
});


const getSpecificProduct = WrapperHandler(async (req, res, next) => {
  
  const product = await AllProducts.findById(req.params.id);

  if(product) {
    res.status(200).send({
      message: "Specific Home Product fetched successfully",
      product,
    });
  }else{
    return next(new ApiErrorHandler("Product not found", 404))
   
  }
  

});

module.exports = {
  getAllProducts,
  getSpecificProduct,
};
