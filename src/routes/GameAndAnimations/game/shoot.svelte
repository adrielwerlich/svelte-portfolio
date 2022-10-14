<script>
  import { onMount } from "svelte"
  import Raven from "../../../lib/Raven"
  import Explosion from "../../../lib/Explosion"
  import Particle from "../../../lib/Particle"

  let canvas,
    ctx,
    collisionCanvas,
    collisionCtx,
    timeToNextRaven = 0,
    ravenInterval = 900,
    lastTime = 0,
    score = 0,
    ravens = [],
    explosions = [],
    canvasPosition,
    particles = []

  onMount(() => {
    ctx = canvas.getContext("2d")
    ctx.font = "150px Impact"
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    collisionCtx = collisionCanvas.getContext("2d")
    collisionCanvas.width = window.innerWidth
    collisionCanvas.height = window.innerHeight

    canvasPosition = canvas.getBoundingClientRect()

    drawScore()
    window.onclick = (e) => {
      const pixelColor = collisionCtx.getImageData(
        e.x,
        e.y - canvasPosition.top,
        1,
        1
      ).data
      ravens.forEach((raven) => {
        if (haveCollision(raven, pixelColor)) {
          raven.delete = true
          score++
          explosions.push(new Explosion(raven.x, raven.y, raven.width))
        }
      })
    }

    if (canvas) {
      animate(0)
    }
  })

  function animate(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height)
    let deltaTime = timestamp - lastTime
    lastTime = timestamp
    timeToNextRaven += deltaTime
    if (timeToNextRaven > ravenInterval) {
      ravens.push(new Raven(canvas, particles))
      timeToNextRaven = 0
      ravens.sort((a, b) => {
        return a.width - b.width
      })
    }
    drawScore()
    ;[...particles, ...ravens, ...explosions].forEach((obj, index, arr) => {
      if (obj instanceof Particle && obj.delete) {
        // debugger
        // console.log("before", particles)
        arr.splice(index, 1)
        // console.log("after", particles)
      } else {
        obj.update(deltaTime)
        obj.draw(ctx, collisionCtx)
      }
    })

    ravens = ravens.filter((raven) => !raven.delete)
    explosions = explosions.filter((explosion) => !explosion.delete)
    // debugger

    if (particles.length > 300) {
      // particles = particles.splice(50, 0)
    }

    requestAnimationFrame(animate)
  }

  function haveCollision(raven, pixelColor) {
    return (
      raven.randomColors[0] === pixelColor[0] &&
      raven.randomColors[1] === pixelColor[1] &&
      raven.randomColors[2] === pixelColor[2]
    )
  }

  function drawScore() {
    ctx.fillStyle = "black"
    ctx.fillText("Score: " + score, 50, 75)
    ctx.fillStyle = "white"
    ctx.fillText("Score: " + score, 55, 80)
  }
</script>

<div id="animation-container">
  <canvas id="canvas" bind:this={canvas} />
  <canvas id="collisionCanvas" bind:this={collisionCanvas} />
</div>

<style>
  body {
    /* background: linear-gradient(to bottom, red, green, blue); */
    width: 100vw;
    height: 100vw;
    overflow: hidden;
  }

  #canvas {
    position: absolute;
    top: 17%;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-color: green; */

    /* z-index: 10; */
  }

  #collisionCanvas {
    opacity: 0;
    /* background-color: red; */
    position: absolute;
    top: 17%;
    left: 0;
    width: 100%;
    height: 100%;
    /* z-index: 1; */
  }
</style>
