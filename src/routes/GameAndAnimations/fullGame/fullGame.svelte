<script>
  import { onMount } from "svelte"
  import Raven from "../../../lib/Raven"
  import Explosion from "../../../lib/Explosion"
  import Particle from "../../../lib/Particle"
  import { Player } from "./player.js"
  import { InputHandler } from "./input"
  import { Background } from "./background"

  import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from "./enemies"
  import { UI } from './UI'
  let canvas,
    ctx,
    game,
    lastTime = 0

  onMount(() => {
    ctx = canvas.getContext("2d")
    ctx.font = "150px Impact"
    canvas.width = window.innerWidth
    canvas.height = 500

    game = new Game(canvas.width, canvas.height)

    if (canvas) {
      animate(0)
    }
  })

  class Game {
    constructor(width, height) {
      this.width = width
      this.height = height
      this.speed = 0
      this.maxSpeed = 3
      this.groundMargin = 80
      this.player = new Player(this)
      this.background = new Background(this)
      this.input = new InputHandler(this)
      this.UI = new UI(this)
      this.enemies = []
      this.particles = []
      this.collisions = []
      this.enemyTimer = 0
      this.enemyInterval = 1200
      this.debug = false
      this.score = 0
      this.fontColor = 'black'
      this.player.currentState = this.player.states[0]
      this.player.currentState.enter()
    }
    update(deltaTime) {
      this.background.update()
      this.player.update(this.input.keys, deltaTime)

      //handleEnemies
      if (this.enemyTimer > this.enemyInterval) {
        this.addEnemy()
        this.enemyTimer = 0
      } else {
        this.enemyTimer += deltaTime
      }
      this.enemies.forEach(enemy => {
        enemy.update(deltaTime)
        if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
      })

      // handle particles
      this.particles.forEach((particle, index) => {
        particle.update()
        if (particle.delete) this.particles.splice(index, 1)
      })
      if (this.particles.length > 80) {
        this.particles = this.particles.slice(0, 50)
      }

      // handle collision sprites
      this.collisions.forEach((collision, index) => {
        collision.update(deltaTime)
        if (collision.delete) this.collisions.splice(index, 1)
      })
    }
    draw(ctx) {
      this.background.draw(ctx)
      this.player.draw(ctx)
      this.enemies.forEach(enemy => {
        enemy.draw(ctx)
      })
      this.particles.forEach(particle => {
        particle.draw(ctx)
      })
      this.collisions.forEach(collision => {
        collision.draw(ctx)
      })
      this.UI.draw(ctx)
    }
    addEnemy() {
      if (this.speed > 0 && Math.random() < .5) this.enemies.push(new GroundEnemy(this))
      else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this))
      
      this.enemies.push(new FlyingEnemy(this))
    }
  }

  function animate(timestamp) {
    const deltaTime = timestamp - lastTime
    lastTime = timestamp
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(ctx)

    requestAnimationFrame(animate)
  }
</script>

<div id="animation-container">
  <canvas id="canvas" bind:this={canvas} />
  <img src="./assets/images/final_game_player.png" id="player" alt="player" />
  <img src="./assets/images/layer-1.png" id="layer-1" alt="layer1" />
  <img src="./assets/images/layer-2.png" id="layer-2" alt="layer2" />
  <img src="./assets/images/layer-3.png" id="layer-3" alt="layer3" />
  <img src="./assets/images/layer-4.png" id="layer-4" alt="layer4" />
  <img src="./assets/images/layer-5.png" id="layer-5" alt="layer5" />

  <img src="./assets/images/enemy_fly.png" id="enemy_fly" alt="enemy-fly" />
  <img src="./assets/images/enemy_plant.png" id="enemy_plant" alt="enemy-plant" />
  <img
    src="./assets/images/enemy_spider_big.png"
    id="enemy_spider_big"
    alt="enemy-spider"
  />
  <img src="./assets/images/fire.png" id="fire" alt="fire" />
  <img src="./assets/images/boom-2.png" id="boom" alt="boom" />

</div>

<style>
  body {
    width: 100vw;
    height: 100vw;
    overflow: hidden;
    background: white;
  }

  #canvas {
    border: 5px solid black;
    position: absolute;
    top: 17%;
    left: 0;
    width: 99.5%;
    height: 500px;
    background: gray;
  }

  img {
    display: none;
  }
</style>
