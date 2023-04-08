const { Movie } = require('../models');

const moviedata = [
  {
      id:         "1",
      imdb:       "tt0083658",
      title:      "Blade Runner",
      year:       "1982",
      rating:     "R",
      released:   "1982",
      genre:      "Action, Drama, Sci-Fi",
      writer:     "Indiana Jones",
      actors:     "H Ford",
      plot:       "this is a good movie",
      language:   "English",
      awards:     "three cheers",
      poster:     "action.png",
  },
{     
      id:         "2",
      imdb:       "tt0091369",
      title:      "Labyrinth",
      year:       "1986",
      rating:     "PG",
      released:   "1986",
      genre:      "Adventure, Family, Fantasy",
      writer:     "David Bowie",
      actors:     "David Bowie, Baddie, Baby, Smeegul",
      plot:       "A David Bowie classic",
      language:   "english",
      awards:     "lots",
      poster:     "spooky.png",
},
{
      id:         "3",
      imdb:       "tt0113118",
      title:      "Friday",
      year:       "1995",
      rating:     "RRR",
      released:   "1995",
      genre:      "Comedy, Drama",
      writer:     "not eze E",
      actors:     "Ice Cream, Smokey, DeBo",
      plot:       "LMAO",
      language:   "english",
      awards:     "no mam",
      poster:     "elevated.png",
},
];

const seedMovie = () => Movie.bulkCreate(moviedata);

module.exports = seedMovie;
