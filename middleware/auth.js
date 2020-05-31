const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Access denied, authorization required' });
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, PRIVATE_KEY);
  } catch (error) {
    return res.status(401).send({ message: 'Access denied, authorization required' });
  }
  req.user = payload;
  return next();
};
