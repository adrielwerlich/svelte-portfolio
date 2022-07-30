<script>
  import { Router, Route } from "svelte-routing"
  import Home from "./routes/home.svelte"
  import About from "./routes/about.svelte"
  import Stacks from "./routes/stacks.svelte"
  import DogAnimation from "./routes/game_and_animations/dog/dogAnimation.svelte"
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
    </div>
  </Router>
</main>

<style>
</style>
