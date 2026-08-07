<script lang="ts">
  import type { LayoutServerData } from "../../$types";
  import type { PageServerData } from "./$types";

  import { Check, X } from "@lucide/svelte";

  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";
  import Box from "$lib/components/Box.svelte";
  import { resolve } from "$app/paths";
  import { enhance } from "$app/forms";

  let { data }: { data: PageServerData & LayoutServerData } = $props();
</script>

<svelte:head>
  <title>AutiOne / Bedroom / Users</title>
</svelte:head>

<main class="base-page">
  <Header bedroom={data}></Header>

  <style>
    :root {
      --base-accent: #296fbf;
      --base-foreground: var(--base-accent);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">manage your</p>
      <h1>users</h1>
    </div>

    <Box>
      <span class="blurb">It's important to take measures to upkeep your trust in others.</span>
    </Box>
  </section>

  {#if data.user?.flags.includes("manage-users")}
    <div class="group">
      <b>registered users</b>
    
      <section class="users table">
        <b>
          <span style="text-align: center;">—</span>
          <span>display name</span>
          <span>username</span>
          <span>id</span>
        </b>

        {#each data.users! as user (user.id)}
          <a class="item raw" href={resolve(`/bedroom/users/${user.id}`)}>
            <img src={user.avatar || "/avatar.png"} alt="User Avatar" />
            <span>{user.displayName}</span>
            <span>{user.username}</span>
            <span>{user.id}</span>
          </a>
        {/each}
      </section>
    </div>
  {/if}

  {#if data.user?.flags.includes("invite-users")}
    <div class="group">
      <b>invite codes</b>
  
      <section class="invites table">
        <b>
          <span style="text-align: center;">—</span>
          <span>code</span>
          <span>expiration</span>
          <span>uses</span>
        </b>

        {#each data.invites! as invite (invite.code)}
          <div class="item">
            {const canUse = (!invite.expiresAt || Date.now() < invite.expiresAt.getTime()) && (invite.currentUses < invite.maxUses)}
            {#if canUse} <Check /> {:else} <X /> {/if}

            <pre>{invite.code}</pre>
            <span>
              {invite.expiresAt
                ? invite.expiresAt.toLocaleString(["en-UK"], { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).toLowerCase()
                : "never"}
            </span>
            <span>{invite.currentUses}/{invite.maxUses}</span>
          </div>
        {/each}

        <form action="?/newInvite" method="post" use:enhance>
          <input name="maxUses" placeholder="max uses..." type="number" min="1" />
          <input name="expiresAt" type="datetime-local" />

          <Button size="small">create</Button>
        </form>
      </section>
    </div>
  {/if}
</main>

<style>
  :root {
    --table-cols: 1.5rem 1fr 1fr 0.5fr;
  }

  .table {
    display: flex;
    flex-direction: column;

    width: 100%;

    background-color: var(--base-background);
    border: 2px solid var(--base-accent);
  }

  .table > .item {
    display: grid;
    grid-template-columns: var(--table-cols);
    align-items: center;

    padding: 0.5rem;
    gap: 0.75rem;

    font-feature-settings: "tnum" on;
    font-size: 1.125rem;
    width: 100%;

    color: var(--base-foreground);
    text-decoration: none;

    transition: background-color 0.1s;
  }

  .table > .item:nth-child(odd) {
    background-color: var(--base-surface);
  }

  .table > a:hover,
  .table > a:focus {
    background-color: var(--base-surface-off) !important;
  }

  .users > a > img {
    width: 1.5rem;
    height: 1.5rem;
  }

  .item > pre {
    display: inline;
    margin: 0;
    padding: 0;

    font-size: 1.25rem;
  }

  .invites > .item > pre {
    width: max-content;
    background-color: currentColor;

    transition: background-color 0.1s;
  }

  .invites > .item:hover > pre {
    background-color: transparent;
  }

  .table > b {
    background-color: var(--base-accent);
    color: var(--base-active);

    width: 100%;
    padding: 0.375rem 0.5rem;
    padding-top: calc(0.375rem - 2px);

    display: grid;
    grid-template-columns: var(--table-cols);
    align-items: center;
    gap: 0.75rem;
  }

  .invites > form {
    display: grid;
    grid-template-columns: 1fr 1fr max-content;
    margin: -2px;
  }

  .invites > form > input {
    border-right: 0;
  }

  .group {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
  }

  .group > b {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;
    gap: 0.5rem;

    font-size: 1.5rem;
  }

  .group > b::after {
    background-color: currentColor;
    width: 100%;
    height: 2px;

    content: "";
  }
</style>
