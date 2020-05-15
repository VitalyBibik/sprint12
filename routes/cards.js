const routes = require('express').Router();


routes.get('/cards', (req, res) => {
  res.status(200).json(cards);
});

module.exports = routes;
