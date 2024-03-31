class ApiErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message, statusCode);
    this.statusCode = statusCode;
    this.status = "Application Error";
    this.message = message;
  }
}
module.exports = ApiErrorHandler;
