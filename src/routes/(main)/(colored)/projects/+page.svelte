<script lang="ts">
  import type { PageServerData } from "./$types";
  
  import { projectMeta } from "$lib/consts";
  import { resolve } from "$app/paths";
  
  import { ArrowRight, CircleDollarSign, Star, UserRound, UsersRound } from "@lucide/svelte";

  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";

  let { data }: { data: PageServerData } = $props();

  const showingAll = $derived(!data.category || data.category === "all");
  const sortedCategoryKeys = Object.keys(projectMeta.category).toSorted((a, b) => {
    return projectMeta.category[a].order - projectMeta.category[b].order
  });

  const featured = $derived(data.projects.filter(p => p.flags.includes("featured")));
  const nonFeatured = $derived(data.projects.filter(p => !p.flags.includes("featured")));
</script>

<svelte:head>
  <title>AutiOne / Projects</title>
</svelte:head>

{#snippet projectCard(project: typeof featured["0"])}
  <a class="raw" href={resolve(`/projects/${project.id}`)}>
    <main>
      <img src={`https://files.auti.one/project-icons/${project.id}`} alt="Icon" />

      <section>
        <b title={project.title}>{project.title}</b>

        <div>
          {const status = projectMeta.status[project.status]}
          {const category = projectMeta.category[project.category]}

          {#if project.flags.length > 0}
            <span>
              {#if project.flags.includes("featured")} <Star size={16} /> {/if}
              {#if project.flags.includes("commercial")} <CircleDollarSign size={16} /> {/if}
            </span>
          {/if}

          <span>
            {project.timeframe[0]}{#if project.timeframe[0] !== project.timeframe[1]}-{project.timeframe[0] !== project.timeframe[1] && project.timeframe[1] === true ? "now" : project.timeframe[1]}{/if}
          </span>

          {const hasContributors = project.contributors.length > 1}
          <span title={`${hasContributors ? "Group" : "Solo"} ${category.name.endsWith("s") ? category.name.substring(0, category.name.length - 1) : category.name} Project`}>
            {const MemberIcon = hasContributors ? UsersRound : UserRound}
            <MemberIcon size={16} />

            {const CategoryIcon = category.icon}
            <CategoryIcon size={16} />
          </span>

          <span title={`${status.label}: ${status.description}`} style={`color: ${status.color};`}>
            {const IconOf = status.icon}
            <IconOf size={16} />
          </span>
        </div>
      </section>
    </main>

    <p title={project.tagline}>{project.tagline}</p>

    <small>read more <ArrowRight size={14} /></small>
  </a>
{/snippet}

<main class="base-page">
  <Header></Header>

  <style>
    :root {
      --base-accent: var(--tint-orange);
    }
  </style>

  <section class="intro">
    <div class="greeting">
      <p class="cursive">check out my</p>
      <h1>projects</h1>
    </div>

    <Box>
      <span class="blurb">I had the genius idea to make stuff to show off my stuff. Wow!</span>
    </Box>
  </section>

  <div class="categories">
    <a href={resolve(`/projects?c=all`)} class={showingAll ? "active raw" : "raw"}>
      <Star />
      everything
    </a>

    {#each sortedCategoryKeys as key (key)}
      {const category = projectMeta.category[key]}
      {const IconOf = category.icon}

      <a href={resolve(`/projects?c=${key}`)} class={data.category === key ? "active raw" : "raw"}>
        <IconOf />
        {category.name.toLowerCase()}
      </a>
    {/each}
  </div>

  {#if showingAll}
    <section class="group">
      <b>featured</b>

      <section class="projects">
        {#each featured as project (project.id)}
          {@render projectCard(project)}
        {/each}
      </section>
    </section>

    <section class="group">
      <b>other projects</b>

      <section class="projects">
        {#each nonFeatured as project (project.id)}
          {@render projectCard(project)}
        {/each}
      </section>
    </section>
  {:else}
    <section class="projects">
      {#each data.projects! as project (project.id)}
        {@render projectCard(project)}
      {/each}
    </section>
  {/if}
</main>

<style>
  .categories {
    background-color: var(--base-background);
    border: 2px solid var(--base-accent);

    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .categories > a {
    color: var(--base-foreground);
    text-decoration: none;

    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0.625rem;
    transition: background-color 0.1s, color 0.1s;
  }

  .categories > a:hover {
    background-color: var(--base-surface-off);
  }

  .categories > a.active {
    background-color: var(--base-surface-on);
    color: var(--base-active);
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

  .projects {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
    width: 100%;
  }

  .projects > a {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;

    background-color: var(--base-background);
    border: 2px solid var(--base-accent);
    color: var(--base-foreground);
    text-decoration: none;

    font-size: 1.125rem;
    transition: background-color 0.1s;
  }

  .projects > a:hover {
    background-color: color-mix(in srgb, var(--base-foreground) 10%, var(--base-background) 100%);
  }

  .projects > a > main {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }

  .projects > a > main img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
  }

  .projects > a > main section {
    display: flex;
    flex-direction: column;
  }

  .projects > a > main section > b {
    font-size: 1.25rem;
  }

  .projects > a > p {
    opacity: 0.75;
  }
  .projects > a > small {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.25rem;

    font-weight: 500;
    width: 100%;
  }

  .projects > a > main section > div,
  .projects > a > main section > div span {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .projects > a > main section > div {
    gap: 0.375rem;
  }

  .projects > a > main section > div span {
    font-size: 1rem;
    height: 1rem;
    
    opacity: 0.75;
  }

  .projects > a > main section > div span:not(:last-child) {
    border-right: 1px solid var(--base-disabled);
    padding-right: 0.375rem;
  }

  @media screen and (max-width: 768px) {
    .projects {
      grid-template-columns: 1fr;
    }

    .categories {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
</style>
