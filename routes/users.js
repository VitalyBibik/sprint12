const routes = require('express').Router();

const { getUsers, createUser, getUser } = require('../controllers/users');

routes.get('/users', getUsers);
routes.post('/users', createUser);

routes.all('/users/:id', getUser);

module.exports = routes;
