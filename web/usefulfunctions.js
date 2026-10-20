//let img
//function setup() {
    //image(img, 0, 0, width, height)

//}

    //img = loadImage("map.jpg")

function outputText(txt) {
    // add txt to a new paragraph
    let newPara = document.createElement("p")
    newPara.innerHTML = txt
    questionText.appendChild(newPara)
    newPara.scrollIntoView()
    
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
function midPoint(x1,x2,y1,y2){

}
//function windowResized() {}
//resizeCanvas(windowWidth, windowHeight);
