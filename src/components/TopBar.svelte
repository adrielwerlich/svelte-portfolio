<script>
  import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar"
  import IconButton from "@smui/icon-button"
  import brazilFlag from "../assets/brazil-flag.png"
  import usaFlag from "../assets/united-states.png"

  import { Link } from "svelte-routing"

  import { storeLanguage } from "../store/global"

  function setLanguange(value) {
    storeLanguage.set(value)
  }

  let prominent = false
  let dense = false
  let secondaryColor = false
  let language 

  storeLanguage.subscribe((value) => (language = value))

</script>

<div class="flexy">
  <div class="top-app-bar-container">
    <TopAppBar
      variant="static"
      {prominent}
      {dense}
      color={secondaryColor ? "secondary" : "primary"}
    >
      <Row>
        <Section>
          <IconButton class="material-icons">menu</IconButton>
          <Title>Svelte Portfolio Adriel</Title>
          <Section align="end" toolbar>
            <IconButton>
              {#if language == "portuguese"}
                <img src={usaFlag} alt="usa flag" on:click={() => setLanguange('english')} />
              {:else}
                <img src={brazilFlag} alt="brazil flag" on:click={() => setLanguange('portuguese')}/>
              {/if}
            </IconButton>
            <nav>
              <Link to="/" style="color: white">Home</Link>
              <Link to="about" style="color: white">About</Link>
              <Link to="stacks" style="color: white">Stacks</Link>
              <Link to="dog-animation" style="color: white">Dog animation</Link>
              <!-- <Link to="parallax" style="color: white">Parallax</Link>
              <Link to="enemies" style="color: white">Enemies</Link>
              <Link to="explosions" style="color: white">Explosions</Link> -->
              <Link to="shoot-the-raven" style="color: white">Shoot the raven</Link>
            </nav>
          </Section>
        </Section>
      </Row>
    </TopAppBar>
  </div>
</div>

<style>
  .top-app-bar-container {
    width: 100%;

    border: 1px solid
      var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    background-color: var(--mdc-theme-background, #fff);

    overflow: auto;
    display: inline-block;
  }

  @media (max-width: 480px) {
    .top-app-bar-container {
      margin-right: 0;
    }
  }

  .flexy {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }
</style>
