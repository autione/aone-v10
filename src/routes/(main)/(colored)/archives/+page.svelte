<script lang="ts">
  import type { PageServerData } from "./$types";
  import { resolve } from "$app/paths";
  import { clamp } from "$lib/utils";

  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";

  import { CalendarDays, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Globe, Lock, Pin, Search } from "@lucide/svelte";

  let { data }: { data: PageServerData } = $props();

  let pageValue = $derived(data.query?.page || 1);
  let pagination = $state(undefined as HTMLFormElement | undefined);

  function paginate(skip: number) {
    if (!pagination) return;
    pageValue = clamp(pageValue + skip, 1, data.query?.maxPages || 1);
    pagination.requestSubmit();
  }
</script>

<svelte:head>
  <title>AutiOne / Archives</title>
</svelte:head>

<main class="base-page">
  <Header></Header>

  <style>
    :root {
      --base-accent: #36835f;
      --base-foreground: var(--base-accent);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">dive into the</p>
      <h1>archives</h1>
    </div>

    <Box>
      <span class="blurb">We all have that one drawer with every thing ever in it.</span>
    </Box>
  </section>

  <form method="get" class="lookup">
    <label for="q">
      <Search />
      <input type="text" autocomplete="off" name="q" defaultValue={data.query?.term} placeholder="search..." />
    </label>

    <select onchange={(e) => (e.currentTarget.parentElement as HTMLFormElement).requestSubmit()} value={data.query?.sort} name="s">
      <option value="latest">sort by latest</option>
      <option value="oldest">sort by oldest</option>
    </select>

    <input type="hidden" name="p" value={data.query?.page} />
  </form>

  <section class="posts">
    {#each data.posts! as post (post.id)}
      <a class="raw" href={resolve(`/archives/${post.id}`)}>
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
      </form>

      <small>showing {10 * (data.query.page - 1) + 1}-{data.query.returned + 10 * (data.query.page - 1)} of {data.query.total} results</small>
    </section>
  {/if}
</main>

<style>
  .lookup {
    display: grid;
    grid-template-columns: 2fr 1fr;

    background-color: var(--base-background);
    color: var(--base-foreground);
    border: 2px solid var(--base-accent);

    width: 100%;
  }

  .lookup label {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;

    padding-left: 0.375rem;
  }

  .lookup input,
  .lookup select {
    background-color: transparent;
    border: 0px solid transparent;
    outline: none;

    color: inherit;
    font: inherit;
  }

  .lookup input:focus,
  .lookup select:focus {
    background-color: var(--base-surface);
  }

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
