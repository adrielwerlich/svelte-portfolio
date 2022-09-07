<script>
  import svelteLogo from "../assets/svelte.svg"
  import Typewriter, { concurrent } from "svelte-typewriter"
  // import { checkLanguage } from "../lib/Utils"
  import { storeLanguage } from "../store/global"

  let language
  let title, subtitle

  storeLanguage.subscribe((value) => {
    language = value
    // console.log("home imported languge from store", language)

    if (language === "portuguese") {
      title = "Me chamo Adriel. Eu gosto de criar aplicações web"
      subtitle = "Esse é o meu portfolio feito com Svelte"
      window.document.title = "Esse é o meu portfolio feito com Svelte"
    } else {
      title = "My name is Adriel and I to like develop web applications"
      subtitle = "This is my portfolio built with Svelte"
      window.document.title = "This is my portfolio built with Svelte"
    }
  })
</script>

<div id="home-page">
  <Typewriter>
    <h1>{title}</h1>
  </Typewriter>

  <p use:concurrent={{ interval: 300 }}>Javascript</p>

  <h2>{subtitle}</h2>

  <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
</div>
