const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, SECRET_KEY } = process.env;

const { CREATED_CODE } = require('../middlewares/errors');

const User = require('../models/user');

// GET /users — возвращает всех пользователей
module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// GET /users/:userId - возвращает пользователя по _id
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// POST /users — создаёт пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(CREATED_CODE).send({ data: userData });
    })
    .catch(next);
};

function updateInfo(req, res, dataToUpdate, next) {
  const id = req.user._id;
  User.findByIdAndUpdate(
    id,
    dataToUpdate,
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
}
// PATCH /users/me — обновляет профиль
module.exports.updateUserInfo = (req, res, next) => {
  const userData = req.body;
  updateInfo(req, res, userData, next);
};

// PATCH /users/me/avatar — обновляет аватар
module.exports.updateUserAvatar = (req, res, next) => {
  const newAvatarLink = req.body;
  updateInfo(req, res, newAvatarLink, next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? SECRET_KEY : 'secret-key',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 3600000 * 24 * 7,
      });
      res.send({ message: 'Вы успешно вошли!' });
    })
    .catch(next);
};
