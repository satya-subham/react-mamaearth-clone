const { getUser } = require("../utils/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
    console.log(req.cookie);
//   const userUid = req.cookies?.uid;

//   const user = getUser(userUid);

//   req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
  checkAuth,
};