<script lang="ts">
  import type { PageServerData } from "./$types";
  
  import { projectMeta } from "$lib/consts";
  import { resolve } from "$app/paths";
  
  import { UserRound, UsersRound } from "@lucide/svelte";

  import Box from "$lib/components/Box.svelte";
  import Header from "$lib/components/Header.svelte";

  let { data }: { data: PageServerData } = $props();
</script>

<svelte:head>
  <title>AutiOne / Projects</title>
</svelte:head>

<main class="base-page">
  <Header></Header>

  <style>
    :root {
      --base-accent: #bd5326;
      --base-foreground: var(--base-accent);
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

  <section class="projects">
    {#each data.projects! as project (project.id)}
      <a class="raw" href={resolve(`/projects/${project.id}`)}>
        <main>
          <img src={`https://files.auti.one/project-icons/${project.id}`} alt="Icon" />
  
          <section>
            <b title={project.title}>{project.title}</b>
  
            <div>
              {const status = projectMeta.status[project.status]}
              {const category = projectMeta.category[project.category]}
  
              <span>
                {project.timeframe[0]}{#if project.timeframe[0] !== project.timeframe[1]}-{project.timeframe[0] !== project.timeframe[1] && project.timeframe[1] === true ? "now" : project.timeframe[1]}{/if}
              </span>
  
              <span>
                {const MemberIcon = project.contributors.length > 1 ? UsersRound : UserRound}
                <MemberIcon size={16} />
  
                {const CategoryIcon = category.icon}
                <CategoryIcon size={16} />
              </span>
  
              <span style={`color: ${status.color};`}>
                {const IconOf = status.icon}
                <IconOf size={16} />
              </span>
            </div>
          </section>
        </main>

        <p title={project.tagline}>{project.tagline}</p>
      </a>
    {/each}
  </section>
</main>

<style>
  .projects {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }

  @media screen and (max-width: 768px) {
    .projects {
      grid-template-columns: 1fr;
    }
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
</style>
