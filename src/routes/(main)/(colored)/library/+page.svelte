<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import type { PageProps } from "./$types";

  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
  import Section from "$lib/components/Section.svelte";

  import { ArrowUpRight } from "@lucide/svelte";

  import games from "$lib/games";

  let { data }: PageProps = $props();
</script>

<svelte:head>
  <title>AutiOne / Library</title>
</svelte:head>

{#snippet albumDisplay(src: string, href: string)}
  <a href={href as any} class="raw album">
    <img {src} alt="Album Cover" />
    <div class="disc" aria-hidden="true">
      <div></div>
      <img {src} alt="" />
    </div>
  </a>
{/snippet}

<main class="base-page">
  <Header></Header>

  <style>
    :root {
      --base-accent: var(--tint-purple);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">explore the</p>
      <h1>library</h1>
    </div>

    <Box>
      <span class="blurb">The experience of a bunch of shelves with the stuff I enjoy.</span>
    </Box>
  </section>

  <Box label="introduction">
    <p>As with every other human being on this planet, I too have my own set of likings and appreciation for other people's works.</p>

    <br />

    <p>If you were eager to see what I personally love, you're in the right place!</p>
  </Box>

  <Section label="music">
    {#await data.topAlbums}
      <Box>Please wait...</Box>
    {:then topAlbums}
      {#if !("error" in topAlbums)}
        <Box>
          These are the albums I've been listening the most this week. It's usually a crazy non-sensical eclectic mix, as my music taste usually is. Feel free
          to check out my
          <a href="https://last.fm/user/AutiOne" target="_blank">Last.fm page</a>
          for more insights on what's trending for me!
        </Box>

        <section class="vinyls">
          {#each topAlbums as album, i (i)}
            <div>
              {@render albumDisplay(album.cover, album.url)}

              <span title={`${album.title} by ${album.artist}`}>
                <b>{album.title}</b>
                <p>{album.artist}</p>
              </span>
            </div>
          {/each}
        </section>
      {:else}
        <Box>
          Oh, something went wrong. You can try refreshing the page or checking them out yourself on my
          <a href="https://last.fm/user/AutiOne" target="_blank">Last.fm page</a>.
        </Box>
      {/if}
    {/await}
  </Section>

  <Section label="games">
    <Box>
      These are some of my most played titles. All of them contain at least some bits of what I usually enjoy in games: storytelling, action, creativity, and
      most importantly, the ability to play with friends!
    </Box>

    <section class="games">
      {#each games as game (game.id)}
        <a class="raw" style={`--src: url(/games/banners/${game.id}.png)`} href={game.link.path as any} target="_blank">
          <label>{game.link.label} <ArrowUpRight size={16} /></label>

          <img src={`/games/icons/${game.id}.png`} alt="" />
          <b>{game.title}</b>
        </a>
      {/each}
    </section>
  </Section>
</main>

<style>
  @keyframes spin {
    0% {
      rotate: 0deg;
    }
    100% {
      rotate: 360deg;
    }
  }

  .vinyls {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .vinyls > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;

    width: 100%;
    padding: 4px 0;
    overflow: hidden;
  }

  .vinyls > div > span {
    text-align: center;
    width: 100%;
  }

  .vinyls > div > span,
  .vinyls > div > span * {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
  }

  .vinyls > div > span b {
    font-size: 1.25rem;
  }

  .vinyls > div > span p {
    font-size: 1.125rem;
    opacity: 0.75;
  }

  .album {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;

    color: transparent;
  }

  .album > img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;

    max-width: 130px;
    object-fit: cover;

    background-color: var(--base-background);
    border: 2px solid #6a44b8;

    transition:
      rotate 0.2s,
      translate 0.2s;
  }

  .album:hover > img {
    rotate: -2deg;
    translate: -5px 0;
  }

  .album > .disc {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;

    max-width: 120px;
    max-height: 120px;
    margin-left: -66px;
    z-index: -1;

    border: 2px solid #6a44b8;
    border-radius: 100vw;

    background:
      linear-gradient(180deg, #0000 25%, #0006 50%, #0000 75%),
      conic-gradient(from 225deg at 50% 50%, #fff0 -144deg, #fff0 144deg, #fff1 162deg, #fff2 180deg, #fff1 198deg, #fff0 216deg, #fff0 504deg),
      conic-gradient(from 45deg at 50% 50%, #fff0 -144deg, #fff0 144deg, #fff1 162deg, #fff2 180deg, #fff1 198deg, #fff0 216deg, #fff0 504deg), #222127;

    position: relative;

    animation-name: spin;
    animation-duration: 15s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .album > .disc > div,
  .album > .disc > img {
    position: absolute;
    left: 50%;
    top: 50%;

    translate: -50% -50%;

    width: 33%;
    height: 33%;

    border-radius: 100vw;
  }

  .album > .disc > div::after {
    content: "";

    position: absolute;
    left: 50%;
    top: 50%;

    translate: -50% -50%;

    width: 6px;
    height: 6px;

    background-color: var(--base-background);
    border-radius: 100vw;
  }

  .album > .disc > div {
    background-color: #fff1;
    backdrop-filter: blur(12px) saturate(3) brightness(2);
    z-index: 2;
  }

  .games {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;

    width: 100%;
  }

  .games > a {
    background-image: linear-gradient(to bottom, #0004, #000a), var(--src);
    background-color: #000;
    color: #fff;

    background-size: cover;
    background-position: center;

    border: 2px solid var(--base-accent);
    text-decoration: none;

    width: 100%;
    height: 100%;
    aspect-ratio: 16 / 9;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 0.375rem;

    padding: 0.875rem;

    position: relative;
  }

  .games > a > img {
    width: 2.25rem;
    height: 2.25rem;
  }

  .games > a > b {
    font-size: 1.25rem;
  }

  .games > a > label {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;

    position: absolute;
    right: 0.5rem;
    top: 0.5rem;

    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;

    padding: 0.25rem;
    padding-left: 0.5rem;

    background-color: var(--base-background);
    color: var(--base-foreground);

    transition:
      opacity 0.1s,
      right 0.1s,
      top 0.1s;
  }

  .games > a:not(:hover) > label {
    opacity: 0;
    right: 0.25rem;
    top: 0.25rem;
  }

  @media screen and (max-width: 768px) {
    .games {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 480px) {
    .vinyls {
      grid-template-columns: 1fr 1fr;
      gap: 1rem 3rem;
    }

    .games {
      grid-template-columns: 1fr;
    }
  }
</style>
