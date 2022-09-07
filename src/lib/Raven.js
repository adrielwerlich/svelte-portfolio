import Particle from "./Particle"

export default class Raven {
  constructor(canvas, particles) {
    this.particles = particles
    this.canvas = canvas
    this.spriteWidth = 271
    this.spriteHeight = 192
    this.sizeModifier = Math.random() * 0.6
    this.width = this.spriteWidth * this.sizeModifier
    this.height = this.spriteHeight * this.sizeModifier
    this.x = canvas.width
    this.y = Math.random() * (canvas.height - this.height)
    this.directionX = Math.random() * 1.5
    this.directionY = Math.random() * 1
    this.delete = false
    this.image = new Image()
    this.image.src = "./assets/images/raven.png"
    this.frame = 0
    this.maxFrame = 4
    this.timeSinceFlap = 0
    this.timeSinceFlap = 0
    this.flapInterval = Math.random() * 50 + 50
    this.randomColors = [
      this.getRandomColor(),
      this.getRandomColor(),
      this.getRandomColor(),
    ]
    this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[2]})`
  }

  update(deltaTime, particles) {
    if (this.y < 0 || this.y > this.canvas.height - this.height) {
      this.directionY = this.directionY * -1
    }
    this.x -= this.directionX
    this.y += this.directionY
    if (this.x < 0 - this.width) this.delete = true
    this.timeSinceFlap += deltaTime
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) this.frame = 0
      else this.frame++
      this.timeSinceFlap = 0
      if (this.particles.length < 550) {
        this.particles.push(
          new Particle(this.x, this.y, this.width, this.color)
        )
      } else {
          this.particles.splice(50, 60)
      }
    }
  }
  draw(ctx, collisionCtx) {
    collisionCtx.fillStyle = this.color
    collisionCtx.fillRect(this.x, this.y, this.width, this.height)
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height
    )
  }
  getRandomColor() {
    return Math.floor(Math.random() * 255)
  }
}
