const sequelize = require('../config/connection');
const { User } = require('../models');
const seedMovie = require('./movieData');

const userData = require('./userData.json');
console.log(userData);
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedMovie();// nix this once we can create via omdb fetch data

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
