function calculateScore(length, speed, count)
{
	var score = (length / 140 * 250) + (2 * speed) - (0.5 * count);
	alert("Your score is " + Math.ceil(score) + "!\nTweet Length: " + length + " characters\nYour typing speed: " + speed + " wpm\nWrong Characters Typed: " + count + " characters");
	return score;
}