const User = require('./User');
const Movie = require('./Movie');

module.exports = { User, Movie };

User.hasMany(Movie, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});