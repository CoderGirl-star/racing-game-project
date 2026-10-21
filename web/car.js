


class Car {
    constructor(x, y, colour,speed) {
        this.x = x
        this.y = y
        this.colour = colour
        this.speed = speed
    }
    update() {
        //console.log(this.x,this.y)
        fill(this.colour)
        rect(this.x, this.y, 60, 30)
        fill("black")
        circle(this.x + 10, this.y + 25,20)
        circle(this.x + 50, this.y + 25,20)
        noFill()
    }


    move(){
            let smoothMove = lerp(0,this.speed,0.1)
            this.x += smoothMove
            if (this.x > windowWidth){
                this.x = 0
                this.y = carPositionFactor * height 
                this.speed = 100
                for (let i = 0; i < checkpoints.length; i++) {
                    checkpoints[i].completed = false
                }
                positioning()
                //mouseControlsEnabled = false
                //this.speed = 0
            }
    }

    moveUp(){
        let smoothMove = lerp(0,this.speed,0.1)
            this.y -= smoothMove
            if (this.y > windowHeight){
                this.y = 0
                this.speed = 100
                //this.speed = 0
            }
    }

    moveDown(){
            let smoothMove = lerp(0,this.speed,0.1)
            this.y += smoothMove
            if (this.y > windowWidth){
                this.y = 0
                this.speed = 100
                //this.speed = 0
            }
    }


    moveLeft(){
            //translate(this.x,this.y)
            let smoothMove = lerp(0,this.speed,0.1)
            this.x -= smoothMove
            if (this.x > windowWidth){
                this.x = 0
                this.speed = 100
                //this.speed = 0
            }
            //rotate(90)
    }

    
}

//let startTime = millis() / 1000//marks when the loop starts in seconds
            //for (let i = 0; i < 10; i++) {
                //if (startTime == startTime + 1000){//every second??
                    //let accelerationTime = millis() - setupTime
                    //console.log(accelerationTime)
                    
                    //startTime = millis()
               // }
                
            //}