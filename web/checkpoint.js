let checkpointCounter = -1
class Checkpoint{
    constructor(positionX1,positionX2,positionY1,positionY2,completed,direction){
        this.positionX1 = positionX1
        this.positionX2 = positionX2
        this.positionY1 = positionY1
        this.positionY2 = positionY2
        this.completed = completed
        this.direction = direction
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
        if (hitbox < 100){//arbitrary number - a small number so it stops closer to the checkpoint
            if (this.completed == false){
                player.speed = 0
                document.getElementsByClassName("container")[0].style.display = "block"
                checkpointCounter += 1
                getQuestion2()
                this.completed = true
                //console.log(checkpointCounter)
                if (dist(player.x,player.y,this.positionX1, this.positionY1) > 250){//surprisingly convient way to exit arrow mode
                    player.speed = 100
                    arrowMode = false
                }
                //console.log(checkpointLength)//200
                //console.log(player.x,player.y, this.positionY1, this.positionY2)
            }
            //if (this.completed = true){
                    //document.getElementsByClassName("container")[0].style.display = "none"
                //}
        }
    }

    directions(){
        hitbox2 = min(dist(player.x,player.y, checkpoints[checkpointCounter].positionX1, checkpoints[checkpointCounter].positionY1),dist(player.x,player.y, checkpoints[checkpointCounter].positionX2, checkpoints[checkpointCounter].positionY2))
							if (checkpoints[checkpointCounter].direction == "right"){//1
								if (hitbox2 <=100){
									carDirection = 1
                                    if (wrong == 1){
                                        player.speed = 75
                                    }else{
                                        player.speed = 200
                                        previousTime = millis()
                                    }
									
								}
							}
							else if (checkpoints[checkpointCounter].direction == "left"){//2
							if (hitbox2 <=100){
								carDirection = 2
								if (wrong == 1){
                                        player.speed = 75
                                    }else{
                                        player.speed = 200
                                    }
							}
						}
							else if (checkpoints[checkpointCounter].direction == "up"){//3
							if (hitbox2 <=100){
								carDirection = 3
								if (wrong == 1){
                                        player.speed = 75
                                    }else{
                                        player.speed = 200
                                    }
							}

						}
							else if (checkpoints[checkpointCounter].direction == "down"){//4
								if (hitbox2 <=100){
									carDirection = 4
									if (wrong == 1){
                                        player.speed = 75
                                    }else{
                                        player.speed = 200
                                    }
							}

						}
    }

}



//checkpoints = array, object of some kind that spawns a  neon green line. it can only spawn when dist between 2 points is 100 (restricted where it can spawn) then theres collison.update/draw  
//each checkpoint object has: position1 and 2 (two points randomly generated between set limits, or random from array), flag of completed or no (resets at end of map) 
//0.4*width,0.9*height,0.2*width,0.9*height
//0.85*width,0.9*height,0.25*width,0.6*height
//0.9*width,0.9*height,0.2*width,0.52*height
//0.9*width,0.9*height,0.15*width,0.4*height
//xPositionFactor*width,yPositionFactor*height,xPositionFactor*width,yPositionFactor*height