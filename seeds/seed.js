const sequelize = require('../config/connection');
const { User } = require('../models');
const seedMovie = require('./movieData');

const userData = require('./userData.json');
<<<<<<< HEAD
console.log(userData);
=======
console.log(userData)
>>>>>>> 332cd222c98166c8b1748d626fd28b32b37503f1
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await seedMovie();

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
