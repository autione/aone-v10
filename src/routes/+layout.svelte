<script lang="ts">
  import "../app.css";

  import { Check, Loader } from "@lucide/svelte";
  import { navigating } from "$app/state";
  import { slide } from "svelte/transition";
  import { expoOut } from "svelte/easing";

  let { children } = $props();
</script>

{@render children()}

<div class={`nav-loader ${navigating.complete !== null ? "" : "hidden"}`}>
  {#if navigating.complete !== null}
    <span out:slide={{ axis: "x", duration: 250, easing: expoOut }} class="pending">
      <Loader />
      loading
    </span>
  {:else}
    <span in:slide={{ axis: "x", duration: 250, easing: expoOut }}>
      <Check />
    </span>
  {/if}
</div>
