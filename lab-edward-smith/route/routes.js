'use strict';

const express = require('express');
let router = express.Router();
let Movie = require('../model/movie');
const bodyParser = require('body-parser');
const uuid = require('node-uuid');
const storage = require('../lib/storage');
const debug = require('debug')('router')


router.route('/all')
  .get((req, res) => {
    debug('Router get all movies')
    var tempArray = [];
    for (var key in storage) {
      tempArray.push(storage[key])
    }
    res.status(200).json(tempArray)
  });
router.route('/')
  .post((req, res) => {
    let newMovie = new Movie(req.body.title, req.body.director);
    storage[newMovie.id] = newMovie;
    console.log(storage)
    res.status(200).json(newMovie)
  });

router.route('/:id')
  .get((req, res) => {
    if (!storage[req.params.id]) {
      res.status(404).json('Movie not found')
    }
    let movie = storage[req.params.id]
    res.status(200).json(movie);
  })
  .put((req, res) => {
    if(!storage[req.params.id]) {
      res.status(404).json('Movie not found');
    };
    if (req.body.title) storage[req.params.id].title = req.body.title;
    if (req.body.director) storage[req.params.id].director = req.body.director;
    res.json(storage[req.params.id]);
  })
  .delete((req, res) => {
    if (!storage[req.params.id]) {
      res.status(404).json('Movie not found')
    };
    delete storage[req.params.id];
    res.json('Deleted')
  })

module.exports = router;
