'use strict';

//basically this is your import in react
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
app.use(cors());
//use dotenv to access .env file -- must be done before defining PORT
require('dotenv').config();
const PORT = process.env.PORT;



class Forecast {
  constructor(day) {
    this.description = `date: ${day.valid_date}`;
    this.date = `has ${day.weather.description}`;
  }
}

app.get('/weather', async (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=3`);
  let weatherArr = [];
  if (lat && lon) {
    let localWeather = weatherData.data
    if(localWeather) {
      localWeather.data.map((weatherInfo) => {
        weatherArr.push(new Forecast(day)
        );
      });
      res.send(weatherArr);
    }else {
      res.status(400).send('Some Mistakes have been made');
    }
  }
});

// let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1`

app.get('/movies', async (req, res) => {
  let city = req.query.lat
  let movieData = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1`)
  let movieArr = [];
  if (city) {
    let namedMovies = movieData.data
    if (namedMovies) {
      movieData.data.map((movie)=> {
        movieArr.push();
      })
    }
  }
});

app.listen(PORT, () => console.log(`Yo ${PORT} is up`));



