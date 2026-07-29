<script lang="ts">
  import type { SvelteHTMLElements } from "svelte/elements";

  type MaskedIconProps = SvelteHTMLElements["i"] & {
    i: string;
    color?: string;
    size?: number | null;
  };

  let { i, size = 24, color = "currentColor", class: className = "", ...rest }: MaskedIconProps = $props();
</script>

<i
  aria-hidden="true"
  class={`masked-icon ${className}`}
  style={`display: inline-block; background-color: ${color}; ${size !== null ? `width: ${size}px; height: ${size}px;` : ""} mask-image: url("${i}"); mask-clip: no-clip; mask-size: contain; mask-repeat: no-repeat`}
  {...rest}
></i>
