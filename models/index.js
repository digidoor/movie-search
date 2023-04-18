const User = require('./User');
const Movie = require('./Movie');
const Game = require('./Game');

module.exports = { User, Movie, Game };

User.hasMany(Movie, Game, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});