module.exports = (connection, DataTypes) => {
    const schema = {
      name: DataTypes.STRING
    };
  
    const SongModel = connection.define('Song', schema);
    return SongModel;
  };