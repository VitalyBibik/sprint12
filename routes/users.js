const routes = require('express').Router();
const auth = require('../middleware/auth');

const {
  getUsers, getUser, createUser, updateProfile, updateAvatar, login,
} = require('../controllers/users');

routes.post('/signup', createUser);
routes.post('/signin', login);

routes.post('/users', auth, getUsers);
routes.get('/users/:id', auth, getUser);
routes.patch('/users/me', auth, updateProfile);
routes.patch('/users/me/avatar', auth, updateAvatar);

module.exports = routes;
