const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  if (!req.cookies.jwt) {
    return res.status(401).send({ message: 'Access denied, authorization required' });
  }
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (error) {
    return next(error);
  }
  req.user = payload;
  return next();
};
