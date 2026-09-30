
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
            this.speed = 2
            let smoothMove = lerp(this.x, this.x+200,0.1)
            console.log(smoothMove)
            this.x += smoothMove
                    
    }

    
}
