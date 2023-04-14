
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const saveBtn = document.getElementById('saveBtn')

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=6fb32665`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=6fb32665`);
            const movieDetails = await result.json();
            // console.log(movieDetails);
            displayMovieDetails(movieDetails);
            saveBtn.style.display = "block"

        });
    });
}

function displayMovieDetails(details){
    console.log(details)
    resultGrid.innerHTML = `
        <div class = "movie-poster">
            <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
        </div>
        <div class = "movie-info">
            <h3 class = "movie-title">${details.Title}</h3>
            <ul class = "movie-misc-info">
                <li class = "year">Year: ${details.Year}</li>
                <li class = "rated">Ratings: ${details.imdbRating}</li>
                <li class = "released">Released: ${details.Released}</li>
            </ul>
            <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
            <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
            <p class = "actors"><b>Actors: </b>${details.Actors}</p>
            <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
            <p class = "language"><b>Language:</b> ${details.Language}</p>
            <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
        </div>`;
     var movieTitle = details.Title;
     localStorage.setItem("movieTitle", details.Title);
     var year = details.Year;
     localStorage.setItem("Year", details.Year);
     var rating = details.imdbRating;
     localStorage.setItem("Rating", details.imdbRating);
     var released = details.Released;
     localStorage.setItem("Released", details.Released);
     var genre = details.Genre;
     localStorage.setItem("Genre", details.Genre);
     var writer = details.Writer;
     localStorage.setItem("Writer", details.Writer);
     var actors = details.Actors;
     localStorage.setItem("Actors", details.Actors);
     var plot = details.Plot;
     localStorage.setItem("Plot", details.Plot);
     var language = details.Language;
     localStorage.setItem("Language", details.Language);
     var awards = details.Awards;
     localStorage.setItem("Awards", details.Awards);
    var imdb = details.imdbID;
    localStorage.setItem("imdb", details.imdbID);
    
     let movie = {
        imdb,
        title: movieTitle,
        year,
        rating,
        released,
        genre,
        writer,
        actors,
        plot,
        language,
        awards
     };

    async function saveMovie(event)
    {
        //grabbus;
        console.log(movie.imdb);
        console.log(imdb);
        const response = await fetch('/api/users/save', {
            method: 'POST',
            body: JSON.stringify({ ...movie }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok)
            console.log("saved: ", "test stuff-----------------");

        //savus;
    }

    //add event listener to save button
    saveBtn.addEventListener('click', saveMovie);
 
}

async function showHistory()
{
    const response = await fetch('/api/users/show', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok)
        console.log("showHistory: ", "test stuff-----------------");
    data = await response.json();
    console.log(data);
    //console.log(response.data);
}
document
    .querySelector("#movieHistory")
    .addEventListener('click', showHistory);


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});
