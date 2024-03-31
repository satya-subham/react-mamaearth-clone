const ErrorHandler = (err, req, res, next) => {
  err.statusCode = err?.statusCode || 500;
  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
  });
};

module.exports = ErrorHandler