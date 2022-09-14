const Book = require("../models/Book.model.js");
const User = require("../models/User.model.js");

module.exports.booksController = {
  getBooks: async (req, res) => {
    try {
      const booksGet = await Book.find().params("genre isRenter", "name");
      res.json(booksGet);
    } catch (err) {
      res.json(err);
    }
  },

  getBooksId: async (req, res) => {
    try {
      const booksGetId = await Book.findById(req.params.id);
      res.json(booksGetId);
    } catch (err) {
      res.json(err);
    }
  },

  deleteBooks: async (req, res) => {
    try {
      const booksDelete = await Book.findByIdAndRemove(req.params.id);
      res.json(booksDelete);
    } catch (err) {
      res.json(err);
    }
  },

  postBooks: async (req, res) => {
    const { name, genre, isRenter } = req.body;
    try {
      const booksPost = await Book.create({
        name,
        genre,
        isRenter,
      });
      res.json(booksPost);
    } catch (err) {
      res.json(err);
    }
  },

  patchBooks: async (req, res) => {
    const { name, genre, isRenter } = req.body;
    try {
      const bookPatch = await Book.findByIdAndUpdate(req.params.id, {
        name,
        genre,
        isRenter,
      });
      res.json(bookPatch);
    } catch (err) {
      res.json(err);
    }
  },

  getBookGenres: async (req, res) => {
    try {
      const genreBook = await Book.find({ genre: req.params.book_id }).populate('genre','name');
      res.json(genreBook);
    } catch (err) {
      res.json(err);
    }
  },
  
  rentBook : async(req,res)=>{
    try{
      const user = await User.findById(req.params.user_id)
      const book = await Book.findById(req.params.book_id)
      if (user.isBlocked) {
        return res.json('Пользователь заблокирован')
      }
      if(user.rentedBooks.length >= 3){
        return res.json('нельзя арендовать больше 3-х книг одновременно')
      }
      if(!book.isRenter){
        await book.updareOne({
          isRenter:req.params.user_id
        })
        await user.updateOne({
          $push:({rentedBooks: req.params.book_id})
        })
        res.json('Пользователь арендовал книгу')
      }else{
        res.json('Книга уже арендована')
      }
    }catch(err){
      res.json(err)
    }
  }
};

