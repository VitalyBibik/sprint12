const routes = require('express').Router();

const { getUsers, createUser } = require('../controllers/users');

routes.get('/users', getUsers);
routes.post('/users', createUser);

routes.all('/users/:_id', (req, res) => {
  const userReq = req.params._id; //eslint-disable-line
  const userFind = users.find((m) => m._id === userReq); //eslint-disable-line
  if (userFind) {
    res.status(200).json(userFind);
  } else {
    res.status(404).json({ message: 'Нет пользователя с таким id' });
  }
});
module.exports = routes;
