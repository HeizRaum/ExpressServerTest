const database = require('./database.js');
const express = require('express');
const application = express();

const port = 9000;

application.use(express.static('public'));
application.use(express.json());

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

application.get('/cities', asyncWrapper(async (request, response) => {
  if (Object.keys(request.query).length !== 0) {
    if (request.query.cities === 'all') {
      database.getCities(function (data) {
        response.send(data);
      });
    }
  } else {
    response.sendFile(__dirname + '/public/cities.html');
  }
}));

application.post('/cities', (request, response) => {
  database.addCity(request.body.city);
  response.send('OK');
});

application.listen(port, () => {
  console.log(`Application started at port: ${port}`);
});

function asyncWrapper(fun) {
  return (request, response, next) => {
    return Promise.resolve(fun(request, response))
      .catch((error) => next(error));
  }
}