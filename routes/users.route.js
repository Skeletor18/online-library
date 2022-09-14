const { Router } = require("express");
const router = Router();
const { usersController } = require("../controllers/users.controller");

router.get("/admin/users", usersController.getUsers);
router.get("/admin/users/:id", usersController.getUsersId);
router.delete("/admin/users/:id", usersController.deleteUsers);
router.post("/admin/users", usersController.postUsers);
router.patch("/admin/users/:id", usersController.patchUsers);
router.patch('/admin/block/:user_id',usersController.banUser)
router.patch('/user/:user_id/book/:book_id',usersController.userRented)
router.patch('/admin/:user_id/book/:book_id',usersController.bookBan)


module.exports = router;
