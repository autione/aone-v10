<script lang="ts">
  let { children } = $props();
</script>

<div class="root">
  {@render children()}
</div>

<style>
  .root {
    width: 100vw;

    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
