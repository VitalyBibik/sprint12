const routes = require('express').Router();

const {
  getUsers, getUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

routes.get('/users', getUsers);
routes.post('/users', createUser);
routes.all('/users/:id', getUser);
routes.patch('/users/me', updateProfile);
routes.patch('/users/avatar', updateAvatar);

module.exports = routes;
