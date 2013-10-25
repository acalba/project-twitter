
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
  var mysql      = require('mysql');

  var connection = mysql.createConnection({
    host     : '10.101.100.95',
    user     : 'hackathon_user',
    password : 'onescreen',
  });

  connection.connect();
  var query = connection.query('SELECT name, score FROM hackathon.scores ORDER BY score DESC LIMIT 10;', function(err, result) {
    if (err) throw err;

    connection.end();
    res.render('scores', { scores : result});
  });

});

app.use(express.bodyParser());

app.post('/search', function (req, res) {

  var statuses = [];

  T.get('search/tweets', { q: req.body.search + ' since:2013-01-01', count: 10, language: 'en'}, function(err, tweet) {
    var list = tweet.statuses;
    for (var i = 0; i < list.length; i++) {
      var text = list[i].text.match(/[a-zA-Z0-9,.<>\\?!@#$%^&*()-=_+ "':;{}\[\]]*/, "");
      text.replace(/(http|https)(://\w+\.\w+)(\.\w+)*(/\w+)*/, "");
      if (text.length > 15) {
        statuses[i] = {text: text};
        console.log(list[i].text);
      }
    }

    res.render('search', {tweets: statuses});
  });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
