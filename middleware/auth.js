const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Access denied, authorization required' });
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-super-secret');
  } catch (error) {
    return next(error);
  }
  req.user = payload;
  return next();
};
