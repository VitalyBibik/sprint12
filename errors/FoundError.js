function FoundError(error, res) {
  if (error.name === 'ValidationError') {
    return res.status(400).send({ message: error.message });
  }
  if (error.name === 'CastError') {
    return res.status(400).send({ message: error.message });
  }
  return res.status(500).send({ message: error.message });
}
module.exports = FoundError;
