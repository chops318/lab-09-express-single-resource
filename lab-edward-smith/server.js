'use strict';

const express = require('express');
let app = express();
let movieRoutes = require('./route/routes');
const bodyParser = require('body-parser');
let debug = require('debug')('app');
let serverUp = false;

debug('starting', 'app');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', movieRoutes);

const server = app.listen(3000, () => {
  serverUp = true;
  debug('listening on port 3000');
  console.log('Listening on port 3000');
});

module.exports = server;
