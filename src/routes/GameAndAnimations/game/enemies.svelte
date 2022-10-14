<script>
  import { onMount } from "svelte"

  let canvas,
    x = 0,
    gameLayers,
    gameSpeed = 5,
    gameFrame = 0,
    numberOfEnemies = 2,
    enemiesArray = [],
    enemyImage = "",
    ctx,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    playerImage,
    spriteWidth = 575,
    spriteHeight = 523,
    frameX,
    frameY,
    staggerFrames = 11

  onMount(() => {
    ctx = canvas.getContext("2d")
    ;(CANVAS_WIDTH = canvas.width = 600),
      (CANVAS_HEIGHT = canvas.height = 600),
      (playerImage = new Image())
    ;(frameX = 0), (frameY = 4), (gameFrame = 0)

    for (let i = 0; i < numberOfEnemies; i++) {
      enemiesArray.push(new Enemy(i % 2))
    }

    animate()
  })

  class Enemy {
    constructor(t) {
      this.image = new Image()
      if (t === 0) {
        this.image.src = "./assets/images/enemies/enemy1.png"
        this.image.dataset.type = "1"
        this.spriteWidth = 293
        this.spriteHeight = 155
      } else {
        this.image.src = "./assets/images/enemies/enemy2.png"
        this.image.dataset.type = "2"
        this.spriteWidth = 266
        this.spriteHeight = 188
        this.speed = Math.random() * 4 + 1
      }

      this.width = this.spriteWidth / 2
      this.height = this.spriteHeight / 2
      this.x = Math.random() * (canvas.width - this.width)
      this.y = Math.random() * (canvas.height - this.height)
      this.frame = 0
      this.flapSpeed = Math.floor(Math.random() * 20 + 1)
      this.angle = 0
      this.angleSpeed = Math.random() * 0.2
      this.curve = Math.random() * 10
    }
    update() {
      if ((this.image.dataset.type = "1")) {
        this.x += Math.random() * 15 - 7.5
        this.y += Math.random() * 5 - 2.5
      } else if ((this.image.dataset.type = "2")) {
        this.x -= this.speed

        if (this.x + this.width < 0) {
          this.x = canvas.width
        }
        this.y += 3 * Math.sin(this.angle)
        this.angle += this.angleSpeed
      }
      if (gameFrame % this.flapSpeed === 0) {
        this.frame > 4 ? (this.frame = 0) : this.frame++
      }
    }
    draw() {
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
  }

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    enemiesArray.forEach((enemy) => {
      enemy.update()
      enemy.draw()
    })
    gameFrame++
    requestAnimationFrame(animate)
  }
</script>

<div id="animation-container">
  <canvas id="canvas" bind:this={canvas} />
</div>

<style>
  #canvas {
    width: 600px;
    height: 600px;
    border: 1px solid black;
  }

  #animation-container {
    background: burlywood;
  }
</style>
