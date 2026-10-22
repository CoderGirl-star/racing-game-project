function outputText(txt) {
    // add txt to a new paragraph
    questionText.innerHTML = txt
}

function getRandomNumber(length){
    let num = Math.floor(Math.random() * length)
    return num
}

function countdown(){//use milis
			player.speed = 0
			outputText("3")
			outputText("2")
			outputText("1")
			player.speed = 100
		}

function coordConverter(xpos,ypos){
    xPositionFactor = xpos/width +0.081
	yPositionFactor = ypos/height +0.1
}

function positioning() {
    let acceptedPositions = [{x1: 600, y1: 700, x2: 600, y2: 500},{x1: 300, y1: 300, x2: 500, y2: 300}]
        //get random of a list, will be a json. extract x and y assign to position 1 and 2
        for (let i = 0; i < checkpoints.length -1, i++;){
            //let randomPosition = Math.floor(Math.random() * acceptedPositions.length);
		    //let selectedPosition = acceptedPositions[randomPosition];
            let selectedPosition = acceptedPositions[i]
            coordConverter(min(selectedPosition.x1,selectedPosition.x2), max(selectedPosition.y1,selectedPosition.y2))
            checkpoints[i].positionX1 = xPositionFactor*width
            checkpoints[i].positionX2 = xPositionFactor*width
            checkpoints[i].positionY1 = yPositionFactor*height
            checkpoints[i].positionY2 = yPositionFactor*height
        }
        image(img, 0, 0,windowWidth -100 ,windowHeight -150)
        for (let i = 0; i < checkpoints.length -1, i++;){
            checkpoints[i].draw()
        }
}
//function windowResized() {}
//resizeCanvas(windowWidth, windowHeight);
