<script lang="ts">
  import "../app.css";
  import type { Snippet } from "svelte";

  import { Check, Loader, OctagonX } from "@lucide/svelte";
  import { navigating } from "$app/state";
  import { slide } from "svelte/transition";
  import { expoOut } from "svelte/easing";

  let { form, children }: { form?: { error: string }; children: Snippet } = $props();
  let currentError = $derived(form?.error);

  const showNav = $derived(navigating.complete !== null || !!currentError);
</script>

{@render children()}

<div class={`nav-loader ${showNav ? "" : "hidden"}`}>
  {#if !!currentError}
    <span out:slide={{ axis: "x", duration: 250, easing: expoOut }}>
      <OctagonX />
      Failed with code <b>{currentError}</b>
    </span>
  {:else if navigating.complete !== null}
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
