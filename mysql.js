var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '10.101.100.95',
  user     : 'hackathon_user',
  password : 'onescreen',
});

connection.connect();

var query = connection.query('SELECT * FROM hackathon.scores ORDER BY score DESC LIMIT 10;', function(err, result) {
  if (err) throw err;

  console.log(result);
});

connection.end();