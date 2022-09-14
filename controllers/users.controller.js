const User = require("../models/User.model.js");
const Book = require("../models/Book.model.js");

module.exports.usersController = {
  getUsers: async (req, res) => {
    try {
      const userGet = await User.find().params("isBlocked rentedBooks", "name");
      res.json(userGet);
    } catch (err) {
      res.json(err);
    }
  },

  getUsersId: async (req, res) => {
    try {
      const userId = await User.findById(req.params.id).params(
        "isBlocked rentedBooks",
        "name"
      );
      res.json(userId);
    } catch (err) {
      res.json(err);
    }
  },

  deleteUsers: async (req, res) => {
    try {
      const userdelete = await User.findByIdAndRemove(req.params.id);
      res.json(userdelete);
    } catch (err) {
      res.json(err);
    }
  },

  postUsers: async (req, res) => {
    const { name, isBlocked, rentedBooks } = req.body;
    try {
      const userPost = await User.create({
        name,
        isBlocked,
        rentedBooks,
      });
      res.json(userPost);
    } catch (err) {
      res.json(err);
    }
  },

  patchUsers: async (req, res) => {
    const { name, isBlocked, rentedBooks } = req.body;
    try {
      const userPatch = await User.findByIdAndUpdate(req.params.id, {
        name,
        isBlocked,
        rentedBooks,
      });
      res.json(userPatch);
    } catch (err) {
      res.json(err);
    }
  },

  banUser: async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.user_id, {
        isBlocked: true,
        rentedBooks: [],
      });
      await Book.find({ isRenter: req.params.user_id }).updateOne({
        isRenter: null,
      });
      res.json("Пользователь забанен");
    } catch (err) {
      res.json(err);
    }
  },
  userRented: async (req, res) => {
    try {
      const user = await User.findById(req.params.user_id);
      const book = await Book.findById(req.params.book_id);
      if (!user.rentedBooks.includes(req.params.book_id)) {
        return res.json(`Книга ${book.name} не найдена в списке арендованных`);
      }

      await user.updateOne({
        $pull: { rentedBooks: req.params.book_id },
      });

      await book.updateOne({
        $pull: { isRenter: req.params.user_id },
      });
    } catch (err) {
      res.json(err);
    }
  },

  bookBan : async(req,res)=>{
    try{
        const user = await User.findById(req.params.user_id);
        const book = await Book.findById(req.params.book_id);

        if (!user.rentedBooks.includes(req.params.book_id)) {
          return res.json(`Книга ${book.name} не найдена в списке арендованных`);
        }

        await user.updateOne({
            $pull: { rentedBooks: req.params.book_id },
            isBlocked: true
          });
    
          await book.updateOne({
            isRenter: null
          });

          res.json(`Admin отобрал книку у ${user.name}, и пользователь был заблокирован`)

    }catch(err){
        res.json(err)
    }
  }
};
