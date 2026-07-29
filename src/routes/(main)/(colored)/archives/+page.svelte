<script lang="ts">
  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
  <title>AutiOne / Archives</title>
</svelte:head>

<main class="base-page">
  <Header></Header>

  <style>
    :root {
      --base-accent: #36835f;
      --base-foreground: var(--base-accent);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">dive into the</p>
      <h1>archives</h1>
    </div>

    <Box>
      <span class="blurb">We all have that one drawer with every thing ever in it.</span>
    </Box>
  </section>
</main>

<style></style>
