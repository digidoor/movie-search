
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
let resultGrid = document.getElementById('result-grid');
const saveBtn = document.getElementById('saveBtn')
const gameBtn = document.getElementById('gameBtn');

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
    localStorage.setItem("movie details", JSON.stringify(details));
}   
    // let movie = {
    //     imdb,
    //     title: movieTitle,
    //     year,
    //     rating,
    //     released,
    //     genre,
    //     writer,
    //     actors,
    //     plot,
    //     language,
    //     awards
    // };
    


async function saveMovie(event)
{
    movie = JSON.parse(localStorage.getItem("movie details"));
    console.log(movie);
    //send a post request to save the current movie to the db
    console.log(movie.Title);
    const response = await fetch('/api/users/save', {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: { 'Content-Type': 'application/json' }
    });
    if(response.ok)
    {
        const data = await response.json();
        console.log(data);
    }
}

async function showHistory()
{
    const response = await fetch('/api/users/show', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }//! 99% this is wrong but works anyway since it's not sending anything
    });
    if(response.ok)
        console.log("showHistory: ", "test stuff-----------------");
    const data = await response.json();
    console.log(data);

    //now to render this jerk
    showHistory4real(data);
}
function showHistory4real(data)
{
    resultGrid.innerHTML = "";
    console.log("in the show history 4 real function");
    for(let i=0;i<data.length;i++)
    {
        console.log(data[i].title);
        console.log(data[i].year);
        console.log(data[i].poster);
        resultGrid.innerHTML += `<div>`;
        resultGrid.innerHTML += `<h2>${data[i].title}`;
        //resultGrid.innerHTML += `<h3>${data[i].year}</h3>`;
        resultGrid.innerHTML += `<img src="${data[i].poster}"; style="object-fit:contain; height:400px; width:200px;">`;
        // resultGrid.innerHTML += ` style="object-fit:contain; height:100px;`;
        // resultGrid.innerHTML += ` width:80px;">`;
        resultGrid.innerHTML += `</h2></div>`;
    } saveBtn.style.display = "none"
    
}

async function playGame()
{
    // const response = await fetch('/api/users/game', {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'text/html' }
    // });
    // if(response.ok)
    //     console.log("game stuff -----------------------");
    // const data = await response.json();
    // console.log(data);
    document.location.replace('/game');
}

document //add event listener to the movie history button
    .querySelector("#movieHistory")
    .addEventListener('click', showHistory);

//add event listener to save button
saveBtn.addEventListener('click', saveMovie);

//add event listener to the BoxOfficeCrash button
gameBtn.addEventListener('click', playGame);

//hide the list of seach results if the user clicks outside of it
window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});
