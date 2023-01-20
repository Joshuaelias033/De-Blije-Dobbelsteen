let speel = document.getElementById("speel");
let head = document.getElementById("head");
let body = document.getElementById("body");
let LeftArm = document.getElementById("arm-left");
let RightArm = document.getElementById("arm-right");
let LeftLeg = document.getElementById("leg-left");
let RightLeg = document.getElementById("leg-right");
let lost = document.getElementById("you-lost");
let letters = document.getElementById("letters");
let woord = document.getElementById("woord");
let lostWoord = document.getElementById("lost-word");
let highscoreText = document.getElementById("highscore");
let alphabet = new Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
let hide = '-';
let landen = [
	"afghanistan",
	"albania",
	"algeria",
	"andorra",
	"angola",
	"anguilla",
	"antarctica",
	"argentina",
	"armenia",
	"aruba",
	"australia",
	"austria",
	"azerbaijan",
	"bahrain",
	"bangladesh",
	"belarus",
	"belgium",
	"bolivia",
	"bonaire",
	"bosnia",
	"botswana",
	"brazil",
	"bulgaria",
	"burundi",
	"cambodia",
	"cameroon",
	"canada",
	"chad",
	"chile",
	"china",
	"colombia",
	"congo",
	"croatia",
	"cuba",
	"curaçao",
	"cyprus",
	"czechia",
	"denmark",
	"ecuador",
	"egypt",
	"estonia",
	"eswatini",
	"ethiopia",
	"fiji",
	"finland",
	"france",
	"gambia",
	"georgia",
	"germany",
	"ghana",
	"gibraltar",
	"greece",
	"greenland",
	"guatemala",
	"haiti",
	"honduras",
	"hongkong",
	"hungary",
	"iceland",
	"india",
	"indonesia",
	"iran",
	"iraq",
	"ireland",
	"israel",
	"italy",
	"jamaica",
	"japan",
	"jersey",
	"jordan",
	"kazakhstan",
	"kenya",
	"kuwait",
	"kyrgyzstan",
	"latvia",
	"lebanon",
	"lesotho",
	"liberia",
	"libya",
	"liechtenstein",
	"lithuania",
	"luxembourg",
	"madagascar",
	"malaysia",
	"mali",
	"malta",
	"mexico",
	"moldova",
	"monaco",
	"mongolia",
	"montenegro",
	"morocco",
	"mozambique",
	"myanmar",
	"namibia",
	"nepal",
	"netherlands",
	"nicaragua",
	"niger",
	"nigeria",
	"norway",
	"oman",
	"pakistan",
	"palau",
	"palestine",
	"panama",
	"paraguay",
	"peru",
	"philippines",
	"poland",
	"portugal",
	"puertorico",
	"qatar",
	"romania",
	"russia",
	"senegal",
	"serbia",
	"singapore",
	"slovakia",
	"slovenia",
	"somalia",
	"spain",
	"sudan",
	"suriname",
	"sweden",
	"switzerland",
	"syria",
	"taiwan",
	"thailand",
	"tunisia",
	"turkey",
	"uganda",
	"ukraine",
	"america",
	"uruguay",
	"uzbekistan",
	"venezuela",
	"vietnam",
	"yemen",
	"zambia",
	"zimbabwe"
];

//hier word het random land gegenereerd met math.random
let randomLand = landen[Math.floor(Math.random() * landen.length)];
//console.log(alphabet.length);
let gewonnen = document.getElementById('gewonnen');

//start van het spel dingen worden verborgen en getoond.
function Play() {
	head.style.display = "none";
	body.style.display = "none";
	LeftArm.style.display = "none";
	RightArm.style.display = "none";
	LeftLeg.style.display = "none";
	RightLeg.style.display = "none";
	lost.style.display = "none";
	letters.style.display = "flex";
	document.getElementById("woord").style.display = "flex";
	document.getElementById("pogingen").style.display = "flex";
	document.getElementById("pogingen").innerHTML = "6 pogingen over";
	highscore.style.display = "flex";
	// Zet highscore op de pagina wanneer het spel start
	leesCookie();
}
// het poppetje word hier in volgorde gezet, zodat als het hoofd er als is, dan word het lichaam getoond.
function pogingen() {
	if (head.style.display === "none") {
		head.style.display = "flex";
		document.getElementById("pogingen").innerHTML = "5 pogingen over";
	}
	else if (body.style.display === "none") {
		body.style.display = "flex";
		document.getElementById("pogingen").innerHTML = "4 pogingen over";
	}
	else if (LeftArm.style.display === "none") {
		LeftArm.style.display = "flex";
		document.getElementById("pogingen").innerHTML = "3 pogingen over";
	}
	else if (RightArm.style.display === "none") {
		RightArm.style.display = "flex";
		document.getElementById("pogingen").innerHTML = "2 pogingen over";
	}
	else if (LeftLeg.style.display === "none") {
		LeftLeg.style.display = "flex";
		document.getElementById("pogingen").innerHTML = "1 pogingen over";
	}
	else if (RightLeg.style.display === "none") {
		//als je verliest word alles getoond en word het woord getoond.
		RightLeg.style.display = "flex";
		lost.style.display = "flex";
		lostWoord.style.display = "flex";
		document.getElementById("lost-word").innerHTML = "the word was: " + randomLand;
		document.getElementById("pogingen").innerHTML = "0 pogingen over";
		document.cookie = "highscore=0";
		setTimeout(function () {
			window.location.reload();
		}, 3000);
	}
}

/*random land word gekozen en word gereplaced met - */
speel.addEventListener('click', function () {
	document.getElementById("woord").innerHTML = randomLand.replace(randomLand, hide.repeat(randomLand.length));
})

//als je op een letter klikt loopt hij door het woord heen en kijkt hij of de letter er in zit
function letterClick(letter) {
	if (randomLand.match(letter)) {
		let new_word = '';
		for (i = 0; i < randomLand.length; i++) {
			if (randomLand[i] == letter) {
				new_word += letter;
			} else {
				new_word += woord.innerHTML[i];
			}
		}
		woord.innerHTML = new_word;
	}
	//als de letter niet in het woord zit dan gaat er een poging af 
	else {
		pogingen();
	}
	//als het woord gelijk is aan het gekozen woord dan woord gewonnen gedisplayed
	if (woord.innerHTML.match(randomLand)) {
		gewonnen.style.display = "flex";
		let highscore = leesCookie();
		maakCookie(highscore);
		setTimeout(function () {
			window.location.reload();
		}, 3000);
	}
}
//hier word het highscore systeem gemaakt
function maakCookie(streak = 0){
	streak++;
	document.cookie = "Highscore=" + streak;
}
//hier word het highscore systeem gelezen
function leesCookie(){
	let cookie = document.cookie;
	let cookieArray = cookie.split("=");
	highscoreText.innerHTML = "Highscore " + cookieArray[1];
	return cookieArray[1];
}
document.cookie = "hs=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
document.cookie = "hs-moeilijk=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";



