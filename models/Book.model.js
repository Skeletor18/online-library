const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: String,
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
  },
  isRenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;
