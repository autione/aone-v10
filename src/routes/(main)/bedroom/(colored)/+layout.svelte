<script lang="ts">
  let { children } = $props();
</script>

{#snippet template()}
  <style>
    :root {
      --host-background: color-mix(in srgb, var(--base-accent) 10%, #fff 90%);

      --base-grid: rgb(from var(--base-foreground) r g b / 0.1);
      --base-surface: rgb(from var(--base-foreground) r g b / 0.05);
      --base-surface-off: rgb(from var(--base-foreground) r g b / 0.08);
      --base-surface-mid: rgb(from var(--base-foreground) r g b / 0.14);
      --base-surface-on: var(--base-accent);
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --base-active: #fff;
        --base-background: color-mix(in srgb, var(--base-accent) 20%, #000 80%);
        --base-foreground: color-mix(in srgb, var(--base-accent) 25%, #fff 75%);

        --host-background: color-mix(in srgb, var(--base-accent) 10%, #000 90%);
      }
    }
  </style>
{/snippet}

{@render children()}
{@render template()}
