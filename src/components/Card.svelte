<script>
  import Card, { Content, PrimaryAction, Media, MediaContent } from "@smui/card"

  export let data
</script>

<div class="card-display" style="cursor: pointer">
  <div class="card-container">
      <Card>
        <div style="color: #fff; position: relative; padding: 10px; height: 68px">
          <h2 class="mdc-typography--headline6" style="margin: 0; color: black">
            {data.title}
          </h2>
        </div>
      <PrimaryAction on:click={() => console.log("clicked")}>
        <Media
          class="card-media-4x3"
          aspectRatio="square"
          style="background-image: url({data.image})"
        >
          <MediaContent />
        </Media>
        <div class="fixed-height">
          <Content
            class="mdc-typography--body2"
            style="color: black"
          >
            {data.snippet}
          </Content>
        </div>
      </PrimaryAction>
    </Card>
  </div>
</div>

<style>
  * :global(.card-media-4x3) {
    max-height: 180px;
  }

  .fixed-height {
    min-height: 104px !important;
    max-height: 104px !important;
  }
</style>
