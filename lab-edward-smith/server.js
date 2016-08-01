'use strict';

const express = require('express');
let app = express();
let movieRoutes = require('./route/routes');
const bodyParser = require('body-parser');
let debug = require('debug')('app');
const morgan = require('morgan');
const errorModule = require('./lib/errorModule');


debug('starting', 'app');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(errorModule());
app.use('/api/movie', movieRoutes);
app.post('/testing', (req, res) =>{
  res.send(req.body);
})
;

const server = app.listen(3000, () => {
  debug('listening on port 3000');
  console.log('Listening on port 3000');
});

module.exports = server;
