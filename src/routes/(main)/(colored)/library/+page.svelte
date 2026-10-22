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
  <meta name="theme-color" content="#6a44b8" />

  <meta property="og:title" content="Library" />
  <meta property="og:description" content="Perhaps, check out the wonderful work that exceptionally interests me." />
  <meta property="og:image" content="https://auti.one/embed/banner-library.png" />
  <meta property="og:image:width" content="512" />
  <meta property="og:image:height" content="288" />

  <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

{#snippet albumDisplay(src: string, href: string)}
  <a href={href as any} target="_blank" class="raw album">
    <img {src} alt="Album Cover" />
    <div class="disc" aria-hidden="true">
      <div style={`background-image: url(${src})`}></div>
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
      <Box>
        <p>Music makes me feel things, it's so awesome and powerful it feels magical sometimes. So, my silly brain enjoys spending time absorbing noises!</p>

        <br />

        <p>
          When motivation strikes, I like putting together some playlists for certain vibes. Check them out on my
          <a href="https://music.apple.com/profile/autione" target="_blank">Apple Music</a>
          or <a href="https://open.spotify.com/user/12174654642/playlists" target="_blank">Spotify</a> profiles. Otherwise, I just spend time listening to my liked
          songs or entire albums in a whole go.
        </p>

        {#if !("error" in topAlbums)}
          <hr />

          <p>
            Speaking of which, these are the albums I've been listening the most this week. It's usually a non-sensical eclectic mix, as my music taste tends to
            be.
          </p>

          <br />

          <p>Also, feel free to check out my <a href="https://last.fm/user/AutiOne" target="_blank">Last.fm page</a> for more insights on that!</p>
        {/if}
      </Box>

      {#if !("error" in topAlbums)}
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
          Oh, something went wrong while loading this week's top albums. You can try refreshing the page or checking them out yourself on my
          <a href="https://last.fm/user/AutiOne" target="_blank">Last.fm page</a>.
        </Box>
      {/if}
    {/await}
  </Section>

  <Section label="games">
    <Box>
      {#await data.recentGames}
        <p>Loading stats...</p>
      {:then games}
        {#if !("error" in games)}
          <p>
            Games are fun, which is why I play lots of them. A lot of the time, I stick to my known favorites, but you never know what your next best thing
            might be!
          </p>

          <br />

          <p>So, on the spirit of curiosity, you can explore my last played games on Steam:</p>

          <section class="recent-games">
            {#each games as game (game.appId)}
              <a href={`https://store.steampowered.com/app/${game.appId}`} target="_blank" class="raw">
                <img src={game.icon} alt="" />

                <span>
                  <b>{game.name}</b>
                  <small>{(game.playtime.recent / 60).toFixed(1)}h played recently ({(game.playtime.total / 60).toFixed(1)}h total)</small>
                </span>
              </a>
            {/each}
          </section>
        {:else}
          <p>
            Whoops, pulling game info from Steam didn't work. You can still check them our yourself on my
            <a href="https://steamcommunity.com/id/AutiOne/" target="_blank">Steam profile</a>.
          </p>
        {/if}
      {/await}

      <hr />

      <p>
        If you're looking for something more thoughtful than just stats, then see some of my favorite titles not limited to just Steam games, with a small bit
        of my opinion on each one.
      </p>

      <br />

      <p>
        All of them contain at least some bits of what I usually enjoy in games: storytelling, action, creativity, and most importantly, the ability to play
        with friends!
      </p>
    </Box>

    <section class="games">
      {#each games as game (game.id)}
        <a class="raw" style={`--src: url(/games/banners/${game.id}.png)`} href={game.link.path as any} target="_blank">
          <label>{game.link.label} <ArrowUpRight size={16} /></label>

          <img src={`/games/icons/${game.id}.png`} alt={game.title} title={game.title} />
          <i class="detail">"{game.quote}"</i>
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

  .album:hover > .disc {
    animation-name: spin;
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
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
  }

  .album > .disc > div {
    position: absolute;
    left: 50%;
    top: 50%;

    translate: -50% -50%;

    width: 33%;
    height: 33%;

    border-radius: 100vw;
    overflow: hidden;

    border: 1px solid #0002;

    background-position: center;
    background-size: 5000%;

    filter: saturate(2) brightness(1.5) contrast(0.75);
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

  .recent-games {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;

    width: 100%;
    padding-top: 0.5rem;
  }

  .recent-games > a {
    text-decoration: none;
    color: inherit;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    padding: 0.5rem;
    background-color: var(--base-surface-off);

    transition:
      background-color 0.125s,
      color 0.125s;
  }

  .recent-games > a:hover {
    background-color: var(--base-surface-on);
    color: var(--base-active);
  }

  .recent-games > a span {
    display: flex;
    flex-direction: column;
  }

  .recent-games > a img {
    width: 2rem;
    height: 2rem;
  }

  .recent-games > a span small {
    font-size: 0.75rem;
    opacity: 0.75;
  }

  .games {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;

    width: 100%;
  }

  .games > a {
    background-image: linear-gradient(to bottom, #0003, #000c), var(--src);
    background-color: #000;
    color: #fff;

    background-size: 125%;
    background-position: center;
    background-repeat: repeat-y;

    border: 2px solid var(--base-accent);
    text-decoration: none;

    width: 100%;
    height: 100%;
    aspect-ratio: 10 / 12;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    gap: 0.375rem;

    padding: 1rem;

    position: relative;
    overflow: hidden;

    transition-property: background-size;
  }

  .games > a,
  .games > a * {
    transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    transition-duration: 0.25s;
  }

  .games > a > img {
    height: 60px;
    max-width: 100%;
    object-fit: contain;

    transition-property: height;
  }

  .games > a > .detail {
    font-size: 1rem;
    line-height: 1.75cap;
    text-align: center;

    transition-property: opacity, font-size, line-height;
  }

  .games > a > label {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 0.25rem;

    position: absolute;
    right: 0;
    top: 0;

    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;

    padding: 0.25rem;
    padding-left: 0.5rem;

    background-color: var(--base-accent);
    color: #fff;

    transition-property: opacity, top, right;
  }

  @media screen and (min-width: 640px) {
    .games > a:not(:hover) {
      background-size: 100%;
    }

    .games > a:not(:hover) > img {
      height: 72px;
    }

    .games > a:not(:hover) > label {
      opacity: 0;
      right: -1rem;
      top: -1rem;
    }

    .games > a:not(:hover) > .detail {
      line-height: 0.1cap;
      opacity: 0;
    }
  }

  @media screen and (max-width: 640px) {
    .recent-games {
      grid-template-columns: 1fr;
    }

    .games {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 480px) {
    .vinyls {
      grid-template-columns: 1fr 1fr;
      gap: 1rem 3rem;
    }

    .games > a > img {
      height: 56px;
    }

    .games > a > .detail {
      font-size: 0.9rem;
    }
  }
</style>
