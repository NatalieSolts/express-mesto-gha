const router = require("express").Router();
const {
  getUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");

// GET /users — возвращает всех пользователей
router.get("/users", getUsers);

// GET /users/:userId - возвращает пользователя по _id
router.get("/users/:userId", getUser);

// POST /users — создаёт пользователя
router.post("/users", createUser);

// PATCH /users/me — обновляет профиль
router.patch("/users/me", updateUserInfo);

// PATCH /users/me/avatar — обновляет аватар
router.patch("/users/me/avatar", updateUserAvatar);

module.exports = router;
