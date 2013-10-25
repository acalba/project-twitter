
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
  var query = connection.query('SELECT name, score, speed, accuracy, tweet FROM hackathon.scores ORDER BY score DESC LIMIT 10;', function(err, result) {
    if (err) throw err;

    connection.end();
    res.render('scores', { scores : result});
  });

});

app.use(express.bodyParser());
app.post('/save', function(req, res) {
  var mysql      = require('mysql');
  var connection = mysql.createConnection({
    host     : '10.101.100.95',
    user     : 'hackathon_user',
    password : 'onescreen',
  });

  query_string = 'INSERT INTO hackathon.scores VALUES ("'
    + req.body.data.name + '", '
    + req.body.data.round + ', '
    + req.body.data.score + ', '
    + req.body.data.speed + ', '
    + req.body.data.count_errors + ', "'
    + req.body.data.tweet + '");'
  
  console.log(query_string);

  connection.connect();

  var query = connection.query(query_string, function(err, result) {
    if (err) throw err;

    console.log(result);
  });

  connection.end();
  // console.log(req.body.data.name);
});

app.post('/search', function (req, res) {

  var statuses = [];

  T.get('search/tweets', { q: req.body.search + ' since:2013-01-01', count: 10, language: 'en'}, function(err, tweet) {
    var list = tweet.statuses;
    for (var i = 0; i < list.length; i++) {

      console.log("ORIGINAL: " + list[i].text);

      var text = list[i].text.match(/[a-zA-Z0-9,.<>\\?!@#$%^&*()-=_+ "':;{}\[\]]*/, "");
      if (text !== undefined) {
        text = text.toString().replace(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi, "");  
      } else {
        break;
      }
      
      text = text.toString().replace(/^\s+|\s+$/g, "");

      console.log("WITHOUT WEIRD: " + text);

      if (text !== undefined && text.length > 10) {
        statuses[i] = {text: text};
        console.log("added " + text);
      }
    }

    res.render('search', {tweets: statuses, name: req.body.user_name});
  });

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
