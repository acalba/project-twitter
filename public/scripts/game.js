$(function() {
  var $countdown = $("#countdown h2");
  var $game = $("#game");
  var $tweetList = $game.find("ul li");
  var $typingArea = $("#typingArea");
  var lineIndex = 0;

  function startRound(roundNumber) {
    var time = 1;
    $game.hide();
    $countdown.text(time);

    var timer = self.setInterval(function() {
      if (time > 0) {
        time--;
        $countdown.text(time);
      } else {
        clearInterval(timer);
        $countdown.hide();
        $game.show();
        highlightLine(lineIndex);

        $typingArea.keyup(function() {
          console.log($($tweetList[lineIndex]).text());
          if ($(this).val() === $($tweetList[lineIndex]).text()) {
            console.log("true!");
          }
        });
      }
    }, 1000);
  }

  function highlightLine(index) {
    for (var i = 0; i < $tweetList.length; i++) {
      if (i === index) {
        $($tweetList[i]).show();  
      } else {
        $($tweetList[i]).hide();
      }
      
    }
  }

  startRound();

});