<script lang="ts">
  import type { PageServerData } from "./$types";

  import Header from "$lib/components/Header.svelte";
  import Project from "$lib/views/Project.svelte";

  let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
  <title>AutiOne / Projects / {data.project!.title}</title>
  <meta name="theme-color" content="#bd5326" />

  <meta property="og:title" content={data.project!.title} />
  <meta property="og:description" content={data.project!.description} />
  <meta property="og:image" content={`https://files.auti.one/project-icons/${data.project!.id}`} />
  <meta property="og:image:width" content="64" />
  <meta property="og:image:height" content="64" />
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
