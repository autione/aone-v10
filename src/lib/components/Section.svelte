<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";

  type SplitSectionProps = SvelteHTMLElements["section"] & {
    label: string;
  };

  const { label, children, ...rest }: SplitSectionProps = $props();
</script>

<section {...rest}>
  <div class="head">
    <span>{label}</span>
  </div>

  {@render children?.()}
</section>

<style>
  section {
    width: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: max-content;
    gap: 1rem;
  }

  section:has(> .head) {
    grid-template-rows: max-content max-content;
  }

  .head {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    gap: 1rem;
  }

  .head > span {
    background-color: var(--base-accent);
    color: #fff;

    width: max-content;
    padding: 0.375rem 0.75rem;

    font-size: 1.125rem;
    font-weight: bold;
  }

  .head::after {
    content: "";

    background-color: var(--base-accent);
    width: 100%;
    height: 2px;
  }
</style>
