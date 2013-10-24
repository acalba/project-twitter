var Twit = require('twit')

var T = new Twit({
    consumer_key:         'dNKkwfKb93NBU48Psn1Q'
  , consumer_secret:      'FWjQBighGxvOwm6hPHm91omKKKOZIJjugt0CPOmBM'
  , access_token:         '2153561760-p7s6PTIjzBKPXm7mzyfUXhkxAn9n8FY7HIIAnx8'
  , access_token_secret:  'VmDbFEreiFATvzU7pooQvKoULm5zFWVRSa9CdTvnqfZcK'
})

T.get('search/tweets', { q: 'lakers since:2013-01-01', count: 30}, function(err, tweet) {
  // console.log(tweet);
  var list = tweet.statuses;
  var statuses = [];
  for (var i = 0; i < list.length; i++) {
    statuses[i] = list[i].text.replace(/^[\u0-\u7f]*$/, "");
    console.log(statuses[i]);
  }
});