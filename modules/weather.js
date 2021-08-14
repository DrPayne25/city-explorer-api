'use strict';

const axios = require('axios');

class Forecast {
  constructor(day) {
    this.description = `Forecast for ${day.datetime}: Low: ${day.low_temp}, High: ${day.high_temp} with ${day.weather.description}`;
    this.date = day.datetime;
  }
}

async function getWeather(req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let weatherData = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&days=3`);
  if(weatherData.data) {
    let weatherArr = weatherData.data.data.map((weatherInfo) => new Forecast(weatherInfo));
    res.send(weatherArr);
  } else {
    res.status(400).send('Some Mistakes have been made');
  }
};

module.exports = (getWeather);

