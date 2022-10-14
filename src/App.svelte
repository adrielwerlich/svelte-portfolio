<script>
  import { onMount } from "svelte"
  import { Router, Route } from "svelte-routing"
  import Home from "./routes/home.svelte"
  import About from "./routes/about.svelte"
  import Stacks from "./routes/stacks.svelte"
  import DogAnimation from "./routes/GameAndAnimations/game/dogAnimation.svelte"
  import ParallaxBackground from "./routes/GameAndAnimations/game/parallaxBackground.svelte"
  import Enemies from "./routes/GameAndAnimations/game/enemies.svelte"
  import Explosions from "./routes/GameAndAnimations/game/explosions.svelte"
  import Shoot from "./routes/GameAndAnimations/game/shoot.svelte"
  import FullGame from "./routes/GameAndAnimations/fullGame/fullGame.svelte"
  import TopBar from "./components/TopBar.svelte"
  import sendRequestInfo from './lib/airtable.js'

  export let url = ""

  let ipInfo,
    alreadySent = false,
    start = new Date().toLocaleString("pt-BR")
  onMount(() => {
    if (window.location.href.indexOf("localhost") === -1) {
      window.onbeforeunload = (e) => sendStats(e)
      window.onblur = (e) => sendStats(e)

      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((json) => ((ipInfo = json) 
        // ,console.log(json)
        ))
    }
  })

  function sendStats(e) {
    if (!alreadySent) {
      e.returnValue = "o/"
      !ipInfo ? (ipInfo = {}) : null
      ipInfo.timeSpentInfo = {
        start: start,
        end: new Date().toLocaleString("pt-BR"),
        typeOfEvent: e.type,
      }
      sendRequestInfo(ipInfo)
      alreadySent = true
    }
  }
</script>

<main style="display: flex; flex-direction: column;">
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
      <Route path="/shoot-the-raven"><Shoot /></Route>
      <Route path="/full-game"><FullGame /></Route>
    </div>
  </Router>
</main>

<style>
</style>
