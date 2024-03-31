const {HomeProducts} = require('../models/homeModel');
const WrapperHandler  = require('../utils/WrapperHandler');
WrapperHandler

const homeController = WrapperHandler(async (req, res, next) => {
    
    const homeProducts = await HomeProducts.find({});
    res.send({
        message: 'Home Products fetched successfully',
        products: homeProducts,
        count: homeProducts.length
    })

});



module.exports = {
    homeController,
}