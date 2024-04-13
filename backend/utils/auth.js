const jwt = require("jsonwebtoken");
const secret = "satya@1234$%^&";
function setUser(user) {

  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secret,
    { 
      expiresIn: '1h' 
    }
  );
}

function getUser(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  setUser,
  getUser,
};
