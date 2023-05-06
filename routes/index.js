const router = require('express').Router();

const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

router.use('/signin', require('./signin'));
router.use('/signup', require('./signup'));
router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

// router.use('*', (req, res, next) => next(new NotFoundError()));
router.use('*', NotFoundError);

module.exports = router;
