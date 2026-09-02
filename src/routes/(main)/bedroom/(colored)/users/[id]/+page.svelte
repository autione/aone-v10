<script lang="ts">
  import type { LayoutServerData } from "../../../$types";
  import type { PageServerData } from "./$types";

  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";
  import Box from "$lib/components/Box.svelte";

  import { CircleUserRound, PencilOff, Plus, Shield, UserRoundX, X } from "@lucide/svelte";
  import { enhance } from "$app/forms";

  let { data }: { data: LayoutServerData & PageServerData } = $props();

  let flags = $derived(data.target?.flags || []);
  type UserFlag = (typeof flags)["0"];

  const isSelf = $derived(data.target?.id === data.user?.id);
  const preventEdit = $derived(!isSelf && data.target?.flags.includes("account-protected"));
</script>

<svelte:head>
  <title>AutiOne / Bedroom / Users / {data.target?.username}</title>
</svelte:head>

<main class="base-page">
  <style>
    :root {
      --base-accent: var(--tint-blue);
      --base-foreground: var(--base-accent);
    }
  </style>

  <Header bedroom={data}></Header>

  <section class="intro collapse-aside">
    <div class="greeting">
      <h1>{data.target?.displayName}</h1>
      <p class="cursive">/{data.target?.username}</p>
    </div>

    <img src={data.target?.avatar || "/avatar.png"} alt="User Avatar" class="avatar" />
  </section>

  <Box label="persona">
    <section class="box-intro">
      <div>
        <h3>want to know about them?</h3>
        <span>inspect profile details</span>
      </div>

      <CircleUserRound />
    </section>

    <form class="with-layout" method="post" use:enhance>
      <main class="details">
        <label>
          <span>id</span>
          <input data-preserve-contrast name="id" value={data.target!.id} readonly />
        </label>

        <label>
          <span>e-mail</span>
          <input data-preserve-contrast data-spoiler="true" type="email" name="email" value={data.target!.email} readonly />
        </label>

        <label>
          invite code
          <input data-preserve-contrast data-spoiler="true" name="inviteCode" value={data.target!.inviteCode} readonly />
        </label>
      </main>

      <main class="actions">
        <Button disabled={preventEdit} size="small" formaction="?/resetProfile" type="submit">
          reset profile
          <PencilOff size={20} />
        </Button>

        <Button disabled={preventEdit || isSelf} size="small" formaction="?/deactivateAccount" type="submit">
          {data.target?.flags.includes("account-deactivated") ? "reactivate account" : "deactivate account"}
          <UserRoundX size={20} />
        </Button>
      </main>
    </form>
  </Box>

  <Box label="settings">
    <section class="box-intro">
      <div>
        <h3>or will you give them freedom?</h3>
        <span>manage account flags</span>
      </div>

      <Shield />
    </section>

    <form
      class="with-layout"
      method="post"
      action="?/writeFlags"
      use:enhance={({ formData }) => {
        formData.append("flags", JSON.stringify(flags));

        return async ({ update }) => {
          update({ reset: true });
        };
      }}
    >
      <main class="flags">
        {#each flags as flag, i (i)}
          <label for={`flag-${i}`}>
            <input
              autocomplete="off"
              name={`flag-${i}`}
              type="text"
              placeholder="insert flag..."
              bind:value={flags[i]}
              disabled={preventEdit || flag === "account-deactivated"}
            />

            {#if flag !== "account-deactivated"}
              <Button disabled={preventEdit} onclick={() => (flags = flags.filter((_, j) => j !== i))} size="icon" variant="tertiary" type="button">
                <X size={16} />
              </Button>
            {/if}
          </label>
        {/each}

        <Button
          disabled={preventEdit}
          onclick={() => (flags = [...flags, "" as UserFlag])}
          style="justify-content: center;"
          size="small"
          variant="primary"
          type="button"
        >
          <Plus size={20} /> add
        </Button>
      </main>

      <footer>
        <Button disabled={preventEdit} size="small" type="submit">save changes</Button>
      </footer>
    </form>
  </Box>
</main>

<style>
  .avatar {
    width: 6rem;
    height: 6rem;

    border: 4px solid var(--base-background);
    background-color: var(--base-background);
    box-shadow: 0 0 0 2px var(--base-accent);

    margin: 2px;
    margin-left: auto;
  }

  .details,
  .flags {
    display: grid;
    gap: 1rem;

    width: 100%;
  }

  .details {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .flags,
  .actions {
    grid-template-columns: 1fr 1fr;
  }

  .flags > label {
    position: relative;
  }

  .flags > label > :global(button) {
    position: absolute;
    translate: 0 -50%;
    top: 50%;
    right: 0.5rem;
  }

  .actions > :global(button) {
    justify-content: space-between;
  }

  @media screen and (max-width: 520px) {
    .avatar {
      width: 8rem;
      height: 8rem;

      margin: 2px auto !important;
      order: -1;
    }

    .details,
    .flags,
    .actions {
      grid-template-columns: 1fr;
    }
  }
</style>
