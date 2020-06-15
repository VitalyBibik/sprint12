function ErrorHandler(error, req, res, next) {
  if (error.name === 'ValidationError') {
    return res.status(400).send({ message: error.message });
  }
  if (error.name === 'CastError') {
    return res.status(400).send({ message: 'id is not found' });
  }

  const statusCode = error.statusCode || 500;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка' : error.message,
  });
  next();
}
module.exports = ErrorHandler;
