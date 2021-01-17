const guesses = {"a":'', "b":'', "c":'', "d":'', "e":'', "f":'', "g":'', "h":'', "i":'', "j":'', "k":'', "l":'',
"m":'', "n":'', "o":'', "p":'', "q":'', "r":'', "s":'', "t":'', "u":'', "v":'', "w":'', "x":'', "y":'', "z":''};

const arr = document.querySelectorAll('.letters');
const word_length_HTML = document.getElementById("word-length");
const word_HTML = document.getElementById("word");
const attempt_count_HTML = document.getElementById("attempts-left");
const webster_HTML = document.getElementById("webster");

//const api_key = "d7167b09-3b2e-4168-a994-7dbca733edd8";
//var URL = "https://raw.githubusercontent.com/adambom/dictionary/master/dictionary.json";
//var URL = "https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary_compact.json";


var word;
var definition_string;

generateRandomWord();
const word_length = word.length;
word_length_HTML.innerHTML = word_length;


var sol = 0;


drawDivsForGuess();

main();


function drawDivsForGuess(){
	for(var i = 0; i < word_length; ++i){
		var div = document.createElement("span");
		div.setAttribute('class', 'letters');
		div.setAttribute('id', i);
		div.setAttribute('style', 'vertical-align:top');
		div.style.display = "inline-block";
		div.style.width = "18.08px";
		div.style.height = "30px";
		
		word_HTML.appendChild(div);
	}
}


function generateRandomWord() {
	var key_list = Object.keys(word_list);
	word = key_list[ Math.floor(Math.random()*key_list.length) ];
	definition_string = word_list[word];
}


/*
function logicJSON(word) {

	const getJSON = async url => {
 	 try {
   	 	const response = await fetch(url);
   	 	if(!response.ok) // check if response worked (no 404 errors etc...)
    	 		throw new Error(response.statusText);

    		const data = await response.json(); // get JSON from the response
   	 	return data; // returns a promise, which resolves to this data value
 	 	} catch(error) {
    	return error;
  	}
}
	getJSON(URL).then(data => {
		definition(data[word.toUpperCase()]) ;  
	}).catch(error => {
		console.error(error);
	});

}
*/

function solutionLogic(letter) {
	for(var i = 0; i < word_length; ++i){
		if(letter === word[i]){
			changeWordDiv(i, letter);
			sol+=1;
			updateAttempt(true);
		}
	}
}

function changeWordDiv(num, letter){
	var id = document.getElementById(num);
	id.style.color = '#82a951';
	
	id.innerHTML = letter;
}

function changeGuessColour(elem, bool){
	if(bool){
		elem.style.color = '#82a951';		
	} else {
		elem.style.color = '#E50000';	
	}
}

function completeMissingLetters(){
	for(var i = 0; i < word.length; ++i) {
		var temp = document.getElementById(i);
		if(temp.innerHTML == ""){
			temp.innerHTML = word[i];
			temp.style.color = 'red';
		}
	}
}


function definition(){
	var title = document.createElement("p");
	title.innerHTML = "Definition";
	title.setAttribute('style', 'text-decoration: underline');
	webster_HTML.appendChild(title);	

	var div = document.createElement("p");
	div.innerHTML = definition_string;
	webster_HTML.appendChild(div);
}


function updateAttempt(bool){
	
	if(bool == true){
		if(sol == word_length){
			var div = document.createElement("span");
			div.innerHTML = "Good Job!";
			div.style.color = 'rgb(130, 169, 81)';
			document.getElementById("attempt-ctr").appendChild(div);

			//logicJSON(word);
			definition();
		} 
	} else {
		attempt_count_HTML.innerHTML -= 1;	
		if(attempt_count_HTML.innerHTML == 0){
			attempt_count_HTML.style.color = "red";
			var div = document.createElement("span");
			div.innerHTML = "whoops! The correct answer is " + word;
			div.style.color = 'red';
			document.getElementById("attempt-ctr").appendChild(div);
	
			completeMissingLetters();

			//logicJSON(word);
			definition();	
		}
	}
}


function eventListen(elem){
		elem.addEventListener('click', function(){
		if(attempt_count_HTML.innerHTML > 0 && sol != word_length ){
			var letter = elem.innerHTML;
			if( guesses.hasOwnProperty(letter) ){
				if( word.includes(letter) ) {
					changeGuessColour(elem, true);
					solutionLogic(letter);
				} else {
					changeGuessColour(elem, false);
					updateAttempt(false); 
					}
				delete guesses[letter];			
				}
			}
		}
	);
}


function main(){
	arr.forEach(eventListen);	
}







