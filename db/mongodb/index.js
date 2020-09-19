const mongoose = require('mongoose');
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect('mongodb://localhost:27017/badmovies', {
    useNewUrlParser: true,
  });
}

const db = mongoose.connection;

mongoose.Promise = Promise;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to db...');
});

var favoriteMoviesSchema = mongoose.Schema({
  original_title: String,
  title: String,
  release_date: String,
  poster_path: String,
  vote_average: String,
});

var favoriteMovies = mongoose.model('favoriteMovies', favoriteMoviesSchema);

var getMoviesFromDB = () => {
  return favoriteMovies.find();
};

var saveMovie = (movie) => {
  console.log('inside saveMovie');
  console.log(movie);
  favoriteMovies
    .findOneAndUpdate(
      { original_title: movie.original_title },
      {
        original_title: movie.original_title,
        title: movie.title,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      },
      { upsert: true }
    )
    .exec();
};

var deleteMovie = (movie) => {
  favoriteMovies
    .findOneAndDelete({ original_title: movie.original_title })
    .exec();
};

module.exports.getMovs = getMoviesFromDB;
module.exports.saveMov = saveMovie;
module.exports.deleteMov = deleteMovie;
