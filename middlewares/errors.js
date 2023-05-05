const {
  ValidationError,
  DocumentNotFoundError,
  CastError,
} = require('mongoose').Error;

const {
  BAD_REQUEST_ERROR,
  NOT_FOUND_ERROR,
  DEFAULT_ERROR,
  CONFLICT_ERROR,
} = require('../utils/constants');

const UnuthorizedError = require('../utils/errors/UnauthorizedError');
const ForbiddenError = require('../utils/errors/ForbiddenError');
const NotFoundError = require('../utils/errors/UnauthorizedError');

module.exports = ((err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors).map((error) => error.message).join(' ');
    return res.status(BAD_REQUEST_ERROR).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND_ERROR).send({
      message: 'В базе данных не найден документ с таким ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST_ERROR).send({
      message: 'Переданы некорректные данные.',
    });
  }
  if (err instanceof UnuthorizedError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err instanceof ForbiddenError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }
  if (err.code === 11000) {
    return res.status(CONFLICT_ERROR).send({
      message: 'Пользователь с таким email уже зарегистрирован. Пожалуйста, введите другой email',
    });
  }
  res.status(DEFAULT_ERROR).send({
    message: 'На сервере произошла ошибка.',
  });
  return next();
});
