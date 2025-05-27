const { ComboProducts } = require("../models/comboModel");
const ApiErrorHandler = require("../utils/ApiErrorHandler");
const WrapperHandler = require("../utils/WrapperHandler");

const getComboProducts = WrapperHandler(async (req, res, next) => {
    const products = await ComboProducts.find({});

    if(products.length === 0) {
        return next(new ApiErrorHandler('No combo products found.', 404));
    }
    res.status(200).send({
        message: 'Products Fetched Successfully',
        products,
        count: products.length
    })
});

module.exports = {
    getComboProducts
}