<script lang="ts">
  import { enhance } from "$app/forms";
  import type { LayoutServerData } from "./$types";

  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";

  let { data }: { data: LayoutServerData } = $props();
</script>

<svelte:head>
  <title>AutiOne / Bedroom</title>
</svelte:head>

<main class="base-page">
  <Header bedroom={data}></Header>

  <p>user data:</p>
  <textarea rows={10}>{JSON.stringify(data.user, undefined, 2)}</textarea>
</main>

<style>
</style>
