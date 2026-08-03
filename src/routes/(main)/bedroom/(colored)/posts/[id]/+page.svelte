<script lang="ts">
  import type { LayoutServerData } from "../../../$types";
  import type { ActionData, PageServerData } from "./$types";

  import PostMarkdown from "$lib/components/PostMarkdown.svelte";
  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";

  import { Eye, Globe, Image, ImagePlus, Loader, Lock, OctagonX, Pencil, Pin, PinOff, Save, Trash2 } from "@lucide/svelte";
  import { enhance } from "$app/forms";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let { form, data }: { form: ActionData; data: LayoutServerData & PageServerData } = $props();

  let title = $derived(data.post?.title || "");
  let description = $derived(data.post?.description || "");
  let content = $derived(data.post?.content || "");
  let thumbnail = $derived(data.post?.thumbnail || null);
  let visibility = $derived(data.post?.visibility || "public");
  let pinned = $derived(data.post?.pinned || false);

  let downscrolled = $state(false);
  let preview = $state(false);
  let busy = $state(false);
</script>

<svelte:head>
  <title>AutiOne / Bedroom / Posts / {title}</title>
</svelte:head>

<svelte:window onscroll={() => (downscrolled = window.scrollY > 96)} />

<main class="base-page extended" style="align-items: center;">
  <style>
    :root {
      --base-accent: #36835f;
      --base-foreground: var(--base-accent);
    }
  </style>

  <div class="header-group" data-downscrolled={downscrolled}>
    <Header bedroom={data}></Header>

    <form
      method="post"
      action="?/save"
      class="editor-header"
      use:enhance={({ formData, action, cancel }) => {
        if (action.search === "?/delete" && !confirm("are you sure you want to delete this post?")) {
          cancel();
          return;
        }

        formData.append("title", title);
        formData.append("description", description);
        formData.append("content", content);

        formData.append("thumbnail", thumbnail || "");
        formData.append("visibility", visibility);
        formData.append("pinned", String(pinned));

        busy = true;

        return async ({ update }) => {
          update({ reset: false });
          busy = false;
        };
      }}
    >
      <section class="meta">
        <input class="raw" disabled={busy} type="text" autocomplete="off" name="title" placeholder="insert title..." bind:value={title} />
        <input class="raw" disabled={busy} type="text" autocomplete="off" name="description" placeholder="insert description..." bind:value={description} />
      </section>

      <section class="tools">
        <Button disabled={busy} onclick={() => (visibility = visibility === "public" ? "private" : "public")} type="button" variant="tertiary" size="tiny">
          {#if visibility === "public"}
            <Globe size={16} /> public
          {:else}
            <Lock size={16} /> private
          {/if}
        </Button>

        <Button disabled={busy} onclick={() => (pinned = !pinned)} type="button" variant="tertiary" size="tiny">
          {#if pinned}
            <Pin size={16} /> pinned
          {:else}
            <PinOff size={16} /> ordered
          {/if}
        </Button>

        <Button
          disabled={busy}
          onclick={() => {
            const res = prompt("insert a thumbnail image link:", thumbnail || "");
            if (res === "") thumbnail = null;
            else if (res !== null) thumbnail = res;
          }}
          type="button"
          variant="tertiary"
          size="tiny"
        >
          {#if thumbnail !== null}
            <Image size={16} /> change thumbnail
          {:else}
            <ImagePlus size={16} /> add thumbnail
          {/if}
        </Button>

        <aside>
          <Button disabled={busy} onclick={() => (preview = !preview)} type="button" variant="secondary" size="tiny">
            {#if preview}
              <Pencil size={16} /> edit
            {:else}
              <Eye size={16} /> view
            {/if}
          </Button>

          <Button disabled={busy} formaction="?/delete" type="submit" variant="secondary" size="tiny">
            <Trash2 size={16} /> delete
          </Button>

          <Button disabled={busy} type="submit" size="tiny">
            {#if busy}
              <Loader class="loader" size={16} /> please wait
            {:else}
              <Save size={16} /> save changes
            {/if}
          </Button>
        </aside>
      </section>
    </form>

    {#if form?.error}
      <span transition:slide={{ duration: 200, easing: quintOut }} class="error">
        <p>request failed with code <b>{form.error}</b></p>
        <OctagonX size={20} />
      </span>
    {/if}
  </div>

  {#if preview}
    <div class="markdown-content editor-preview">
      <PostMarkdown source={content} />
    </div>
  {:else}
    <textarea disabled={busy} class="raw editor-content" bind:value={content} placeholder="insert content..."></textarea>
  {/if}
</main>

<style>
  .header-group {
    display: flex;
    flex-direction: column;

    background-color: var(--base-background);
    width: 100%;

    position: sticky;
    top: 1rem;
    z-index: 2;

    transition-property: width, margin, box-shadow;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;
  }

  .header-group[data-downscrolled="true"] {
    width: calc(100% + 4rem);
    max-width: 100vw;

    box-shadow: 0 4px 8px var(--base-surface-mid);
  }

  @media screen and (max-width: 920px) {
    .header-group {
      top: 0px;
    }
  }

  .editor-header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    border: 2px solid var(--base-accent);
    border-top: 0;
    padding: 0.75rem;
  }

  .editor-header input {
    background-color: transparent;
    color: inherit;
    font: inherit;

    outline: none;
    border: none;
  }

  .editor-header input[name="title"] {
    font-size: 2rem;
    font-weight: bold;
  }

  .editor-header input[name="description"] {
    font-size: 1.5rem;
    font-weight: 500;
    opacity: 0.75;
  }

  .editor-header input:disabled {
    opacity: 0.5 !important;
  }

  .editor-header > section {
    width: 100%;
  }

  .editor-header .meta {
    display: flex;
    flex-direction: column;
  }

  .editor-header .meta > input {
    margin: -0.05cap 0;
  }

  .editor-header .tools {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .editor-header .tools aside {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    margin-left: auto;
  }

  .editor-content {
    min-height: 65vh;
    resize: vertical;

    color: #000;
    font: inherit;
  }

  @media (prefers-color-scheme: dark) {
    .editor-content {
      color: #fff;
    }
  }

  .editor-preview,
  .editor-content {
    background-color: var(--base-background);
    border: 2px solid var(--base-accent);

    width: 100%;
    padding: 1rem;
  }

  .error {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0.5rem 0.75rem;
    gap: 0.375rem;

    border: 2px solid var(--base-accent);
    border-top: 0;
  }
</style>
