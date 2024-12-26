const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.JWT_AUTH_SECRET_KEY;

const jwtAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    // If no token, use the static token
    req.user = { userId: process.env.JWT_AUTH_CLIENT_ID };
    next();
  } else {
    // If token is provided, verify it
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }
};

module.exports = jwtAuth;
