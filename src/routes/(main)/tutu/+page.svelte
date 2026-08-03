<!--
  This page was written by a guest contributor.
-->

<script lang="ts">
  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

{#snippet taggedImage(
  { src, alt }: { src: string; alt: string },
  labels: { text: string; color: string; style?: string; class?: string }[],
  headerText: string,
  descHeader: { text: string; class: string; style?: string }
)}
  <Box>
    <h2>{headerText}</h2>

    <div class="taggedImage">
      <img {src} {alt} />

      <aside>
        <p class={descHeader.class} style={descHeader.style || ""}>{descHeader.text}</p>

        {#each labels as label, i (label.text)}
          <span style={label.style || `color: ${label.color}; text-align: left`} class={label.class || "desc-text"}>{i + 1}. {label.text}</span>
        {/each}
      </aside>
    </div>
  </Box>
{/snippet}

<svelte:head>
  <title>RAINES</title>
</svelte:head>

<main class="base-page">
  <Header></Header>

  <!-- Introduction -->
  <section>
    <h1 style="font-size: 48px">Hello</h1>
    <p class="normal-text">
      &emsp; I am <span class="mentioned">BIANCA RAINES</span>. Auti gave me this page to do anything I want with it...
    </p>
    <p class="normal-text" style="margin-bottom: 1rem">...</p>
    <p class="normal-text" style="margin-bottom: 1rem; font-size: 90%">&emsp;Idk what to do<span style="font-size: 160%">🤓</span></p>
  </section>

  <section>
    <h3>About Me</h3>
    <p class="normal-text" style="margin-bottom: 1rem">
      &emsp;I'm a girl that loves learning new things, even if I (sometimes) don't feel capable. I have a big love towards creative things, like: <span
        style="background: var(--ena-gradient-header); background-clip: text; -webkit-text-fill-color: transparent"
      >
        ENA DREAM BBQ</span
      >, Deltarune and The Amazing Digital Circus. I create media expressing myself through forms of art. Such as:
    </p>

    <section>
      <p class="normal-text">
        <span style="font-weight: 800; font-size: 125%">&emsp;Music:</span>
        I've been using FL Studio for 7-ish years to create my songs. I worked with many talented people, but the most important to me is
        <span style="color: #FF94A1">Atlas</span><span style="color: #FFD055">&nbsp;Ocêanico</span>. Because of him, I'm still here making songs! He gave me the
        courage I needed to break the shame barriers and I couldn't be more grateful.
      </p>
      <span class="normal-text">&emsp;I'm gonna show some sneak peaks of my favorite songs that are in production.</span>
    </section>

    <Box style="margin-top: 1rem">
      <h3>&#9679; FRUSTRAÇÕES</h3>
      <section class="normal-text">
        &emsp;It's a song about two beings that are separated and are trying to reconnect. While one can act more "rationally", the other one thinks on the bad
        side of things. Because of that "conflit", they cannot merge as one being again. This idea comes from my perspective of the Ena world.
        <br />&emsp;The song's instrumental is inspired on the animation/song called
        <a href="https://youtu.be/N6DHKPLUHho?si=ZSgv6hVR4bjsEMVK" style="color: Orange"> Dance Out Your Frustations </a>
        created by DECONRECONSTRUCTION. It has a motif of my song
        <a href="https://youtu.be/psICMdKCDTM?si=TweIcdr5exXuGdQq" style="color: DarkSlateBlue">Deitada</a> (Which is a old music and I'm making a newer version!)
      </section>
      <p class="preview-text">THIS IS A PREVIEW/DEMO. THINGS CAN AND WILL CHANGE!<br /><audio controls src="/sounds/Frustations.ogg"></audio></p>
    </Box>
    <Box style="margin-top: 1rem">
      <h3>&#9679; QUEBRADA</h3>
      <section class="normal-text">
        &emsp;"QUEBRADA" is a song inspired on the Ena world (you can tell by the instrumental style). The song's about me when I was at my lowest point in
        life. I care so much for this song and I wish to one day finish it...
        <br /> I only recorded the chorus part, but the music has the intire lyrics written!
      </section>
      <p class="preview-text">THIS IS A PREVIEW/DEMO. THINGS CAN AND WILL CHANGE!<br /><audio controls src="/sounds/Broken.ogg"></audio></p>
    </Box>
  </section>

  <h3>Things i like and dislike</h3>

  <!-- Good ENA -->
  <section>
    {@render taggedImage(
      {
        src: "https://i.imgur.com/MwOzLFf.jpeg",
        alt: "Ena"
      },
      [
        {
          text: "Cute",
          color: "#f1e7c4",
          style: "background: var(--ena-gradient); background-clip: text; -webkit-text-fill-color: transparent"
        },
        {
          text: "Adorable",
          color: "#e03d38",
          style: "background: var(--ena-gradient); background-clip: text; -webkit-text-fill-color: transparent"
        },
        {
          text: "Sweet",
          color: "#e03d38",
          style: "background: var(--ena-gradient); background-clip: text; -webkit-text-fill-color: transparent"
        },
        {
          text: "Cool",
          color: "#e03d38",
          style: "background: var(--ena-gradient); background-clip: text; -webkit-text-fill-color: transparent"
        },
        {
          text: "Cute (again)",
          color: "#e03d38",
          style: "background: var(--ena-gradient); background-clip: text; -webkit-text-fill-color: transparent"
        },
        {
          text: "Funny",
          color: "#e03d38",
          style: "background: var(--ena-gradient); background-clip: text; -webkit-text-fill-color: transparent"
        }
      ],
      "I LIKE:",
      {
        text: "ENA (DREAM BBQ)",
        class: "desc-text-header",
        style: "background: var(--ena-gradient-header); background-clip: text; -webkit-text-fill-color: transparent"
      }
    )}
  </section>

  <!-- Bad ENA -->
  <section>
    {@render taggedImage(
      {
        src: "https://i.imgur.com/dLcXGNj.png",
        alt: "Malicious Ena"
      },
      [
        {
          text: "Fear",
          color: "#e03d38"
        },
        {
          text: "Ugly",
          color: "#e03d38"
        },
        {
          text: "Villain",
          color: "#e03d38"
        },
        {
          text: "NOT cool",
          color: "#e03d38"
        }
      ],
      "I >>DON'T<< LIKE:",
      {
        text: "ENA (HELL)",
        class: "desc-text-header",
        style: "color: rgb(224, 61, 56)"
      }
    )}
  </section>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

  :root {
    --ena-gradient-header: linear-gradient(rgb(224, 61, 56), rgb(122, 133, 93));
    --ena-gradient: linear-gradient(rgb(170, 179, 148), rgb(51, 55, 80));
  }

  .normal-text {
    font-weight: 500;
    font-family: "Montserrat";
    font-size: 22px;
    margin-bottom: 1rem;
  }

  .preview-text {
    font-weight: 300;
    font-family: "Montserrat";
    font-size: 16px;
    margin-bottom: 1rem;
    color: rgb(217, 217, 217);
  }

  .big-text {
    font-weight: 600;
    font-family: "Montserrat";
    font-size: 32px;
  }

  h1 {
    text-align: center;
    font-weight: 800;
    font-family: "Montserrat";
    font-size: 36px;
    margin-bottom: 0.25em;
  }

  h2 {
    text-align: center;
    font-weight: 700;
    font-family: "Montserrat";
    font-size: 34px;
    margin-bottom: 1rem;
  }

  h3 {
    text-align: left;
    font-weight: 700;
    font-family: "Montserrat";
    font-size: 34px;
    margin-bottom: 1rem;
    margin-left: 1rem;
  }

  .desc-text {
    text-align: left;
    font-weight: 600;
    font-family: "Montserrat";
    font-size: 20px;
    margin-bottom: 0.25em;
  }

  .desc-text-header {
    text-align: left;
    font-weight: 700;
    font-family: "Montserrat";
    font-size: 26px;
    margin-bottom: 0.25em;
    text-decoration: underline;
  }

  .taggedImage {
    display: flex;
    flex-direction: row;
  }

  .taggedImage aside {
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
  }

  .taggedImage img {
    max-width: 300px;
  }

  .mentioned {
    font-weight: bold;
    font-size: 120%;
    color: rgb(101, 185, 90);
    text-decoration: underline;
  }

  @media (prefers-color-scheme: dark) {
    .mentioned {
      color: rgb(117, 224, 103);
    }

    :root {
      --ena-gradient-header: linear-gradient(rgb(224, 61, 56), rgb(241, 231, 196));
      --ena-gradient: linear-gradient(rgb(255, 255, 255), rgb(155, 191, 206));
    }
  }
</style>
