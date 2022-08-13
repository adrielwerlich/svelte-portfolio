<script>
  import { Router, Route } from "svelte-routing"
  import Home from "./routes/home.svelte"
  import About from "./routes/about.svelte"
  import Stacks from "./routes/stacks.svelte"
  import DogAnimation from "./routes/game_and_animations/game/dogAnimation.svelte"
  import ParallaxBackground from "./routes/game_and_animations/game/parallaxBackground.svelte"
  import Enemies from "./routes/game_and_animations/game/enemies.svelte"
  import Explosions from "./routes/game_and_animations/game/explosions.svelte"
  
  import TopBar from "./components/TopBar.svelte"

  export let url = ""
</script>

<main style="display: flex; flex-direction: column; height: 100em;">
  <Router {url}>
    <div style=" width: 100%;">
      <TopBar />
    </div>

    <div style="padding: 1%; ">
      <Route path="/"><Home /></Route>
      <Route path="/about"><About /></Route>
      <Route path="/stacks"><Stacks /></Route>
      <Route path="/dog-animation"><DogAnimation /></Route>
      <Route path="/parallax"><ParallaxBackground /></Route>
      <Route path="/enemies"><Enemies /></Route>
      <Route path="/explosions"><Explosions /></Route>
    </div>
  </Router>
</main>

<style>
</style>
