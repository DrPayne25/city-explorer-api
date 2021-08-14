'use strict';

const axios = require('axios');

class Movie {
  constructor(movie) {
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}

async function getMovies(req, res) {
  let city = req.query.city
  let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`)
  if (movieData.data) {
    let movieArr = movieData.data.results.map(movie => new Movie(movie));
    res.send(movieArr);
  } else {
    res.status(500).send('Some Mistakes have been made');
  }
  
}

module.exports = (getMovies);
