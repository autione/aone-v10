<script lang="ts">
  /* eslint-disable svelte/no-at-html-tags */
  /* eslint-disable @typescript-eslint/no-explicit-any */

  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
  import MaskedIcon from "$lib/components/MaskedIcon.svelte";
  import fellows, { type FriendEntry } from "$lib/fellows";

  import { Globe } from "@lucide/svelte";

  let sortMode = $state("name" as "name" | "time");
  const sorted: FriendEntry[] = $derived(fellows.toSorted((a, b) => (sortMode === "name" ? a.id.charCodeAt(0) - b.id.charCodeAt(0) : a.year - b.year)));
</script>

<svelte:head>
  <title>AutiOne / Fellows</title>
</svelte:head>

<main class="base-page">
  <Header></Header>

  <style>
    :root {
      --base-accent: #296fbf;
      --base-foreground: var(--base-accent);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">meet my</p>
      <h1>fellows</h1>
    </div>

    <Box>
      <span class="blurb">They say friends can be a bad influence. I'm the bad influence!</span>
    </Box>
  </section>

  <Box label="introduction">
    <p>
      Meet some of my dear fellow creatives, who all have helped me get to where I am today one way or another. They're wonderful people, and you should
      definitely check out their work!
    </p>
  </Box>

  <section class="friends">
    <div class="sort">
      <b>sort by</b>
      <main>
        <button class={sortMode === "name" ? "active" : ""} onclick={() => (sortMode = "name")}>name (a-z)</button>
        <button class={sortMode === "time" ? "active" : ""} onclick={() => (sortMode = "time")}>time</button>
      </main>
    </div>

    <main>
      {#each sorted as fellow (fellow.id)}
        <div class="friend">
          {#if sortMode === "time"}
            <small>since {fellow.year}</small>
          {/if}

          <section class="person">
            <img src={`/profiles/${fellow.id}.png`} alt="Avatar" />
            <span>
              <b>{fellow.name}</b>
              <p>{fellow.pronouns}</p>
            </span>
          </section>

          <span>{fellow.description}</span>

          <section class="meta">
            <div class="tags">
              {#each fellow.tags as tag, i (i)}
                <span>{@html tag}</span>
              {/each}
            </div>

            <div class="ext-links">
              {#each fellow.links as link, i (i)}
                <a class="raw" href={link.path as any} target="_blank">
                  {#if link.icon === "globe"}
                    <Globe size={16} />
                  {:else}
                    <MaskedIcon i={`/brands/${link.icon}.svg`} size={16} />
                  {/if}
                  {#if link.label}<b>{link.label}</b>{/if}
                </a>
              {/each}
            </div>
          </section>
        </div>
      {/each}
    </main>
  </section>
</main>

<style>
  .friends {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .friends > main {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .friend {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;

    background-color: var(--base-background);
    border: 2px solid var(--base-accent);

    padding: 1rem;
    position: relative;
  }

  .friend > .person {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    gap: 0.75rem;

    width: 100%;
  }

  .friend > .person > img {
    width: 3rem;
    height: 3rem;
  }

  .friend > .person > span {
    display: flex;
    flex-direction: column;
    line-height: 1;
    gap: 0;
  }

  .friend > .person b {
    font-size: 1.375rem;
  }

  .friend > .person p {
    font-size: 1.125rem;
    opacity: 0.5;
  }

  .friend > small {
    position: absolute;
    right: 0;
    top: 0;

    background-color: var(--base-accent);
    color: #fff;

    padding: 0.25rem 0.5rem;
  }

  .friend > span {
    font-size: 1.125rem;
    font-style: italic;
    opacity: 0.75;
  }

  .friend > .meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    margin-top: auto;
  }

  .friend > .meta .tags,
  .friend > .meta .ext-links {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.375rem;
  }

  .friend > .meta .tags > span {
    background-color: var(--base-accent);
    color: #fff;

    font-size: 0.875rem;
    font-weight: 600;
    padding: 0 0.5rem;

    display: flex;
    align-items: center;

    height: calc(1cap + 0.875rem);
  }

  .friend > .meta .ext-links > a {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    background-color: var(--base-accent);
    text-decoration: none;
    color: #fff;

    width: 1.5rem;
    height: 1.5rem;
  }

  .friend > .meta .ext-links > a b {
    font-size: 0.625rem;
    text-align: right;

    text-shadow:
      -1px -1px 0 var(--base-accent),
      -1px 0 0 var(--base-accent),
      -1px 1px 0 var(--base-accent),
      0 0 2px var(--base-accent);

    position: absolute;
    right: 2px;
    bottom: 2px;
  }

  .sort {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    gap: 0.75rem;

    width: 100%;
  }

  .sort > b {
    background-color: var(--base-accent);
    color: #fff;

    padding: 0.5rem 1rem;
  }

  .sort > main {
    display: flex;
    grid-auto-columns: 1fr;

    width: calc(100% - 4px);
    border: 2px solid var(--base-accent);

    background-color: var(--base-background);
  }

  .sort > main button {
    font: inherit;
    font-weight: 500;

    background-color: transparent;
    color: var(--base-accent);
    border: none;

    width: 100%;
    padding: calc(0.5rem - 2px) calc(1rem - 2px);

    transition-property: background-color, color;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;
  }

  .sort > main button:hover {
    background-color: var(--base-surface-off);
  }

  .sort > main button.active {
    background-color: var(--base-surface-on);
    color: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .sort > main button {
      color: var(--base-foreground);
    }
  }
</style>
