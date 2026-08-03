<script lang="ts">
  import type { LayoutServerData } from "../../$types";
  import type { PageServerData } from "./$types";
  import { projectMeta } from "$lib/consts";

  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";
  import Box from "$lib/components/Box.svelte";

  import { CalendarRange, EyeOff, FileBox, Image, Link2, Plus, Search, Star, UsersRound } from "@lucide/svelte";
  import { resolve } from "$app/paths";
  import { slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  let { data }: { data: PageServerData & LayoutServerData } = $props();

  let createId = $state("");
  let creating = $state(false);
</script>

<svelte:head>
  <title>AutiOne / Bedroom / Projects</title>
</svelte:head>

<main class="base-page">
  <Header bedroom={data}></Header>

  <style>
    :root {
      --base-accent: #bd5326;
      --base-foreground: var(--base-accent);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">manage your</p>
      <h1>projects</h1>
    </div>

    <Box>
      <span class="blurb">Show to the world what you have created, whether prideful or not.</span>
    </Box>
  </section>

  <section class="controls">
    <aside>
      {#if creating}
        <form transition:slide={{ axis: "y", duration: 200, easing: quintOut }} method="post" action="?/create" class="create">
          <label for="id">
            <FileBox />
            <input type="text" autocomplete="off" name="id" placeholder="insert id for new project..." bind:value={createId} />
          </label>

          <Button type="submit" size="small" style="height: calc(100% + 4px); margin: -2px; margin-left: 0;">create</Button>
        </form>
      {:else}
        <form transition:slide={{ axis: "y", duration: 200, easing: quintOut }} method="get" class="lookup">
          <label for="q">
            <Search />
            <input type="text" autocomplete="off" name="q" defaultValue={data.query?.term} placeholder="search..." />
          </label>

          <select onchange={(e) => (e.currentTarget.parentElement as HTMLFormElement).requestSubmit()} value={data.query?.category} name="c">
            <option value="all">all categories</option>
            {#each Object.keys(projectMeta.category) as key (key)}
              <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
              <option value={key}>{(projectMeta.category as any)[key].name.toLowerCase()}</option>
            {/each}
          </select>

          <select onchange={(e) => (e.currentTarget.parentElement as HTMLFormElement).requestSubmit()} value={data.query?.status} name="s">
            <option value="all">all statuses</option>
            {#each Object.keys(projectMeta.status) as key (key)}
              <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
              <option value={key}>{(projectMeta.status as any)[key].label.toLowerCase()}</option>
            {/each}
          </select>
        </form>
      {/if}
    </aside>

    <Button
      onclick={() => (creating = !creating)}
      variant={creating ? "secondary" : "primary"}
      size="icon"
      style="height: calc(100% + 4px); margin: -2px; margin-left: 0;"
    >
      <Plus style={`transition: rotate 0.2s cubic-bezier(0.23, 1, 0.320, 1); rotate: ${creating ? "45deg" : "0deg"};`} />
    </Button>
  </section>

  <section class="projects">
    {#each data.projects! as project (project.id)}
      <a class="raw" href={resolve(`/bedroom/projects/${project.id}`)}>
        <img src={`https://files.auti.one/project-icons/${project.id}`} alt="Icon" />

        <main>
          <span>
            <b title={project.title}>{project.title}</b>
            <p title={project.tagline}>{project.tagline}</p>
          </span>

          <div>
            {const status = projectMeta.status[project.status]}
            {const category = projectMeta.category[project.category]}
            
            <span style={`color: ${status.color};`}>
              {const IconOf = status.icon}

              <IconOf size={18} />
              <p>{status.label.toLowerCase()}</p>
            </span>

            <span>
              {const IconOf = category.icon}

              <IconOf size={18} />
              <p>{category.name.toLowerCase()}</p>
            </span>

            <span style="margin-right: auto;">
              <CalendarRange size={18} />
              {project.timeframe[0]}{#if project.timeframe[0] !== project.timeframe[1]}-{project.timeframe[0] !== project.timeframe[1] && project.timeframe[1] === true ? "now" : project.timeframe[1]}{/if}
            </span>

            {#if project.contributors.length > 0}
              <span>
                <UsersRound size={18} />
                <p>{project.contributors.length}</p>
              </span>
            {/if}

            {#if project.links.length > 0}
              <span>
                <Link2 size={18} />
                <p>{project.links.length}</p>
              </span>
            {/if}

            {#if project.gallery.length > 0}
              <span>
                <Image size={18} />
                <p>{project.gallery.length}</p>
              </span>
            {/if}

            {#if !project.visible} <EyeOff size={18} /> {/if}
            {#if project.featured} <Star size={18} /> {/if}
          </div>
        </main>
      </a>
    {/each}
  </section>
</main>

<style>
  .controls {
    display: grid;
    grid-template-columns: 1fr max-content;

    background-color: var(--base-background);
    color: var(--base-foreground);
    border: 2px solid var(--base-accent);

    width: calc(100% - 4px);
  }

  .controls > aside {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 100%;
  }

  .create {
    display: grid;
    grid-template-columns: 1fr max-content max-content;
    width: 100%;
  }

  .lookup {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    width: 100%;
  }

  .lookup label,
  .create label {
    display: grid;
    grid-template-columns: max-content 1fr;
    align-items: center;

    padding-left: 0.375rem;
  }

  .create input,
  .lookup input,
  .lookup select {
    background-color: transparent;
    border: 0px solid transparent;
    outline: none;

    color: inherit;
    font: inherit;
  }

  .create input:focus,
  .lookup input:focus,
  .lookup select:focus {
    background-color: var(--base-surface);
  }

  .create input,
  .lookup input {
    padding: 0.5rem 0.25rem;
  }

  .lookup select {
    border-left: 2px solid var(--base-accent);
    padding: 0.5rem;
  }

  .projects {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
  }

  .projects > a {
    background-color: var(--base-background);
    border: 2px solid var(--base-accent);
    color: var(--base-foreground);
    text-decoration: none;

    display: flex;
    flex-direction: row;

    padding: 1rem;
    gap: 0.75rem;

    transition-property: background-color;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;
  }

  .projects > a:hover {
    background-color: color-mix(var(--base-background) 95%, var(--base-accent) 5%);
  }

  .projects > a > img {
    width: 2.5rem;
    height: 2.5rem;
    object-fit: cover;
    
    background-color: var(--base-surface-off);
    color: transparent;
  }

  .projects > a main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  .projects > a main > span {
    display: grid;
    grid-template-rows: max-content max-content;
    width: 100%;
  }

  .projects > a main > span > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .projects > a main > span > b {
    font-size: 1.375rem;
  }

  .projects > a main > span > p {
    font-size: 1.125rem;
    opacity: 0.75;
  }

  .projects > a main > div {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.75rem;
    width: 100%;
  }

  .projects > a main > div span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2rem;
  }

  .projects > a main > div span p {
    opacity: 0.75;
  }
</style>
