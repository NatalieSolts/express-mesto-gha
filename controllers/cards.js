const Card = require('../models/card');
const { handleErrors } = require('../errors/errors');
const { CREATED_CODE } = require('../errors/errors');

// GET /cards — возвращает все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => handleErrors(err, res));
};

// POST /cards — создаёт карточку
module.exports.createCard = (req, res) => {
  const id = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: id })
    .then((card) => res.status(CREATED_CODE).send({ data: card }))
    .catch((err) => handleErrors(err, res));
};

// DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleErrors(err, res));
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleErrors(err, res));
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => handleErrors(err, res));
};
