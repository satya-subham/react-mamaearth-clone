const { HairProducts } = require("../models/hairModel");
const ApiErrorHandler = require("../utils/ApiErrorHandler");
const WrapperHandler = require("../utils/WrapperHandler");

const getHairProducts = WrapperHandler( async (req, res, next) => {
    const products = await HairProducts.find({});

    if(products.length === 0){
        return next(new ApiErrorHandler('Products not found', 404))
    }
    res.status(200).send({
        message: "Products Fetched successfully",
        products,
        count: products.length 
    })
})

module.exports = {
    getHairProducts
}