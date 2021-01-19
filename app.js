const guesses = {"a":'', "b":'', "c":'', "d":'', "e":'', "f":'', "g":'', "h":'', "i":'', "j":'', "k":'', "l":'',
"m":'', "n":'', "o":'', "p":'', "q":'', "r":'', "s":'', "t":'', "u":'', "v":'', "w":'', "x":'', "y":'', "z":''};

const arr = document.querySelectorAll('.letters');
const word_length_HTML = document.getElementById("word-length");
const word_HTML = document.getElementById("word");
const attempt_count_HTML = document.getElementById("attempts-left");
const webster_HTML = document.getElementById("webster");

//var URL = "https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary_compact.json";

var sol = 0;

var url = "https://raw.githubusercontent.com/matthewreagan/WebstersEnglishDictionary/master/dictionary_compact.json";


var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", url, true);
xmlhttp.send();		

xmlhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
	    	var str = this.responseText;
		//console.log(str);	
		var json = JSON.parse(str);
		main(json);
		}
	};


/*
getJSON(url, function(data) {
		main(data);
	} 
);

async function getJSON(url, cb){
		const response = await fetch(url);
		const json_data = await response.json();
		cb(json_data);

	}	

*/	

function main(json){
	var json_stuff = generateRandomWord(json);
	for(var i = 0; i < arr.length;  ++i){
		var elem = arr[i];
		eventListen( elem, json_stuff[0], json_stuff[1] )
	}

}


function generateRandomWord(word_list) {
	var key_list = Object.keys(word_list);
	var word;
	var definition_string;
	
	do {
		word = key_list[ Math.floor(Math.random()*key_list.length) ];
		
	} while (word.includes("-") || word.includes(" "));

	definition_string = word_list[word];
	initialUpdate(word);
	return [word, definition_string];
	
}


function initialUpdate(word){

	word_length_HTML.innerHTML = word.length;
	for(var i = 0; i < word.length; ++i){
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



function eventListen(elem, word, definition_string){
	elem.addEventListener('click', function(){
		if(attempt_count_HTML.innerHTML > 0 && sol != word.length ){
			var letter = elem.innerHTML;
			if( guesses.hasOwnProperty(letter) ){
				if( word.includes(letter) ) {
					changeGuessColour(elem, true);
					solutionLogic(letter, word, definition_string);
				} else {
					changeGuessColour(elem, false);
					updateAttempt(false, word, definition_string); 
					}
				delete guesses[letter];			
				}
			}
		}
	);
}



function solutionLogic(letter, word, defintion_string) {
	for(var i = 0; i < word.length; ++i){
		if(letter === word[i]){
			changeWordDiv(i, letter);
			sol+=1;
			updateAttempt(true, word, defintion_string);
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

function completeMissingLetters(word){
	for(var i = 0; i < word.length; ++i) {
		var temp = document.getElementById(i);
		if(temp.innerHTML == ""){
			temp.innerHTML = word[i];
			temp.style.color = 'red';
		}
	}
}


function definition(definition_string){
	var title = document.createElement("p");
	title.innerHTML = "Definition";
	title.setAttribute('style', 'text-decoration: underline');
	webster_HTML.appendChild(title);	

	var div = document.createElement("p");
	div.innerHTML = definition_string;
	webster_HTML.appendChild(div);
}


function updateAttempt(bool, word, definition_string){
	
	if(bool == true){
		if(sol == word.length){
			var div = document.createElement("span");
			div.innerHTML = "Good Job!";
			div.style.color = 'rgb(130, 169, 81)';
			document.getElementById("attempt-ctr").appendChild(div);

			definition(definition_string);
			getPronounciation(word);
		} 
	} else {
		attempt_count_HTML.innerHTML -= 1;	
		if(attempt_count_HTML.innerHTML == 0){
			attempt_count_HTML.style.color = "red";
			var div = document.createElement("span");
			div.innerHTML = "whoops! The correct answer is " + word;
			div.style.color = 'red';
			document.getElementById("attempt-ctr").appendChild(div);
	
			completeMissingLetters(word);

			definition(definition_string);
			getPronounciation(word);	
		}
	}
}

function getPronounciation(word){
	const api_key = "d7167b09-3b2e-4168-a994-7dbca733edd8";

	var MW_url = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" + word + "?key=" + api_key;

	var xml = new XMLHttpRequest();
	xml.open("GET", MW_url, true);
	xml.send();		

	xml.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		    	var str = this.responseText;
			var json = JSON.parse(str);
			
			try {
				var pronounce = json[0]["hwi"]["prs"][0]["mw"];
				var audio = json[0]["hwi"]["prs"][0]["sound"]["audio"];
				getAudio(audio);
			} catch (error){
				console.log("No audio found");
			}
				
		}
	};
}


function getAudio(audio){
	
	var format = "mp3";
	var subdirectory;

	if(audio.includes("bix")){
		subdirectory = "bix";
	} else if(audio.includes("gg")){
		subdirectory = "gg";
	} else if( parseInt(audio[0]) == Number || audio[0] === "_"){
		subdirectory = "number";
	} else {
		subdirectory = audio[0];
	}

	var audio_url = "https://media.merriam-webster.com/audio/prons/en/us/mp3/" + subdirectory + "/" + audio + "." + format;
	
	embedAudio(audio_url);

}


function embedAudio(audio_url){

		var div = document.createElement("audio");
		div.setAttribute("controls", "controls");		

		var source = document.createElement("source");
		source.setAttribute('src', audio_url);
		source.setAttribute('type', "audio/mpeg");
		
		div.appendChild(source)
		
		document.getElementById("attempt-ctr").appendChild(div);	
	

}


