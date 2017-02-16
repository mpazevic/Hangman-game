var wins = 0;
var losses = 0;

function playGame() {
	var numberRemainingGuesses = 6;
	var guessedLetters = [];

	var countries = ['Bhutan','Azerbaijan',
	'Djibouti','Eritria', 'Mozambique','Gibraltar',
	'Kyrgyzstan','Estonia','Bahrain','Laos'
	];

	var computerChoice = countries[
		Math.floor(Math.random() * countries.length
		)].toUpperCase();

	var computerChoiceLetters = computerChoice.split('');

	//Display initial blank spaces equal to the length of the word
	var result1 = [];
	for (var i = 0; i < computerChoiceLetters.length; i++) {
		result1.push('_')
	}
	var secretWord = result1.join(' ');

	//Display starting html
	var primaryHtml = "<h2>Press any key to get started!</h2>" +
	secretWord +
	"<p>Wins: " + wins + "\xa0\xa0Losses: " + losses + "</p>" +
	"<p>Letters guessed: " + guessedLetters.join(', ') + "</p>" +
	"<p>Remaining guesses: " + numberRemainingGuesses + "</p>"

	document.querySelector('#theGame').innerHTML = primaryHtml;

	//Code for playing in the console!
	console.log(secretWord);
	console.log("Press any key to get started!");
	console.log("Wins: " + wins);
	console.log("Losses: " + losses);
	console.log("Letters guessed: " + guessedLetters.join(', '));
	console.log("Remaining guesses: " + numberRemainingGuesses);

	document.onkeyup = function() {
		console.clear();

		var userGuess = String.fromCharCode(event.keyCode).toUpperCase();

		//Conditions for updating remaining guesses

		if (computerChoiceLetters.includes(userGuess) === false) {
			if (guessedLetters.includes(userGuess) === false) {
				numberRemainingGuesses -= 1;
			}
			else if (guessedLetters.includes(userGuess) === true) {
				console.log("Not in there");
			}
		}

		//Update "guessed letters" array with guessed keys
		if (guessedLetters.includes(userGuess) === false) {
			guessedLetters.push(userGuess);
		}	
		
		//Conditions to update blanks
		var result = [];
		for (var i = 0; i < computerChoiceLetters.length; i++) {
			result.push('_');
		}

		for (var j = 0; j < computerChoiceLetters.length; j++) {
			if (userGuess === computerChoiceLetters[j]) {
				result[j] = userGuess;
			}
		}

		for (var f = 0; f < guessedLetters.length; f++) {
			for (var k = 0; k < computerChoiceLetters.length; k++) {
				if (guessedLetters[f] === computerChoiceLetters[k]) {
					result[k] = guessedLetters[f];
				}
			}
		}

		//variable displayed when user presses keys
		var updatedBlanks = result.join(' '); 

		console.log(updatedBlanks);
		console.log("Wins: " + wins);
		console.log("Losses: " + losses);
		console.log("Letters guessed: " + guessedLetters.join(', '));
		console.log("Remaining guesses: " + numberRemainingGuesses);


		//Code for displaying interactive html
		var interactiveHtml = "<h2>Press any key to get started!</h2>" +
		updatedBlanks +
		"<p>Wins: " + wins + "\xa0\xa0Losses: " + losses + "</p>" +
		"<p>Letters guessed: " + guessedLetters.join(', ') + "</p>" +
		"<p>Remaining guesses: " + numberRemainingGuesses + "</p>"

		document.querySelector('#theGame').innerHTML = interactiveHtml;

		//Condition necessary to win and winning state
		if (result.join(' ') === computerChoiceLetters.join(' ')) {
			console.clear();
			console.log('yay!');
			wins++;
			var winningHtml = "<h2>Press any key to get started!</h2>" +
			updatedBlanks +
			"<p>Wins: " + wins + "\xa0\xa0Losses: " + losses + "</p>" +
			"<p>Letters guessed: " + guessedLetters.join(', ') + "</p>" +
			"<p>Remaining guesses: " + numberRemainingGuesses + "</p>" +
			"Nice work! Press another key if you want to keep playing!"

			document.querySelector('#theGame').innerHTML = winningHtml;
			document.onkeyup = function () {
				playGame();
			}
		}


		//Condition necessary to lose and losing state
		if (numberRemainingGuesses === 0) {
			console.clear();
			console.log("You're out of luck...");
			losses++;
			//playGame();
			var losingHtml = "<h2>Press any key to get started!</h2>" +
			computerChoice +
			"<p>Wins: " + wins + "\xa0\xa0Losses: " + losses + "</p>" +
			"<p>Letters guessed: " + guessedLetters.join(', ') + "</p>" +
			"<p>Remaining guesses: " + numberRemainingGuesses + "</p>" +
			"<p>Better luck next time...press another key to try again!</p>"

			document.querySelector('#theGame').innerHTML = losingHtml;
			document.onkeyup = function () {
				playGame();
			}
		}
	}
}