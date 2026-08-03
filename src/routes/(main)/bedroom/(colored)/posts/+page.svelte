<script lang="ts">
  import type { LayoutServerData } from "../../$types";
  import type { PageServerData } from "./$types";

  import { clamp } from "$lib/utils";
  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";
  import Box from "$lib/components/Box.svelte";

  import { CalendarDays, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, FileText, Globe, Hash, Lock, Pin, Plus, Search } from "@lucide/svelte";
  import { encodeHexLowerCase } from "@oslojs/encoding";

  import { resolve } from "$app/paths";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let { data }: { data: LayoutServerData & PageServerData } = $props();

  let pageValue = $derived(data.query?.page || 1);
  let pagination = $state(undefined as HTMLFormElement | undefined);

  let createId = $state("");
  let creating = $state(false);

  function paginate(skip: number) {
    if (!pagination) return;
    pageValue = clamp(pageValue + skip, 1, data.query?.maxPages || 1);
    pagination.requestSubmit();
  }

  $effect(() => {
    if (!data.query) return;
    if (pageValue > data.query.maxPages) pageValue = data.query.maxPages;
    if (pageValue < 1) pageValue = 1;
  });
</script>

<svelte:head>
  <title>AutiOne / Bedroom / Posts</title>
</svelte:head>

<main class="base-page">
  <Header bedroom={data}></Header>

  <style>
    :root {
      --base-accent: #36835f;
      --base-foreground: var(--base-accent);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">manage your</p>
      <h1>posts</h1>
    </div>

    <Box>
      <span class="blurb">Just had the fun idea of writing out all my thoughts & shenanigans.</span>
    </Box>
  </section>

  <section class="controls">
    <aside>
      {#if creating}
        <form transition:slide={{ axis: "y", duration: 200, easing: quintOut }} method="post" action="?/create" class="create">
          <label for="id">
            <FileText />
            <input type="text" autocomplete="off" name="id" placeholder="insert id for new post..." bind:value={createId} />
          </label>

          <Button type="submit" size="small" style="height: calc(100% + 4px); margin: -2px; margin-left: 0;">create</Button>

          <Button
            onclick={() => {
              const title = prompt("insert base title:");
              if (!title) return;

              const match = title.toLowerCase().match(/[a-z0-9]+/g);
              const slug = match ? match.join("-") : "post";
              const rnd = encodeHexLowerCase(crypto.getRandomValues(new Uint8Array(2)));
              createId = `${slug}-${rnd}`;
            }}
            type="button"
            variant="secondary"
            size="icon"
            style="height: calc(100% + 4px); margin: -2px; margin-left: 0;"
          >
            <Hash />
          </Button>
        </form>
      {:else}
        <form transition:slide={{ axis: "y", duration: 200, easing: quintOut }} method="get" class="lookup">
          <label for="q">
            <Search />
            <input type="text" autocomplete="off" name="q" defaultValue={data.query?.term} placeholder="search..." />
          </label>

          <select onchange={(e) => (e.currentTarget.parentElement as HTMLFormElement).requestSubmit()} value={data.query?.visibility} name="v">
            <option value="all">all posts</option>
            <option value="public">public only</option>
            <option value="private">private only</option>
          </select>

          <select onchange={(e) => (e.currentTarget.parentElement as HTMLFormElement).requestSubmit()} value={data.query?.sort} name="s">
            <option value="latest">sort by latest</option>
            <option value="oldest">sort by oldest</option>
          </select>

          <input type="hidden" name="p" value={data.query?.page} />
        </form>
      {/if}
    </aside>

    <Button
      onclick={() => (creating = !creating)}
      variant={creating ? "secondary" : "primary"}
      size="icon"
      style="height: calc(100% + 4px); margin: -2px; margin-left: 0;"
    >
      <Plus style={`transition: rotate 0.2s cubic-bezier(0.23, 1, 0.320, 1); rotate: ${creating ? "45deg" : "0deg"};`} />
    </Button>
  </section>

  <section class="posts">
    {#each data.posts! as post (post.id)}
      <a class="raw" href={resolve(`/bedroom/posts/${post.id}`)}>
        <main>
          <span>
            <b title={post.title}>{post.title}</b>
            <p title={post.description}>{post.description}</p>
          </span>

          <div>
            <span>
              <CalendarDays size={18} />
              <p>
                {post.createdAt.toLocaleDateString("en-UK", { day: "numeric", month: "short", year: "numeric" }).toLowerCase()}
              </p>
            </span>

            <span>
              {#if post.visibility === "public"}
                <Globe size={18} />
              {:else}
                <Lock size={18} />
              {/if}

              <p>{post.visibility}</p>
            </span>

            <span>
              <img src={post.author.avatar || "/avatar.png"} alt="Author Avatar" />
              <p>{post.author.username}</p>
            </span>

            {#if post.pinned}
              <span style="margin-left: auto;">
                <Pin size={18} />
                <p>pinned</p>
              </span>
            {/if}
          </div>
        </main>

        <img src={post.thumbnail || "/thumbnail.svg"} alt="Thumbnail" />
      </a>
    {/each}
  </section>

  {#if data.query}
    <section class="pagination">
      <form bind:this={pagination} method="get">
        <Button onclick={() => paginate(-pageValue)} size="icon"><ChevronsLeft /></Button>
        <Button onclick={() => paginate(-1)} size="icon"><ChevronLeft /></Button>

        <label for="p">
          <input
            class="raw"
            type="number"
            min={0}
            max={data.query.maxPages}
            name="p"
            bind:value={pageValue}
            onblur={(e) => e.currentTarget.valueAsNumber !== data.query.page && pagination?.requestSubmit()}
          />
          of {data.query.maxPages}
        </label>

        <Button onclick={() => paginate(1)} size="icon"><ChevronRight /></Button>
        <Button onclick={() => paginate(data.query.maxPages)} size="icon"><ChevronsRight /></Button>

        <input type="hidden" name="q" value={data.query.term} />
        <input type="hidden" name="s" value={data.query.sort} />
        <input type="hidden" name="v" value={data.query.visibility} />
      </form>

      <small>showing {10 * (data.query.page - 1) + 1}-{data.query.returned + 10 * (data.query.page - 1)} of {data.query.total} results</small>
    </section>
  {/if}
</main>

<style>
  .controls {
    display: grid;
    grid-template-columns: 1fr max-content;

    background-color: var(--base-background);
    color: var(--base-foreground);
    border: 2px solid var(--base-accent);

    width: calc(100% - 4px);
  }

  .controls > aside {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
  }

  .create {
    display: grid;
    grid-template-columns: 1fr max-content max-content;
    width: 100%;
  }

  .lookup {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    width: 100%;
  }

  .lookup label,
  .create label {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;

    padding-left: 0.375rem;
  }

  .create input,
  .lookup input,
  .lookup select {
    background-color: transparent;
    border: 0px solid transparent;
    outline: none;

    color: inherit;
    font: inherit;
  }

  .create input:focus,
  .lookup input:focus,
  .lookup select:focus {
    background-color: var(--base-surface);
  }

  .create input,
  .lookup input {
    padding: 0.5rem 0.25rem;
  }

  .lookup select {
    border-left: 2px solid var(--base-accent);
    padding: 0.5rem;
  }

  .pagination {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 100%;
    gap: 0.25rem;
  }

  .pagination small {
    opacity: 0.5;
  }

  .pagination > form {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    font-size: 1.125rem;

    width: 100%;
    gap: 0.5rem;
  }

  .pagination > form input {
    font: inherit;
    color: inherit;
    text-align: center;

    background-color: transparent;
    outline: none;
    border: none;

    width: 3rem;
    border-bottom: 2px solid var(--base-accent);
  }

  .posts {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
  }

  .posts > a {
    background-color: var(--base-background);
    border: 2px solid var(--base-accent);
    color: var(--base-foreground);
    text-decoration: none;

    display: grid;
    grid-template-columns: 1fr 0.275fr;
    align-items: center;

    padding: 1.125rem;
    gap: 1rem;

    transition-property: background-color;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;
  }

  .posts > a:hover {
    background-color: color-mix(var(--base-background) 95%, var(--base-accent) 5%);
  }

  .posts > a > img {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  .posts > a main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .posts > a main > span {
    display: grid;
    grid-template-rows: max-content max-content;
    width: 100%;
  }

  .posts > a main > span > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .posts > a main > span > b {
    font-size: 1.375rem;
  }

  .posts > a main > span > p {
    font-size: 1.125rem;
    opacity: 0.75;
  }

  .posts > a main > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.75rem;
    width: 100%;
  }

  .posts > a main > div span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2rem;
  }

  .posts > a main > div span img {
    width: 20px;
    height: 20px;
  }

  .posts > a main > div span p {
    opacity: 0.75;
  }
</style>
