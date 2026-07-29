<script lang="ts">
  let { children } = $props();
</script>

<div class="root">
  <main>
    {@render children()}
  </main>
</div>

<style>
  .root {
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .root > main {
    display: block;

    width: calc(100% - 2.5rem);
    max-width: 720px;
    padding: 2.5rem 0;
  }
</style>
