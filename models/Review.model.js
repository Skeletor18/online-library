const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
});
const Review = mongoose.model("Review", reviewSchema);
module.exports = Review;
