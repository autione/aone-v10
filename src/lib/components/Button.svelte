<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";

  type ButtonProps = SvelteHTMLElements["button"] & {
    variant?: "primary" | "secondary";
    size?: "normal" | "small" | "tiny" | "icon";
  };

  const { variant = "primary", size = "normal", children, ...rest }: ButtonProps = $props();
</script>

<button data-variant={variant} data-size={size} {...rest}>
  {@render children?.()}
</button>

<style>
  button {
    font: inherit;
    border: 2px solid var(--base-accent);

    transition-property: background-color, color;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;

    cursor: pointer;
  }

  button[data-size="normal"] {
    font-size: 1.125rem;
    padding: 0.75rem 1rem;
  }

  button[data-size="small"] {
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
  }

  button[data-size="tiny"] {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }

  button[data-size="icon"] {
    display: flex;
    justify-content: center;
    align-items: center;

    aspect-ratio: 1;
    padding: 0.125rem;
  }

  button[data-variant="primary"] {
    background-color: var(--base-accent);
    color: var(--base-background);
  }

  button[data-variant="primary"]:hover {
    background-color: var(--base-background);
    color: var(--base-accent);
  }

  @media (prefers-color-scheme: dark) {
    button[data-variant="primary"] {
      color: var(--base-active);
    }

    button[data-variant="primary"]:hover {
      color: var(--base-foreground);
    }
  }

  button[data-variant="primary"]:active {
    background-color: var(--base-surface-off);
  }

  button[data-variant="secondary"] {
    background-color: transparent;
    color: var(--base-foreground);
  }

  button[data-variant="secondary"]:hover {
    background-color: var(--base-surface-off);
  }

  button[data-variant="secondary"]:active {
    background-color: var(--base-background);
    color: var(--base-accent);
  }
</style>
