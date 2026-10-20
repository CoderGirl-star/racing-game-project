
class Checkpoint{
    constructor(positionX1,positionX2,positionY1,positionY2,completed){
        this.positionX1 = positionX1
        this.positionX2 = positionX2
        this.positionY1 = positionY1
        this.positionY2 = positionY2
        this.completed = completed
    }

    draw(){
        stroke("lime")
        strokeWeight(5)
        line(this.positionX1,this.positionY1,this.positionX2,this.positionY2)//x1,y1,x2,y2
        strokeWeight(1)
        noStroke()
    }

    collision(){
        //let checkpointLength = dist(this.positionX1,this.positionY1,this.positionX2,this.positionY2)
        //mouseControlsEnabled = false
        let hitbox = min(dist(player.x,player.y, this.positionX1, this.positionY1),dist(player.x,player.y, this.positionX2, this.positionY2))//is the first or second coords closer
        if (hitbox < 100){
            if (this.completed == false){
                player.speed = 0
                //let contents = document.getElementsByClassName("container")[0]
                //contents.removeAttribute("hidden");//unhides the container
                getQuestion2()
                this.completed = true
                //console.log(checkpointLength)//200
                //console.log(player.x,player.y, this.positionY1, this.positionY2)
            }
        }
    }
}

//checkpoints = array, object of some kind that spawns a  neon green line. it can only spawn when dist between 2 points is 100 (restricted where it can spawn) then theres collison.update/draw  
//each checkpoint object has: position1 and 2 (two points randomly generated between set limits, or random from array), flag of completed or no (resets at end of map) 
