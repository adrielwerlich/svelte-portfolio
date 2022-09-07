export default class Explosion {
  constructor(x, y, size) {
    this.image = new Image()
    this.image.src = "./assets/images/boom.png"
    this.spriteWidth = 200
    this.spriteHeight = 179
    this.size = size
    this.x = x
    this.y = y
    this.frame = 0
    this.sound = new Audio()
    this.sound.src = "./assets/audio/boom.wav"
    this.sound.volume = .02
    this.timeSinceLastFrame = 0
    this.frameInterval = 200
    this.delete = false
  }
  update(deltaTime) {
    if (this.frame === 0) this.sound.play()
    this.timeSinceLastFrame += deltaTime
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame++
      if (this.frame > 5) this.delete = true
    }
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y - this.size / 4,
      this.size,
      this.size
    )
  }
}
