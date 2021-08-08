'use strict';
//---
//basically this is your import in react
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(cors());
//use dotenv to access .env file -- must be done before defining PORT
require('dotenv').config();
const PORT = process.env.PORT;





//-----------------------------Weather-------------------------------//
class Forecast {
  constructor(day) {
    this.description = `Forecast for ${day.datetime}: Low: ${day.low_temp}, High: ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;
  }
}

app.get('/weather', async (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=3`);
    if(weatherData.data) {
      let weatherArr = weatherData.data.data.map((weatherInfo) => new Forecast(weatherInfo));
      res.send(weatherArr);
    } else {
      res.status(400).send('Some Mistakes have been made');
    }
  }
);

//------------------------------MOVIE---------------------------------//
class Movie {
    constructor(movie) {
        this.title =  movie.title;
        this.overview = movie.overview;
        this.average_votes = movie.vote_average;
        this.total_votes = movie.vote_count;
        this.image_url = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`;
        this.popularity = movie.popularity;
        this.released_on = movie.release_date;
      }
    }
app.get('/movies', async (req, res) => {
  let city = req.query.city
  let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`)
  if (movieData.data) {
    let movieArr = movieData.data.results.map(movie => new Movie(movie));
    console.log(movieArr);
    res.send(movieArr);
  } else {
    res.status(500).send('Some Mistakes have been made');
  }
  
}
);

app.listen(PORT, () => console.log(`Yo ${PORT} is up`));



