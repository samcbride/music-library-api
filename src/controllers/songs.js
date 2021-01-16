const { Album, Artist, Song } = require("../models");

const create = (req, res) => {
  const { albumId } = req.params;
  const artistId = req.body.artist;
  Artist.findByPk(artistId)
    .then((artist) => {
      if (!artist) {
        res.status(404).json({ error: "The artist could not be found." });
      } else {
        Album.findByPk(albumId)
          .then((album) => {
            if (!album) {
              res.status(404).json({ error: "The album could not be found." });
            } else {
              Song.create({
                name: req.body.name,
                album: albumId,
                artist: artistId,
              })
                .then((song) => {
                  res.status(201).json(song);
                })
                .catch((error) => console.log(error));
            }
          })
          .catch((error) => console.log(error));
      }
    })
    .catch((error) => console.log(error));
};

const list = (req, res) => {
  Song.findAll()
    .then((song) => res.status(200).json(song))
    .catch((error) => console.log(error));
};

const getSongById = (req, res) => {
  const { songId } = req.params;
  Song.findByPk(songId)
    .then((song) => {
      if (!song) {
        res.status(404).json({ error: "The song could not be found." });
      } else {
        res.status(200).json(song);
      }
    })
    .catch((error) => console.log(error));
};

const updatedInfo = (req, res) => {
  const { id } = req.params;
  Song.update(req.body, { where: { id } })
    .then(([updatedSong]) => {
      if (!updatedSong) {
        res.status(404).json({ error: "The song could not be found." });
      } else {
        res.status(200).json(updatedSong);
      }
    })
    .catch((error) => console.log(error));
};

const deletedSong = (req, res) => {
  const { id } = req.params;
  Song.destroy({ where: { id } })
    .then((updatedSong) => {
      if (!updatedSong) {
        res.status(404).json({ error: "The song could not be found." });
      } else {
        res.status(204).json(updatedSong);
      }
    })
    .catch((error) => console.log(error));
};

module.exports = {
  create,
  list,
  getSongById,
  updatedInfo,
  deletedSong,
};
