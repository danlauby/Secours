import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import superagent from 'superagent';
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

app.get('/api/get-doctors',function(req, res) {
  const BDKey = process.env.BD_KEY;
  superagent
  .get('https://api.betterdoctor.com/2016-03-01/doctors?mental%20health&location=45.6318,-122.6716,100&skip=2&limit=1&user_key=' + BDKey)
  .end(function(err, data) {
    console.log('Response:',data.body);
    res.send(data.body);
  });
});

app.listen(8080, () => console.log('Listening on port 8080...'));
