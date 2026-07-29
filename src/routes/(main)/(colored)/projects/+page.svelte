<script lang="ts">
  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
  <title>AutiOne / Projects</title>
</svelte:head>

<main class="base-page">
  <Header></Header>

  <style>
    :root {
      --base-accent: #bd5326;
      --base-foreground: var(--base-accent);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">check out my</p>
      <h1>projects</h1>
    </div>

    <Box>
      <span class="blurb">I had the genius idea to make stuff to show off my stuff. Wow!</span>
    </Box>
  </section>
</main>

<style></style>
