
		let p; //= new Car(50,50,'blue')
		let pid;
		let cars = [];
		var socket = io();
		var newcolour = false;
		let wordJSON;

		function setup() {
				createCanvas(2080, 1080);
				colorMode(HSB); //simpler and easier to understand. hue saturation brightness
				background(255);
				//how to do random from list (from tutorial)
				//let a = [10, 20, 30, 40, 50];
				//let i = Math.floor(Math.random() * a.length);
				//let r = a[i];
				// c = "blue";
				// socket.emit("newCo", { x: mouseX, y: mouseY, c: c, s: 0 });
		}

		socket.on("coord", function (data) {
				p = new Car(data.x, data.y, data.c, data.s);
				p.draw();
				cars.push(p);
				//getPlayerID()
				console.log(cars)
		});

		socket.on("newLang", function (data) {
				//server gave us newScore
				//let ids
				//randomisig happens here
				//console.log(data.w)
				const DATABASE_LENGTH  = data.w[0].length
				let qu = getRandomNumber(DATABASE_LENGTH)
				wordJSON = data.w[0][qu]; //<--- polo is like an arbitrary name for it I GOT IT!!!!!!!!
				//console.log(wordJSON); //
				if (wordJSON.EnglishWord == null ||wordJSON.FrenchWord == null) {
						//those pesky titles and weird null entries
						wordJSON = data.w[0][Math.floor(Math.random() * DATABASE_LENGTH)]; //find anohter one. i wanted to delete it but how to do it with getting undefined
				}
				let abc = getRandomNumber(DATABASE_LENGTH)
				let def = getRandomNumber(DATABASE_LENGTH)
				let hij = getRandomNumber(DATABASE_LENGTH)
				let wrongword1 = data.w[0][abc];
				let wrongword2 = data.w[0][def];
				let wrongword3 = data.w[0][hij];

				let randomWrongs = [];
				let theQuestion = {
						q: wordJSON.FrenchWord,
						a: [wrongword1.EnglishWord,
								wrongword2.EnglishWord,
								wrongword3.EnglishWord],
						correct: wordJSON.EnglishWord,
				};
				for (let index = 0; index < theQuestion.a.length; index++) {
						randomWrongs.push(theQuestion.a[index]);
				}

				//-- this is setup for the 4 question buttons ---

				//this is the one correct answer this works sometimes???????
				let ids = ["answer1", "answer2", "answer3", "answer4"];
				let correctIndex = getRandomNumber(ids.length); //random from ids : Pick elemnt to be the correct answer
				const correctAnswer = wordJSON.EnglishWord

				let answerText 
				for (let i = 0; i < ids.length; i++) {
						answerText = document.getElementById(ids[i])
						if (i == correctIndex) {
								answerText.innerHTML = correctAnswer;
						} else {
								answerText.innerHTML = randomWrongs.pop();
								}

				}

				outputText("what is " + wordJSON.FrenchWord + " in english?");

		});
		function getQuestion2() {
				socket.emit("lang"); //tranferring the message submitScore to server
		}

		function getAnswer(clicked) {
				//console.log(clicked)// IT WORKS!!!
				let chosenAnswer = document.getElementById(clicked).innerHTML
				if (chosenAnswer == wordJSON.EnglishWord){
						outputText("you did it!")
						//move car of index 0 
						console.log(cars)
						let selectedcar = cars[0]
						selectedcar.move()
						selectedcar.draw();
						console.log(cars[0])
				}else{
						outputText("wrong answer brotato")
				}
		}
				//loop through players 
				// use server thing (server function) that retruns the id of whoever placed that car. 
				// adjust x position of that car. 



				//let defaultColours = ["red", "blue", "green", "magenta"]; //deepPink feels like a premium unlockable colour
				//let i = Math.floor(Math.random() * defaultColours.length);
				//c = defaultColours[i];



		function getPlayerID() {//client side only, works for only 1 client
				socket.emit("pid")
		}

		socket.on("id", function (data) {
				//console.log(data)
				pid = data.playerID
		});
		// // ## Psuedocode from Anu - for simplifying button indexing logic ##
		// const buttonIds = ["answer1", "answer2", "answer3", "answer4"];

		// // Choose random element index (0, 1, 2, or 3) to be the right answer
		// const correctIndex = Math.floor(Math.random() * ids.length);

		// // Renaming for clarity, this can be refactored / simplified above
		// const correctAnswer = wordJSON.EnglishWord;
		// const wrongAnswers = [wrongword1.EnglishWord, wrongword2.EnglishWord, wrongword3.EnglishWord];

		// // Loop and assign answers to buttoms
		// for (let i = 0; i <= ids.length; i++) {
		//     if (i == correctIndex) {
		//         button.innerHTML = correctAnswer;
		//     } else {
		//         button.innerHTML = wrongAnswers.pop();
		//     }
		// }
		// // ## End of Psuedocode from Anu ##

		// // ## Tips from Anu - for simplifying word fetching logic ##
		// // Use .filter on data.w[0] to filter out all the bad data
		// const valid = data.w[0].filter((item) => item && item.EnglishWord && item.FrenchWord);
		// // Use a helper function to avoid repeating the same Math.random logic + hardcoded dataset length:
		// const getRandom = () => validWords[Math.floor(Math.random() * validWords.length)];
		// const correctAnswerJSON = getRandom();
		// // And use that same function to pick three wrong answers
		// const randomWrongs = [];
		// while (randomWrongs.length < 3) {
		//     const x = getRandom().EnglishWord;
		//     if (x != correctAnswerJSON.EnglishWord and x not in randomWrongs) {wrongAnswers.push(x)}
		// }
		// // ## End of tips from Anu ##

