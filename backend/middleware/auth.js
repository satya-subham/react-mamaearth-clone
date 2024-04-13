const { UserModel } = require("../models/signUpModel");
const ApiErrorHandler = require("../utils/ApiErrorHandler");
const { getUser } = require("../utils/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  
  // const {token} = req.headers;
  const {token} = req?.cookies;
  if(!token) {
    return new ApiErrorHandler('authentication token is required', 403)
  }

  const user = getUser(token);
  const currentUser = await UserModel.findOne({ email: user.email });
  req.user = currentUser;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
};