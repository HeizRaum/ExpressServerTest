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

application.listen(port, () => {
  console.log(`Application started at port: ${port}`);
});