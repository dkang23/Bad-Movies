import React from 'react';

var MovieEntry = (props) => {
  return (
    <li className='movie_item' onClick={() => props.clickHandler(props.movie)}>
      <img src={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`} />
      <div className='movie_description'>
        <h2>{props.movie.original_title}</h2>
        <section className='movie_details'>
          <div className='movie_year'>
            <span className='title'>{props.movie.title}</span>
            <span>{props.movie.release_date}</span>
          </div>
          <div className='movie_rating'>
            <span className='title'>Rating</span>
            <span>{props.movie.vote_average}</span>
          </div>
        </section>
      </div>
    </li>
  );
};

export default MovieEntry;
