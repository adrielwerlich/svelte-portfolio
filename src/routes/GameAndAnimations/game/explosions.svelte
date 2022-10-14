<script>
  import { onMount } from "svelte"

  let canvas,
    ctx,
    canvasPosition,
    explosions = []

  onMount(() => {
    ctx = canvas.getContext("2d")
    canvas.width = 500
    canvas.height = 700
    canvasPosition = canvas.getBoundingClientRect()

    // console.log("canvasPosition", canvasPosition)

    window.addEventListener("click", function (e) {
      createAnimation(e)
    })

    // window.addEventListener("mousemove", function (e) {
    //   createAnimation(e)
    // })

    function createAnimation(e) {
      let positionX = e.x - canvasPosition.left,
        positionY = e.y - canvasPosition.top
      explosions.push(new Explosion(positionX, positionY))

      // ctx.fillStyle = "white"
      // ctx.fillRect(positionX - 25, positionY - 25, 50, 50)
    }

    function animate() {
      if (canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        if (explosions?.length > 0) {
          for (let i = 0; i < explosions.length; i++) {
            explosions[i].update()
            explosions[i].draw()

            if (explosions[i].frame > 5) {
              explosions.splice(i, 1)
              i--
            }
          }
        }

        requestAnimationFrame(animate)
      }
    }
    animate()
  })

  class Explosion {
    constructor(x, y) {
      this.spriteWidth = 200
      this.spriteHeight = 179
      this.width = this.spriteWidth * 0.5
      this.height = this.spriteHeight * 0.5
      this.x = x // - this.width / 2
      this.y = y // - this.height / 2
      this.image = new Image()
      this.image.src = "./assets/images/boom.png"
      this.timer = this.frame = 0
      this.angle = Math.random() * 6.2
      this.sound = new Audio()
      this.sound.src = './assets/audio/boom.wav'

    }
    update() {
      if (this.frame === 0) this.sound.play()
      this.timer++
      if (this.timer % 10 === 0) {
        this.frame++
      }
    }
    draw() {
      ctx.save()
      ctx.translate(this.x, this.y)
      ctx.rotate(this.angle)
      ctx.drawImage(
        this.image,
        this.spriteWidth * this.frame,
        0,
        this.spriteWidth,
        this.spriteHeight,
        0 - this.width/2,
        0 - this.height/2,
        this.width,
        this.height
      )
      ctx.restore()
    }
  }
</script>

<div id="animation-container" style="background: gray">
  <canvas id="canvas" bind:this={canvas} />
</div>

<style>
  #canvas {
    background: lightslategrey;
    width: 500px;
    height: 700px;
  }
</style>
