
class Car {
    constructor(x, y, colour,speed) {
        this.x = x
        this.y = y
        this.colour = colour
        this.speed = speed
    }
    draw() {
        fill(this.colour)
        rect(this.x, this.y, 60, 30)
        fill("black")
        circle(this.x + 10, this.y + 25,20)
        circle(this.x + 50, this.y + 25,20)
        noFill()
    }


    move(){
            // this.speed = 2 // Speed factor
            // let distX = targetX - this.x; // Distance to the cursor on X axis
            // let distY = targetY - this.y; // Distance to the cursor on Y axis
            // let dist = Math.sqrt(distX * distX + distY * distY); // Total distance f is this pythagoras
            // this.x += distX / dist * this.speed; // Move along the X axis
            // this.y += distY / dist * this.speed; // Move along the Y axis

						console.log("Move")
        
    }

    
}
