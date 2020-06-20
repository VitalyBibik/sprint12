const jwt = require('jsonwebtoken');
const NeedAuthError = require('../errors/NeedAuthError');
const { JWT_KEYS } = require('../config');

module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    throw new NeedAuthError('Access denied, authorization required');
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEYS);
  } catch (error) {
    throw new NeedAuthError('Access denied, authorization required');
  }
  req.user = payload;
  return next();
};
