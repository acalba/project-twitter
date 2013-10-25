$(function() {
  var $countdown = $("#countdown h2"),
    $game = $("#game"),
    $tweetList = $game.find("ul li"),
    $typingArea = $("#typingArea"),
    $footer = $('.footer');
  var roundNumber = 1;

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
        clearInterval(timer);
        $countdown.hide();
        $game.show();
        $footer.show()
        highlightLine(roundNumber);

        $typingArea.keyup(function() {
          // console.log($($tweetList[roundNumber]).text());
          if ($(this).val() === $($tweetList[roundNumber]).text()) {
            console.log("true!");
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