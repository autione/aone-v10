<script lang="ts">
  import type { LayoutServerData } from "../../$types";
  import type { PageServerData } from "./$types";

  import Header from "$lib/components/Header.svelte";
  import Box from "$lib/components/Box.svelte";

  let { data }: { data: PageServerData & LayoutServerData } = $props();
</script>

<svelte:head>
  <title>AutiOne / Bedroom / Deactivated</title>
</svelte:head>

<main class="base-page">
  <Header bedroom={data}></Header>

  <style>
    :root {
      --base-accent: var(--tint-red);
      --base-foreground: var(--base-accent);
    }
  </style>

  <div class="centered">
    <section class="intro">
      <div class="greeting">
        <p class="cursive">account</p>
        <h1>deactivated</h1>
      </div>

      <Box>
        <span class="blurb">You find yourself locked out, perhaps within reason.</span>
      </Box>
    </section>

    <Box>
      <p>Your bedroom account has been deactivated and it is no longer accessible.</p>

      <br />

      <p>All account data and items are still preserved, and may still display on the website. You may be able to request deletion, if desired.</p>
    </Box>
  </div>
</main>

<style>
  .centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    width: calc(100% - 2.5rem);
    max-width: 720px;

    position: fixed;
    left: 50%;
    top: 50%;

    translate: -50% -50%;
  }
</style>
