
class Checkpoint{
    constructor(position1,position2,completed){
        this.position1 = position1
        this.position2 = position2
        this.completed = completed
    }

    draw(){
        //let acceptedPositions = [{},{},{}]
        //get random of a list, will be a json. extract x and y assign to position 1 and 2
        //let a = [10, 20, 30, 40, 50];
		//let i = Math.floor(Math.random() * a.length);
		//let r = a[i];
        stroke("lime")
        strokeWeight(5)
        line(this.position1,400, 800,this.position2)//x1,y1,x2,y2
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
