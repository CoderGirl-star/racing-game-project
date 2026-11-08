		let player; //= new Car(50,50,'blue')
		let img
		let img2
		let x = 0
		let y = 0
		let dx;
		let dy;
		let pid;
		let cars = [];
		let checkpoints = []
		let socket = io();
		let newcolour = false;
		let wordJSON;
		let topics;
		let carPositionFactor;
		let xPositionFactor;
		let yPositionFactor;
		let wordListChosen; //boolean flag
		let chosenWordList;//the player's choice of word list
		//let mouseControlsEnabled = false
		let wrong = 0
		let arrowMode = false
		let carDirection = 1
		let hitbox2
		let time
		let previousTime 

		async function setup() {
				createCanvas(windowWidth -100 ,windowHeight-150);
				colorMode(HSB); //simpler and easier to understand. hue saturation brightness
				//background(255);
				time = millis() + 2
				img = await loadImage("map.png")
				img2 = await loadImage("map2.png")
				img3 = await loadImage("map3.png")
				//how to do random from list (from tutorial)
				//let a = [10, 20, 30, 40, 50];
				//let i = Math.floor(Math.random() * a.length);
				//let r = a[i];
				c = "blue";
				carPositionFactor = 350/height +0.3//min()  //0.1 athome
				coordConverter(300,500)
				console.log(width,height)//1436,545 home 65% of 545 = roughly 350 1812 764 college
				//console.log(xPositionFactor,yPositionFactor)
				//346 219 difference, use min()
				player = new Car(0,carPositionFactor* height ,c,100)//0,350
				cars.push(player)
				checkpoint1 = new Checkpoint(0.21*width,0.5*height,0.34*width,0.5*height,false,"right")//800,400,800,600 for college but 300, 300 500, 300 good for testing 
				checkpoint2 = new Checkpoint(0.9*width,0.9*height,0.15*width,0.4*height,false,"left")//setup values
				checkpoints.push(checkpoint1)
				checkpoints.push(checkpoint2)

		}
		
		function draw(){
				frameRate(30)
				if (carDirection == 1){
					player.move()
					while (player.speed > 100){
							player.speed -= (time +10)/1000
							console.log(player.speed)
						}
				}
				else if (carDirection == 2){
					player.moveLeft()
					while (player.speed > 100){
							player.speed -= (time +10)/1000
							//console.log(player.speed)
						}
				}
				else if (carDirection == 3){
					player.moveUp()
					while (player.speed > 100){
							player.speed -= (time + 10)/1000
							//console.log(player.speed)
						}
				}
				else if (carDirection == 4){
					player.moveDown()
					while (player.speed > 100){
							player.speed -= (time+10)/1000
							//console.log(player.speed)
						}
				}

				image(img3, 0, 0,windowWidth -100 ,windowHeight -150)
				for (i = 0; i < checkpoints.length; i++){
					checkpoints[i].draw()
					checkpoints[i].collision()

				}
				player.update()
				//console.log(player.speed)
		}


		socket.on("newLang", function (data) {
				//server gave us newScore
				//let ids
				//randomisig happens here
				//console.log(data.w)
				const DATABASE_LENGTH  = data.w[0].length
				let qu = getRandomNumber(DATABASE_LENGTH)
				wordJSON = data.w[0][qu]; //question
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

				if (wordListChosen == true){
					while (wordJSON.Topic !== chosenWordList){
						wordJSON = data.w[0][Math.floor(Math.random() * DATABASE_LENGTH)]
					}
					while (wrongword1.Topic !== chosenWordList){
						wrongword1 = data.w[0][Math.floor(Math.random() * DATABASE_LENGTH)]
					}

					while (wrongword2.Topic !== chosenWordList){
						wrongword2 = data.w[0][Math.floor(Math.random() * DATABASE_LENGTH)]
					}

					while (wrongword3.Topic !== chosenWordList){
						wrongword3 = data.w[0][Math.floor(Math.random() * DATABASE_LENGTH)]
					}

				}

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
				let correctIndex = getRandomNumber(ids.length); //random from ids : Pick element to be the correct answer
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
						//alert("you did it!")
						//console.log(checkpoints)
						wrong = 0
						outputText("well done!")
						checkpoints[checkpointCounter].directions()	
					//}

				}else{
						//alert("wrong answer")
						wrong = 1
						outputText("wrong answer")
						checkpoints[checkpointCounter].directions()
				}
		}


		function changeColour(){
			let chosenColour = document.getElementById("carColour").value
			player.colour = chosenColour
		}

		function populateOptions(){
			socket.emit("lists")
		}

		socket.on("returned_lists", function (data) {
			//console.log(data.t[0][0])//[0]
			let s = new Set()
			for (let i = 0; i < 720; i++) {//loop through the database, extract words. put them in array, make it a set, turn it back to array
				entry = data.t[0][i]//[0]
				//console.log(entry)
				let entryWord = entry.Topic.toString()
				//console.log(entryWord)
				s.add(entryWord)
			}
			
        	topics = [...s]
			//console.log(topics)
			//so what i did to get this to work is that a list doesnt go through a set and then to a list anymore. set is made first. everything directly added to the set
			//then its converted to list
			//adding toString stopped it becoming a object, which is why they were objects still in the list. 
			// entry may have been constantly redefined as well. 

			//assigning topics from the list to dropdown options
			let option_ids = ["option0","option1","option2","option3","option4","option5","option6","option7","option8","option9","option10","option11","option12","option13","option14","option15","option16","option17","option18"];
			for (let i = 0; i < option_ids.length -1; i++) {
				topicText = document.getElementById(option_ids[i])
				topicText.innerHTML = topics[i]
			}
		});

		function chooseWordList(){
			wordListChosen = true
			let getWordList = (document.getElementById("wordsList").selectedIndex)
			chosenWordList = topics[getWordList]
			//console.log(chosenWordList)
		}

		function mouseClicked(){
			console.log(mouseX,mouseY)
		}

function keyPressed() {
	if (keyCode === 38) {//up
        player.moveUp()
        return false;
    }
	if (keyCode === 37) {//<---
        player.moveLeft()
        return false;
    }
    if (keyCode === 38) {//up
        player.moveUp()
        return false;
    }
    if (keyCode === 40) {//down
        player.moveDown()
        return false;
    }

	if (keyCode === 187) {//+=
        player.speed = 0
		arrowMode = true
        return false;
    }
	
}
	