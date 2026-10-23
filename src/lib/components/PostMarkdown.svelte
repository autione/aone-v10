<script lang="ts">
  import SvelteMarkdown, { type Renderers, type RendererComponent } from "@humanspeak/svelte-markdown";
  import { markedKatex, KatexRenderer, markedFootnote, FootnoteRef, FootnoteSection } from "@humanspeak/svelte-markdown/extensions";

  import { Info, TriangleAlert, OctagonX, Lightbulb, CircleCheck } from "@lucide/svelte";
    import type { Component } from "svelte";
    import StickyNote from "./StickyNote.svelte";

  const { source = "" } = $props();

  interface CustomRenderers extends Renderers {
    inlineKatex: RendererComponent;
    blockKatex: RendererComponent;
    footnoteRef: RendererComponent;
    footnoteSection: RendererComponent;
  }

  const renderers: Partial<CustomRenderers> = {
    inlineKatex: KatexRenderer,
    blockKatex: KatexRenderer,
    footnoteRef: FootnoteRef,
    footnoteSection: FootnoteSection
  };

  const calloutIcons: { [variant: string]: Component } = {
    tip: Lightbulb,
    info: Info,
    success: CircleCheck,
    warning: TriangleAlert,
    critical: OctagonX,
  }
</script>

<SvelteMarkdown {source} extensions={[markedKatex({ singleDollarInline: true }), markedFootnote()]} {renderers}>
  {#snippet link({ href, title, children })}
    <a {href} {title} target="_blank" rel="noopener noreferrer">
      {@render children?.()}
    </a>
  {/snippet}

  {#snippet html_callout({ attributes, children })}
    {const variant = (attributes?.["variant"] || "tip") as string}
    {const IconOf = calloutIcons[variant]}

    <div class="callout" data-variant={variant}>
      <IconOf />

      <span>
        {#if attributes && "title" in attributes}<b>{attributes["title"]}</b>{/if}
        {@render children?.()}
      </span>
    </div>
  {/snippet}

  {#snippet html_postit({ attributes, children })}
    {const color = (attributes?.["color"] || "yellow") as string}
    {const offsetX = Number(attributes?.["offsetX"]) || 0 as number}
    {const offsetY = Number(attributes?.["offsetY"]) || 0 as number}
    {const ratioX = Number(attributes?.["ratioX"]) || 0 as number}
    {const ratioY = Number(attributes?.["ratioY"]) || 0 as number}
    
    <StickyNote background={`var(--tint-${color})`} offset={[offsetX, offsetY]} ratio={[ratioX, ratioY]} {...attributes}>
      {@render children?.()}
    </StickyNote>
  {/snippet}
</SvelteMarkdown>
