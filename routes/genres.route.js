const { Router } = require("express");
const router = Router();
const { genresController } = require("../controllers/genres.controller");

router.get("/genres", genresController.getGenres);
router.get("/genres/:id", genresController.getGenresId);
router.delete("/genres/:id", genresController.deleteGenres);
router.post("/genres", genresController.postGenres);
router.patch("/genres/:id", genresController.patchGenres);

module.exports = router;
