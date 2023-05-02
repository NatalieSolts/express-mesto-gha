const { ValidationError, DocumentNotFoundError, CastError } = require('mongoose').Error;
const { JsonWebTokenError } = require('jsonwebtoken');

const CREATED_CODE = 201;
const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;

const handleErrors = (err, res) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors)
      .map((error) => error.message)
      .join(' ');
    return res.status(BAD_REQUEST_ERROR).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof JsonWebTokenError) {
    return res.status(UNAUTHORIZED_ERROR).send({ message: 'Передан невалидный токен' });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND_ERROR).send({
      message: 'В базе данных не найден документ с таким ID',
    });
  }
  if (err instanceof CastError) {
    return res.status(BAD_REQUEST_ERROR).send({
      message: `Передан некорректный ID: ${err.value}`,
    });
  }
  return res.status(DEFAULT_ERROR).send({
    message: `Произошла неизвестная ошибка ${err.name}: ${err.message}`,
  });
};

module.exports = {
  NOT_FOUND_ERROR,
  CREATED_CODE,
  handleErrors,
};
