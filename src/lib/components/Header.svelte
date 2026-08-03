<script lang="ts">
  import type { LayoutServerData } from "../../routes/(main)/bedroom/$types";
  import type { ResolvedPathname } from "$app/types";
  import { enhance } from "$app/forms";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";

  import { Copy, LogOut, Ellipsis, DoorOpen, CodeXml } from "@lucide/svelte";

  import MaskedIcon from "./MaskedIcon.svelte";
  import Button from "./Button.svelte";

  interface HeaderProps {
    bedroom?: LayoutServerData;
  }

  const { bedroom }: HeaderProps = $props();
  let dropdown = $state(false);

  interface HeaderLink {
    label: string;
    path: ResolvedPathname | string;
  }

  const isCurrent = (path: string) => page.url.pathname === path;

  const links: HeaderLink[] =
    bedroom !== undefined
      ? [
          { label: "projects", path: resolve("/bedroom/projects") },
          { label: "posts", path: resolve("/bedroom/posts") }
        ]
      : [
          { label: "myself", path: resolve("/myself") },
          { label: "projects", path: resolve("/projects") },
          { label: "socials", path: resolve("/socials") },
          { label: "archives", path: resolve("/archives") },
          { label: "fellows", path: resolve("/fellows") }
        ];
</script>

<header class="site-header">
  <a class="home" href={bedroom ? resolve("/bedroom") : resolve("/")}>
    <MaskedIcon i={`/vectors/${bedroom ? "starfruit" : "logo"}.svg`} size={null} class="logo" />
  </a>

  <nav>
    {#if !page.url.pathname.endsWith("login")}
      {#each links as link (link.label)}
        <a class={`raw ${isCurrent(link.path) ? "selected" : ""}`} href={link.path as ResolvedPathname}>{link.label}</a>
      {/each}
    {/if}
  </nav>

  <section>
    {#if bedroom}
      {#if bedroom.user}
        <button onclick={() => (dropdown = !dropdown)} class={`user-menu ${dropdown ? "active" : ""}`}>
          <span>{bedroom.user.username}</span>
          <img src={bedroom.user.avatar || "/avatar.png"} class="avatar" alt="Avatar" />
        </button>

        <div class={`dropdown ${dropdown ? "active" : ""}`}>
          <span>
            <b>{bedroom.user.displayName}</b>
            <small>{bedroom.user.email}</small>
          </span>

          <footer>
            <Button
              onclick={() => {
                navigator.clipboard.writeText(bedroom.user!.id || "");
                dropdown = false;
              }}
              variant="secondary"
              size="small"
            >
              copy id <Copy size={20} />
            </Button>

            <form onsubmit={() => (dropdown = false)} method="post" action="/bedroom?/logout" use:enhance>
              <Button type="submit" size="small">
                disconnect <LogOut size={20} />
              </Button>
            </form>
          </footer>
        </div>
      {:else}
        <a class="raw" href={resolve("/")}>
          <Button size="tiny">return</Button>
        </a>
      {/if}
    {:else}
      <Button onclick={() => (dropdown = !dropdown)} size="icon">
        <Ellipsis size={20} />
      </Button>

      <div class={`dropdown ${dropdown ? "active" : ""}`}>
        <span>
          <b>auti.one</b>
          <small>version 10</small>
        </span>

        <footer>
          <a class="raw" href={resolve("/bedroom")}>
            <Button variant="secondary" size="small">
              enter bedroom <DoorOpen size={20} />
            </Button>
          </a>

          <a style="pointer-events: none; opacity: 0.5;" class="raw" href="https://github.com/autione/aone-v10" target="_blank">
            <Button variant="secondary" size="small">
              <!-- view source <CodeXml size={20} /> -->
              source soon™ <CodeXml size={20} />
            </Button>
          </a>
        </footer>
      </div>
    {/if}
  </section>
</header>

<style>
  .site-header {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-items: center;

    padding: 0.75rem;
    gap: 0.75rem;

    background-color: var(--base-background);
    border: 2px solid var(--base-accent);

    width: 100%;
  }

  .home {
    width: auto;
    aspect-ratio: 1;

    display: flex;
    justify-content: center;
    align-items: center;

    color: var(--base-accent);
  }

  :global(.logo) {
    width: 2rem;
    height: 2rem;
    background-color: var(--base-accent);
  }

  .site-header nav {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;

    width: 100%;
    overflow-x: auto;
  }

  .site-header nav > a {
    background-color: var(--base-surface-off);
    color: var(--base-foregound);

    transition-property: background-color, color;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;

    font-weight: 500;
    text-decoration: none;

    padding: 0.25rem 0.5rem;
  }

  .site-header nav > a:hover {
    background-color: var(--base-surface-mid);
  }

  .site-header nav > a.selected {
    background-color: var(--base-accent) !important;
    color: #fff !important;
  }

  .site-header > section {
    position: relative;
  }

  .user-menu {
    display: flex;
    align-items: center;

    background-color: transparent;
    box-shadow: 0 0 0 2px transparent;
    color: inherit;
    border: none;

    padding: 0;

    font: inherit;
    font-size: 1.125rem;
    font-weight: 500;

    transition-property: background-color, color, box-shadow;
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    transition-duration: 0.2s;
  }

  .user-menu > img {
    width: 2rem;
    height: 2rem;
  }

  .user-menu > span {
    padding: 0 0.5rem;
  }

  .user-menu:hover {
    background-color: var(--base-surface-off);
    box-shadow: 0 0 0 2px var(--base-surface-off);
  }

  .user-menu.active {
    background-color: var(--base-accent);
    color: var(--base-active);
    box-shadow: 0 0 0 2px var(--base-accent);
  }

  .dropdown {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    width: 14rem;
    padding: 1rem;
    padding-top: 0.5rem;

    position: absolute;
    right: calc(-0.75rem - 2px);
    bottom: -0.75rem;

    translate: 0% 100%;

    background-color: var(--base-background);
    color: var(--base-foregound);
    border: 2px solid var(--base-accent);
    border-top: none;

    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    transition-duration: 0.2s;

    z-index: 2;
  }

  .dropdown:not(.active) {
    opacity: 0;
    pointer-events: none;
  }

  .dropdown > span {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
  }

  .dropdown > span > b {
    font-size: 1.25rem;
  }

  .dropdown > span > small {
    font-size: 0.875rem;
  }

  .dropdown > footer {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .dropdown > footer a {
    text-decoration: none;
  }

  .dropdown > footer form,
  .dropdown > footer a {
    width: 100%;
  }

  :global(.dropdown > footer button) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
</style>
