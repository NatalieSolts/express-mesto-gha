const { NOT_FOUND_ERROR } = require('../constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.code = NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
