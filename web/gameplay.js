//let img
//function setup() {
    //image(img, 0, 0, width, height)

//}


//function preload() {
    //img = loadImage("map.jpg")
//}

function outputText(txt) {
    // add txt to a new paragraph
    let newPara = document.createElement("p")
    newPara.innerHTML = txt
    leaderboard.appendChild(newPara)
    newPara.scrollIntoView()
    
}

function getRandomNumber(length){
    let num = Math.floor(Math.random() * length)
    return num
}