const routes = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { validatorURL } = require('../validation/validatorLink');
const auth = require('../middleware/auth');

const {
  getUsers, getUser, createUser, updateProfile, updateAvatar, login,
} = require('../controllers/users');


routes.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().custom(validatorURL),
  }),
}), createUser);
routes.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

routes.get('/users', auth, getUsers);
routes.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), auth, getUser);
routes.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
}), auth, updateProfile);
routes.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validatorURL),
  }),
}), auth, updateAvatar);

module.exports = routes;
