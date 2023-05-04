const { NOT_FOUND_ERROR } = require('../constants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.code = NOT_FOUND_ERROR;
  }
}

module.exports = NotFound;
