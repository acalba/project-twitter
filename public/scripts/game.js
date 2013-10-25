$(function() {
  var $countdown = $("#countdown h2"),
    $game = $("#game"),
    $tweetList = $game.find("ul li"),
    $typingArea = $("#typingArea"),
    $footer = $('.footer');
  var roundNumber = 1;

  function calculateScore(length, speed, count_errors)
  {
    var score = (length / 140 * 250) + (2 * speed) - (0.5 * count_errors);
    alert("Your score is " + Math.ceil(score) + "!\nTweet Length: " + length + " characters\nYour typing speed: " + speed + " wpm\nWrong characters typed: " + count_errors + " characters");
    return score;
  }

  function insertScore()
  {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : '10.101.100.95',
      user     : 'hackathon_user',
      password : 'onescreen',
    });

    connection.connect();

    var query = connection.query('SELECT name, score FROM hackathon.scores ORDER BY score DESC LIMIT 10;', function(err, result) {
      if (err) throw err;

      console.log(result);
    });

    connection.end();
  }

  function startRound(roundNumber) {
    var time = 1;
    $game.hide();
    $countdown.show();
    $countdown.text(time);
    $game.find("h2").text("Round " + roundNumber);
    $footer.hide()
    $typingArea.val("");

    var timer = self.setInterval(function() {
      if (time > 0) {
        time--;
        $countdown.text(time);
      } else {

        game_timer_start = new Date().getTime();

        clearInterval(timer);
        $countdown.hide();
        $game.show();
        $footer.show()
        highlightLine(roundNumber);

        $typingArea.keyup(function() {
          // console.log($($tweetList[roundNumber]).text());
          if ($(this).val() === $($tweetList[roundNumber]).text()) {
            console.log("true!");
            
            // calculate wpm
            game_timer_stop = new Date().getTime();
            game_timer = (game_timer_stop - game_timer_start) / 1000;
            words = $($tweetList[roundNumber]).text().split(' ').length;
            wpm = words / (game_timer / 60);

            // calculate total score
            tweet_length = $($tweetList[roundNumber]).text().length;
            count_errors = 5;

            final_score = calculateScore(tweet_length, wpm, count_errors);

            console.log("Time: " + game_timer + " seconds.\nTyping Speed: " + wpm + " wpm");
            console.log("Tweet Length: " + tweet_length);
            console.log("# of Errors: " + count_errors);
            console.log("Total Score: " + final_score);

            roundNumber++;
            startRound(roundNumber);
            // highlightLine(roundNumber);
          }
        });
        

      }
    }, 1000);
  }

  function highlightLine(roundNumber) {
    for (var i = 0; i < $tweetList.length; i++) {
      if (i === roundNumber) {
        $($tweetList[i]).show();  
      } else {
        $($tweetList[i]).hide();
      }
    }
  }

  startRound(roundNumber);

});