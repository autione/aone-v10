<script lang="ts">
  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
  <title>AutiOne / Library</title>
</svelte:head>

<main class="base-page">
  <Header></Header>

  <style>
    :root {
      --base-accent: var(--tint-purple);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">explore the</p>
      <h1>library</h1>
    </div>

    <Box>
      <span class="blurb">The experience of a bunch of shelves with the stuff I enjoy.</span>
    </Box>
  </section>

  <!-- <Box label="introduction">
    <p>As with every other human being on this planet, I too have my own set of likings and appreciation for other people's works.</p>

    <br />

    <p>If you were eager to see what I personally love, you're in the right place!</p>
  </Box> -->

  <Box>
    <p>Hey, you're not supposed to be here. Come back later when this place is ready!!</p>
  </Box>
</main>

<style>
</style>
