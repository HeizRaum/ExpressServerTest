const database = require('./database.js');
const express = require('express');
const fs = require('fs');
const application = express();

const port = 9000;

application.use(express.static('public'));

application.get('/', (request, response) => {
  response.sendFile(__dirname + '/public/index.html');
});

application.get('/countries', (request, response) => {
  response.sendFile(__dirname + '/public/countries.html');
});

application.get('/names', (request, response) => {
  response.sendFile(__dirname + '/public/names.html');
  console.log(request.route);
});

application.get('/cities', (request, response) => {
  response.sendFile(__dirname + '/public/cities.html');
  if (Object.keys(request.query).length !== 0) {
    if(request.query.cities === 'all') {
      response.send('sending all cities!');
    }
  }
});

application.listen(port, () => {
  console.log(`Application started at port: ${port}`);
});