const WrapperHandler = require("../utils/WrapperHandler");
const { UserModel } = require("../models/signUpModel");
const bcrypt = require("bcryptjs");
const ApiErrorHandler = require("../utils/ApiErrorHandler");
const { setUser, getUser } = require("../utils/auth");

const signUpHandler = WrapperHandler(async (req, res, next) => {
  
  const { email } = req.body;
  const isAlreadyRegistered = await UserModel.findOne({ email });
  if (isAlreadyRegistered) {
    throw new ApiErrorHandler("User already registered", 500);
  }
  const user = await UserModel.create(req.body);
  res.status(201).send({
    message: "User created successfully",
    data: user,
  });
});

const logInHandler = WrapperHandler(async (req, res, next) => {
  
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email });
  const userPasswordIsCorrect = await bcrypt.compare(password, user.password);

  console.log(userPasswordIsCorrect);
  if (!userPasswordIsCorrect) {
    throw new ApiErrorHandler("Login failed", 500);
  }

  const token = setUser(user);

  // res.cookie("uid", token, { httpOnly: true, secure: true });
  res.cookie("uid", token, {
    maxAge:300000,  
    secure: true, 
    sameSite: 'Strict',
    httpOnly: true 
  });
  res.status(200).send({
    message: "User logged in successfully",
    token: token,
    data: user,
  });
});

const getLoggedInUser = WrapperHandler(async (req, res, next) => {
  const { token } = req.body;
  const user = getUser(token);
  if(!user){
    throw new ApiErrorHandler("user not found", 400);
  }
  
  res.status(200).json(user);
});

const cartHandler = WrapperHandler(async (req, res) => {
  const { email, product } = req.body;
  
  const user = await UserModel.findOneAndUpdate(
    { email },
    {
      $push: { cart: product },
    }
  );
  
  if(!user){
    throw new ApiErrorHandler("user not found", 400);
  }
  res.status(200).json(user);
});

const getUserCartData = WrapperHandler(async (req, res) => {
  const { email } = req.params;
  
  const user = await UserModel.findOne({ email });
  if(!user){
    throw new ApiErrorHandler("user not found", 400);
  }
  console.log(user);
  res.status(200).json(user);
});

const deleteUserCartData = WrapperHandler(async (req, res) => {
  const { email, id } = req.body;
  
  let user = await UserModel.updateOne(
    { email},
    { $pull: { cart: { _id: id } } },
    { multi: true }
  )
  
  if(!user){
    throw new ApiErrorHandler("user not found", 400);
  }
  res.status(200).json(user);
})

module.exports = {
  signUpHandler,
  logInHandler,
  getLoggedInUser,
  cartHandler,
  getUserCartData,
  deleteUserCartData
};
