// Sitting the grab filter options
let score;
let genre;
let movieList;
let gameType;

const load = () => {
  genre = getGen();
  gameType = getGame();
  score = 0;
  movieList = JSON.parse(localStorage.getItem(`${genre}`)) || [];

  if (movieList.length == 0) {
    getMoviesLi(genre);
  } else {
    genToMovies();
  }
};

const getGame = () => {
  let GameType;
  let url = window.location.href;
  let firstRegister = url.indexOf("game=") + 5;
  let lastRegister = url.indexOf("&");

  GameType = url.slice(firstRegister, lastRegister);

  return GameType;
};

const getGen = () => {
  let GenreTemp;
  let url = window.location.href;
  let firstRegister = url.indexOf("genre=") + 6;
  let lastRegister = window.location.href.length;

  GenreTemp = url.slice(firstRegister, lastRegister);

  return GenreTemp;
};

const getMoviesLi = (genre) => {
  let urlImdb;

  if (genre == "all_genres") {
    urlImdb = `https://imdb-api.com/API/AdvancedSearch/k_yev36dk6/?title_type=feature&count=250&groups=top_1000&countries=us&sort=boxoffice_gross_us,desc`;
  } else {
    urlImdb = `https://imdb-api.com/API/AdvancedSearch/k_yev36dk6/?title_type=feature&genres=${genre}&count=250&groups=top_1000&countries=us&sort=boxoffice_gross_us,desc`;
  }

  fetch(urlImdb)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      for (let i = 0; i < data.results.length; i++) {
        movieList.push(data.results[i].title);
      }
      if (genre != null) {
        localStorage.setItem(`${genre}`, JSON.stringify(movieList));
      } else {
        localStorage.setItem(`all`, JSON.stringify(movieList));
      }
      genToMovies();
    });
};

const genToMovies = () => {
  generateMovieObj();
};

const generateMovieObj = () => {
  const movie = {
    name: randomMovie(),
  };

  getData(movie.name)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (gameType == "box_office" && data.BoxOffice != "N/A") {
        movie["movieData"] = data.BoxOffice;
        movie["poster"] = data.Poster;
      } else if (gameType == "rating" && data.imdbRating != "N/A") {
        movie["movieData"] = data.imdbRating;
        movie["poster"] = data.Poster;
      } else {
        generateMovieObj(gameType);
        return;
      }
      //render movie
      loadMovie(movie);
    });
};

const randomMovie = () => {
  let randomIndex = Math.floor(Math.random() * (movieList.length - 1));
  let title = movieList[randomIndex];

  movieList.splice(randomIndex, 1);

  return title;
};

const getData = (title) => {
  title = title.replaceAll(" ", "+");
  let urlApi = `https://www.omdbapi.com/?t=${title}&apikey=50d59eb4`;

  return fetch(urlApi);
};

const loadMovie = (secondMovie) => {
  let movieEl = document.querySelectorAll(".card-movie");
  let questionsEl = document.querySelector("#respond");
  let tempGameType = gameFormat(gameType);

  let firstMovie = JSON.parse(localStorage.getItem("movie-2"));

  localStorage.setItem("movie-1", JSON.stringify(firstMovie));

  if (firstMovie != null) {
    movieEl[0].children[0].textContent = `${tempGameType}: ${firstMovie.movieData}`;
    movieEl[0].children[1].src = firstMovie.poster;
    movieEl[0].children[2].textContent = firstMovie.name;

    questionsEl.innerHTML = `<em>${secondMovie.name}</em> has a higher or lower ${tempGameType} amount than <em>${firstMovie.name}</em>?`;

    if (firstMovie.movieData == secondMovie.movieData) {
      generateMovieObj(gameType);
    }
  }

  localStorage.setItem("movie-2", JSON.stringify(secondMovie));

  movieEl[1].children[0].textContent = `${tempGameType}: ???`;
  movieEl[1].children[1].src = secondMovie.poster;
  movieEl[1].children[2].textContent = secondMovie.name;
};

const compareRespond = (event) => {
  let userRespond = event.target.value;
  let firstMovieData = JSON.parse(localStorage.getItem("movie-1"));
  let secondmovieData = JSON.parse(localStorage.getItem("movie-2"));

  firstMovieData = Number(firstMovieData.movieData.replaceAll(/[$,]/g, ""));
  secondmovieData = Number(secondmovieData.movieData.replaceAll(/[$,]/g, ""));

  if (
    (firstMovieData < secondmovieData && userRespond == "higher") ||
    (firstMovieData > secondmovieData && userRespond == "lower")
  ) {
    score++;
    generateMovieObj();
  } else if (
    (firstMovieData > secondmovieData && userRespond == "higher") ||
    (firstMovieData < secondmovieData && userRespond == "lower")
  ) {
    gameOver();
  } else {
    console.log("failed");
  }
};

const gameFormat = (game) => {
  game = game.replaceAll("_", " ");
  game = game.charAt(0).toUpperCase() + game.slice(1);
  return game;
};

const gameOver = () => {
  let url = window.location.href;
  let index = url.indexOf("/moviepage.html");
  let results = {
    finalScore: score,
    genreUsed: genre,
    gameTypeUsed: gameType,
  };

  localStorage.setItem("results", JSON.stringify(results));

  url = url.slice(0, index) + "/gameover.html";
  window.location.replace(url);
};

//Navigate to the main page.
const mainPage = () => {
  let url = window.location.href;
  let index = url.indexOf("/moviepage.html");

  url = url.slice(0, index) + "/index.html";
  window.location.replace(url);
};

document.getElementById("revers-btn").addEventListener("click", mainPage);
document
  .getElementById("high-low-btn")
  .addEventListener("click", compareRespond);

load();
