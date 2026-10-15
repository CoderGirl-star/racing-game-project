const { LIMIT_LENGTH } = require("sqlite3")

class Checkpoint{
    constructor(position1,position2,completed){
        this.position1 = position1
        this.position2 = position2
        this.completed = false
    }

    draw(){
        let acceptedPositions = [{},{},{}]
        //get random of a list, will be a json. extract x and y assign to position 1 and 2
        //let a = [10, 20, 30, 40, 50];
		//let i = Math.floor(Math.random() * a.length);
		//let r = a[i];
        stroke("lime")
        line()
        noStroke()
    }

    collision(){
        if (dist(mouseX,mouseY, this.x, this.y) < 60){

        }//rectwidth
    }
}