const AppError = function(message, statusCode, responseMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};

AppError.err400 = function(message) {
  return new AppError(message, 400, 'invalid body');
};

AppError.err404 = function(message) {
  return new AppError(message, 404, 'not found');
};

AppError.err500 = function(message) {
  return new AppError(message, 500, 'internal server error');
};


module.exports = AppError;
