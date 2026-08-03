<script lang="ts">
  import { enhance } from "$app/forms";
  import type { LayoutServerData } from "./$types";

  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";
  import Box from "$lib/components/Box.svelte";

  import { Info, CircleUserRound, Lock, PackageOpen, ArrowLeft, PencilRuler, ScrollText } from "@lucide/svelte";
  import { resolve } from "$app/paths";

  let { data }: { data: LayoutServerData } = $props();
  let avatarUrl = $derived(data.user?.avatar || "");

  let filePicker = $state(undefined as HTMLInputElement | undefined);
  let fileForm = $state(undefined as HTMLFormElement | undefined);
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

  <Box invert label="trinkets">
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
        <b>return</b>
        <span>leave the bedroom and view the site</span>
      </a>

      <a data-hover-palette="orange" class="force-light raw" href={resolve("/bedroom/projects")}>
        <PencilRuler />
        <b>projects</b>
        <span>showcase hobby and work projects</span>
      </a>

      <a data-hover-palette="green" class="force-light raw" href={resolve("/bedroom/posts")}>
        <ScrollText />
        <b>posts</b>
        <span>publish articles on the blog</span>
      </a>
    </section>
  </Box>

  <Box invert label="persona">
    <section class="box-intro">
      <div>
        <h3>feeling like rewriting who you are?</h3>
        <span>modify profile details</span>
      </div>

      <CircleUserRound />
    </section>

    <form bind:this={fileForm} method="post" enctype="multipart/form-data" action="?/uploadAvatar" style="display: none;">
      <input
        bind:this={filePicker}
        accept="image/*"
        type="file"
        name="file"
        onchange={(e) => {
          const files = e.currentTarget.files;
          console.log(files);
          if (!files || !files[0]) return;
          fileForm?.requestSubmit();
        }}
      />
    </form>

    <form class="with-layout persona" method="post" action="?/updateUser" use:enhance>
      <main>
        <label style="grid-area: a;">
          <span>display name <small><Info size={14} /> 1-60 chars</small></span>
          <input placeholder="insert display name..." name="displayName" defaultValue={data.user!.displayName} />
        </label>

        <label style="grid-area: b;">
          <span>name <small><Info size={14} /> lowercase, 3-20 chars</small></span>
          <input placeholder="insert username..." name="username" defaultValue={data.user!.username} />
        </label>

        <label style="grid-area: c;">
          <span>e-mail <small><Info size={14} /> 1-60 chars</small></span>
          <input placeholder="insert e-mail..." type="email" name="email" defaultValue={data.user!.email} />
        </label>

        <label style="grid-area: d;">
          <span>avatar <small><Info size={14} /> URL, 0-255 chars</small></span>
          <div>
            <input
              style="padding-right: 2.25rem"
              placeholder="insert image link..."
              type="url"
              name="avatar"
              defaultValue={data.user!.avatar}
              bind:value={avatarUrl}
            />
            <img src={avatarUrl} style="color: transparent;" alt="Avatar Preview" class="avatar avatar-preview" />
          </div>
        </label>

        <label style="grid-area: e;">
          invite code
          <input placeholder="insert invite code..." name="inviteCode" defaultValue={data.user!.inviteCode} readonly />
        </label>
      </main>

      <footer>
        <Button onclick={() => filePicker?.click()} style="margin-right: auto;" size="small" variant="tertiary" type="button">upload avatar</Button>

        <Button size="small" variant="secondary" type="reset">reset</Button>
        <Button size="small" type="submit">update profile</Button>
      </footer>
    </form>
  </Box>

  <Box invert label="security">
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "a a a b b b"
      "c c d d e e";
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

  form label > div {
    position: relative;
    width: 100%;
  }

  .avatar-preview {
    position: absolute;
    translate: 0 -50%;
    top: 50%;
    right: 0.5rem;

    width: 1.5rem;
    height: 1.5rem;
    aspect-ratio: 1;

    background-color: var(--base-background);
    border: 0px solid var(--base-background);

    transition-property: border-width, box-shadow, scale;
    transition-duration: 0.25s;
  }

  .avatar-preview:hover {
    border-width: 0.25px;
    box-shadow: 0 0 0 0.5px var(--base-foreground);
    scale: 4;
  }
</style>
