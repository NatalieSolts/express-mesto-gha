const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const centralErrorHandler = require('./middlewares/errors');
const NotFoundError = require('./utils/errors/NotFoundError');

const { login, createUser } = require('./controllers/users');
const { userSignUpValidate } = require('./middlewares/validators/userValidators');
const auth = require('./middlewares/auth');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

// mongoose.connect("mongodb://localhost:27017/mestodb", {
mongoose
  .connect('mongodb://127.0.0.1:27017/mestodb', {
    useNewUrlParser: true,
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/signin', userSignUpValidate, login);
app.post('/signup', userSignUpValidate, createUser);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => next(new NotFoundError()));

// валидация ошибок Joi-library
app.use(errors());

// централизованная обработка ошибок
app.use(centralErrorHandler);

app.listen(PORT);
