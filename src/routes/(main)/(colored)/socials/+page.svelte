<script lang="ts">
  import "./effect.css";

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
      --base-accent: var(--tint-yellow);
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
      <a data-effect-palette="discord" class="raw" href="discord://-/users/226484318959173632">
        <MaskedIcon i={asset("/brands/discord.svg")} /> Discord
      </a>

      <a data-effect-palette="github" class="raw" href="https://github.com/autione" target="_blank">
        <MaskedIcon i={asset("/brands/github.svg")} /> GitHub
      </a>

      <span>
        <Mail /> E-mail available on GitHub
      </span>
    </div>
  </Box>

  <Box label="other places">
    <p>These are other places you can find me, but you probably shouldn't use them to actually reach out to me.</p>

    <div class="socials">
      <a data-effect-palette="reddit" class="raw" href="https://reddit.com/u/FiveManiaFifty" target="_blank">
        <MaskedIcon i={asset("/brands/reddit.svg")} /> Reddit
      </a>

      <a data-effect-palette="bluesky" class="raw" href="https://bsky.app/profile/auti.one" target="_blank">
        <MaskedIcon i={asset("/brands/bluesky.svg")} /> BlueSky
      </a>

      <a data-effect-palette="mastodon" class="raw" href="https://mastodon.social/@autione" target="_blank">
        <MaskedIcon i={asset("/brands/mastodon.svg")} /> Mastodon
      </a>

      <a data-effect-palette="tumblr" class="raw" href="https://autione.tumblr.com" target="_blank">
        <MaskedIcon i={asset("/brands/tumblr.svg")} /> Tumblr
      </a>

      <a data-effect-palette="twitter" class="raw" href="https://twitter.com/@Awtysmix" target="_blank">
        <MaskedIcon i={asset("/brands/twitter.svg")} /> Twitter
      </a>

      <a data-effect-palette="youtube" class="raw" href="https://youtube.com/@autione" target="_blank">
        <MaskedIcon i={asset("/brands/youtube.svg")} /> YouTube
      </a>

      <a data-effect-palette="twitch" class="raw" href="https://twitch.tv/autione" target="_blank">
        <MaskedIcon i={asset("/brands/twitch.svg")} /> Twitch
      </a>

      <a data-effect-palette="spotify" class="raw" href="https://open.spotify.com/user/12174654642" target="_blank">
        <MaskedIcon i={asset("/brands/spotify.svg")} /> Spotify
      </a>

      <a data-effect-palette="kofi" class="raw" href="https://ko-fi.com/autione" target="_blank">
        <MaskedIcon i={asset("/brands/kofi.svg")} /> Ko-fi
      </a>
    </div>
  </Box>

  <Box label="fun & games">
    <p>At last, all the crazy gaming platforms I'm a part of, if you ever wanna snipe my games or see how I play.</p>

    <div class="socials">
      <a data-effect-palette="steam" class="raw" href="https://steamcommunity.com/id/AutiOne/" target="_blank">
        <MaskedIcon i={asset("/brands/steam.svg")} /> Steam
      </a>

      <a data-effect-palette="xbox" class="raw" href="https://www.xbox.com/play/user/AutiOne8439" target="_blank">
        <MaskedIcon i={asset("/brands/xbox.svg")} /> Xbox
      </a>

      <a data-effect-palette="playstation" class="raw" href="https://psnprofiles.com/autione" target="_blank">
        <MaskedIcon i={asset("/brands/playstation.svg")} /> PlayStation
      </a>

      <a data-effect-palette="roblox" class="raw" href="https://www.roblox.com/users/158742431/profile" target="_blank">
        <MaskedIcon i={asset("/brands/roblox.svg")} /> Roblox
      </a>

      <a data-effect-palette="osu" class="raw" href="https://osu.ppy.sh/users/33859486" target="_blank">
        <MaskedIcon i={asset("/brands/osu.svg")} /> osu!
      </a>

      <a data-effect-palette="tetrio" class="raw" href="https://ch.tetr.io/u/autione" target="_blank">
        <MaskedIcon i={asset("/brands/tetrio.svg")} /> TETR.IO
      </a>

      <a
        data-effect-palette="battlenet"
        class="raw"
        href="https://overwatch.blizzard.com/en-us/career/d34bb8839c7f9ee0bba22ea9%7C0b3246bde514475ff51d8d8d3aa01750/"
        target="_blank"
      >
        <MaskedIcon i={asset("/brands/battlenet.svg")} /> Battle.net
      </a>

      <a data-effect-palette="bungienet" class="raw" href="https://www.bungie.net/7/en/User/Profile/3/4611686018537150650" target="_blank">
        <MaskedIcon i={asset("/brands/bungienet.svg")} /> Bungie.net
      </a>
    </div>
  </Box>
</main>

<style>
  :global(body:has(.socials > a:hover) .socials > a:not(:hover)) {
    opacity: 0.5;
  }

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
    background-color: rgb(from var(--tint) r g b / 0.08);
    color: var(--tint);
    text-decoration: none;

    transition-property: background-color, color, opacity;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;
  }

  .socials > a:hover {
    background-color: var(--tint);
    color: var(--base-background);
  }

  .socials > span {
    background-color: var(--base-surface-off);
    color: var(--base-accent);
    opacity: 0.5;
    user-select: none;
  }

  @media (prefers-color-scheme: dark) {
    .socials > span {
      color: var(--base-foreground);
    }

    .socials > a {
      background-color: rgb(from color-mix(in srgb, var(--tint) 50%, #fff 50%) r g b / 0.12);
      color: color-mix(in srgb, var(--tint) 25%, #fff 75%);
    }

    .socials > a:hover {
      background-color: var(--tint);
      color: #fff;
    }
  }
</style>
