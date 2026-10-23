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
    width?: string;
    height?: string;
    size?: string;
  };

  const {
    background = "var(--base-accent)",
    foreground = "#fff",
    size = "10rem",
    width = size,
    height = size,
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

  let snapped = $state(false);
  let dragging = $state(false);
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

  const startDrag = (x: number, y: number) => {
    dragFrom = [x - position[0], y - position[1]];
    dragging = true;

    if (!fixed) realAngle *= -1;
  };

  const stopDrag = () => {
    dragging = false;
    if (fixed) snapToAnchor();
  };

  $effect(snapToAnchor);

  onMount(() => {
    if (browser) {
      if (!stickyNote) return console.error("missing elements :(");

      stickyNote.addEventListener("mousedown", (e) => startDrag(e.clientX, e.clientY));
      stickyNote.addEventListener("touchstart", (e) => startDrag(e.touches[0].clientX, e.touches[0].clientY));

      addEventListener("mousemove", computeMove);
      addEventListener("touchmove", computeMove);
      addEventListener("scroll", computeScroll);
      addEventListener("resize", snapToAnchor);

      addEventListener("mouseup", stopDrag);
      addEventListener("touchend", stopDrag);

      // insane workaround LOL
      setTimeout(() => {
        if (!snapped) snapped = true;
      }, 10);
    }
  });

  onDestroy(() => {
    if (browser) {
      removeEventListener("mousemove", computeMove);
      removeEventListener("scroll", computeScroll);
      removeEventListener("resize", snapToAnchor);

      removeEventListener("mouseup", stopDrag);
      removeEventListener("touchend", stopDrag);
    }
  });
</script>

<p
  bind:this={stickyNote}
  data-dragging={String(dragging)}
  style={`--bg: ${background}; --fg: ${foreground}; --angle: ${realAngle}deg; left: ${position[0]}px; top: ${position[1]}px; width: ${width}; height: ${height}; ${style}`}
  class={`${fixed ? "fixed" : ""} ${snapped ? "snapped" : ""}`}
  {...rest}
>
  {@render children?.()}
</p>

<style>
  @import url("/fonts/playpen/playpen.css");

  p {
    font-family: "Playpen Sans";
    font-size: 0.9rem;

    background: linear-gradient(to bottom, #fff2, #fff0), linear-gradient(to bottom, #0000, #0001), var(--bg);
    color: var(--fg);

    box-shadow: 0 0 0 2px #fff2 inset;
    filter: drop-shadow(0 2px 4px #0002);

    padding: 0.75rem 0.875rem;
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
    cursor: grab;
  }

  p:not(.fixed) {
    transition:
      scale 0.125s,
      rotate 0.125s;
  }

  p.fixed.snapped {
    transition:
      scale 0.125s,
      rotate 0.125s,
      left 0.25s cubic-bezier(0.16, 1, 0.27, 1.07),
      top 0.25s cubic-bezier(0.16, 1, 0.27, 1.07);
  }

  p::after {
    content: "";
    position: absolute;
    right: 2px;
    top: 2px;

    width: 25%;
    height: 25%;
    max-width: 2rem;
    max-height: 2rem;

    translate: 50% -50%;
    rotate: 45deg;

    background-color: #fff2;
  }

  p:hover {
    scale: 1.03;
  }

  p:active {
    cursor: grabbing;
    scale: 1.015;
  }
</style>
