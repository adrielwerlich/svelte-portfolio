<script>
  import LayoutGrid, { Cell } from "@smui/layout-grid"
  import Card, { Content, PrimaryAction, Media, MediaContent } from "@smui/card"
  import { storeLanguage } from "../store/global"
  import nodeLogo from "../assets/node-logo.png"
  import adonisLogo from "../assets/adonis-logo.jpg"
  import cSharp from "../assets/csharp-logo.png"
  import firebaseLogo from "../assets/firebase-logo.png"

  let language, title

  storeLanguage.subscribe((value) => {
    language = value
    if (language === "portuguese") {
      title = "Tecnologias que tenho experiência"
      window.document.title = "Tecnologias que tenho experiência"
    } else {
      title = "Techs and stacks I work with"
      window.document.title = "Techs and stacks I work with"
    }
  })

  const techs = [
    {
      image: nodeLogo,
      title: "Node.js",
      snnipetPt: "Aplicações usando Node.js",
      snnipetEn: "Apps created with Node.js",
    },
    {
      image: adonisLogo,
      title: "AdonisJs",
      snnipetPt: "Aplicações usando Adonis",
      snnipetEn: "Apps created with Adonis",
    },
    {
      image: cSharp,
      title: "C#",
      snnipetPt: "Aplicações usando C#",
      snnipetEn: "Apps created with C#",
    },
    {
      image: firebaseLogo,
      title: "Firebase",
      snnipetPt: "Aplicações usando Firebase",
      snnipetEn: "Apps created with Firebase",
    },
  ]
</script>

<div id="about-page">
  <h1>{title}</h1>
  <LayoutGrid>
    {#each techs as tech, i}
      <Cell>
        <div class="card">
          <div class="card-display" style="cursor: pointer">
            <div class="card-container">
              <Card>
                <div
                  style="color: #fff; position: relative; padding: 10px; height: 68px"
                >
                  <h2
                    class="mdc-typography--headline6"
                    style="margin: 0; color: black"
                  >
                    {tech.title}
                  </h2>
                </div>
                <PrimaryAction on:click={() => console.log("clicked")}>
                  <Media
                    class="card-media"
                    aspectRatio="square"
                    style="background-image: url({tech.image}); background-size: 180px 170px;"
                  >
                    <MediaContent />
                  </Media>
                  <div class="fixed-height">
                    <Content class="mdc-typography--body2" style="color: black">
                      {#if language == "portuguese"}
                        {tech.snnipetPt}
                      {:else}
                        {tech.snnipetEn}
                      {/if}
                    </Content>
                  </div>
                </PrimaryAction>
              </Card>
            </div>
          </div>
        </div>
      </Cell>
    {/each}
  </LayoutGrid>
  <div />
</div>

<style>
  .card {
    margin: 40px 20px;
    
    /* height: 280px; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: var(--mdc-theme-secondary, #333); */
    color: var(--mdc-theme-on-secondary, #fff);
    max-height: 225px !important;
    min-height: 225px !important;
    max-width: 225px !important;
    min-width: 225px !important;
  }

  .card-display, .card-container, * :global(.mdc-card)  {
    max-height: 375px !important;
    min-height: 375px !important;
    max-width: 225px !important;
    min-width: 225px !important;
  }
</style>
