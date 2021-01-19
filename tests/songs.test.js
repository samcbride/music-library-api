const { expect } = require("chai");
const request = require("supertest");
const app = require("../src/app");
const { Artist, Album, Song } = require("../src/models");

describe("/songs", () => {
  let artist;
  let secondArtist;
  let album;
  let secondAlbum;

  before(async () => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
      await Song.sequelize.sync();
    } catch (err) {}
  });

  beforeEach(async () => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      await Song.destroy({ where: {} });
      artist = await Artist.create({
        name: "Tame Impala",
        genre: "Rock",
      });
      secondArtist = await Artist.create({
        name: "Taylor Swift",
        genre: "Pop",
      });
      album = await Album.create({
        name: "InnerSpeaker",
        year: 2010,
        artistId: artist.id,
      });
      secondAlbum = await Album.create({
        name: "Le Best Album Ever",
        year: 2007,
        artistId: artist.id,
      });
    } catch (err) {}
  });

  describe("POST /albums/:albumId/songs", () => {
    it("creates a new song under an album", (done) => {
      request(app)
        .post(`/albums/${album.id}/songs`)
        .send({
          artist: artist.id,
          name: "Solitude Is Bliss",
        })
        .then((res) => {
          expect(res.status).to.equal(201);
          const songId = res.body.id;
          expect(res.body.id).to.equal(songId);
          expect(res.body.name).to.equal("Solitude Is Bliss");
          expect(res.body.albumId).to.equal(`${album.id}`);
          expect(res.body.artistId).to.equal(artist.id);
          done();
        })
        .catch((error) => done(error));
    });

    it("returns a 404 and does not create a song if the artist does not exist", (done) => {
      request(app)
        .post("/albums/1234/songs")
        .send({
          artist: 1234,
          name: "Solitude is Bliss",
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The artist could not be found.");

          Song.findAll()
            .then((songs) => {
              expect(songs.length).to.equal(0);
              done();
            })
            .catch((error) => done(error));
        });
    });

    it("returns a 404 and does not create a song if the album does not exist", (done) => {
      request(app)
        .post("/albums/1234/songs")
        .send({
          artist: artist.id,
          name: "Solitude is Bliss",
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal("The album could not be found.");

          Song.findAll()
            .then((songs) => {
              expect(songs.length).to.equal(0);
              done();
            })
            .catch((error) => done(error));
        });
    });
  });

  describe("with songs in the database", () => {
    let songs;
    beforeEach((done) => {
      Promise.all([
        Song.create({
          artistId: artist.id,
          albumId: album.id,
          name: "Le Best Song in the World",
        }),
        Song.create({
          artistId: artist.id,
          albumId: album.id,
          name: "Feathers Float Down",
        }),
        Song.create({
          artistId: artist.id,
          albumId: album.id,
          name: "The Pinstripe Cushion",
        }),
      ]).then((documents) => {
        songs = documents;
        done();
      });
    });

    describe("GET /songs", () => {
      it("gets all songs and their albums", (done) => {
        request(app)
          .get("/songs")
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.length).to.equal(3);
            res.body.forEach((song) => {
              const expected = songs.find((a) => a.id === song.id);
              expect(song.artist).to.equal(expected.artist);
              expect(song.name).to.equal(expected.name);
            });
            done();
          })
          .catch((error) => done(error));
      });
    });

    describe("GET /songs/:songId", () => {
      it("gets song record by id", (done) => {
        const song = songs[0];
        request(app)
          .get(`/songs/${song.id}`)
          .then((res) => {
            expect(res.status).to.equal(200);
            expect(res.body.artist).to.equal(song.artist);
            expect(res.body.name).to.equal(song.name);
            done();
          })
          .catch((error) => done(error));
      });
      it("returns a 404 if the song does not exist", (done) => {
        request(app)
          .get("/songs/12345")
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal("The song could not be found.");
            done();
          })
          .catch((error) => done(error));
      });
    });

    describe("PATCH /songs/:id", () => {
      it("updates song artist by id", (done) => {
        const song = songs[0];
        request(app)
          .patch(`/songs/${song.id}`)
          .send({ artistId: secondArtist.id })
          .then((res) => {
            expect(res.status).to.equal(200);
            Song.findByPk(song.id, { raw: true })
              .then((updatedSong) => {
                expect(updatedSong.artistId).to.equal(secondArtist.id);
                done();
              })
              .catch((error) => done(error));
          });
      });
      it("updates song album by id", (done) => {
        const song = songs[0];
        request(app)
          .patch(`/songs/${song.id}`)
          .send({ albumId: secondAlbum.id })
          .then((res) => {
            expect(res.status).to.equal(200);
            Song.findByPk(song.id, { raw: true })
              .then((updatedSong) => {
                expect(updatedSong.albumId).to.equal(secondAlbum.id);
                done();
              })
              .catch((error) => done(error));
          });
      });
      it("updates song name by id", (done) => {
        const song = songs[0];
        request(app)
          .patch(`/songs/${song.id}`)
          .send({ name: "Forsooth I be a Song!" })
          .then((res) => {
            expect(res.status).to.equal(200);
            Song.findByPk(song.id, { raw: true })
              .then((updatedSong) => {
                expect(updatedSong.name).to.equal("Forsooth I be a Song!");
                done();
              })
              .catch((error) => done(error));
          });
      });
      it("returns a 404 if the song does not exist", (done) => {
        request(app)
          .get("/songs/12345")
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal("The song could not be found.");
            done();
          })
          .catch((error) => done(error));
      });
    });

    describe("DELETE /songs/:songId", () => {
      it("deletes song record by id", (done) => {
        const song = songs[0];
        request(app)
          .delete(`/songs/${song.id}`)
          .then((res) => {
            expect(res.status).to.equal(204);
            Song.findByPk(song.id, { raw: true })
              .then((updatedSong) => {
                expect(updatedSong).to.equal(null);
                done();
              })
              .catch((error) => done(error));
          });
      });
      it("returns a 404 if the song does not exist", (done) => {
        request(app)
          .get("/songs/12345")
          .then((res) => {
            expect(res.status).to.equal(404);
            expect(res.body.error).to.equal("The song could not be found.");
            done();
          })
          .catch((error) => done(error));
      });
    });
  });
});
