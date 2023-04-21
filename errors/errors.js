// 400 — переданы некорректные данные в методы создания карточки, пользователя, обновления аватара пользователя или профиля;
// 404 — карточка или пользователь не найден.
// 500 — ошибка по-умолчанию.
const { ValidationError, DocumentNotFoundError, CastError } =
  require("mongoose").Error;

const BAD_REQUEST_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const DEFAULT_ERROR = 500;

module.exports.handleErrors = (err, res) => {
  if (err instanceof ValidationError) {
    const errorMessage = Object.values(err.errors)
      .map((error) => error.message)
      .join(" ");
    return res.status(BAD_REQUEST_ERROR).send({
      message: `Переданы некорректные данные. ${errorMessage}`,
    });
  }
  if (err instanceof DocumentNotFoundError) {
    return res.status(NOT_FOUND_ERROR).send({
      message: "В базе данных не найден документ с таким ID",
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
