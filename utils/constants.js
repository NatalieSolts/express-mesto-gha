const CREATED_CODE = 201;
const BAD_REQUEST_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const DEFAULT_ERROR = 500;

const LINK_PATTERN = /http(s)?:\/\/(w{3}.)?[a-z0-9.-]+\/[a-z0-9.\-_~:/?#[\]@!$&'()*+,;=]?#?/im;

module.exports = {
  CREATED_CODE,
  BAD_REQUEST_ERROR,
  UNAUTHORIZED_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  DEFAULT_ERROR,
  LINK_PATTERN,
};
