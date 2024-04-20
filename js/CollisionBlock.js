class CollisionBlock{
    constructor({position, height = 16, color}){
        this.position = position
        this.width = 16
        this.height = height
        this.color = color
    }

    draw() {
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
    }
}