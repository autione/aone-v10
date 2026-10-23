<script lang="ts">
  import { clamp } from "$lib/utils";
  import { browser } from "$app/env";
  import { onDestroy, onMount } from "svelte";
  import type { SvelteHTMLElements } from "svelte/elements";

  type StickyNoteProps = SvelteHTMLElements["p"] & {
    background?: string;
    foreground?: string;
    fixed?: boolean;
    anchor?: "parent" | HTMLElement;
    offset?: [number, number];
    ratio?: [number, number];
    angle?: number;
    size?: string;
  };

  const {
    background = "var(--base-accent)",
    foreground = "#fff",
    size = "10rem",
    angle = -5,
    offset = [0, 0],
    ratio = [0, 0],
    fixed = false,
    anchor = "parent",
    style,
    children,
    ...rest
  }: StickyNoteProps = $props();

  let stickyNote = $state(undefined as HTMLParagraphElement | undefined);

  let realAngle = $derived(angle);
  let position = $state([-1000, -1000] as [number, number]);

  let dragging = false;
  let dragFrom = [0, 0] as [number, number];

  const computeMove = (e: MouseEvent | TouchEvent) => {
    if (dragging) {
      const target = "clientX" in e ? e : e.touches[0];
      position = [target.clientX - dragFrom[0], target.clientY - dragFrom[1]];
    }
  };

  const computeScroll = () => {
    if (dragging) dragging = false;
  };

  const snapToAnchor = () => {
    if (!stickyNote) return;
    let newPos = [0, 0] as [number, number];

    if (anchor) {
      const element = anchor == "parent" ? stickyNote.parentElement : anchor;

      if (element) {
        const rect = element.getBoundingClientRect();
        newPos = [rect.x + scrollX + rect.width * ratio[0], rect.y + scrollY + rect.height * ratio[1]];
      }
    }

    const rect = stickyNote.getBoundingClientRect();
    position = [clamp(newPos[0] + offset[0], 0, innerWidth - rect.width), newPos[1] + offset[1]];
  };

  $effect(snapToAnchor);

  onMount(() => {
    if (browser) {
      if (!stickyNote) return console.error("missing elements :(");

      stickyNote.addEventListener("mousedown", (e) => {
        if (fixed) return;
        dragFrom = [e.clientX - position[0], e.clientY - position[1]];
        dragging = true;

        realAngle = Math.floor(Math.random() * Math.abs(angle) + 1) - Math.abs(angle) / 2;
      });

      stickyNote.addEventListener("touchstart", (e) => {
        if (fixed) return;
        dragFrom = [e.touches[0].clientX - position[0], e.touches[0].clientY - position[1]];
        dragging = true;

        realAngle = Math.floor(Math.random() * Math.abs(angle) + 1) - Math.abs(angle) / 2;
      });

      addEventListener("mousemove", computeMove);
      addEventListener("touchmove", computeMove);
      addEventListener("scroll", computeScroll);
      addEventListener("resize", snapToAnchor);

      stickyNote.addEventListener("mouseup", () => (dragging = false));
      stickyNote.addEventListener("touchend", () => (dragging = false));
    }
  });

  onDestroy(() => {
    if (browser) {
      removeEventListener("mousemove", computeMove);
      removeEventListener("scroll", computeScroll);
      removeEventListener("resize", snapToAnchor);
    }
  });
</script>

<p
  bind:this={stickyNote}
  style={`--bg: ${background}; --fg: ${foreground}; --size: ${size}; --angle: ${realAngle}deg; left: ${position[0]}px; top: ${position[1]}px; ${style}`}
  class={fixed ? "fixed" : ""}
  {...rest}
>
  {@render children?.()}
</p>

<style>
  p {
    background: linear-gradient(to bottom, #fff2, #fff0), linear-gradient(to bottom, #0000, #0001), var(--bg);
    color: var(--fg);

    box-shadow: 0 0 0 2px #fff2 inset;
    filter: drop-shadow(0 2px 4px #0002);

    width: var(--size);
    height: var(--size);
    padding: 0.875rem;
    z-index: 2;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.25rem;

    position: absolute;
    rotate: var(--angle);

    user-select: none;
    touch-action: none;
    overflow: hidden;

    transition:
      scale 0.125s,
      rotate 0.125s;
  }

  p:not(.fixed) {
    cursor: grab;
  }

  p:not(.fixed)::after {
    content: "";
    position: absolute;
    right: 2px;
    top: 2px;

    width: 2rem;
    height: 2rem;
    translate: 50% -50%;
    rotate: 45deg;

    background-color: #fff2;
  }

  p:not(.fixed):hover {
    scale: 1.03;
  }

  p:not(.fixed):active {
    cursor: grabbing;
    scale: 1.015;
  }
</style>
