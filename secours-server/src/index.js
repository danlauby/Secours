import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import rp from 'request-promise';
require('dotenv').config();

import users from './routes/users';
import auth from './routes/auth';
import content from './routes/content';
import doctors from './routes/doctors';

let app = express();

app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/content', content);
app.use('/api/doctors', doctors);

// const googleMapsClient = require('@google/maps').createClient({
//   key: 'AIzaSyDvx6AYlUyLcXbZW96tfy_w0FDaU_AIJ-c',
//   Promise: Promise
// });

app.get('/api/get-doctors',function(req, res) {
  var options = {
    uri: 'https://api.betterdoctor.com/2016-03-01/doctors',
    qs: {
      query: req.query.issue,
      location: '45.6318,-122.6716,20',
      user_location: '45.6318,-122.6716',
      skip: 2,
      limit: 10,
      user_key: process.env.BD_KEY,
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(options)
  .then(function (doctors) {
    res.send(doctors);
  })
  .catch(function (err) {
    console.log("Doctor Request Failed", err);
  });
});

// googleMapsClient.geocode({
//   address: '7609 NE Vancouver Mall DR #D032, Vancouver, WA'
// })
// .asPromise()
// .then(response =>  console.log(response.json.results[0].geometry.location))
// .catch(err => console.log(err));

app.listen(8080, () => console.log('Listening on port 8080...'));
