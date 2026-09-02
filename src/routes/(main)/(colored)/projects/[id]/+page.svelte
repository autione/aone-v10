<script lang="ts">
  import type { PageServerData } from "./$types";

  import Header from "$lib/components/Header.svelte";
  import Project from "$lib/views/Project.svelte";

  let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
  <title>AutiOne / Projects / {data.project!.title}</title>
</svelte:head>

<main class="base-page extended" style="align-items: center;">
  <style>
    :root {
      --base-accent: var(--tint-orange);
    }
  </style>

  <Header></Header>

  <Project project={data.project}></Project>
</main>
