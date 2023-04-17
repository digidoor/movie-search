const router = require('express').Router();
const { User, Movie } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create({
      // name , email, password
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.email = userData.email;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(401)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Create session variable based on loggin in user
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.name = userData.name;
      req.session.email = userData.email;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(402).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) { //Remove the session variables
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

router.post('/save', async (req, res) => {
  try {
    console.log("router.post /save entered");
    console.log(req.body.Title);
    const movieData = await Movie.create({
      user_id: req.session.user_id, //get the current user_id
      imdb: req.body.imdbID,
      title: req.body.Title,
      year: req.body.Year,
      rating: req.body.imdbRating,
      released: req.body.Released,
      genre: req.body.Genre,
      writer: req.body.Writer,
      actors: req.body.Actors,
      plot: req.body.Plot,
      language: req.body.Language,
      awards: req.body.Awards
    });
    res.json("saved a movie");
  } catch (error) { console.error(error); res.status(500).json(error);}
});


router.post('/show', async (req, res) => {
  console.log("MOVIE HISTORY TEST-----------------------------");
  const movies = await Movie.findAll({
      order: ['title'],
      where: {
          user_id: req.session.user_id
      },
  });
  console.dir(movies);
  res.status(202).json(movies);
});

// router.get('/game', (req, res) =>
// {
//   console.log("GAME TEST SERVER SIDE");
//   res.render('index'); // .handlebars
// });