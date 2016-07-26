'use strict';

const uuid = require('node-uuid');

let Movie = function(title, director) {
  this.id = uuid.v1();
  this.title = title;
  this.director = director;
};



module.exports = Movie;
