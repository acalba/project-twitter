$(function() {
  var $countdown = $("#countdown h2");
  var $game = $("#game");
  var $tweetList = $game.find("ul");

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
        highlightLine(1);
      }
    }, 1000);
  }

  function highlightLine(index) {
    console.log($tweetList);
  }

  startRound();
  
});