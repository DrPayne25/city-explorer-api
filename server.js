'use strict';
//basically this is your import in react
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const axios = require('axios');
//use dotenv to access .env file -- must be done before defining PORT
require('dotenv').config();
const PORT = process.env.PORT;

class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
  }
}

app.get('/test', (req,res) =>{
  res.send('this is working');
});

app.get('/weather', async (req, res) => {
  let searchQuery = req.query.city;
  console.log(searchQuery);
  try {
    let weatherData= await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?city=${searchQuery}&key=${process.env.WEATHER_API_KEY}`);
    weatherData = weatherData.data
    console.log(typeof(weatherData));
    let weatherArr = [];
    if (searchQuery) {
      let localWeather = weatherData.find((city)=> city.city_name === searchQuery);
      if(localWeather) {
        localWeather.data.map((weatherInfo) => {
          weatherArr.push(new Forecast(`Forecast for ${weatherInfo.datetime}: Low: ${weatherInfo.low_temp}, High: ${weatherInfo.high_temp} with ${weatherInfo.weather.description}`, weatherInfo.datetime)
          );
        });
        res.send(weatherArr);
        console.log(searchQuery);
      }else {
        res.status(400).send('Some Mistakes have been made');
      }
    }
  }
  catch (e) {
    console.log(e);
  }

});

app.listen(PORT, () => console.log(`Yo ${PORT} is up`));
//req = request res = response I like to be lazy sorry lol the / indicates the url / that it should be listening on
// app.get('/', (req, res) => {
//   //once we hear that request we should sent back the following results
//   res.send('Hello, from the inside');
// });

// app.get('/banana', (request, response)=> {
//   response.send('Bananas are yellow did you know?');
// });

// app.get('/*', (req, res) => {
//   res.status(404).send(`Something isn't right try again`);
// })


