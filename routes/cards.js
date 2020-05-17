const routes = require('express').Router();
const { getCards, deleteCard, createCard, likeCard, dislikeCard } = require('../controllers/cards');

routes.get('/cards', getCards);
routes.post('/cards', createCard);
routes.delete('/cards/:cardId', deleteCard);
routes.put('/cards/:cardId/likes', likeCard);
routes.delete('/cards/:cardId/likes', dislikeCard);

module.exports = routes;
