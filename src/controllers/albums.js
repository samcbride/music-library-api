const { Album, Artist } = require("../models");

const newAlbum = (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id)
    .then((artist) => {
      if (!artist) {
        res.status(404).json({ error: "The artist could not be found." });
      } else {
        Album.create({ ...req.body, artistId: req.params.id })
          .then((album) => {
            res.status(201).json(album);
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
};

const list = (_, res) => {
  Album.findAll()
    .then((album) => res.status(200).json(album))
    .catch((error) => console.log(error));
};

const getAlbumById = (req, res) => {
  const { id } = req.params;
  Album.findByPk(id)
    .then((album) => {
      if (!album) {
        res.status(404).json({ error: "The album could not be found." });
      } else {
        res.status(200).json(album);
      }
    })
    .catch((error) => console.log(error));
};

const updatedInfo = (req, res) => {
  const { id } = req.params;
  Album.update(req.body, { where: { id } })
    .then(([updatedAlbum]) => {
      if (!updatedAlbum) {
        res.status(404).json({ error: "The album could not be found." });
      } else {
        res.status(200).json(updatedAlbum);
      }
    })
    .catch((error) => console.log(error));
};

const deletedAlbum = (req, res) => {
  const { id } = req.params;
  Album.destroy({ where: { id } })
    .then((updatedAlbum) => {
      if (!updatedAlbum) {
        res.status(404).json({ error: "The album could not be found." });
      } else {
        res.status(204).json(updatedAlbum);
      }
    })
    .catch((error) => console.log(error));
};

module.exports = {
  newAlbum,
  list,
  getAlbumById,
  updatedInfo,
  deletedAlbum,
};
