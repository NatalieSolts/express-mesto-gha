const router = require('express').Router();

const { userSignInValidate, userSignUpValidate } = require('../middlewares/validators/userValidators');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', userSignInValidate, login);
router.post('/signup', userSignUpValidate, createUser);

router.use('/users', auth, require('./users'));
router.use('/cards', auth, require('./cards'));

router.use('*', (req, res, next) => next(new NotFoundError()));

module.exports = router;
