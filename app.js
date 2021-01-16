const arr = document.querySelectorAll('.letters');
const word_length_HTML = document.getElementById("word-length");
const word_HTML = document.getElementById("word");
const attempt_count_HTML = document.getElementById("attempts-left");
const guesses = {"a":'', "b":'', "c":'', "d":'', "e":'', "f":'', "g":'', "h":'', "i":'', "j":'', "k":'', "l":'',
"m":'', "n":'', "o":'', "p":'', "q":'', "r":'', "s":'', "t":'', "u":'', "v":'', "w":'', "x":'', "y":'', "z":''};
const dictionary = ["hi", "banana", "apple"];

const word = generateRandomWord();
const word_length = word.length;
word_length_HTML.innerHTML = word_length;
drawDivsForGuess();
//setAttemptCount();
main();

function drawDivsForGuess(){
	for(var i = 0; i < word_length; ++i){
		var div = document.createElement("span");
		div.setAttribute('class', 'letters');
		div.setAttribute('id', i);
		div.innerHTML = "5";
		div.style.color = '#7851a9';
		word_HTML.appendChild(div);
	}
}

//function setAttemptCount(){ }

function generateRandomWord() {
	var word = dictionary[Math.floor(Math.random()*dictionary.length)];
	return word;
}

function solutionLogic(letter) {
	for(var i = 0; i < word_length; ++i){
		if(letter === word[i]){
			changeWordDiv(i, letter);
		}
	}
}

function changeWordDiv(num, letter){
	var id = document.getElementById(num);
	id.setAttribute('style', 'color:#82a951');
	id.innerHTML = letter;
}

function changeGuessColour(elem, bool){
	if(bool){
		elem.style.color = '#82a951';		
	} else {
		elem.style.color = '#E50000';	
	}
}

function eventListen(elem){
	elem.addEventListener('click', function(){
		var letter = elem.innerHTML;
		if( guesses.hasOwnProperty(letter) ){
			if( word.includes(letter) ) {
				changeGuessColour(elem, true);
				solutionLogic(letter);
			} else {
				changeGuessColour(elem, false);
				attempt_count_HTML.innerHTML-=1; 
				}
			delete guesses[letter];			
			}
		}
	);
}


function main(){
	arr.forEach(eventListen);
}







