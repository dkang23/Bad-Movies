import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      favorites: [],
      genres: [],
      showFaves: false,
    };

    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    axios
      .get('/movies/genres')
      .then((genres) => {
        this.setState({ genres: genres.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getMovies(genre) {
    axios
      .get('/movies/search', {
        params: {
          genre: genre,
        },
      })
      .then((movies) => {
        this.setState({ movies: movies.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  setFavoritesFromDB() {
    axios
      .get('/movies/favorites')
      .then((movies) => {
        this.setState({ favorites: movies.data });
      })
      .catch((err) => console.log(err));
  }

  saveMovie(movie) {
    axios
      .post('/movies/save', { movie })
      .then(() => console.log('saved favorite'))
      .catch((err) => console.error(err));
  }

  deleteMovie(movie) {
    axios
      .delete('/movies/delete', { data: { movie } })
      .then(() => {
        this.setFavoritesFromDB();
        console.log('deleted favorite');
      })
      .catch((err) => console.error(err));
  }

  clickHandler(movie) {
    !this.state.showFaves ? this.saveMovie(movie) : this.deleteMovie(movie);
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves,
    });
    this.setFavoritesFromDB();
  }

  render() {
    return (
      <div className='app'>
        <header className='navbar'>
          <h1>Bad Movies</h1>
        </header>

        <div className='main'>
          <Search
            genres={this.state.genres}
            searchMovies={this.getMovies.bind(this)}
            swapFavorites={this.swapFavorites.bind(this)}
            showFaves={this.state.showFaves}
          />
          <Movies
            clickHandler={this.clickHandler.bind(this)}
            movies={
              this.state.showFaves ? this.state.favorites : this.state.movies
            }
            showFaves={this.state.showFaves}
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
