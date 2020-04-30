
const routes = require('express').Router();
const users = require('../data/users');

routes.get('/users', (req, res) => {
    res.status(200).json(users);
});

routes.get('/users/:_id', (req, res) => {
    const userID = req.params._id;
    const userSend = users.find(m => m._id === userID);
    if (userSend) {
        res.status(200).json({userSend});
    } else {
        res.status(400).json({ "message": "Нет пользователя с таким id" });
    }

});

module.exports = routes;




