<script lang="ts">
  import type { LayoutServerData } from "../../$types";

  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";
  import Box from "$lib/components/Box.svelte";

  import {} from "@lucide/svelte";
  import { resolve } from "$app/paths";

  let { data }: { data: LayoutServerData } = $props();
</script>

<svelte:head>
  <title>AutiOne / Bedroom / Projects</title>
</svelte:head>

<main class="base-page">
  <Header bedroom={data}></Header>

  <style>
    :root {
      --base-accent: #bd5326;
      --base-foreground: var(--base-accent);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">manage your</p>
      <h1>projects</h1>
    </div>

    <Box>
      <span class="blurb">Show to the world what you have created, whether prideful or not.</span>
    </Box>
  </section>
</main>

<style>
</style>
