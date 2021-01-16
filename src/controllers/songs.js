const { Album, Artist, Song } = require("../models");
const song = require("../models/song");
const artist = require("../models/artist");
const album = require("../models/album");
const { getArtistById } = require("./artists");

const create = (req, res) => {
  const { albumId } = req.params;
  console.log(albumId);
  const artistId = req.body.artist;
  const songName = req.body.name;
  Artist.findByPk(artistId)
    .then((artist) => {
      if (!artist) {
        console.log("Hello");
        res.status(404).json({ error: "The artist could not be found." });
      } else {
        console.log("Hello again");
        Album.findByPk(albumId)
          .then((album) => {
            if (!album) {
              console.log("I'm a statement");
              res.status(404).json({ error: "The album could not be found." });
            } else {
              Song.create({
                name: req.body.name,
                album: albumId,
                artist: artistId,
              }).then((song) => {
                res.status(201).json(song);
              }).catch((error) => console.log(error, "Line 31"));
            }
          })
          .catch((error) => console.log(error, "Line 34"));
      }
    })
    .catch((error) => console.log(error, "Line 37"));
};

const list = (req, res) => {
  Song.findAll().then((song) => res.status(200).json(song));
};

const getSongById = (req, res) => {
  const { songId } = req.params;
  Song.findByPk(songId).then((song) => {
    if (!song) {
      res.status(404).json({ error: "The song could not be found." });
    } else {
      res.status(200).json(song);
    }
  });
};

const updatedInfo = (req, res) => {
  const { id } = req.params;
  Song.update(req.body, { where: { id } }).then(([updatedSong]) => {
    if (!updatedSong) {
      res.status(404).json({ error: "The song could not be found." });
    } else {
      res.status(200).json(updatedSong);
    }
  });
};

const deletedSong = (req, res) => {
  const { id } = req.params;
  Song.destroy({ where: { id } }).then((updatedSong) => {
    if (!updatedSong) {
      res.status(404).json({ error: "The song could not be found." });
    } else {
      res.status(204).json(updatedSong);
    }
  });
};

module.exports = {
  create,
  list,
  getSongById,
  updatedInfo,
  deletedSong,
};
