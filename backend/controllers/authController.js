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

  if (!userPasswordIsCorrect) {
    throw new ApiErrorHandler("Login failed", 500);
  }

  const token = setUser(user);
  console.log(token)

  res.cookie("token", token, {
    maxAge: 3600000,
    secure: true,
    sameSite: "None"
  });

  res.status(200).send({
    message: "User logged in successfully",
    data: user,
    token: token
  });
});

const getLoggedInUser = WrapperHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    throw new ApiErrorHandler("user not found", 400);
  }

  res.status(200).json(user);
});

const getLoginUser = WrapperHandler(async (req, res, next) => {
  const { email } = req.params;
  const user = await UserModel.findOne({ email: email });
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

  if (!user) {
    throw new ApiErrorHandler("user not found", 400);
  }
  res.status(200).json(user);
});

const getUserCartData = WrapperHandler(async (req, res) => {
  const { email } = req.params;

  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiErrorHandler("user not found", 400);
  }

  res.status(200).json(user);
});

const deleteUserCartData = WrapperHandler(async (req, res) => {
  const { email, id } = req.body;

  let user = await UserModel.updateOne(
    { email },
    { $pull: { cart: { _id: id } } },
    { multi: true }
  );

  if (!user) {
    throw new ApiErrorHandler("user not found", 400);
  }
  res.status(200).json(user);
});

const loggoutUser = WrapperHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json("user logged out");
});

module.exports = {
  signUpHandler,
  logInHandler,
  getLoggedInUser,
  cartHandler,
  getUserCartData,
  deleteUserCartData,
  getLoginUser,
  loggoutUser,
};
