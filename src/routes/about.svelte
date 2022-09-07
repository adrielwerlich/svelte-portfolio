<script>
  import { getProjects } from "../lib/Utils"
  import Card from "../components/Card.svelte"
  import LayoutGrid, { Cell } from "@smui/layout-grid"
  import Loader from "../components/Loader.svelte"

  import { storeLanguage } from "../store/global"

  let language, title

  storeLanguage.subscribe((value) => {
    language = value
    if (language === "portuguese") {
      title = "Meus projetos "
      window.document.title = "Meus projetos "
    } else {
      title = "My projects / Techs and stacks I work with"
      window.document.title = "My projects / Techs and stacks I work with"
    }
  })


  language = "english"

  let projectsPt = [],
    projectsEn = []

  getProjects().then((result) => {
    for (var i = 0; i < result.length; i++) {
      if (Object.keys(result[i].fields).length > 0) {
        let project = {
          title: result[i].fields.Title,
          date: result[i].fields["Date Published"],
          snippet: result[i].fields.Excerpt,
          image: result[i].fields.Image[0].url,
          slug: result[i].fields.slug,
          language: result[i].fields.language,
          link: result[i].fields.link,
          body: result[i].fields.Body,
        }
        project.language == "pt"
          ? projectsPt.push(project)
          : projectsEn.push(project)
      }
    }
    setTimeout(() => {
      projectsPt = [...projectsPt]
      projectsEn = [...projectsEn]
    }, 1000)
  })
</script>

<div id="about-page">
  <h1>{title}</h1>

  <!-- {#key projectsPt } -->
  {#if projectsPt.length == 0}
    <!-- <p>...LOADING</p> -->
    <div style="display: flex; justify-content: center;">
      <Loader size="60" unit="px" duration="1s" />
    </div>
  {/if}

  {#if language == "portuguese"}
    {#if projectsPt.length > 0}
      <LayoutGrid>
        {#each projectsPt as enProj, i}
          <Cell>
            <div class="card">
              <Card data={enProj} />
            </div>
          </Cell>
        {/each}
      </LayoutGrid>
    {/if}
  {:else if projectsEn.length > 0}
    <LayoutGrid>
      {#each projectsEn as enProj, i}
        <Cell>
          <div class="card">
            <Card data={enProj} />
          </div>
        </Cell>
      {/each}
    </LayoutGrid>
  {/if}
  <div />
</div>

<style>
  .card {
    margin: 10px;
    height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: var(--mdc-theme-secondary, #333); */
    color: var(--mdc-theme-on-secondary, #fff);
  }
</style>
