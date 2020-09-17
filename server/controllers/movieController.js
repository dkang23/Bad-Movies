const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
var { saveMov, deleteMov } = require('../../db/mongodb/index.js');
//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    apiHelpers.getSearch(req.body.search);
    // get the search genre
    // https://www.themoviedb.org/account/signup
    // get your API KEY
    // use this endpoint to search for movies by genres, you will need an API key
    // https://api.themoviedb.org/3/discover/movie
    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    apiHelpers.getGenres();
    // make an axios request to get the list of official genres
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    // send back
  },
  saveMovie: (req, res) => {
    req.body.movie;
  },
  deleteMovie: (req, res) => {
    req.body.movie;
  },
};
