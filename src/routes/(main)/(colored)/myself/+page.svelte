<script lang="ts">
  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
  import MaskedIcon from "$lib/components/MaskedIcon.svelte";

  import FileTerminal from "@lucide/svelte/icons/file-terminal";
  import Paintbrush from "@lucide/svelte/icons/paintbrush";
  import Clapperboard from "@lucide/svelte/icons/clapperboard";
  import Gamepad2 from "@lucide/svelte/icons/gamepad-2";
  import AudioLines from "@lucide/svelte/icons/audio-lines";
  import BadgeCheck from "@lucide/svelte/icons/badge-check";
  import RectangleCircle from "@lucide/svelte/icons/rectangle-circle";
  import NotebookPen from "@lucide/svelte/icons/notebook-pen";
  import Cpu from "@lucide/svelte/icons/cpu";

  const birthdate = 1179802800000;
  const age = Math.floor((Date.now() - birthdate) / 1000 / 60 / 60 / 24 / 365);
</script>

<svelte:head>
  <title>AutiOne / Myself</title>
</svelte:head>

<main class="base-page">
  <Header></Header>

  <style>
    :root {
      --base-accent: #c22648;
      --base-foreground: var(--base-accent);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">more about</p>
      <h1>myself</h1>
    </div>

    <Box>
      <span class="blurb">If the homepage wasn't enough, don't worry. I got you covered!</span>
    </Box>
  </section>

  <Box label="introduction">
    <p>
      As you may already know, my name is Auti. I'm a {age}-year-old <a href="https://en.wikipedia.org/wiki/Non-binary" target="_blank">non-binary</a> autistic silly
      from São Paulo, Brazil. I use they/it pronouns.
    </p>
    <br />
    <p>
      I am a native Portuguese speaker, but I also have a good proficiency in English, I get myself around with Spanish, and I am slowly trying to learn some
      Japanese.
    </p>
    <br />
    <p>
      Currently, most of my time is spent crafting multimedia shenanigans (like this website), listening to music, playing videogames, and raking up streaks of
      days spent at home.
    </p>
    <br />
    <p>
      <small style="opacity: 0.5;">
        <i>
          Also, just to clear it up: even though my name is Auti, and my brand is AutiOne, my name is not AutiOne and AutiOne isn't me personally but rather my
          brand, of which I sometimes am referred to through. Not confusing, right? Good!
        </i>
      </small>
    </p>
  </Box>

  <Box label="work & hobbies">
    <p>
      Ever since I was a tiny little kiddo, I already had a special place in my heart for computers and electronics in general. This interest got me involved
      very early in a bunch of digital stuff.
    </p>
    <br />
    <p>In the big year of 2013, at age 6, I started coding my first few projects using Microsoft's Visual Basic 2010 Express.</p>
    <br />
    <p>
      <small style="opacity: 0.5;">
        <i>VB.NET was actually part of my repertoire for a good while. Microsoft really had me!</i>
      </small>
    </p>
    <br />
    <p>Over time, I got to learn different coding languages, and nowadays I'm mostly developing in web platforms and game engines.</p>
    <br />
    <p>
      A year before the pandemic, in 2019, I began wanting to spice up my websites with some extra flair, so a very creative Auti decided to start messing with
      UI design and vector graphics in <a href="https://en.wikipedia.org/wiki/Adobe_XD" target="_blank">Adobe XD</a> back then.
    </p>
    <br />
    <p>Most recently, I started messing around with sound design, music production and 3D modelling, although those are currently very experimental.</p>
    <br />
    <p>Right now, a lot of my time is dedicated to autonomous projects, both solo and with a team. You may see works of mine in the form of:</p>

    <div class="skills">
      <span><FileTerminal /> programming</span>
      <span><Paintbrush /> ui/ux design</span>
      <span><Clapperboard /> video editing</span>
      <span><Gamepad2 /> gamedev</span>
      <span><AudioLines /> music & sound design</span>
      <span><BadgeCheck /> quality assurance</span>
      <span><RectangleCircle /> motion graphics</span>
      <span><NotebookPen /> writing & storytelling</span>
      <span><Cpu /> hardware</span>
    </div>
  </Box>

  <Box label="software">
    <p>Here's all the software I use regularly for my creations, if you're interested:</p>

    <div class="apps">
      <section>
        <span class="cursive">coding</span>
        <div>
          <span>
            <MaskedIcon i="/brands/software/vscode.svg" size={24} color="#007acc" />
            <p>
              <span>Visual Studio Code</span>
              <small>for long-time coding sessions</small>
            </p>
          </span>

          <span>
            <MaskedIcon i="/brands/software/git.svg" size={24} color="#f05032" />
            <p>
              <span>Git</span>
              <small>essential version control</small>
            </p>
          </span>

          <span>
            <MaskedIcon i="/brands/software/neovim.svg" size={24} color="#57a143" />
            <p>
              <span>Neovim</span>
              <small>for quick text editing</small>
            </p>
          </span>
        </div>
      </section>

      <section>
        <span class="cursive">games</span>
        <div>
          <span>
            <MaskedIcon i="/brands/software/godot.svg" size={24} color="#478cbf" />
            <p>
              <span>Godot Engine</span>
              <small>for standalone apps & games</small>
            </p>
          </span>

          <span>
            <MaskedIcon i="/brands/software/robloxstudio.svg" size={24} color="#00a2ff" />
            <p>
              <span>Roblox Studio</span>
              <small>for some monetized games</small>
            </p>
          </span>

          <span>
            <MaskedIcon i="/brands/software/steam.svg" size={24} color="var(--neutral-invert)" />
            <p>
              <span>Steam</span>
              <small>distribution & SDKs</small>
            </p>
          </span>
        </div>
      </section>

      <section>
        <span class="cursive">visuals</span>
        <div>
          <span>
            <MaskedIcon i="/brands/software/figma.svg" size={24} color="var(--neutral-invert)" />
            <p>
              <span>Figma</span>
              <small>for most graphics & UIs</small>
            </p>
          </span>

          <span>
            <MaskedIcon i="/brands/software/kdenlive.svg" size={24} color="#527eb2" />
            <p>
              <span>Kdenlive</span>
              <small>occasional video editing</small>
            </p>
          </span>

          <span>
            <MaskedIcon i="/brands/software/blender.svg" size={24} color="#e87d0d" />
            <p>
              <span>Blender</span>
              <small>for game & printing models</small>
            </p>
          </span>

          <span>
            <MaskedIcon i="/brands/software/obs.svg" size={24} color="var(--neutral-invert)" />
            <p>
              <span>OBS Studio</span>
              <small>screen recording & streaming</small>
            </p>
          </span>

          <span>
            <MaskedIcon i="/brands/software/aseprite.svg" size={24} color="var(--neutral-invert)" />
            <p>
              <span>Aseprite</span>
              <small>for pixel-art sprites</small>
            </p>
          </span>
        </div>
      </section>

      <section>
        <span class="cursive">audio</span>
        <div>
          <span>
            <MaskedIcon i="/brands/software/flstudio.svg" size={24} color="#f65e00" />
            <p>
              <span>FL Studio</span>
              <small>for music & sound effects</small>
            </p>
          </span>

          <span>
            <MaskedIcon i="/brands/software/audacity.svg" size={24} color="#2A44FF" />
            <p>
              <span>Audacity</span>
              <small>for some post-production</small>
            </p>
          </span>
        </div>
      </section>
    </div>
  </Box>
</main>

<style>
  .skills {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;

    padding-top: 0.5rem;
    gap: 0.375rem;
  }

  .skills > span {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: max-content;
    padding: 0.375rem 0.625rem;
    gap: 0.375rem;

    background-color: var(--base-surface);
  }

  .apps {
    display: flex;
    flex-direction: column;

    padding-top: 1rem;
    gap: 1rem;
  }

  .apps > section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .apps > section > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .apps > section > div > span {
    display: flex;
    flex-direction: column;

    background-color: var(--base-surface);

    padding: 0.875rem;
    gap: 0.25rem;
  }

  .apps > section > div > span p {
    display: flex;
    flex-direction: column;
  }

  .apps > section > div > span small {
    opacity: 0.5;
  }
</style>
