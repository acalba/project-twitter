
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
  , access_token:         '2153561760-p7s6PTIjzBKPXm7mzyfUXhkxAn9n8FY7HIIAnx8'
  , access_token_secret:  'VmDbFEreiFATvzU7pooQvKoULm5zFWVRSa9CdTvnqfZcK'
})

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/scores', function (req, res) {
    res.render('scores');
});

app.use(express.bodyParser());

app.post('/search', function (req, res) {

  var statuses = [];

  T.get('search/tweets', { q: req.body.search + ' since:2013-01-01', count: 30, language: 'en'}, function(err, tweet) {
    var list = tweet.statuses;
    for (var i = 0; i < list.length; i++) {
      statuses[i] = {text: list[i].text.replace(/^[\u0-\u7f]*$/, "")};
      // console.log(statuses[i]);
    }

    res.render('search', {tweets: statuses});
  });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
