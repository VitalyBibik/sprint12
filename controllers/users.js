const User = require('../models/users');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (users.length === 0) {
       return res.status(404).send({ message: 'Users list is empty' });
      }
     return res.send({ data: users });
    })
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      } else {
        return res.status(500).send({ message: err.message });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      const userFind = user.find((item) => item.id === req.params.id);
      if (!userFind) {
        return res.status(404).send({
          message: 'User not found',
        });
      }
      return res.send({ data: userFind });
    })
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      } else {
       return res.status(500).send({ message: err.message });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      } else {
        return res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about, avatar } = req.body;

  User.findByIdAndUpdate(req.params.id, { name, about, avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => {
    const userFind = user.find((item) => item.id === req.params.id);
    if (!userFind) {
    return  res.status(404).send({ message: 'User not found' });
  }
  return res.send({ data: userFind });
})
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      } else {
        return res.status(500).send({ message: err.message });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.params.id, { avatar }, {
    new: true,
    runValidators: true,
    upsert: true,
  })
    .then((user) => {
      const userFind = user.find((item) => item.id === req.params.id);
      if (!userFind) {
        return  res.status(404).send({ message: 'User not found' });
      }
      return res.send({ data: userFind });
    })
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      } else {
        return res.status(500).send({ message: err.message });
      }
    });
};
