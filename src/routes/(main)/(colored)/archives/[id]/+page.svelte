<script lang="ts">
  import type { PageServerData } from "./$types";

  import PostMarkdown from "$lib/components/PostMarkdown.svelte";
  import Header from "$lib/components/Header.svelte";

  import { CalendarDays, Clock, Globe, Lock } from "@lucide/svelte";

  let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
  <title>AutiOne / Archives / {data.post?.title}</title>
</svelte:head>

<main class="base-page extended" style="align-items: center;">
  <style>
    :root {
      --base-accent: #36835f;
      --base-foreground: var(--base-accent);
    }
  </style>

  <Header></Header>

  <section class="post-header">
    <h1>{data.post?.title}</h1>
    <h2>{data.post?.description}</h2>

    <div>
      <span>
        <CalendarDays size={18} />
        {data.post?.createdAt.toLocaleDateString("en-UK", { day: "numeric", month: "short", year: "numeric" }).toLowerCase()}
      </span>

      <span>
        <Clock size={18} />
        {data.post?.createdAt.toLocaleTimeString("en-UK", { hour: "2-digit", minute: "2-digit" }).toLowerCase()}
      </span>

      <span>
        {#if data.post?.visibility === "public"}
          <Globe size={18} /> public
        {:else}
          <Lock size={18} /> private
        {/if}
      </span>

      <span style="margin-left: auto;">
        <img src={data.post?.author.avatar || "/avatar.png"} alt="Author Avatar" />
        {data.post?.author.displayName}
      </span>
    </div>
  </section>

  {#if data.post?.thumbnail}
    <img class="post-thumbnail" src={data.post?.thumbnail} alt="Post Thumbnail" />

    <div class="backdrop">
      <img src={data.post?.thumbnail} alt="" aria-hidden="true" />
    </div>
  {/if}

  <section class="markdown-content post-content">
    <PostMarkdown source={data.post?.content || ""} />
  </section>
</main>

<style>
  .post-header {
    display: flex;
    flex-direction: column;

    width: 100%;
  }

  .post-header h1 {
    font-size: 2rem;
    font-weight: bold;
    width: 100%;
  }

  .post-header h2 {
    font-size: 1.5rem;
    font-weight: 500;
    opacity: 0.75;
    width: 100%;
  }

  .post-header > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    margin-top: 0.5rem;
  }

  @media screen and (max-width: 640px) {
    .post-header {
      text-align: center;
    }

    .post-header > div {
      justify-content: center;
    }

    .post-header > div > span {
      margin: 0 !important;
    }
  }

  .post-header > div > span {
    background-color: var(--base-foreground);
    color: var(--base-background);

    display: flex;
    flex-direction: row;
    align-items: center;

    padding: 0.375rem 0.5rem;
    gap: 0.25rem;
  }

  .post-header > div > span > img {
    width: 18px;
    height: 18px;
  }

  .post-content {
    background-color: var(--base-background);
    border: 2px solid var(--base-accent);

    width: 100%;
    padding: 1rem;
  }

  .post-thumbnail {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;

    /* mask-image: linear-gradient(to bottom, #fff, #fff0); */
  }

  .backdrop {
    position: fixed;
    left: 0;
    top: 0;

    mask-image: linear-gradient(to right, #fff 0%, #fff0 30%, #fff0 70%, #fff 100%);
    width: 100%;
    height: 100%;

    z-index: -1;
  }

  .backdrop img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    mask-image: linear-gradient(to top, #fff, #fff0);
    mix-blend-mode: overlay;
    filter: blur(4px) saturate(0);
    opacity: 0.2;

    user-select: none;
  }
</style>
