const { Artist } = require("../models");

const create = (req, res) => {
  Artist.create(req.body)
    .then((artist) => res.status(201).json(artist))
    .catch((error) => console.log(error));
};

const list = (_, res) => {
  Artist.findAll()
    .then((list) => res.status(200).json(list))
    .catch((error) => console.log(error));
};

const getArtistById = (req, res) => {
  const { id } = req.params;
  Artist.findByPk(id)
    .then((artist) => {
      if (!artist) {
        res.status(404).json({ error: "The artist could not be found." });
      } else {
        res.status(200).json(artist);
      }
    })
    .catch((error) => console.log(error));
};

const newInfo = (req, res) => {
  const { id } = req.params;
  Artist.update(req.body, { where: { id } })
    .then(([rowsUpdated]) => {
      if (!rowsUpdated) {
        res.status(404).json({ error: "The artist could not be found." });
      } else {
        res.status(200).json(rowsUpdated);
      }
    })
    .catch((error) => console.log(error));
};

const deletedArtist = (req, res) => {
  const { id } = req.params;
  Artist.destroy({ where: { id } })
    .then((rowsDeleted) => {
      if (!rowsDeleted) {
        res.status(404).json({ error: "The artist could not be found." });
      } else {
        res.status(204).json(rowsDeleted);
      }
    })
    .catch((error) => console.log(error));
};

module.exports = {
  create,
  list,
  getArtistById,
  newInfo,
  deletedArtist,
};
