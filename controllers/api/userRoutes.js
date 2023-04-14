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
    console.log(req.body.imdb);
    const movieData = await Movie.create({
      user_id: 1, //get the current user_id, but use 1 for now
      imdb: req.body.imdb,
      title: req.body.title,
      year: req.body.year,
      rating: req.body.rating,
      released: req.body.released,
      genre: req.body.genre,
      writer: req.body.writer,
      actors: req.body.actors,
      plot: req.body.plot,
      language: req.body.language,
      awards: req.body.awards
    });
      // name , email, password
      // email: req.body.email,
      // password: req.body.password,
    

  //   req.session.save(() => {
  //     req.session.user_id = userData.id;
  //     req.session.name = userData.name;
  //     req.session.email = userData.email;
  //     req.session.logged_in = true;

  //     res.status(200).json(userData);
  //   });
  // } catch (err) {
  //   res.status(500).json(err);
      res.json("okay");
  } catch (error) { console.error(error); res.status(500).json(err);}
});


router.post('/show', async (req, res) => {
  console.log("MOVIE HISTORY TEST-----------------------------");
  const movies = await Movie.findAll({
      order: ['title'],
      where: {
          user_id: 1
      },
  });
  console.dir(movies);
  res.status(202).json(movies);
});