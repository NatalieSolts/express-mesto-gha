const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_ERROR } = require('../errors/errors');

module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { token } = req.headers;
  if (!token) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: 'Необходима авторизация' });
  }
  let payload;
  try {
    payload = jwt.verify(token, 'secret-key');
  } catch (err) {
    return res
      .status(UNAUTHORIZED_ERROR)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  return next();
};
