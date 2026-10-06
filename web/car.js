


class Car {
    constructor(x, y, colour,speed) {
        this.x = x
        this.y = y
        this.colour = colour
        this.speed = speed
    }
    update() {
        //console.log(this.x,this.y)
        clear()
        fill(this.colour)
        rect(this.x, this.y, 60, 30)
        fill("black")
        circle(this.x + 10, this.y + 25,20)
        circle(this.x + 50, this.y + 25,20)
        noFill()
    }


    move(){
            let smoothMove = lerp(0,this.speed,0.1)
            console.log(smoothMove)
            this.x += smoothMove
            if (this.x > windowWidth){
                this.x = 0
                this.speed = 100
                //this.speed = 0
            }
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