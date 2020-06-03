const routes = require('express').Router();
const auth = require('../middleware/auth');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routes.get('/cards', auth, getCards);
routes.post('/cards', auth, createCard);
routes.delete('/cards/:cardId', auth, deleteCard);
routes.put('/cards/:cardId/likes', auth, likeCard);
routes.delete('/cards/:cardId/likes', auth, dislikeCard);

module.exports = routes;
