const { Router } = require("express");
const router = Router();
const { reviewConstroller } = require("../controllers/reviews.controller");

router.get("/reviews", reviewConstroller.getReview);
router.get("/reviews", reviewConstroller.getReviewId);
router.delete("/reviews", reviewConstroller.deleteReview);
router.post("/reviews", reviewConstroller.postReview);
router.patch("/reviews", reviewConstroller.patchReview);

module.exports = router;
