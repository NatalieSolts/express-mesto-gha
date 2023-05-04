const express = require('express');
const mongoose = require('mongoose');
const { NOT_FOUND_ERROR } = require('./errors/errors');

const { login, createUser } = require('./controllers/users');
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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: 'Страница не найдена' });
});

app.listen(PORT);
