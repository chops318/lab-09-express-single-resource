'use strict';

const express = require('express');
let router = express.Router();
let Movie = require('../model/movie');
const storage = require('../lib/storage');
const debug = require('debug')('router');
const AppError = require('../lib/appError');

router.route('/all')
  .get((req, res) => {
    debug('Router get all movies');
    var tempArray = [];
    for (var key in storage) {
      tempArray.push(storage[key]);
    }
    res.status(200).json(tempArray);
  });
router.route('/')
  .post((req, res) => {
    debug('Router post movie');
    let newMovie = new Movie(req.body.title, req.body.director);
    storage[newMovie.id] = newMovie;
    res.status(200).json(newMovie);
  });

router.route('/:id')
  .get((req, res) => {
    debug('get single movie');
    if (!storage[req.params.id]) {
      res.sendError(new AppError('no content', 404));
    }
    let movie = storage[req.params.id];
    res.status(200).json(movie);
  })
  .put((req, res) => {
    debug('Put request on single movie');
    if(!storage[req.params.id]) {
      res.sendError(new AppError.err404('no content'));
    }
    if (req.body.title) storage[req.params.id].title = req.body.title;
    if (req.body.director) storage[req.params.id].director = req.body.director;
    res.json(storage[req.params.id]);
  })
  .delete((req, res) => {
    debug('delete single movie');
    if (!storage[req.params.id]) {
      res.sendError(new AppError.err404('no content'));
    }
    delete storage[req.params.id];
    res.json('Deleted');
  });

module.exports = router;
