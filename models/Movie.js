const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    imdb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    released: {
      type: DataTypes.STRING,
      allowNull: false,
    },
//^^^new
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
//^^^change type ->    
    writer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
//
    actors: {
      type: DataTypes.STRING,
      allowNull: false,
    },
//
    plot: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 //   
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
//
    awards: {
      type: DataTypes.STRING,
      allowNull: false,
    },
//
    poster: {
      type: DataTypes.STRING, //base64 to actually save the image in the db instead of the url
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'movie',
  }
);

module.exports = Movie;
