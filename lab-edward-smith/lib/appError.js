const AppError = function(message, statusCode, responseMessage) {
  this.message = message;
  this.statusCode = statusCode;
  this.responseMessage = responseMessage;
};

AppError.err400 = function(message) {
  return new AppError(message, 400, 'bad req');
};

AppError.err404 = function(message) {
  return new AppError(message, 404, 'no content');
};

AppError.err500 = function(message) {
  return new AppError(message, 500, 'internal server error');
};


module.exports = AppError;
