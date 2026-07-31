<script lang="ts">
  /* eslint-disable @typescript-eslint/no-explicit-any */
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import Button from "$lib/components/Button.svelte";

  import { OctagonX } from "@lucide/svelte";

  const messages = ["oh, what got you this time?", "yikes, you've hit a wall", "something didn't work out", "sorry about that..."];

  const message = messages[Math.floor(Math.random() * messages.length)];
</script>

<main>
  <div>
    <OctagonX size={40} />

    <aside>
      <h1>{message}</h1>
      <h2>this page failed with status {page.status}</h2>

      {#if page.error}<h3>{page.error.message.toLowerCase()}</h3>{/if}
    </aside>
  </div>

  <footer>
    <a href={page.url.href as any} class="raw">
      <Button style="width: 100%; margin-right: -2px;" variant="secondary">try again</Button>
    </a>

    <a href={resolve("/")} class="raw">
      <Button style="width: 100%; margin-left: -2px;">return to home</Button>
    </a>
  </footer>
</main>

<style>
  main {
    position: absolute;
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    color: var(--base-foreground);
  }

  main > footer {
    display: grid;
    grid-template-columns: 1fr 1fr;

    width: calc(100% - 1rem);
    max-width: calc(520px + 2px);

    background-color: var(--base-background);
  }

  main > div {
    display: flex;
    flex-direction: row;

    background-color: var(--base-background);
    border: 2px solid var(--base-accent);

    padding: 1.25rem;
    gap: 1rem;

    width: calc(100% - 1rem);
    max-width: calc(520px - (1.25rem * 2) - 4px);
  }

  main > div > aside {
    display: flex;
    flex-direction: column;
    margin-top: -0.5cap;
    margin-bottom: -0.25cap;
  }

  h3 {
    color: var(--base-disabled);
    margin-top: 0.25rem;
    font-weight: 400;
  }

  h2 {
    font-weight: 400;
  }
</style>
