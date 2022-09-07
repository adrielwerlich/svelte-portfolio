export default class Particle {
  constructor(x, y, size, color) {
    this.size = size
    this.x = x + this.size / 2
    this.y = y + this.size / 3
    this.radius = (Math.random() * this.size) / 20
    this.maxRadius = Math.random() * 20 
    this.delete = false
    this.speedX = Math.random() * 1 + 0.5
    this.color = color
  }
  update() {
    this.x += this.speedX
    this.radius += .000001
    if (this.radius > this.maxRadius - 5) {
    //   console.log("delete particle", this.radius, this.maxRadius)
      this.delete = true
    }
  }
  draw(ctx) {
    if (!this.delete) {
        ctx.save()
        ctx.globalAlpha = 1 - this.radius / this.maxRadius
        ctx.beginPath()
        ctx.fillStyle = this.color
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
    }
  }
}
