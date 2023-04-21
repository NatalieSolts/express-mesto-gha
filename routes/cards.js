const router = require("express").Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

// GET /cards — возвращает все карточки
router.get("/cards", getCards);

// POST /cards — создаёт карточку
router.post("/cards", createCard);

// DELETE /cards/:cardId — удаляет карточку по идентификатору
router.delete("/cards/:cardId", deleteCard);

// PUT /cards/:cardId/likes — поставить лайк карточке
router.put("/cards/:cardId/likes", likeCard);

// DELETE /cards/:cardId/likes — убрать лайк с карточки
router.delete("/cards/:cardId/likes", dislikeCard);

module.exports = router;
