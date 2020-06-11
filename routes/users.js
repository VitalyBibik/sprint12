const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');

const {
  getUsers, getUser, createUser, updateProfile, updateAvatar, login,
} = require('../controllers/users');

routes.post('/signup', celebrate({
  body: Joi.object.keys()({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().uri().required(),
  }),
}), createUser);
routes.post('/signin', celebrate({
  body: Joi.object.keys()({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
}), login);

routes.get('/users', auth, getUsers);
routes.get('/users/:id', auth, getUser);
routes.patch('/users/me', auth, updateProfile);
routes.patch('/users/me/avatar', auth, updateAvatar);

module.exports = routes;
