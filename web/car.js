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
                    checkpointCounter = -1
                    
            }
            
    }


    moveUp(){
        if (arrowMode == true){
            this.y -= 10
            if (this.y > windowHeight){
                this.x = 0
                this.y = carPositionFactor * height
                this.speed = 100
                arrowMode = false
                for (let i = 0; i < checkpoints.length; i++) {
                    checkpoints[i].completed = false
                }
                carDirection = 1
                checkpointCounter = -1
            }
        }else{//without arrow mode
            let smoothMove = lerp(0,this.speed,0.1)
            this.y -= smoothMove
            console.log(this.x,this.y)
            if (this.y < 10){
                this.x = 0
                this.y = carPositionFactor * height
                this.speed = 100
                for (let i = 0; i < checkpoints.length; i++) {
                    checkpoints[i].completed = false
                }
                checkpointCounter = -1
                carDirection = 1
            }
        }
    }

    moveDown(){
        if (arrowMode == true){
            this.y += 10
            if (this.y > windowHeight){
                this.x = 0
                this.y = carPositionFactor * height
                this.speed = 100
                arrowMode = false
                for (let i = 0; i < checkpoints.length; i++) {
                    checkpoints[i].completed = false
                }
                carDirection = 1
                checkpointCounter = -1
            }
        }else{//without arrow mode
            let smoothMove = lerp(0,this.speed,0.1)
            this.y += smoothMove
            if (this.y > windowHeight){
                this.x = 0
                this.y = carPositionFactor * height 
                this.speed = 100
                for (let i = 0; i < checkpoints.length; i++) {
                    checkpoints[i].completed = false
                }
                checkpointCounter = -1
                carDirection = 1
            }
        }
    }


    moveLeft(){
        if (arrowMode == true){
            this.x -= 10
            if (this.x < 0){
                this.x = 0
                this.y = carPositionFactor * height
                this.speed = 100
                arrowMode = false
                for (let i = 0; i < checkpoints.length; i++) {
                    checkpoints[i].completed = false
                }
                checkpointCounter = -1
                carDirection = 1
            }
        }else{//without arrow mode
            let smoothMove = lerp(0,this.speed,0.1)
            this.x -= smoothMove
            if (this.x > windowWidth){
                this.x = 0
                this.y = carPositionFactor * height
                this.speed = 100
                checkpointCounter = -1
                carDirection = 1
            }
        }
    }

    
}
