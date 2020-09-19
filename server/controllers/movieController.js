const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
var { saveMov, deleteMov, getMovs } = require('../../db/mongodb/index.js');
//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    apiHelpers
      .getMoviesByGenre(req.query.genre)
      .then((data) => {
        res.status(200).send(data.data.results);
      })
      .catch((err) => {
        console.error(err);
      });

    // get the search genre
    // https://www.themoviedb.org/account/signup
    // get your API KEY
    // use this endpoint to search for movies by genres, you will need an API key
    // https://api.themoviedb.org/3/discover/movie
    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    apiHelpers
      .getGenres()
      .then((data) => {
        res.status(200).send(data.data.genres);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
    // make an axios request to get the list of official genres
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    // send back
  },

  getMovies: (req, res) => {
    getMovs()
      .then((movies) => {
        res.status(200).send(movies);
      })
      .catch((err) => console.log(err));
  },

  saveMovie: (req, res) => {
    saveMov(req.body.movie);
    res.sendStatus(201);
  },

  deleteMovie: (req, res) => {
    var deletedMov = req.body.movie;
    deleteMov(req.body.movie);
    res.sendStatus(201);
  },
};
