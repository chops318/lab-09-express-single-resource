const AppError = require('../lib/errorModule');

const errorResponse = function() {
  return (req, res, next) => {
    res.sendError = (err) => {
      // if (err typeof AppError) {
      //   res.status(err.statusCode).send(err.responseMessage);
      // }
      console.log(err instanceof AppError)
      res.status(500).send('internal server error')
    }
    next();
  }
}

module.exports = errorResponse;
