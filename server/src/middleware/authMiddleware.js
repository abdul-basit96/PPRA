const jwt = require("jsonwebtoken");
// const config = require('config');
require("dotenv").config();

module.exports = function (req, res, next) {
  try {
    const token = req.header("x-auth-token");
    const verifiedUser = jwt.verify(token, "secret");
    req.user = verifiedUser;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Serveer Error..Middle." });
  }
};
