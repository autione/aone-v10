<script lang="ts">
  import { asset } from "$app/paths";
  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
  import MaskedIcon from "$lib/components/MaskedIcon.svelte";

  import { Mail } from "@lucide/svelte";
</script>

<svelte:head>
  <title>AutiOne / Socials</title>
</svelte:head>

<main class="base-page">
  <Header></Header>

  <style>
    :root {
      --base-accent: #9d6b00;
      --base-foreground: var(--base-accent);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">find me on</p>
      <h1>socials</h1>
    </div>

    <Box>
      <span class="blurb">I wonder how I'm gonna contact this person from the Internet.</span>
    </Box>
  </section>

  <Box label="immediate contact">
    <p>Reach me through these platforms if you want to get in touch and get a response as soon as possible. Please do allow for time to respond.</p>

    <div class="socials">
      <a class="raw" href="discord://-/users/226484318959173632">
        <MaskedIcon i={asset("/brands/discord.svg")} /> Discord
      </a>

      <a class="raw" href="https://github.com/autione" target="_blank">
        <MaskedIcon i={asset("/brands/github.svg")} /> GitHub
      </a>

      <span>
        <Mail /> E-mail available on GitHub
      </span>
    </div>
  </Box>

  <Box label="other places">
    <p>
      These are other places you can find me, although don't rely on these as a primary way to contact me. I can't guarantee consistent activity or response
      times.
    </p>

    <div class="socials">
      <a class="raw" href="https://reddit.com/u/FiveManiaFifty" target="_blank">
        <MaskedIcon i={asset("/brands/reddit.svg")} /> Reddit
      </a>

      <a class="raw" href="https://bsky.app/profile/auti.one" target="_blank">
        <MaskedIcon i={asset("/brands/bluesky.svg")} /> BlueSky
      </a>

      <a class="raw" href="https://mastodon.social/@autione" target="_blank">
        <MaskedIcon i={asset("/brands/mastodon.svg")} /> Mastodon
      </a>

      <a class="raw" href="https://autione.tumblr.com" target="_blank">
        <MaskedIcon i={asset("/brands/tumblr.svg")} /> Tumblr
      </a>

      <a class="raw" href="https://twitter.com/@Awtysmix" target="_blank">
        <MaskedIcon i={asset("/brands/twitter.svg")} /> Twitter
      </a>

      <a class="raw" href="https://youtube.com/@autione" target="_blank">
        <MaskedIcon i={asset("/brands/youtube.svg")} /> YouTube
      </a>

      <a class="raw" href="https://twitch.tv/autione" target="_blank">
        <MaskedIcon i={asset("/brands/twitch.svg")} /> Twitch
      </a>

      <a class="raw" href="https://open.spotify.com/user/12174654642" target="_blank">
        <MaskedIcon i={asset("/brands/spotify.svg")} /> Spotify
      </a>
    </div>
  </Box>

  <Box label="fun and games">
    <p>At last, all the crazy gaming platforms I'm a part of.</p>

    <div class="socials">
      <a class="raw" href="https://steamcommunity.com/id/AutiOne/" target="_blank">
        <MaskedIcon i={asset("/brands/steam.svg")} /> Steam
      </a>

      <a class="raw" href="https://www.xbox.com/play/user/AutiOne8439" target="_blank">
        <MaskedIcon i={asset("/brands/xbox.svg")} /> Xbox
      </a>

      <a class="raw" href="https://psnprofiles.com/autione" target="_blank">
        <MaskedIcon i={asset("/brands/playstation.svg")} /> PlayStation
      </a>

      <a class="raw" href="https://www.roblox.com/users/158742431/profile" target="_blank">
        <MaskedIcon i={asset("/brands/roblox.svg")} /> Roblox
      </a>

      <a class="raw" href="https://osu.ppy.sh/users/33859486" target="_blank">
        <MaskedIcon i={asset("/brands/osu.svg")} /> osu!
      </a>

      <a class="raw" href="https://ch.tetr.io/u/autione" target="_blank">
        <MaskedIcon i={asset("/brands/tetrio.svg")} /> TETR.IO
      </a>

      <a class="raw" href="https://overwatch.blizzard.com/en-us/career/d34bb8839c7f9ee0bba22ea9%7C0b3246bde514475ff51d8d8d3aa01750/" target="_blank">
        <MaskedIcon i={asset("/brands/battlenet.svg")} /> Battle.net
      </a>

      <a class="raw" href="https://www.bungie.net/7/en/User/Profile/3/4611686018537150650" target="_blank">
        <MaskedIcon i={asset("/brands/bungienet.svg")} /> Bungie.net
      </a>
    </div>
  </Box>
</main>

<style>
  .socials {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;

    padding-top: 0.5rem;
    gap: 0.375rem;
  }

  .socials > a,
  .socials > span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: max-content;
    padding: 0.375rem 0.625rem;
    gap: 0.375rem;
  }

  .socials > a {
    background-color: var(--base-surface-off);
    color: var(--base-accent);
    text-decoration: none;

    transition-property: background-color, color;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;
  }

  .socials > a:hover {
    background-color: var(--base-surface-on);
    color: var(--base-background);
  }

  .socials > span {
    background-color: var(--base-surface-off);
    color: var(--base-accent);
    opacity: 0.5;
    user-select: none;
  }

  @media (prefers-color-scheme: dark) {
    .socials > a,
    .socials > span {
      color: var(--base-foreground);
    }

    .socials > a:hover {
      background-color: var(--base-foreground);
    }
  }
</style>
