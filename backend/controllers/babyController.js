const { BabyProducts } = require("../models/babyModel");
const ApiErrorHandler = require("../utils/ApiErrorHandler");
const WrapperHandler = require("../utils/WrapperHandler");

const getBabyProducts = WrapperHandler(async (req, res, next) => {
    const products = await BabyProducts.find({});

    if(products.length === 0) {
        return next(new ApiErrorHandler('Nobaby products found', 404));
    }

    res.status(200).send({
        message: "Products Fetched Successfully",
        products,
        count: products.length
    })
});

module.exports = {
    getBabyProducts
}