const { Movie } = require('../models');

const moviedata = [
  {
      imdb:   "tt0083658",
      title:  "Blade Runner",
      type:   "Action, Drama, Sci-Fi",
      year:   "1982",
      rating: "R",
  }
{
      imdb:   "tt0091369",
      title:  "Labyrinth",
      type:   "Adventure, Family, Fantasy",
      year:   "1986",
      rating: "PG",
}
{
      imdb:   "tt0113118",
      title:  "Friday",
      type:   "Comedy, Drama",
      year:   "1995",
      rating: " ",
}
];

const seedMovie = () => Movie.bulkCreate(moviedata);

module.exports = seedMovie;
