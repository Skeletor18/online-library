const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.use(require('./routes/books.route'))
app.use(require('./routes/genres.route'))
app.use(require('./routes/users.route'))
app.use(require('./routes/reviews.route'))


mongoose
  .connect(
    "mongodb+srv://skeletor:akhmed20020918@cluster0.bcycud5.mongodb.net/OnlineBooks?retryWrites=true&w=majority"
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(port, () => {
  console.log('Start http://localhost:3000"');
});
