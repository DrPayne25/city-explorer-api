'use strict';
//---
//basically this is your import in react
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
//use dotenv to access .env file -- must be done before defining PORT
require('dotenv').config();
const PORT = process.env.PORT;

const weather = require('./modules/weather.js');
const movies = require('./modules/movies.js');


//-----------------------------Weather-------------------------------//

app.get('/weather', weather);
//------------------------------MOVIE---------------------------------//

app.get('/movies', movies);

app.listen(PORT, () => console.log(`Yo ${PORT} is up`));



