/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album, Song } = require('../src/models');

describe('/songs', () => {
  let artist;
  let album;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
      await Song.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      await Song.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
      album = await Album.create({
        name: 'InnerSpeaker',
        year: 2010,
        ArtistId: artist.id,
      });
    } catch (err) {
      console.log(err);
    }
  });

  // POST tests
  describe('POST artists/:artistId/albums/:albumId/songs', () => {
    it('creates a new song under an album', (done) => {
      request(app)
        .post(`/albums/${album.id}/songs`)
        .send({
          artist: artist.id,  
          name: 'Solitude Is Bliss',
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          const songId = res.body.id;
          console.log(res.body, "Line 52");
          expect(res.body.id).to.equal(songId);
          console.log("Here");
          expect(res.body.name).to.equal('Solitude Is Bliss');
          console.log("Here again");
          expect(res.body.artist).to.eql(artist.id);
          console.log("Here 3");
          console.log(album.id);
          expect(Number(res.body.album)).to.eql(album.id);
          console.log("Here 4");
          done();
        });
    });

    it('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .post(`/albums/${album.id}/songs`)
          .send({
            name: 'Solitude Is Bliss',
          })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The artist could not be found.')
            done();
          })
      });

    it('returns a 404 if the album does not exist', (done) => {
      request(app)
        .post(`/albums/12345/songs`)
        .send({
          artist: artist.id,
          name: 'Solitude Is Bliss',
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The album could not be found.')
          done();
        })
    });
  
  });

    describe('tests with songs in the database', () => {
      let songs;
      beforeEach((done) => {
        Promise.all([
          Song.create({ name: 'A Summer Song', artistId: artist.id, albumId: album.id }),
          Song.create({ name: 'Another Funky Summer Song', artistId: artist.id, albumId: album.id}),
          Song.create({ name: 'Yet Another Song You Will Just Love', artistId: artist.id, albumId: album.id }),
        ]).then((documents) => {
          songs = documents;
          done();
        });
      });
      
      // GET tests
      describe('GET /artists/:artistId/albums/:albumId/songs', () => {
        it('gets all song records on a given album', (done) => {
          request(app)
            .get(`/songs`)
            .then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body.length).to.equal(3);
              res.body.forEach((song) => {
                const expected = songs.find((a) => a.id === song.id);
                expect(song.name).to.equal(expected.name);
                expect(song.artistId).to.equal(artist.id);
                expect(song.albumId).to.equal(album.id);
              });
              done();
            });
        });
      });


      describe('GET /artists/:artistId}/albums/:albumId/songs/:songId', () => {
        it('gets song of given album by song id', (done) => {
          let song = songs[0]
          request(app)
            .get(`/songs/${song.id}`)
            .then((res) => {
              expect(res.status).to.equal(200);
              expect(res.body.name).to.equal('A Summer Song');
              expect(res.body.artistId).to.equal(artist.id);
              expect(res.body.albumId).to.equal(album.id);
              });
              done();
            });
      });
 

      // PATCH tests 
    describe('PATCH /artists/:artistId/albums/:albumId/songs/:songId', () => {
      it('updates song name by song id', (done) => {
        const song = songs[0]
        request(app)
          .patch(`/songs/${song.id}`)
          .send({ name: 'Test Song' })
          .then((res) => {
            expect(res.status).to.equal(200);
            Song.findByPk(song.id).then(updatedSong => {
              expect(updatedSong.name).to.equal('Test Song');
              done();
            });
          });
      });

      it('returns a 404 if the song does not exist (but artist and album exists)', (done) => {
        request(app)
          .patch(`/songs/12345`)
          .send({ name: 'AlbumName' })
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal('The song could not be found.');
            done();
          });
      }); 
    });

      // DELETE tests

      describe('DELETE /artists/:artistId/albums/:albumId/songs/:songId', () => {
        it('deletes song record by id', (done) => {
          const song = songs[0] 
          request(app)
            .delete(`/songs/${song.id}`)
            .then((res) => {
              expect(res.status).to.equal(204);
              Song.findByPk(album.id, { raw: true }).then(updatedSong => {
                expect(updatedSong).to.equal(null);
                done();
              });
            });
        });
  
        it('returns a 404 if the song does not exist', (done) => {
          request(app)
            .delete(`/songs/12345`)
            .then((res) => {
              expect(res.status).to.equal(404);
              expect(res.body.error).to.equal('The song could not be found.');
              done();
            });
        });
      });

  });
});

// const { expect } = require("chai");
// const request = require("supertest");
// const app = require("../src/app");
// const { Artist, Album, Song } = require("../src/models");
// const song = require("../src/models/song");

// describe("/songs", () => {
//   let artists = [];
//   let albums = [];
//   let songs;

//   before(async () => {
//     try {
//       await Artist.sequelize.sync();
//       await Album.sequelize.sync();
//       await Song.sequelize.sync();
//     } catch (err) {
//       console.log(err, "Line 18");
//     }
//   });

//   beforeEach(async () => {
//     try {
//       await Artist.destroy({ where: {} });
//       await Album.destroy({ where: {} });
//       await Song.destroy({ where: {} });
//       const artist1 = await Artist.create({
//         name: "Tame Impala",
//         genre: "Rock",
//       });
//       artists.push(artist1);
//       const artist2 = await Artist.create({
//         name: "Blah",
//         genre: "Tango",
//       });
//       artists.push(artist2);
//       const artist3 = await Artist.create({
//         name: "Alice Smith",
//         genre: "Jazz",
//       });
//       artists.push(artist3);
//       const album1 = await Album.create({
//         name: "InnerSpeaker",
//         year: 2010,
//         artistId: artists[0].id,
//       });
//       albums.push(album1);
//       const album2 = await Album.create({
//         name: "The Flying Monkeys",
//         year: 1993,
//         artistId: artists[1].id,
//       });
//       albums.push(album2);
//       const album3 = await Album.create({
//         name: "What Is Even Happening?",
//         year: 2016,
//         artistId: artists[2].id,
//       });
//       albums.push(album3);
//       songs = await Promise.all([
//         Song.create({ artist: artists[0].id, album: albums[0].id, name: "Le Best Song in the World" }),
//         Song.create({ artist: artists[1].id, album: albums[1].id, name: "Feathers Float Down" }),
//         Song.create({ artist: artists[2].id, album: albums[2].id, name: "The Pinstripe Cushion" }),
//       ])
//     } catch (err) {
//       console.log(err, "Line 66");
//     }
//   });

//   describe("POST /albums/:albumId/songs", () => {
//     it("creates a new song under an album", (done) => {
//         request(app)
//         .post(`/albums/${albums[0].id}/songs`)
//         .send({
//           artist: artists[0].id,
//           name: "Solitude Is Bliss",
//         })
//         .then((res) => {
//           expect(res.status).to.equal(201);
//           const songId = res.body.id;
//           expect(res.body.id).to.equal(songId);
//           expect(res.body.name).to.equal("Solitude Is Bliss");
//           expect(res.body.album).to.equal(`${albums[0].id}`);
//           expect(res.body.artist).to.equal(artists[0].id);
//           done();
//         })
//         .catch((error) => done(error));
//     });

//     it("returns a 404 and does not create a song if the artist does not exist", (done) => {
//       request(app)
//         .post("/albums/1234/songs")
//         .send({
//           artist: 1234,
//           name: "Solitude is Bliss",
//         })
//         .then((res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body.error).to.equal("The artist could not be found.");

//           Song.findAll()
//             .then((songs) => {
//               expect(songs.length).to.equal(0);
//               done();
//             })
//             .catch((error) => done(error));
//         });
//     });

//     it("returns a 404 and does not create a song if the album does not exist", (done) => {
//       request(app)
//         .post("/albums/1234/songs")
//         .send({
//           artist: artists[0].id,
//           name: "Solitude is Bliss",
//         })
//         .then((res) => {
//           expect(res.status).to.equal(404);
//           expect(res.body.error).to.equal("The album could not be found.");

//           Song.findAll()
//             .then((songs) => {
//               expect(songs.length).to.equal(0);
//               done();
//             })
//             .catch((error) => done(error));
//         });
//     });
//   });

//   describe.only("with songs in the database", () => {


//     describe("GET /songs", () => {
//       it("gets all songs and their albums", (done) => {
//         request(app)
//           .get("/songs")
//           .then((res) => {
//             expect(res.status).to.equal(200);
//             expect(res.body.length).to.equal(3);
//             res.body.forEach((song) => {
//               const expected = songs.find((a) => a.id === song.id);
//               expect(song.artist).to.equal(expected.artist);
//               expect(song.name).to.equal(expected.name);
//             });
//             done();
//           })
//           .catch((error) => done(error));
//       });
//     });

//     describe.only("GET /songs/:songId", () => {
//       it("gets song record by id", (done) => {
//         const song = songs[0];
//         request(app)
//           .get(`/songs/${song.id}`)
//           .then((res) => {
//             expect(res.status).to.equal(200);
//             expect(res.body.artist).to.equal(song.artist);
//             expect(res.body.name).to.equal(song.name);
//             done();
//           })
//         //   .catch((error) => done(error));
//       });
//       it("returns a 404 if the song does not exist", (done) => {
//         request(app)
//           .get("/songs/12345")
//           .then((res) => {
//             expect(res.status).to.equal(404);
//             expect(res.body.error).to.equal("The song could not be found.");
//             done();
//           })
//         //   .catch((error) => done(error));
//       });
//     });

//     describe("PATCH /songs/:id", () => {
//       it("updates song artist by id", (done) => {
//         const song = songs[0];
//         request(app)
//           .patch(`/songs/${song.id}`)
//           .send({ artist: artists[0].id })
//           .then((res) => {
//             expect(res.status).to.equal(200);
//             Song.findByPk(song.id, { raw: true })
//               .then((updatedSong) => {
//                 expect(updatedSong.artist).to.equal(1);
//                 done();
//               })
//               .catch((error) => done(error));
//           });
//       });
//       it("updates song name by id", (done) => {
//         const song = songs[0];
//         request(app)
//           .patch(`/songs/${song.id}`)
//           .send({ name: "Forsooth I be a Song!" })
//           .then((res) => {
//             expect(res.status).to.equal(200);
//             Song.findByPk(song.id, { raw: true })
//               .then((updatedSong) => {
//                 expect(updatedSong.name).to.equal("Forsooth I be a Song!");
//                 done();
//               })
//               .catch((error) => done(error));
//           });
//       });
//       it("returns a 404 if the song does not exist", (done) => {
//         request(app)
//           .get("/songs/12345")
//           .then((res) => {
//             expect(res.status).to.equal(404);
//             expect(res.body.error).to.equal("The song could not be found.");
//             done();
//           })
//           .catch((error) => done(error));
//       });
//     });

//     describe("DELETE /songs/:songId", () => {
//       it("deletes song record by id", (done) => {
//         const song = songs[0];
//         request(app)
//           .delete(`/songs/${song.id}`)
//           .then((res) => {
//             expect(res.status).to.equal(204);
//             Song.findByPk(song.id, { raw: true })
//               .then((updatedSong) => {
//                 expect(updatedSong).to.equal(null);
//                 done();
//               })
//               .catch((error) => done(error));
//           });
//       });
//       it("returns a 404 if the song does not exist", (done) => {
//         request(app)
//           .get("/songs/12345")
//           .then((res) => {
//             expect(res.status).to.equal(404);
//             expect(res.body.error).to.equal("The song could not be found.");
//             done();
//           })
//           .catch((error) => done(error));
//       });
//     });
//   });
// });
