const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const { PRIVATE_KEY } = require('../config');
const NotFoundError = require('../errors/NotFoundError');
const FoundError = require('../errors/FoundError');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .orFail(() => new NotFoundError('Users list is empty'));
    return res.send(users);
  } catch (err) {
    return FoundError(err, res);
  }
};


module.exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .orFail(() => new NotFoundError('User not found'));
    return res.send(user);
  } catch (err) {
    return FoundError(err, res);
  }
};

module.exports.createUser = async (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name, about, avatar, email, password: hash,
    });
    return res.send({
      name: newUser.name, about: newUser.about, avatar: newUser.avatar, email: newUser.email,
    });
  } catch (err) {
    return FoundError(err, res);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userlogin = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: userlogin._id },
      PRIVATE_KEY,
      { expiresIn: '7d' });
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
    });
    return res.send({ token });
  } catch (err) {
    return FoundError(err, res);
  }
};


module.exports.updateProfile = async (req, res) => {
  const { name, about } = req.body;
  try {
    const updateUserProfile = await User.findByIdAndUpdate(req.user._id, { name, about }, {
      new: true,
      runValidators: true,
      upsert: true,
    }).orFail(() => new NotFoundError('User not found'));
    return res.send(updateUserProfile);
  } catch (err) {
    return FoundError(err, res);
  }
};

module.exports.updateAvatar = async (req, res) => {
  const { avatar } = req.body;
  try {
    const userUpdateAvatar = await User.findByIdAndUpdate(req.user._id, { avatar }, {
      new: true,
      runValidators: true,
      upsert: true,
    }).orFail(() => new NotFoundError('User not found'));
    return res.send(userUpdateAvatar);
  } catch (err) {
    return FoundError(err, res);
  }
};
