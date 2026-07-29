<script lang="ts">
  import { enhance } from "$app/forms";
  import type { LayoutServerData } from "./$types";

  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";
  import Box from "$lib/components/Box.svelte";

  import { Info, CircleUserRound, Lock, PackageOpen, ArrowLeft, PencilRuler, ScrollText } from "@lucide/svelte";
  import { resolve } from "$app/paths";

  let { data }: { data: LayoutServerData } = $props();
</script>

<svelte:head>
  <title>AutiOne / Bedroom</title>
</svelte:head>

<main class="base-page">
  <Header bedroom={data}></Header>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">welcome to the</p>
      <h1>bedroom</h1>
    </div>

    <Box>
      <span class="blurb">Make yourself at home and use anything you need from the desk.</span>
    </Box>
  </section>

  <Box label="trinkets">
    <section class="box-intro">
      <div>
        <h3>could be fun to kickstart some work</h3>
        <span>shortcuts to other pages</span>
      </div>

      <PackageOpen />
    </section>

    <section class="links">
      <a class="raw" href={resolve("/")}>
        <ArrowLeft />
        <b>return </b>
        <span>leave the bedroom and view the site</span>
      </a>

      <a data-hover-palette="orange" class="force-light raw" href="#">
        <PencilRuler />
        <b>projects</b>
        <span>showcase hobby and work projects</span>
      </a>

      <a data-hover-palette="green" class="force-light raw" href="#">
        <ScrollText />
        <b>posts</b>
        <span>publish articles on the blog</span>
      </a>
    </section>
  </Box>

  <Box label="persona">
    <section class="box-intro">
      <div>
        <h3>feeling like rewriting who you are?</h3>
        <span>modify profile details</span>
      </div>

      <CircleUserRound />
    </section>

    <form class="with-layout persona" method="post" action="?/updateUser" use:enhance>
      <main>
        <label>
          <span>display name <small><Info size={14} /> 1-60 chars</small></span>
          <input placeholder="insert display name..." name="displayName" defaultValue={data.user!.displayName} />
        </label>

        <label>
          <span>name <small><Info size={14} /> lowercase, 3-20 chars</small></span>
          <input placeholder="insert username..." name="username" defaultValue={data.user!.username} />
        </label>

        <label>
          <span>e-mail <small><Info size={14} /> 1-60 chars</small></span>
          <input placeholder="insert e-mail..." type="email" name="email" defaultValue={data.user!.email} />
        </label>

        <label>
          invite code
          <input placeholder="insert invite code..." name="inviteCode" defaultValue={data.user!.inviteCode} readonly />
        </label>
      </main>

      <footer>
        <Button size="small" variant="secondary" type="reset">reset</Button>
        <Button size="small" type="submit">update profile</Button>
      </footer>
    </form>
  </Box>

  <Box label="security">
    <section class="box-intro">
      <div>
        <h3>or do you need to change the locks?</h3>
        <span>change account password</span>
      </div>

      <Lock />
    </section>

    <form class="with-layout security" method="post" action="?/changePassword" use:enhance>
      <main>
        <label style="grid-area: a;">
          <span>current password</span>
          <input type="password" placeholder="insert current password..." name="oldPassword" />
        </label>

        <label style="grid-area: b;">
          <span>new password</span>
          <input type="password" placeholder="insert new password..." name="newPassword" />
        </label>

        <label style="grid-area: c;">
          <span>confirm password</span>
          <input type="password" placeholder="insert new password again..." name="confirmPassword" />
        </label>
      </main>

      <footer>
        <Button size="small" variant="secondary" type="reset">clear</Button>
        <Button size="small" type="submit">change password</Button>
      </footer>
    </form>
  </Box>
</main>

<style>
  .box-intro {
    display: grid;
    grid-template-columns: 1fr max-content;
    padding-bottom: 0.75rem;
  }

  .box-intro > div {
    display: flex;
    flex-direction: column;
  }

  .box-intro > div span {
    font-style: italic;
    color: var(--base-disabled);
  }

  form.with-layout {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  form.with-layout > main {
    display: grid;
    gap: 1rem;
  }

  form.with-layout.persona > main {
    grid-template-columns: 1fr 1fr;
  }

  form.with-layout.security > main {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "a a"
      "b c";
  }

  form.with-layout > footer {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    gap: 0.5rem;

    width: 100%;
  }

  form label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  form label > span {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
  }

  form label > span small {
    display: none;
    align-items: center;
    gap: 0.25rem;

    font-weight: 500;
    opacity: 0.5;
  }

  form label:has(input:focus) > span small {
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

  form input:read-only {
    border-color: var(--base-surface-mid);
    color: var(--base-disabled);
    outline: none;
  }

  form input:not(:read-only):hover,
  form input:not(:read-only):focus {
    background-color: var(--base-surface-off);
  }
</style>
