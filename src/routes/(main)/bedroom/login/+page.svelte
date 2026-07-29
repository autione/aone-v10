<script lang="ts">
  import { enhance } from "$app/forms";
  import type { ActionData } from "./$types";
  import type { LayoutServerData } from "../$types";

  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  import Header from "$lib/components/Header.svelte";

  import Info from "@lucide/svelte/icons/info";
  import LogIn from "@lucide/svelte/icons/log-in";
  import OctagonX from "@lucide/svelte/icons/octagon-x";
  import SquareArrowRightEnter from "@lucide/svelte/icons/square-arrow-right-enter";

  let { form, data }: { form: ActionData; data: LayoutServerData } = $props();
  let isSignUp = $state(false);
</script>

<svelte:head>
  <title>AutiOne / Bedroom / Login</title>
</svelte:head>

<main class="base-page">
  <Header bedroom={data}></Header>

  <section class="wrapper">
    <div class="tabs">
      <button class={isSignUp ? "" : "active"} onclick={() => (isSignUp = false)}>resident</button>
      <button class={isSignUp ? "active" : ""} onclick={() => (isSignUp = true)}>new soul</button>
    </div>

    {#if isSignUp}
      <form method="post" action="?/register" use:enhance>
        <main>
          <h2>welcome...</h2>

          <label>
            did anyone invite you over?
            <input placeholder="insert invite code..." name="inviteCode" />
            <small><Info size={14} /> format similar to XXXXXX-XXXXXX</small>
          </label>

          <label>
            how can we call you?
            <input placeholder="insert username..." name="username" />
            <small><Info size={14} /> lowercase a-z, 0-9, -, _ between 3-20 chars</small>
          </label>

          <label>
            where can we find you?
            <input placeholder="insert e-mail..." type="email" name="email" />
            <small><Info size={14} /> between 1-60 chars</small>
          </label>

          <label>
            what is going to be our secret?
            <input placeholder="insert password..." type="password" name="password" />
            <small><Info size={14} /> between 6-255 chars</small>
          </label>

          <label>
            ooh, can you say it again?
            <input placeholder="confirm password..." type="password" name="confirmPassword" />
          </label>
        </main>

        <button type="submit">onboard <SquareArrowRightEnter /></button>
      </form>
    {:else}
      <form method="post" action="?/login" use:enhance>
        <main>
          <h2>hey there...</h2>

          <label>
            where do you come from?
            <input placeholder="insert e-mail..." type="email" name="email" />
          </label>

          <label>
            ...and just to be sure
            <input placeholder="insert password..." type="password" name="password" />
          </label>
        </main>

        <button type="submit">enter <LogIn /></button>
      </form>
    {/if}

    {#if form?.error}
      <span transition:slide={{ duration: 200, easing: quintOut }} class="error">
        <p>request failed with code <b>{form.error}</b></p>
        <OctagonX size={16} />
      </span>
    {/if}
  </section>
</main>

<style>
  .base-page {
    height: calc(100vh - 5rem);
  }

  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    width: 100%;
  }

  .tabs > button {
    font: inherit;
    font-weight: 500;

    background-color: var(--base-accent);
    color: var(--base-background);
    border: none;

    transition-property: background-color, color;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;

    padding: 0.5rem;
  }

  .tabs > button:not(.active):hover {
    cursor: pointer;
  }

  .tabs > button.active {
    background-color: transparent;
    color: var(--base-accent);
  }

  .wrapper {
    background-color: var(--base-background);
    border: 2px solid var(--base-accent);

    max-width: 400px;
    width: 100%;
    margin: auto;
  }

  .error {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 0.5rem 1rem;
    gap: 0.375rem;

    background-color: #c22648;
    color: #fff;

    font-size: 0.875rem;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  form > main {
    display: flex;
    flex-direction: column;

    padding: 1.5rem;
    padding-top: 1rem;
    gap: 1rem;
  }

  form button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;

    font: inherit;
    font-size: 1.125rem;

    background-color: var(--base-accent);
    color: var(--base-background);

    border: 0px solid transparent;
    border-top-width: 2px;

    transition-property: background-color, color, border-color, border-width;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;

    cursor: pointer;
  }

  .wrapper:has(.error) form button {
    border-bottom-width: 2px;
  }

  form button:not(:active):hover {
    background-color: var(--base-background);
    color: var(--base-accent);
    border-color: var(--base-accent);
  }

  form label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  form label > small {
    display: none;
    align-items: center;
    gap: 0.25rem;

    font-weight: 500;
    opacity: 0.5;
  }

  form label:has(input:focus) > small {
    display: flex;
  }

  form input {
    color: var(--base-foreground);
    font: inherit;
    padding: 0.5rem;

    background-color: transparent;
    border: 2px solid var(--base-accent);

    transition-property: background-color;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;
  }

  form input:hover,
  form input:focus {
    background-color: var(--base-surface-off);
  }
</style>
