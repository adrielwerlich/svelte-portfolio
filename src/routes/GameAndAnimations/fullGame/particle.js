class Particle {
    constructor(game) {
        this.game = game
        this.delete = false
    }
    update() {
        this.x -= this.speedX + this.game.speed
        this.y -= this.speedY
        this.size *= .95
        if (this.size < .5) this.delete = true
    }

}

export class Dust extends Particle {
    constructor(game, x, y) {
        super(game)
        this.size = Math.random() * 10 + 10
        this.x = x
        this.y = y
        this.speedX = Math.random()
        this.speedY = Math.random()
        this.color = 'black'
    }
    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
    }
}

export class Splash extends Particle {
    constructor(game, x, y) {
        super(game)
        this.size = Math.random() * 100 + 50
        this.x = x - this.size * .4
        this.y = y - this.size * .5
        this.speedX = Math.random() * 6 - 3
        this.speedY = Math.random() * 2 + 2
        this.gravity = 0
        this.image = document.getElementById('fire')
        // this.va = Math.random() * .4  -.2
    }
    update() {
        super.update()
        this.gravity += .1
        this.y += this.gravity
    }
    draw(ctx) {
        ctx.drawImage(
            this.image,
            this.x,
            this.y,
            this.size,
            this.size
        )
    }
}

export class Fire extends Particle {
    constructor(game, x, y) {
        super(game)
        this.image = document.getElementById('fire')
        this.size = Math.random() * 100 + 50
        this.x = x
        this.y = y
        this.speedX = 1
        this.speedY = 1
        this.angle = 0
        this.va = Math.random() * .4  -.2
    }
    update() {
        super.update()
        this.angle += this.va
        this.x += Math.sin(this.angle * 5)
    }
    draw(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.drawImage(this.image, -this.size * .5, -this.size * .5, this.size, this.size)
        ctx.restore()
    }
}
