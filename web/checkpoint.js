
class Checkpoint{
    constructor(positionX1,positionX2,positionY1,positionY2,completed){
        this.positionX1 = positionX1
        this.positionX2 = positionX2
        this.positionY1 = positionY1
        this.positionY2 = positionY2
        this.completed = completed
    }

    draw(){
        let acceptedPositions = [{x1: 800, y1: 400, x2: 800, y2: 600,},{},{}]
        //get random of a list, will be a json. extract x and y assign to position 1 and 2
        //let a = [10, 20, 30, 40, 50];
		//let i = Math.floor(Math.random() * a.length);
		//let r = a[i];
        stroke("cyan")
        strokeWeight(5)
        line(this.positionX1,this.positionY1,this.positionX2,this.positionY2)//x1,y1,x2,y2
        strokeWeight(1)
        noStroke()
    }

    collision(){
        if (dist(player.x,player.y, this.x, this.y) < 60){
            //do something
        }
    }
}

//checkpoints = array, object of some kind that spawns a  neon green line. it can only spawn when dist between 2 points is 100 (restricted where it can spawn) then theres collison.update/draw  
//each checkpoint object has: position1 and 2 (two points randomly generated between set limits, or random from array), flag of completed or no (resets at end of map) 
