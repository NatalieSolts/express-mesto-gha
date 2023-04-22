const express = require("express");
const mongoose = require("mongoose");
const { NOT_FOUND_ERROR } = require("./errors/errors");

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

// mongoose.connect("mongodb://localhost:27017/mestodb", {
mongoose
  .connect("mongodb://127.0.0.1:27017/mestodb", {
    useNewUrlParser: true,
  })
  .then(() => console.log("Соединение установлено"))
  .catch((err) => console.log(`Ошибка ---> ${err}`));

// Реализация временного решения авторизации
app.use((req, res, next) => {
  req.user = {
    _id: "6443ce1121f1464b0ce5e2a6",
  };
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", require("./routes/users"));
app.use("/cards", require("./routes/cards"));
app.use("*", (req, res) => {
  res.status(NOT_FOUND_ERROR).send({ message: "Страница не найдена" });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает:
  console.log(`Сервер слушает порт ---> ${PORT}`);
});
