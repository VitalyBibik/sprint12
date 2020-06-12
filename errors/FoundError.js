function FoundError(error, res) {
  if (error.name === 'ValidationError') {
    return res.status(400).send({ message: error.message });
  }
  if (error.name === 'CastError') {
    return res.status(400).send({ message: 'id is not found' });
  }
  if (error.errors.email) {
    return res.status(409).send({ message: 'email is already used by another user' });
  }
  const statusCode = error.statusCode || 500;
  return res.status(statusCode).send({
    message: statusCode === 500 ? 'Произошла ошибка' : error.message,
  });
}
module.exports = FoundError;
