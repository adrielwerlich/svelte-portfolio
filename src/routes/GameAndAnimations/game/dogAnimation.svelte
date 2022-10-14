<script>
  import { onMount } from "svelte"

  let canvas,
    x = 0,
    gameLayers,
    gameSpeed = 5,
    gameFrame = 0,
    backgroundLayer1,
    backgroundLayer2,
    backgroundLayer3,
    backgroundLayer4,
    backgroundLayer5,
    numberOfEnemies = 100,
    enemiesArray = [],
    enemyImage = '',
    ctx,
    CANVAS_WIDTH,
    CANVAS_HEIGHT,
    playerImage,
    spriteWidth = 575,
    spriteHeight = 523,
    frameX,
    frameY,
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
    playerImage.src = "./assets/images/shadow_dog.png"

    backgroundLayer1 = new Image()
    backgroundLayer1.src = "./assets/images/backgroundLayers/layer-1.png"

    backgroundLayer2 = new Image()
    backgroundLayer1.src = "./assets/images/backgroundLayers/layer-2.png"

    backgroundLayer3 = new Image()
    backgroundLayer1.src = "./assets/images/backgroundLayers/layer-3.png"

    backgroundLayer4 = new Image()
    backgroundLayer1.src = "./assets/images/backgroundLayers/layer-4.png"

    backgroundLayer5 = new Image()
    backgroundLayer1.src = "./assets/images/backgroundLayers/layer-5.png"
    ;(frameX = 0), (frameY = 4), (gameFrame = 0)

    loadLayers()
    animate()
  })

  class Layer {
    constructor(image, speedModifier) {
      this.x = 0
      this.y = 0
      this.width = 2400
      this.height = 700
      this.x2 = this.width
      this.image = image
      this.speedModifier = speedModifier
      this.speed = gameSpeed * this.speedModifier
    }

    update() {
      this.speed = gameSpeed * this.speedModifier
      if (this.x <= -this.width) {
        this.x = 0
      }
      this.x = this.x - this.speed

    }
    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
  }

  class Enemy {
    constructor() {
        this.image = new Image()
        this.image.src = './assets/images/enemies/enemy1.png'
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.speed = Math.random() * 4 - 2
        this.spriteWidth = 293
        this.spriteHeight = 155
        this.width = this.spriteWidth / 2.5
        this.height = this.spriteHeight / 2.5
        this.frame = 0
        this.flapSpeed = Math.floor(Math.random() * 3 + 1)

    }
    update() {
        this.x += this.speed
        this.y += this.speed
        if (gameFrame % this.flapSpeed === 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++
        }
    }
    draw() {
        ctx.fillRect(this.x, this.y)
    }
  }

  
  function loadLayers() {
      
      const layer1 = new Layer(backgroundLayer1, 0.2),
        layer2 = new Layer(backgroundLayer2, 0.4),
        layer3 = new Layer(backgroundLayer3, 0.6),
        layer4 = new Layer(backgroundLayer4, 0.8),
        layer5 = new Layer(backgroundLayer5, 1)
        gameLayers = [layer1, layer2, layer3, layer4, layer5]
  }

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    gameLayers.forEach(layer => (layer.update(), layer.draw()))
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

    ctx.drawImage(backgroundLayer1, x, 0)

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
