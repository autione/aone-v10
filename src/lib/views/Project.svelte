<script lang="ts">
  import { projectMeta } from "$lib/consts";
  import type { Project } from "$lib/server/db/schema";

  import PostMarkdown from "$lib/components/PostMarkdown.svelte";
  import Button from "$lib/components/Button.svelte";
  import Box from "$lib/components/Box.svelte";

  import { CalendarRange, Link2, Star, StarOff } from "@lucide/svelte";
  import { fade, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { resolve } from "$app/paths";

  let { project, inEditor = false }: { project: Project, inEditor?: boolean; } = $props();

  let downscrolled = $state(false);
  let viewerImage = $state("");
</script>

<svelte:window onscroll={() => (downscrolled = window.scrollY > 420)} />

{const categoryOf = projectMeta.category[project!.category]}
{#if !!viewerImage}
  <button transition:fade={{ duration: 200, easing: quintOut }} onclick={() => viewerImage = ""} aria-label="Click to close image viewer" class="gallery-viewer" aria-hidden={!viewerImage}>
    <img src={viewerImage} alt="Gallery Preview" />
  </button>
{/if}

<section class="project-info">
  <div class="row">
    <img src={`https://files.auti.one/project-icons/${project?.id}`} alt="Icon" />

    {#if !inEditor}
      <a class="raw" href={resolve("/projects")}>
        <Button size="tiny">return to projects</Button>
      </a>
    {/if}
  </div>

  <main>
    <span>
      <small>
        {const IconOf = categoryOf.icon}

        <IconOf size={16} />
        <p>{categoryOf.name.toUpperCase().substring(0, categoryOf.name.endsWith("s") ? categoryOf.name.length - 1 : undefined)}</p>
      </small>

      <b title={project!.title}>{project!.title}</b>
      <p title={project!.tagline}>{project!.tagline}</p>
    </span>

    <section class="details">
      {const statusOf = projectMeta.status[project!.status]}
      
      <div>
        <b>Status</b>
        <span style={`color: ${statusOf.color};`}>
          {const IconOf = statusOf.icon}
          <IconOf />
          <p>{statusOf.label}</p>
        </span>
      </div>

      <div>
        <b>Period</b>
        <span>
          <CalendarRange />
          <p>
            {project!.timeframe[0]}{#if project!.timeframe[0] !== project!.timeframe[1]}-{project!.timeframe[0] !== project!.timeframe[1] && project!.timeframe[1] === true ? "now" : project!.timeframe[1]}{/if}
          </p>
        </span>
      </div>

      <div>
        <b>Featured</b>
        <span>
          {#if project!.featured}<Star />{:else}<StarOff />{/if}
          {project!.featured ? "Yes" : "No"}
        </span>
      </div>
    </section>
  </main>
</section>

<div class="project-body">
  <main>
    <Box label="description" class="markdown-content">
      <PostMarkdown source={project!.description} />
    </Box>

    {#if project!.gallery.length > 0}
      <Box label="gallery">
        <div class="gallery">
          {#each project!.gallery as url, i (i)}
            <button onclick={() => viewerImage = url}>
              <img src={url} alt={`Image ${i + 1}`} />
            </button>
          {/each}
        </div>
      </Box>
    {/if}
  </main>

  <aside data-in-editor={inEditor}>
    {#if downscrolled}
      <section transition:slide={{ duration: 125, easing: quintOut }} class="info-snippet">
        <img src={`https://files.auti.one/project-icons/${project?.id}`} alt="Icon" />
        <span>
          <p>{project?.title}</p>
          <small>
            {const IconOf = categoryOf.icon}

            <IconOf size={14} />
            <p>{categoryOf.name.toUpperCase().substring(0, categoryOf.name.endsWith("s") ? categoryOf.name.length - 1 : undefined)}</p>
          </small>
        </span>
      </section>
    {/if}

    <Box label="info">
      <section class="additional">
        <b>Links</b>
        
        {#if project!.links.length > 0}
          {#each project!.links as link, i (i)}
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
            <a class="raw" style="width: 100%; text-decoration: none;" href={link.url} target="_blank">
              <Button size="small" style="width: 100%; justify-content: space-between;">
                {link.label}
                <Link2 />
              </Button>
            </a>
          {/each}
        {:else}
          <i class="notice">No project links</i>
        {/if}
      </section>

      <section class="additional">
        <b>Contributors</b>

        {#if project!.contributors.length > 0}
          {#each project!.contributors as contributor, i (i)}
            <!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
            <span class="contributor">
              <p>{contributor.name}</p>
              <small>{contributor.role}</small>
            </span>
          {/each}
        {:else}
          <i class="notice">No other contributors</i>
        {/if}
      </section>
    </Box>
  </aside>
</div>

<style>
  .gallery-viewer {
    position: fixed;
    left: 0;
    top: 0;

    width: 100vw;
    height: 100vh;
    padding: 0;

    background-color: #000a;
    backdrop-filter: blur(2px);
    border: none;

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 3;

    transition: opacity 0.1s;
  }

  .gallery-viewer > img {
    max-width: calc(100vw - 2rem);
    max-height: calc(100vh - 2rem);

    transition: scale 0.1s;
  }

  .project-info {
    background-color: var(--base-background);
    border: 2px solid var(--base-accent);

    width: 100%;
    padding: 1.5rem;
    margin-top: 3rem;

    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .project-info .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .project-info .row a {
    text-decoration: none;
    margin-top: -0.5rem;
    margin-right: -0.5rem;
  }

  .project-info img {
    width: 6.5rem;
    height: 6.5rem;
    margin-top: -5rem;

    border: 4px solid var(--base-background);
    box-shadow: 0 0 0 2px var(--base-accent);

    background-color: var(--base-background);
    color: transparent;
  }

  .project-info main {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .project-info main > span {
    display: grid;
    grid-template-rows: max-content max-content max-content;
    width: 100%;
  }

  .project-info main > span > small {
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: -0.125rem;
    gap: 0.125rem;

    font-size: 1rem;
    font-weight: bold;

    opacity: 0.75;
  }

  .project-info main > span > b {
    font-size: 1.75rem;
  }

  .project-info main > span > p {
    font-size: 1.25rem;
    opacity: 0.75;

    margin: 0.25rem 0;
  }

  .project-info .details {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
    width: 100%;
  }

  .project-info .details div {
    display: flex;
    flex-direction: column;
    padding: 0.75rem;
    gap: 0.25rem;

    border: 2px solid var(--base-surface-mid);
  }

  .project-info .details b {
    text-transform: uppercase;
    opacity: 0.75;
  }

  .project-info .details span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;

    font-size: 1.25rem;
  }

  .project-body {
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    gap: 2rem;
    width: 100%;
  }

  .project-body > main {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .project-body > aside {
    display: flex;
    flex-direction: column;
    height: max-content;

    position: sticky;
    top: 2rem;
  }

  .project-body > aside[data-in-editor="true"] {
    top: 10rem;
  }

  .info-snippet {
    display: flex;
    flex-direction: row;
    align-items: center;

    background-color: var(--base-background);
    border: 2px solid var(--base-accent);

    font-size: 1.125rem;

    padding: 0.5rem;
    margin-bottom: 1rem;
    gap: 0.5rem;
  }

  .info-snippet > img {
    width: 2.5rem;
    height: 2.5rem;
  }

  .info-snippet > span {
    display: flex;
    flex-direction: column;
  }

  .info-snippet > span > p {
    font-weight: 500;
  }

  .info-snippet > span > small {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.125rem;

    font-size: 0.875rem;
    opacity: 0.75;
  }

  .additional {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .additional:not(:last-child) {
    margin-bottom: 1rem;
  }

  .additional > b {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    text-transform: uppercase;
    font-size: 1rem;
    width: 100%;
  }

  .additional > b::after {
    content: "";
    width: 100%;
    height: 2px;
    background-color: var(--base-disabled);
  }

  .contributor {
    width: 100%;
    border: 2px solid var(--base-surface-mid);
    padding: 0.625rem 0.75rem;
  }

  .contributor > * {
    width: 100%;
  }

  .contributor small {
    opacity: 0.75;
  }

  .notice {
    background-color: var(--base-surface-off);
    padding: 0.375rem 0;
    font-size: 0.9rem;
    text-align: center;
  }

  .gallery {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
  }

  .gallery > button {
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: transparent;
    cursor: pointer;
    border: none;

    width: 100%;
    padding: 0;

    transition: box-shadow 0.1s;
  }

  .gallery > button:hover {
    box-shadow: 0 0 0 2px var(--base-accent);
  }

  .gallery > button img {
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    .project-info .details,
    .project-body {
      grid-template-columns: 1fr;
    }

    .info-snippet {
      display: none;
    }
  }

  @media screen and (max-width: 520px) {
    .gallery {
      grid-template-columns: 1fr;
    }
  }
</style>