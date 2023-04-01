const results = JSON.parse(localStorage.getItem("results"));

const load = () => {
  const scoreCards = document.querySelectorAll(".outCome");

  results.genreUsed = results.genreUsed.replace("_", " ");
  results.genreUsed =
    results.genreUsed.charAt(0).toUpperCase() + results.genreUsed.slice(1);

  results.gameTypeUsed = results.gameTypeUsed.replace("_", " ");
  results.gameTypeUsed =
    results.gameTypeUsed.charAt(0).toUpperCase() +
    results.gameTypeUsed.slice(1);

  scoreCards[0].textContent = results.finalScore;
  scoreCards[1].textContent = results.gameTypeUsed;
  scoreCards[2].textContent = results.genreUsed;
};

const saveData = (e) => {
  let inputData = document.querySelector(".ui.input");
  let scorList = JSON.parse(localStorage.getItem("scoreboard")) || [];

  inputData.classList.add("disabled");
  inputData.children[1].classList.add("disabled");
  results["userName"] = e.target.previousElementSibling.value;
  scorList.push(results);

  localStorage.setItem("scoreboard", JSON.stringify(scorList));
};

const mainPage = () => {
  let urlEl = window.location.href;
  let indexEl = urlEl.indexOf("/gameover.html");

  urlEl = urlEl.slice(0, indexEl) + "/index.html";
  window.location.replace(urlEl);
};

const scoreboard = () => {
  let urlEl = window.location.href;
  let indexEl = urlEl.indexOf("/gameover.html");

  urlEl = urlEl.slice(0, indexEl) + "/scorecard.html";
  window.location.replace(urlEl);
};

document.getElementById("return-btn").addEventListener("click", mainPage);
document.getElementById("scoreTable-btn").addEventListener("click", scoreboard);
document.querySelector(".input button").addEventListener("click", saveData);

load();
