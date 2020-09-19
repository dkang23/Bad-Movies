import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      selectedGenre: 28,
    };
  }

  //handle this
  searchHandler() {
    this.props.searchMovies(this.state.selectedGenre);
  }

  changeHandler(e) {
    this.setState({ selectedGenre: e.target.value });
  }

  render() {
    return (
      <div className='search'>
        <button onClick={this.props.swapFavorites}>
          {this.props.showFaves ? 'Show Results' : 'Show Favorites'}
        </button>
        <br />
        <br />

        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select id='genre' onChange={this.changeHandler.bind(this)}>
          {this.props.genres.map((genre) => {
            return <option value={genre.id}>{genre.name}</option>;
          })}
        </select>
        <br />
        <br />

        <button onClick={this.searchHandler.bind(this)}>Search </button>
      </div>
    );
  }
}

export default Search;
