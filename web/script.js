
		let player; //= new Car(50,50,'blue')
		let x = 0
		let y = 0
		let pid;
		let cars = [];
		let socket = io();
		let newcolour = false;
		let wordJSON;
		let setupTime
		
		function setup() {
				createCanvas(2080, 1080);
				colorMode(HSB); //simpler and easier to understand. hue saturation brightness
				background(255);
				//how to do random from list (from tutorial)
				//let a = [10, 20, 30, 40, 50];
				//let i = Math.floor(Math.random() * a.length);
				//let r = a[i];
				c = "blue";
				//socket.emit("newCo", { x: 0, y: 0, c: c, s: 0 });
				player = new Car(x,y,c,100)
				cars.push(player)

		}
		//socket.on("coord", function (data) {
				//p = new Car(data.x, data.y, data.c, data.s);
				//p.update();
				//cars.push(p);
				//getPlayerID()
				//console.log(p)
				//cars[0].move()
		//});
		function draw(){
			frameRate(25)
			player.move()
			player.update()
		}


		socket.on("newLang", function (data) {
				//server gave us newScore
				//let ids
				//randomisig happens here
				//console.log(data.w)
				const DATABASE_LENGTH  = data.w[0].length
				let qu = getRandomNumber(DATABASE_LENGTH)
				wordJSON = data.w[0][qu]; 
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
						player.speed = 250
				}else{
						outputText("wrong answer brotato")
						player.speed = 50
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

