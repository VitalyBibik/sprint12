const routes = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const auth = require('../middleware/auth');
const validatorLink = require('../validatorLink');
const {
  getCards, deleteCard, createCard, likeCard, dislikeCard,
} = require('../controllers/cards');

routes.get('/cards', auth, getCards);
routes.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validatorLink),
  }),
}), auth, createCard);
routes.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), auth, deleteCard);
routes.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), auth, likeCard);
routes.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
}), auth, dislikeCard);

module.exports = routes;
