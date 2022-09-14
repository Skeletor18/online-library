const Genre = require("../models/Genre.model.js");

module.exports.genresController = {
  getGenres: async (req, res) => {
    try {
      const genreGet = await Genre.find();
      res.json(genreGet);
    } catch (err) {
      res.json(err);
    }
  },

  getGenresId: async (req, res) => {
    try {
      const genreId = await Genre.findById(req.params.id);
      res.json(genreId);
    } catch (err) {
      res.json(err);
    }
  },

  deleteGenres: async (req, res) => {
    try {
      const genreDelete = await Genre.findByIdAndRemove(req.params.id);
      res.json(genreDelete);
    } catch (err) {
      res.json(err);
    }
  },

  postGenres: async (req, res) => {
    try {
      const genrePost = await Genre.create({
        name: req.body.name,
      });
      res.json(genrePost);
    } catch (err) {
      res.json(err);
    }
  },

  patchGenres: async (req, res) => {
    try {
      const genrePatch = await Genre.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
      });
      res.json(genrePatch);
    } catch (err) {
      res.json(err);
    }
  },
};
