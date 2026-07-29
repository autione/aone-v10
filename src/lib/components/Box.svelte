<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";

  type BoxProps = SvelteHTMLElements["section"] & {
    label?: string;
  };

  const { label, children, ...rest }: BoxProps = $props();
</script>

<section {...rest}>
  {#if label}
    <span class="cursive">{label}</span>
  {/if}

  <div>
    {@render children?.()}
  </div>
</section>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: max-content;
  }

  section:has(> span) {
    grid-template-rows: max-content max-content;
  }

  section > div {
    background-color: var(--base-background);
    border: 2px solid var(--base-accent);
    padding: 1.25rem;

    font-size: 1.125rem;
  }

  section > span {
    background-color: var(--base-accent);
    color: #fff;

    width: max-content;
    padding: 0.375rem 0.75rem;
    padding-top: calc(1cap + 0.375rem);

    font-size: 1.25rem;
  }
</style>
