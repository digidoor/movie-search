module.exports = {
  get_emoji: () => {
    const randomNum = Math.random();
    let movie = "📗";

    if (randomNum > 0.7) {
      movie = "📘";
    } else if (randomNum > 0.4) {
      movie = "📙";
    }

    return `<span for="img" aria-label="movie">${movie}</span>`;
  },
};
