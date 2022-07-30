<script>
    import { onMount } from "svelte"
  
    let canvas,
    ctx


    onMount(() => {
    ctx = canvas.getContext("2d")
    // ;(CANVAS_WIDTH = canvas.width = 600),
    //   (CANVAS_HEIGHT = canvas.height = 600),
    //   (playerImage = new Image())
    // playerImage.src = "src/assets/animations/dog/shadow_dog.png"
    // ;(frameX = 0), (frameY = 4), (gameFrame = 0)

    // animate()
  })

</script>

<canvas id="dog-canvas" bind:this={canvas} />
