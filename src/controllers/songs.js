const { Album, Artist, Song } = require('../models');
const song = require('../models/song');
const artist = require('../models/artist');
const album = require('../models/album');
const { getArtistById } = require('./artists');

const create = (req, res) => {
    const { albumId } = req.params;
    console.log(albumId);
    const artistId = req.body.artist;
    console.log(artistId);
    const songName = req.body.name;
    console.log(songName);
    Artist.findByPk(artistId).then((artist) => {
        if(!artist) {
            res.status(404).json({ error: 'The artist could not be found.'}); 
        } else {
        Album.findByPk(albumId).then((album) => {
        if(!album) {
            res.status(404).json({ error: 'The album could not be found.'});
        } else {
            Song.create({name: req.body.name, albumId: req.params.albumId, artistId: req.body.artistId}
            ).then((song) => {
                res.status(201).json(song);
            });
        }
    });
    }
});
};    

module.exports = {
    create
  };

//   const newAlbum = (req, res) => {
//     const { artistId } = req.params;
//     Artist.findByPk(artistId).then((artist) => {
//         if(!artist) {
//             res.status(404).json({ error: 'The artist could not be found.' });
//         } else {
//             const data = req.body;
//             data.artistId = req.params.artistId;
//             Album.create(data, { include: "artist" }).then((album) => {
//                 res.status(201).json(album);
//             });
//         }
//     });
// };