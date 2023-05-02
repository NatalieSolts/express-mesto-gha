const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { handleErrors } = require('../errors/errors');

// GET /users — возвращает всех пользователей
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => handleErrors(err, res));
};

// GET /users/:userId - возвращает пользователя по _id
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

// POST /users — создаёт пользователя
module.exports.createUser = (req, res) => {
  const {
    email, password, name, about, avatar,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hashedPassword) => User.create({
      email, hashedPassword, name, about, avatar,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

// PATCH /users/me — обновляет профиль
module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};

// PATCH /users/me/avatar — обновляет аватар
module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => handleErrors(err, res));
};
