const router = require('express').Router();
const { User, Movie } = require('../models');
const withAuth = require('../utils/auth');

// Prevent non logged in users from viewing the homepage
router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    // const user = (await User.findOne({
    //   attributes: { exclude: ['password'] },
    //   where: {
    //     id: req.session.user_id
    //   }
    // })).get({ plain: true });
    
    //! ! Try to fix this stuff later !!!
    const userCheck = await User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        email: req.session.email
      }
    })
    if( userCheck === null )
    {
      req.session.destroy( () => {
      return console.log("you borked something. refresh and try again, or delete your cookies for this page and try again.");});
    }
    const user = await userCheck.get({ plain: true });
    //*/

    console.log("passing in this user:", user);

    const users = userData.map((user) => user.get({ plain: true }));

    console.log(users);

    res.render('homepage', { //.handlebars but you don't need to put that
      user,
      // Pass the logged in flag to the template
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If a session exists, redirect the request to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login'); //.handlebars
});


router.get('/movie/:id', withAuth, async (req, res) => {
  try {
    const dbMovieData = await Movie.findByPk(req.params.id, {
      // include: [
      //   {
      //     model: Movie,
      //     attributes: [
      //       'id',
      //       'imdb',
      //       'title',
      //       'year',
      //       'rating',
      //       'released',
      //       'genre',
      //       'writer',
      //       'actors',
      //       'plot',
      //       'language',
      //       'awards',
      //       'poster',
      //     ],
      //   },
      // ],
    });

    const movie = dbMovieData.get({ plain: true });
    res.render('movie', { ...movie, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/game', withAuth, async (req, res) => {
  res.render('index');
});

module.exports = router;
