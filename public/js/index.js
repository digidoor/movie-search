const load = () => {
  const gameButton = document.querySelectorAll(".game-btn");
  const scoreBtn = document.getElementById("score-btn");

  scoreBtn.addEventListener("click", navScore);

  for (let i = 0; i < gameButton.length; i++) {
    gameButton[i].addEventListener("click", navGame);
  }

  $(".ui.dropdown").dropdown();
};

const navGame = (e) => {
  let url = window.location.href;
  let gameType = e.target.value;
  let index = url.indexOf("/index.html");
  let gameID = e.target.parentElement.id;
  let genre = $(`#${gameID} .selection`).dropdown("get value");

  url = url.slice(0, index) + `/moviepage.html?game=${gameType}&genre=${genre}`;
  window.location.replace(url);
};

const navScore = (e) => {
  let url = window.location.href;
  let index = url.indexOf("/index.html");

  url = url.slice(0, index) + "/scorecard.html";
  window.location.replace(url);
};

load();
