import React from 'react';
import { Button } from '@material-ui/core';

const Movie = (props) => {
    const { movie, handleNominationClick } = props;
    return(
        <div className='movie-div'>
            <div className='movie-info-div'>
                <div className='left-movie-info'>
                    <h2>Title: {movie.Title}</h2>
                    <h2>Year: {movie.Year}</h2>
                    <span><h2>Actors: </h2><h3>{movie.Actors}</h3></span>
                    <h2>Rated: {movie.Rated}</h2>
                </div>
                <div className='movie-poster'>
                    <img src={movie.Poster} alt={movie.Title} />
                </div>
                <div className='right-movie-info'>
                    <h2>Description:</h2>
                    <h3>{movie.Plot}</h3>
                </div>
            </div>
            {props.handleNominationClick ? (
                <Button
                    variant='contained'
                    color='primary'
                    onClick={handleNominationClick}
                >
                    Nominate Movie
                </Button>
            ): null }
            
        </div>
    )
}


export default Movie;