<script>
  import { onMount } from "svelte"

  let canvas,
    selected,
    ctx,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    playerImage,
    spriteWidth = 575,
    spriteHeight = 523,
    frameX,
    frameY,
    gameFrame,
    staggerFrames = 11,
    playerState = "idle",
    spriteAnimations = [],
    animationStates = [
      {
        name: "idle",
        frames: 7,
      },
      {
        name: "jump",
        frames: 7,
      },
      {
        name: "fall",
        frames: 7,
      },
      {
        name: "run",
        frames: 9,
      },
      {
        name: "dizzy",
        frames: 11,
      },
      {
        name: "sit",
        frames: 5,
      },
      {
        name: "roll",
        frames: 7,
      },
      {
        name: "bite",
        frames: 7,
      },
      {
        name: "ko",
        frames: 12,
      },
      {
        name: "getHit",
        frames: 4,
      },
    ]

  animationStates.forEach((state, index) => {
    let frames = {
      loc: [],
    }
    for (let i = 0; i < state.frames; i++) {
      let positionX = i * spriteWidth,
        positionY = index * spriteHeight

      frames.loc.push({ x: positionX, y: positionY })
    }
    spriteAnimations[state.name] = frames
  })

  onMount(() => {
    ctx = canvas.getContext("2d")
    ;(CANVAS_WIDTH = canvas.width = 600),
      (CANVAS_HEIGHT = canvas.height = 600),
      (playerImage = new Image())
    playerImage.src = "src/assets/animations/dog/shadow_dog.png"
    ;(frameX = 0), (frameY = 4), (gameFrame = 0)

    animate()
  })

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    let position =
      Math.floor(gameFrame / staggerFrames) %
      spriteAnimations[playerState].loc.length

    frameX = spriteWidth * position

    frameY = spriteAnimations[playerState].loc[position].y
    ctx.drawImage(
      playerImage,
      frameX,
      frameY,
      spriteWidth,
      spriteHeight,
      0,
      0,
      spriteWidth,
      spriteHeight
    )

    if (gameFrame % staggerFrames == 0) {
      if (frameX < 6) frameX++
      else frameX = 0
    }

    gameFrame++
    requestAnimationFrame(animate)
  }
</script>

<div id="dog-animation-container">
  <div id="controls">
    <label for="anims">Animation</label>
    <select name="anims" id="anims" bind:value={playerState}>
      <option value="idle">idle</option>
      <option value="jump">jump</option>
      <option value="fall">fall</option>
      <option value="run">run</option>
      <option value="dizzy">dizzye</option>
      <option value="sit">sit</option>
      <option value="roll">roll</option>
      <option value="bite">bite</option>
      <option value="ko">ko</option>
      <option value="getHit">getHit</option>
    </select>
    <p>(selected value: {playerState})</p>
  </div>
  <canvas id="dog-canvas" bind:this={canvas} />
</div>

<style>
  #dog-canvas {
    width: 600px;
    height: 600px;
  }
</style>
