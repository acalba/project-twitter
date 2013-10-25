
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();
var exphbs  = require('express3-handlebars');
var Twit = require('twit')

var T = new Twit({
    consumer_key:         'dNKkwfKb93NBU48Psn1Q'
  , consumer_secret:      'FWjQBighGxvOwm6hPHm91omKKKOZIJjugt0CPOmBM'
  , access_token:         '2153561760-SPXSZOt4cNyYnmH46jJK8T64o1MwyPBcgCCTkEk'
  , access_token_secret:  'qEEpIVyAtjO1rVDu3rYf1REHv4MUykvpN0fCo8LYfHRcD'
})

T.post('statuses/update', { status: 'hello world!' }, function(err, reply) {
  //  ...
  console.log(err);
  console.log(reply);
})
