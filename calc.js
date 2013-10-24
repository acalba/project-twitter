function calculateScore(length, speed, accuracy)
{
	var score = (length / 140 * 250) + (2 * speed) + (accuracy * 250);
	alert("Your score is " + Math.ceil(score) + "!\nTweet Length: " + length + " characters\nYour typing speed: " + speed + " wpm\nAccuracy: " + (accuracy * 100) + "%");
	return score;
}