const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

var getGenres = () => {
  return axios
    .get(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=d5e13c79fcf278273ea5dae2483a1382&language=en-US'
    )
    .then((data) => data)
    .catch((err) => console.error(err));
};

var getMoviesByGenre = (genre) => {
  return axios
    .get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}`
    )
    .then((data) => data)
    .catch((err) => console.error(err));
};
// write out logic/functions required to query TheMovieDB.org

// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file

// Don't forget to export your functions and require them within your server file
