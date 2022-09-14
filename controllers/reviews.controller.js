const Review = require("../models/Review.model.js");

module.exports.reviewConstroller = {
  getReview: async (req, res) => {
    try {
      const reviewGet = await Review.find().populate("user book", "name");
      res.json(reviewGet);
    } catch (err) {
      res.json(err);
    }
  },

  getReviewId: async (req, res) => {
    try {
      const reviewId = await Review.findById(req.params.id).populate(
        "user book",
        "name"
      );
      res.json(reviewId);
    } catch (err) {
      res.json(err);
    }
  },

  deleteReview: async (req, res) => {
    try {
      const reviewDelete = await Review.findByIdAndRemove(req.params.id);
      res.json(reviewDelete);
    } catch (err) {
      res.json(err);
    }
  },

  postReview: async (req, res) => {
    const { text, user, book } = req.body;
    try {
      const reviewPost = await Review.create({
        text,
        user,
        book,
      });
      res.json(reviewPost);
    } catch (err) {
      res.json(err);
    }
  },

  patchReview: async (req, res) => {
    const { text, user, book } = req.body;
    try {
      const reviewPatch = await Review.findByIdAndUpdate(req.params.id, {
        text,
        user,
        book,
      });
      res.json(reviewPatch);
    } catch (err) {
      res.json(err);
    }
  },
};
