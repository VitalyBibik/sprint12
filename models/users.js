const mongoose = require('mongoose');
const validatorUsers = require('validator');
const bcrypt = require('bcryptjs');
const NeedAuthError = require('../errors/NeedAuthError');
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (linkAvatar) => validatorUsers.isURL(linkAvatar),
      message: (props) => `${props.value} is not valid avatar link!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validatorUsers.isEmail(email),
      message: (props) => `${props.value} is not valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },

});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Invalid email or password'));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NeedAuthError('Invalid email or password'));
          }
          return user;
        });
    });
};


// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
