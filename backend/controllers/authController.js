const WrapperHandler = require("../utils/WrapperHandler");
const { UserModel } = require("../models/signUpModel");
const bcrypt = require("bcryptjs");
const ApiErrorHandler = require("../utils/ApiErrorHandler");
const { setUser, getUser } = require("../utils/auth");

const signUpHandler = WrapperHandler(async (req, res, next) => {
  console.log(req.body);
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
  console.log(req.body);
  const { password, email } = req.body;
  const user = await UserModel.findOne({ email });
  const userPasswordIsCorrect = await bcrypt.compare(password, user.password);

  console.log(userPasswordIsCorrect);
  if (!userPasswordIsCorrect) {
    throw new ApiErrorHandler("Login failed", 500);
  }

  const token = setUser(user);
  console.log(token);

  res.cookie("uid", token, { httpOnly: true, secure: true });
  res.status(200).send({
    message: "User logged in successfully",
    token: token,
    data: user,
  });
});

const getLoggedInUser = WrapperHandler(async (req, res, next) => {
  const { token } = req.body;
  const user = getUser(token);
  console.log(user);
  res.status(200).json(user);
});

const cartHandler = WrapperHandler(async (req, res) => {
  const { email, product } = req.body;
  console.log(email, product);
  const user = await UserModel.findOneAndUpdate(
    { email },
    {
      $push: { cart: product },
    }
  );
  console.log(user);
  res.status(200).json(user);
});

const getUserCartData = WrapperHandler(async (req, res) => {
  const { email } = req.params;
  console.log(email);
  const user = await UserModel.findOne({ email });
  console.log(user);
  res.status(200).json(user);
});

module.exports = {
  signUpHandler,
  logInHandler,
  getLoggedInUser,
  cartHandler,
  getUserCartData
};
