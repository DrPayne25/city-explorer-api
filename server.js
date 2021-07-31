'use strict';

console.log('Hello World');
//basically this is your import in react
const express = require('express');
const cors = require('cors');

//this is how it is!!!!
const app = express();
app.use(cors());


//req = request res = response I like to be lazy sorry lol the / indicates the url / that it should be listening on
app.get('/', (req, res) => {
  //once we hear that request we should sent back the following results
  res.send('Hello, from the inside');
});

app.get('/banana', (request, response)=> {
  response.send('Bananas are yellow did you know?');
});

app.listen(3001, () => console.log('Yo 3001 is up'));

