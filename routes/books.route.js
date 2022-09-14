const { Router } = require("express");
const router = Router();
const { booksController } = require("../controllers/books.controller");

router.get("/books", booksController.getBooks);
router.get("/books/:id", booksController.getBooksId);
router.get('/books/genre/:book_id',booksController.getBookGenres)
router.delete("/admin/books/:id", booksController.deleteBooks);
router.post("/admin/books", booksController.postBooks);
router.patch("/books/:id", booksController.patchBooks);
router.patch('/book/:book_id/user/:user_id',booksController.rentBook)


module.exports = router;
