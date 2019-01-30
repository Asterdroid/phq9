var submitButton = document.querySelector('.submitButton');
submitButton.addEventListener("click", scoreTheTest);
var resultDisplay = document.querySelector(".resultatet");

var errorMessage = "Du måste svara på alla frågorna";
var answers = [];
var sumOfAnswers = 0;
var results = [ 
"Egentlig depression antyds föreligga: \
1. om 5 eller fler av de 9 frågorna besvarats med minst \
'mer än hälften av dagarna' och om minst en av frågorna a. eller b. är positiva, \
det vill säga besvarade med minst 'mer än hälften av dagarna'. ",
"Annat depressivt syndrom antyds föreligga: \
1. om 2-4 av de 9 frågorna besvarats med minst 'mer än hälften av dagarna' och \
2. om minst en av frågorna a. eller b. är positiva, det vill säga besvarade med minst 'mer \
än hälften av dagarna'. ",
"≤ 4 Tyder på att patienten inte behöver depressionsbehandling.",
"5-14 Läkaren bedömer utifrån klinisk undersökning om behovet av behandling utifrån \
funktionspåverkan och durationen av patientens symtom. ",
" ≥ 15 Tyder på behov av depressionsbehandling med antidepressiva, psykoterapi eller en \
kombination av behandlingar."
];

function displayErrorMessage() {
	resultDisplay.innerHTML = errorMessage;
}

function isAnswered(answer) {
	if (answer == "") {
		return false;
	} else {
		return true;
	}
}

function getTheAnswers() {
	for (var i = 1; i <= 10; i++) {
		answers[i] = document.theForm.elements.namedItem('question' + i).value;
	}
}

function calculateScore() {
	sumOfAnswers = 0;
	for (var i = 1; i < answers.length-1; i++) {
		if ( isAnswered(answers[i]) ) {
			sumOfAnswers += Number(answers[i]);
		} else {
			return false;
		}
	}
	return true;
}

function amountOfHigherThan(number) {
	var count = 0;
	for (var i = 1; i < answers.length-1; i++) {
		if (answers[i] > number) {
			count++;
		}
		console.log(count);
	}
	return count;
}

function interpretTheScore() {
	var result = "<p>" + sumOfAnswers + "</p><p>";
	var twosAndThrees = amountOfHigherThan(1);
	if (answers[0] > 1 | answers[1] > 1) {
		if (twosAndThrees >= 5) {
			result += results[0];
		} else if (twosAndThrees >= 2 & twosAndThrees <= 4) {
			result += results[1];
		}
	}
	result += "</p><p>";	
	if (sumOfAnswers >= 15) {
		result += results[4];
	} else if (sumOfAnswers >= 5) {
		result += results[3];
	} else {
		result += results[2];
	}
	return result;
	
}

function displayTheResults(result) {
	resultDisplay.innerHTML = result;
}

function scoreTheTest() {
	getTheAnswers();
	if (calculateScore()) {
		var result = interpretTheScore();
		displayTheResults(result);
	} else {
		displayErrorMessage();
	}
}