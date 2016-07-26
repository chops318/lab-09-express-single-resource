'use strict';

const express = require('express');
let app = express();
let movieRoutes = require('./route/routes');
const bodyParser = require('body-parser');
let debug = require('debug')('app');

debug('starting', 'app')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api', movieRoutes);

app.listen(3000, () => {
  debug('listening on port 3000')
})
