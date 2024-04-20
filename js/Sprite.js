class Sprite{
    constructor({position}){
        this.position = position
        this.image = new Image()
    }

    draw() {
        if(!this.image) return
        c.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.draw()
    }
}