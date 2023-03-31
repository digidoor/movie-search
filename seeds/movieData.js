const { Movie } = require('../models');

const moviedata = [
  {
      id:    "1",
      imdb:   "tt0083658",
      title:  "Blade Runner",
      type:   "Action, Drama, Sci-Fi",
      year:   "1982",
      rating: "R",
      filename:   "bladerunner",
      description: " this is a good movie",
  },
{     
      id:   "2",
      imdb:   "tt0091369",
      title:  "Labyrinth",
      type:   "Adventure, Family, Fantasy",
      year:   "1986",
      rating: "PG",
      filename: "labyrinth",
      description: "A David Bowie classic",
},
{
      id:      "3",
      imdb:   "tt0113118",
      title:  "Friday",
      type:   "Comedy, Drama",
      year:   "1995",
      rating: "RRR",
      filename:   "friday",
      description: "LMAO",
},
];

const seedMovie = () => Movie.bulkCreate(moviedata);

module.exports = seedMovie;
