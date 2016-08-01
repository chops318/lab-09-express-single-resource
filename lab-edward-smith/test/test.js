'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

const server = require('../server');
const storage = require('../lib/storage');
const Movie = require('../model/movie');



describe('movie router', function() {
  before(function(done) {
    let movie = new Movie('The Shining', 'Kubrick');
    storage[movie.id] = movie;
    this.id = movie.id;
    done();
  });
  after(function(done){
    server.close(function(){
      done();
    });
  });
  it('should respond with 404 not found', function(done) {
    request('localhost:3000')
      .get('/api/movie/asdfasldfj')
      .end(function(err, res) {
        expect(err).to.not.eql(null);
        expect(res.status).to.eql(404);
        done();
      });
  });
  it('should response with a valid id', function(done) {
    request('localhost:3000')
      .get('/api/movie/' + this.id)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.director).to.eql('Kubrick');
        expect(res.body.title).to.eql('The Shining');
        done();
      });
  });
  it('should respond with an updated movie', function(done){
    request('localhost:3000')
      .put('/api/movie/' + this.id)
      .send({
        title: 'Waterboy',
        director: 'Adam Sandler'
      })
      .end(function(end, res) {
        expect(res).to.have.status(200);
        expect(res.body.title).to.eql('Waterboy');
        expect(res.body.director).to.eql('Adam Sandler');
        done();
      });
  });
  it('should respond with bad request', function(done) {
    request('localhost:3000')
      .post('/api/movie')
      .end(function(end, res) {
        expect(res).to.have.status(400);
        expect(res.error).to.have.property('text').and.to.eql('invalid body');
        done();
      });
  });
  it('should response with a valid movie', function(done) {
    request('localhost:3000')
      .post('/api/movie')
      .send({
        title: 'Dawn of the Dead',
        director: 'George A Romero'
      })
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body.title).to.eql('Dawn of the Dead');
        expect(res.body.director).to.eql('George A Romero');
        done();
      });
  });
  it('should respond with deleted', function(done) {
    request('localhost:3000')
      .delete('/api/movie/' + this.id)
      .end(function(err, res) {
        expect(res).to.have.status(200);
        expect(res.body).to.eql('Deleted');
        done();
      });
  });
});
