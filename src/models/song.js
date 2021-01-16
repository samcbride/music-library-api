module.exports = (connection, DataTypes) => {
    const schema = {
      artist: DataTypes.INTEGER,
      album: DataTypes.INTEGER,
      name: DataTypes.STRING
    };
  
    const SongModel = connection.define('Song', schema);
    return SongModel;
  };