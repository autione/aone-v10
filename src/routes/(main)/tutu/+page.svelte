<script lang="ts">
  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";
</script>

{#snippet taggedImage({ src, alt }: { src: string; alt: string }, labels: { text: string; color: string; class?: string }[])}
  <Box>
    <div class="taggedImage">
      <img {src} {alt} />

      <aside>
        {#each labels as label, i (label.text)}
          <span style={`color: ${label.color}; text-align: left`} class={label.class || "normal-text"}>{i}. {label.text}</span>
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

  <Box>
    <h1 style="font-size: 48px">Hello</h1>
    <p class="normal-text" style="font-size: 20px;">
      I am <span class="mentioned">BIANCA RAINES</span>. Auti gave me this page to do anything i want with it...
    </p>
    <p class="normal-text">
      ...
      <br />Idk what to do <span style="font-size: 24px;">🤓</span>
    </p>
  </Box>

  <section>
    {@render taggedImage(
      {
        src: "https://cdn.discordapp.com/attachments/737037797793202228/1532567502524252160/19ece4eaea764112a17159ba8901102a.png?ex=6a6d5236&is=6a6c00b6&hm=d0aea7def2b94fa1976acabfd8afb5dfa5f6a3f6b8c596c56ef84aa9d427aeeb&",
        alt: "???"
      },
      [
        { text: "cute", color: "#ff7fcf" },
        { text: "adorable", color: "var(--base-foreground)", class: "big-text" }
      ]
    )}
  </section>

  <Box></Box>

  <p style="max-width: 200px;">Geckos are a group of usually small, usually nocturnal lizards. They are found on every continent except Antarctica.</p>
  <p class="limit-size">Some species live in houses where they hunt insects attracted by artificial light.</p>
  <img
    src="https://cdn.discordapp.com/attachments/737037797793202228/1532095458535800934/GWZ95nnbMAAdnT1.png?ex=6a6cec16&is=6a6b9a96&hm=454ff4e37ed7c212d53f9f3ec114a8de62090a8970a974b134de58c7bbae1f28&"
    alt="trans"
  />
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

  .normal-text {
    font-weight: 500;
    font-family: "Montserrat";
    font-size: 16px;
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

  .taggedImage {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .taggedImage aside {
    display: flex;
    flex-direction: column;
  }

  .taggedImage img {
    max-width: 400px;
  }

  .mentioned {
    font-weight: bold;
    font-size: 120%;
    color: rgb(101, 185, 90);
  }

  @media (prefers-color-scheme: dark) {
    .mentioned {
      color: rgb(117, 224, 103);
    }
  }
</style>
