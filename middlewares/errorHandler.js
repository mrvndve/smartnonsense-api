const HttpReponse = require("../helpers/httpResponse");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(HttpReponse.INTERNAL_SERVER_ERROR).json({
    status: HttpReponse.INTERNAL_SERVER_ERROR,
    message: "Internal Server Error",
    errors: err.message || err.errors || err,
  });
};

module.exports = errorHandler;
