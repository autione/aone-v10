<script lang="ts">
  /* eslint-disable svelte/no-navigation-without-resolve */
  import { resolve } from "$app/paths";
  import type { PageProps } from "./$types";

  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
  import MaskedIcon from "$lib/components/MaskedIcon.svelte";

  import {
    House,
    CircleUserRound,
    PencilRuler,
    MessageSquareText,
    FolderOpen,
    HeartHandshake,
    ArrowRight,
    Ban,
    GlobeOff,
    Ellipsis,
    Play,
    Gamepad2,
    Info
  } from "@lucide/svelte";

  const birthdate = 1179802800000;
  const age = Math.floor((Date.now() - birthdate) / 1000 / 60 / 60 / 24 / 365);

  let { data }: PageProps = $props();

  const statusMap: { [key: string]: [string, string] } = {
    online: ["Online", "#14BA67"],
    idle: ["Away", "#CF911E"],
    dnd: ["Do Not Disturb", "#ED3469"],
    offline: ["Offline", "#8692A1"],

    steamOnline: ["Online", "#3080CA"],
    steamBusy: ["Busy", "#BF2F31"],
    steamIdle: ["Away", "#5290B7"],
    steamPlaying: ["Playing", "#54AF33"],

    robloxOnline: ["Online", "#2684FF"],
    robloxPlaying: ["Playing", "#0FC546"],
    robloxStudio: ["In Studio", "#F07426"]
  };

  function timeAgo(epoch: number) {
    const now = Math.floor(Date.now() / 1000);
    const diff = now - epoch;

    const days = Math.floor(diff / 60 / 60 / 24);
    if (days >= 1) return `${days}d`;

    const hours = Math.floor(diff / 60 / 60) % 24;
    if (hours >= 1) return `${hours}h`;

    const minutes = Math.floor(diff / 60) % 60;
    if (minutes >= 1) return `${minutes}m`;

    return `${diff}s`;
  }
</script>

<svelte:head>
  <title>AutiOne</title>
</svelte:head>

<main class="base-page">
  <Header></Header>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">hello, I'm</p>
      <h1>Auti Celeste</h1>
      <i>known online as AutiOne</i>
    </div>

    <div class="chips">
      <span>{age}</span>
      <span>brazilian</span>
      <span>autistic</span>
      <span>non-binary</span>
      <span>they/it</span>
    </div>
  </section>

  <Box>
    <p>Hey there, visitor. Welcome to my silly little website, the go-to place for all sorts of things related to me, things I like and things I make!</p>
    <br />
    <p>You can get started by fiddling with the widgets below or picking a page to read more about a specific thing. Have fun!</p>
  </Box>

  <section class="links">
    <a class="raw" href={resolve("/")}>
      <House />
      <b>home</b>
      <span>you are here right now. start exploring other places instead!</span>
    </a>

    <a data-hover-palette="red" class="force-light raw" href={resolve("/myself")}>
      <CircleUserRound />
      <b>myself</b>
      <span>find out who I am, and maybe surprise yourself in the process!</span>
    </a>

    <a data-hover-palette="orange" class="force-light raw" href={resolve("/projects")}>
      <PencilRuler />
      <b>projects</b>
      <span>observe this majestic list of random stuff I've crafted over time</span>
    </a>

    <a data-hover-palette="yellow" class="force-light raw" href={resolve("/socials")}>
      <MessageSquareText />
      <b>socials</b>
      <span>want to message me, or tag me in silly online posts? get started here</span>
    </a>

    <a data-hover-palette="green" class="force-light raw" href={resolve("/archives")}>
      <FolderOpen />
      <b>archives</b>
      <span>blog-like dump for content that doesn't belong anywhere else</span>
    </a>

    <a data-hover-palette="blue" class="force-light raw" href={resolve("/fellows")}>
      <HeartHandshake />
      <b>fellows</b>
      <span>check out some wonderful people that surprisingly tolerate me</span>
    </a>
  </section>

  <section class="widgets">
    <div class="widget">
      <main>
        <header>
          <span class="cursive">last.fm</span>
          <aside>
            {#await data.lastfm then track}
              {#if !track.error}
                {#if track.nowPlaying}
                  <span class="live">
                    <div></div>
                    NOW
                  </span>
                {:else if track.timestamp}
                  <span class="live off">
                    {timeAgo(track.timestamp)} ago
                  </span>
                {/if}
              {/if}
            {/await}

            <MaskedIcon i="/brands/lastfm.svg" size={22} />
          </aside>
        </header>

        {#await data.lastfm}
          <span><Ellipsis /></span>
        {:then track}
          {#if track.error}
            <span><Ban /></span>
          {:else}
            <section>
              <span>
                <b title={track.title}>{track.title}</b>
                <p title={track.artist}>{track.artist}</p>
              </span>

              <img title={track.album} src={track.cover} alt="Album Cover" />
            </section>
          {/if}
        {:catch}
          <span><Ban /></span>
        {/await}
      </main>

      <footer>
        <a class="raw" href="https://last.fm/user/AutiOne" target="_blank">
          view scrobbles
          <ArrowRight />
        </a>

        {#await data.lastfm then track}
          {#if !track.error && track.url}
            <a style="width: max-content; gap: 0.5rem;" class="invert raw" href={track.url} target="_blank">
              play
              <Play />
            </a>
          {/if}
        {/await}
      </footer>
    </div>

    <div class="widget">
      <main>
        <header>
          <span class="cursive">discord</span>
          <MaskedIcon i="/brands/discord.svg" size={22} />
        </header>

        {#await data.discord}
          <span><Ellipsis /></span>
        {:then activity}
          <section>
            <span>
              <b>{activity.name || "AutiOne"}</b>
              <p style={`color: ${statusMap[activity.status][1]}; display: flex; align-items: center; gap: 0.25rem;`}>
                <span class="status-dot" data-status={activity.status}></span>
                {statusMap[activity.status][0]}
              </p>
            </span>

            {#if activity.status === "offline"}
              <div class="offline">
                <GlobeOff />
              </div>
            {:else}
              <img src={activity.avatar} alt="Profile Avatar" />
            {/if}
          </section>
        {:catch}
          <span><Ban /></span>
        {/await}
      </main>

      <footer>
        <a class="raw" href="discord://-/users/226484318959173632">
          send a message
          <ArrowRight />
        </a>
      </footer>
    </div>

    <div class="widget">
      <main>
        <header>
          <span class="cursive">steam</span>
          <MaskedIcon i="/brands/steam.svg" size={22} />
        </header>

        {#await data.steam}
          <span><Ellipsis /></span>
        {:then summary}
          <section>
            <span>
              <b>{summary.name}</b>
              <p style={`color: ${statusMap[summary.status][1]}; display: flex; align-items: center; gap: 0.25rem;`}>
                <span class="status-dot" data-status={summary.status}></span>
                {summary.status === "offline" && summary.lastSeen
                  ? `Last seen ${timeAgo(summary.lastSeen)} ago`
                  : summary.game?.name || statusMap[summary.status][0]}
              </p>
            </span>

            <img src={summary.avatar} alt="Profile Avatar" />
          </section>
        {:catch}
          <span><Ban /></span>
        {/await}
      </main>

      <footer>
        <a class="raw" href="https://steamcommunity.com/id/AutiOne/" target="_blank">
          view profile
          <ArrowRight />
        </a>

        {#await data.steam then summary}
          {#if summary.game}
            <a style="width: max-content; gap: 0.5rem;" class="invert raw" href={`https://store.steampowered.com/app/${summary.game.appId}`} target="_blank">
              info
              <Info />
            </a>
          {/if}
        {/await}
      </footer>
    </div>

    <div class="widget">
      <main>
        <header>
          <span class="cursive">roblox</span>
          <MaskedIcon i="/brands/roblox.svg" size={22} />
        </header>

        {#await data.roblox}
          <span><Ellipsis /></span>
        {:then presence}
          <section>
            <span>
              <b>Awtysmix</b>
              <p style={`color: ${statusMap[presence.status][1]}; display: flex; align-items: center; gap: 0.25rem;`}>
                <span class="status-dot" data-status={presence.status}></span>
                {presence.status === "robloxPlaying" ? presence.lastLocation : statusMap[presence.status][0]}
              </p>
            </span>

            {#if presence.avatar}
              <img style="background-color: var(--base-surface-mid)" src={presence.avatar} alt="Profile Avatar" />
            {/if}
          </section>
        {:catch}
          <span><Ban /></span>
        {/await}
      </main>

      <footer>
        <a class="raw" href="https://www.roblox.com/users/158742431/profile" target="_blank">
          view profile
          <ArrowRight />
        </a>

        {#await data.roblox then presence}
          {#if presence.launchUri}
            <a style="width: max-content; gap: 0.5rem;" class="invert raw" href={presence.launchUri}>
              join
              <Gamepad2 />
            </a>
          {/if}
        {/await}
      </footer>
    </div>
  </section>
</main>

<style>
  .widgets {
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    width: 100%;
  }

  @media screen and (max-width: 640px) {
    .widgets {
      grid-template-columns: 1fr;
    }
  }

  .widget {
    display: grid;
    grid-template-rows: 1fr max-content;
    border: 2px solid var(--base-accent);
  }

  .widget > main {
    background-color: var(--base-background);
    padding: 1rem;

    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .widget > main header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    font-size: 1.125rem;
  }

  .widget > main header aside {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .widget > main > span {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 100%;
  }

  .widget > main section {
    display: grid;
    grid-template-columns: 1fr max-content;
    align-items: center;
    gap: 0.5rem;
  }

  .widget > main section > img {
    width: 3.5rem;
    height: 3.5rem;
  }

  .widget > main section > .offline {
    width: 3.5rem;
    height: 3.5rem;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--base-surface-mid);
    opacity: 0.5;
  }

  .widget > main section > span {
    display: flex;
    flex-direction: column;

    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .widget > main section > span b,
  .widget > main section > span p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .widget > main section > span b {
    font-size: 1.5rem;
  }

  .widget > main section > span p {
    font-size: 1.125rem;
  }

  .widget > footer {
    display: flex;
    flex-direction: row;
    gap: 2px;

    background-color: var(--base-accent);
    width: 100%;

    transition-property: background-color;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;
  }

  .widget > footer a {
    background-color: var(--base-accent);
    color: var(--base-background);

    font: inherit;
    font-size: 1.125rem;
    text-decoration: none;

    width: 100%;
    padding: 0.625rem 1rem;
    padding-top: calc(0.625rem - 2px);
    border-top: 2px solid transparent;

    display: flex;
    justify-content: space-between;
    align-items: center;

    transition-property: background-color, color, border-top-color;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;
  }

  .widget > footer a:hover,
  .widget > footer a.invert {
    background-color: var(--base-background);
    border-top-color: var(--base-accent);
    color: var(--base-foreground);
  }

  .widget > footer a.invert:hover {
    background-color: color-mix(in srgb, var(--base-background) 90%, var(--base-foreground) 10%);
  }

  .status-dot {
    width: 0.85cap;
    aspect-ratio: 1;
    border-radius: 100vh;
    background-color: currentColor;
  }

  .status-dot[data-status="offline"] {
    background-color: transparent;
    box-shadow: 0 0 0 0.15cap currentColor inset;
  }

  .live {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;

    font-size: 0.75rem;
    font-weight: bold;

    background-color: #ce264222;
    color: #ce2642;

    padding: 0.125rem 0.25rem;
  }

  .live.off {
    background-color: var(--base-surface-mid);
    color: var(--base-foreground);
    opacity: 0.75;
  }

  .live > div {
    width: 0.8cap;
    aspect-ratio: 1;

    background-color: currentColor;
    box-shadow: 0 0 2px currentColor;

    border-radius: 100vh;
  }
</style>
