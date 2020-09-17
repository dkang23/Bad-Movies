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
  }

  componentDidMount() {
    this.getGenres();
  }

  getGenres() {
    axios
      .get('/movies/genres')
      .then((genres) => {
        console.log('IIN INDEX>JSC:', genres);
        this.setState({ genres: genres.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getMovies(genre) {
    axios
      .get('/search', { genre })
      .then((movies) => {
        this.setState({ movies });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  saveMovie(movie) {
    // axios.post('/save')
  }

  deleteMovie(movie) {
    // axios.delete('./delete')
  }

  swapFavorites() {
    //dont touch
    this.setState({
      showFaves: !this.state.showFaves,
    });
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
            swapFavorites={this.swapFavorites}
            showFaves={this.state.showFaves}
          />
          <Movies
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
