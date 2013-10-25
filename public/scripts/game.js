$(function() {
  var $countdown = $("#countdown h1"),
    $game = $("#game"),
    $tweetList = $game.find("ul li"),
    $tweetText = $($(".twitter-text")[roundNumber]).text(),
    $typingArea = $("#typingArea"),
    $footer = $('.footer');
  var roundNumber = 1;

  function calculateScore(length, speed, count_errors)
  {
    var score = (length / 140 * 250) + (2 * speed) - (0.5 * count_errors);
    alert("Your score is " + Math.ceil(score) + "!\nTweet Length: " + length + " characters\nYour typing speed: " + speed + " wpm\nWrong characters typed: " + count_errors + " characters");
    if (score < 0)
    {
      score = 0; // avoid negative score due to typing errors
    }
    return score;
  }

  function insertScore(name, round, score, speed, count_errors, tweet)
  {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : '10.101.100.95',
      user     : 'hackathon_user',
      password : 'onescreen',
    });

    query_string = "INSERT INTO hackathon.scores VALUES (" + name + ", " + round + ", " + score + ", " + speed + ", " + count_errors + ", " + tweet + ");"

    connection.connect();

    var query = connection.query(query_string, function(err, result) {
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
    $game.find("h2.page-header").text("Round " + roundNumber);
    $footer.hide()
    $typingArea.val("");
    $tweetText = $($(".twitter-text")[roundNumber]).text();
    $($(".twitter-text")[roundNumber]).lettering();
    var count_errors = 0;

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
          // highlight
          // console.log($tweetText);

          for (var i = 0; i < $tweetText.length, i < $(this).val().length; i++) {
            if ($(this).val().charAt(i) === $tweetText.charAt(i)) {
              // console.log("yay " + $tweetText.charAt(i));
              $(".char" + (i + 1)).addClass("yellow").removeClass("red");
            } else {
              // console.log("nay " + $tweetText.charAt(i));
              count_errors += 1;
              $(".char" + (i + 1)).addClass("red");
              break;
            }
          }

          // console.log($tweetText.text());
          if ($(this).val() === $tweetText) {
            console.log("true!");
            
            // calculate wpm
            var game_timer_stop = new Date().getTime();
            var game_timer = (game_timer_stop - game_timer_start) / 1000;
            var words = $tweetText.split(' ').length;
            var wpm = words / (game_timer / 60);

            // calculate total score
            var tweet_length = $tweetText.length;

            final_score = calculateScore(tweet_length, wpm, count_errors);

            // insertScore(name, roundNumber, final_score, wpm, count_errors, $tweetText);

            console.log("Time: " + game_timer + " seconds.\nTyping Speed: " + wpm + " wpm");
            console.log("Tweet Length: " + tweet_length);
            console.log("# of Errors: " + count_errors);
            console.log("Total Score: " + final_score);

            roundNumber += 1;
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