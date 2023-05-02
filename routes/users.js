const router = require('express').Router();
const {
  getAllUsers,
  getUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

// GET /users — возвращает всех пользователей
router.get('/', getAllUsers);

// GET /users/:userId - возвращает пользователя по _id
router.get('/:userId', getUser);

// PATCH /users/me — обновляет профиль
router.patch('/me', updateUserInfo);

// PATCH /users/me/avatar — обновляет аватар
router.patch('/me/avatar', updateUserAvatar);

module.exports = router;
