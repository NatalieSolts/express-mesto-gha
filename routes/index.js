const router = require('express').Router();

const { validateUserCredential } = require('../middlewares/validators/userValidators');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', validateUserCredential, login);
router.post('/signup', validateUserCredential, createUser);

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use('*', (req, res, next) => next(new NotFoundError()));

module.exports = router;
