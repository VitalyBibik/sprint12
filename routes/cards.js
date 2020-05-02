const routes = require('express').Router();
const cards = require('../data/cards');

routes.get('/cards', (req, res) => {
  res.status(200).json(cards);
});

module.exports = routes;
