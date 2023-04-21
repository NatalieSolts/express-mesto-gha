const express = require("express");
const bodyParser = require("body-parser");
//const path = require("path");

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;
const app = express();

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/mestodb", {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(`connection error ${err}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routes/users"));

//app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  req.user = {
    _id: "5d8b8592978f8bd833ca8133",
  };

  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
