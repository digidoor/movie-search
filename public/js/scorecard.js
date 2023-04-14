let tableEl = document.querySelector("#Game-table tbody");
let ratingTable = document.querySelector("#ratings-td tbody");
let scoreboard = JSON.parse(localStorage.getItem("scoreboard")) || [];

const load = () => {
  for (var i = 0; i < scoreboard.length; i++) {
    displayOnBoard(scoreboard[i]);
  }
};

const displayOnBoard = (score) => {
  const tableElement = document.createElement("tr");
  const nameElement = document.createElement("td");
  const scoreElement = document.createElement("td");
  const filtersElement = document.createElement("td");

  nameElement.textContent = score.userName;
  scoreElement.textContent = score.finalScore;
  filtersElement.textContent = score.genreUsed;

  tableElement.appendChild(nameElement);
  tableElement.appendChild(scoreElement);
  tableElement.appendChild(filtersElement);

  if (score.gameTypeUsed == "Box office") {
    tableEl.appendChild(tableElement);
  } else if (score.gameTypeUsed == "Rating") {
    ratingTable.appendChild(tableElement);
  } else {
    console.log("failed");
  }
};

const mainPage = (event) => {
  let url = window.location.href;
  let index = url.indexOf("/scorecard.html");

  url = url.slice(0, index) + "/index.html";
  window.location.replace(url);
};

document.getElementById("return-btn").addEventListener("click", mainPage);

load();
