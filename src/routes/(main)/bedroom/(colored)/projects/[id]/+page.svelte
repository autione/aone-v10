<script lang="ts">
  import type { LayoutServerData } from "../../../$types";
  import type { ActionData, PageServerData } from "./$types";
  import { projectMeta } from "$lib/consts";
  
  import PostMarkdown from "$lib/components/PostMarkdown.svelte";
  import Header from "$lib/components/Header.svelte";
  import Button from "$lib/components/Button.svelte";
  import Box from "$lib/components/Box.svelte";

  import { ArrowRight, CalendarRange, Eye, FileBox, InfinityIcon, Link2, Loader, Pencil, Plus, Save, Star, StarOff, Trash2, X } from "@lucide/svelte";
  import { enhance } from "$app/forms";
  import { fade } from "svelte/transition";
  import { quintOut } from "svelte/easing";

  const thisYear = new Date().getFullYear();
  let { form, data }: { form: ActionData; data: LayoutServerData & PageServerData } = $props();
  
  let title = $derived(data.project?.title || "");
  let tagline = $derived(data.project?.tagline || "");
  let description = $derived(data.project?.description || "");
  
  let timeframe: [number, number | true] = $derived(data.project?.timeframe || [thisYear, true]);

  let category = $derived(data.project?.category || "other");
  let status = $derived(data.project?.status || "deprecated");
  let featured = $derived(data.project?.featured || false);
  let visible = $derived(data.project?.visible || false);
  
  let contributors = $derived(data.project?.contributors || []);
  let gallery = $derived(data.project?.gallery || []);
  let links = $derived(data.project?.links || []);

  let viewerImage = $state("");

  let filePicker = $state(undefined as HTMLInputElement | undefined);
  let fileForm = $state(undefined as HTMLFormElement | undefined);

  let downscrolled = $state(false);
  let preview = $state(false);
  let busy = $state(false);
</script>

<svelte:head>
  <title>AutiOne / Bedroom / Projects / {title}</title>
</svelte:head>

<svelte:window onscroll={() => (downscrolled = window.scrollY > 96)} />

<main class="base-page extended" style="align-items: center;">
  <style>
    :root {
      --base-accent: #bd5326;
      --base-foreground: var(--base-accent);
    }
  </style>

  <form bind:this={fileForm} method="post" enctype="multipart/form-data" action="?/uploadIcon" style="display: none;">
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

  <div class="header-group" data-downscrolled={downscrolled}>
    <Header bedroom={data}></Header>

    <form
      method="post"
      action="?/save"
      class="editor-header"
      use:enhance={({ formData, action, cancel }) => {
        if (action.search === "?/delete" && !confirm("are you sure you want to delete this project?")) {
          cancel();
          return;
        }

        formData.append("title", title);
        formData.append("tagline", tagline);
        formData.append("description", description);

        formData.append("category", category);
        formData.append("status", status);
        
        formData.append("contributors", JSON.stringify(contributors));
        formData.append("timeframe", JSON.stringify(timeframe));
        formData.append("gallery", JSON.stringify(gallery));
        formData.append("links", JSON.stringify(links));

        formData.append("featured", String(featured));
        formData.append("visible", String(visible));

        busy = true;

        return async ({ update }) => {
          update({ reset: false });
          busy = false;
        };
      }}
    >
      <span><FileBox /> {data.project?.id}</span>

      <aside>
        <Button disabled={busy} onclick={() => (preview = !preview)} type="button" variant="secondary" size="tiny">
          {#if preview}
            <Pencil size={16} /> edit
          {:else}
            <Eye size={16} /> view
          {/if}
        </Button>

        <Button disabled={busy} formaction="?/delete" type="submit" variant="secondary" size="tiny">
          <Trash2 size={16} /> delete
        </Button>

        <Button disabled={busy} type="submit" size="tiny">
          {#if busy}
            <Loader class="loader" size={16} /> please wait
          {:else}
            <Save size={16} /> save changes
          {/if}
        </Button>
      </aside>
    </form>
  </div>

  {#if !!viewerImage}
    <button transition:fade={{ duration: 200, easing: quintOut }} onclick={() => viewerImage = ""} aria-label="Click to close image viewer" class="gallery-viewer" aria-hidden={!viewerImage}>
      <img src={viewerImage} alt="Gallery Preview" />
    </button>
  {/if}

  {#if preview}
    <section class="project-info">
      <img src={`https://files.auti.one/project-icons/${data.project?.id}`} alt="Icon" />

      <main>
        <span>
          {const categoryOf = projectMeta.category[category]}
          <small>
            {const IconOf = categoryOf.icon}

            <IconOf size={16} />
            <p>{categoryOf.name.toUpperCase().substring(0, categoryOf.name.endsWith("s") ? categoryOf.name.length - 1 : undefined)}</p>
          </small>

          <b title={title}>{title}</b>
          <p title={tagline}>{tagline}</p>
        </span>

        <section class="details">
          {const statusOf = projectMeta.status[status]}
          
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
                {timeframe[0]}{#if timeframe[0] !== timeframe[1]}-{timeframe[0] !== timeframe[1] && timeframe[1] === true ? "now" : timeframe[1]}{/if}
              </p>
            </span>
          </div>

          <div>
            <b>Featured</b>
            <span>
              {#if featured}<Star />{:else}<StarOff />{/if}
              {featured ? "Yes" : "No"}
            </span>
          </div>
        </section>
      </main>
    </section>

    <div class="project-body">
      <main>
        <Box label="description" class="markdown-content">
          <PostMarkdown source={description} />
        </Box>

        {#if gallery.length > 0}
          <Box label="gallery">
            <div class="gallery">
              {#each gallery as url, i (i)}
                <button onclick={() => viewerImage = url}>
                  <img src={url} alt={`Image ${i + 1}`} />
                </button>
              {/each}
            </div>
          </Box>
        {/if}
      </main>

      <Box label="info">
        <section class="additional">
          <b>Links</b>
          
          {#if links.length > 0}
            {#each links as link, i (i)}
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

        <br />

        <section class="additional">
          <b>Contributors</b>

          {#if contributors.length > 0}
            {#each contributors as contributor, i (i)}
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
    </div>
  {:else}
    <Box label="project">
      <div class="editor-info">
        <div class="icon">
          <img src={`https://files.auti.one/project-icons/${data.project?.id}`} alt="Project Icon" />
          <Button onclick={() => filePicker?.click()} variant="tertiary" size="small">
            upload new icon
          </Button>
        </div>

        <section class="meta">
          <input placeholder="insert project title..." name="title" bind:value={title} />
          <input placeholder="insert project tagline..." name="tagline" bind:value={tagline} />
        </section>

        <section class="details">
          <label style="grid-area: a;">
            <span>status</span>
            <select name="status" bind:value={status}>
              {#each Object.keys(projectMeta.status) as key (key)}
                <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
                <option value={key}>{(projectMeta.status as any)[key].label}</option>
              {/each}
            </select>
          </label>

          <label style="grid-area: b;" for="">
            <span>period</span>
            <div>
              <input type="number" min={2007} max={typeof timeframe[1] === "number" ? timeframe[1] : thisYear} name="year-start" bind:value={timeframe[0]} />

              <Button onclick={() => timeframe = [timeframe[0], timeframe[1] === true ? thisYear : true]} size="icon" variant="tertiary">
                {#if timeframe[1] === true} <InfinityIcon /> {:else} <ArrowRight /> {/if}
              </Button>
              
              {#if typeof timeframe[1] === "number"}
                <input type="number" min={timeframe[0]} max={thisYear} name="year-end" bind:value={timeframe[1]} />
              {:else}
                <input data-preserve-contrast readonly name="year-end" value="now" />
              {/if}
            </div>
          </label>

          <label style="grid-area: c;">
            <span>category</span>
            <select name="category" bind:value={category}>
              {#each Object.keys(projectMeta.category) as key (key)}
                <!-- eslint-disable-next-line @typescript-eslint/no-explicit-any -->
                <option value={key}>{(projectMeta.category as any)[key].name}</option>
              {/each}
            </select>
          </label>

          <label style="grid-area: d;" for="">
            <span>visibility</span>
            <div>
              <Button onclick={() => { featured = true; visible = true }} variant={featured && visible ? "primary" : "tertiary"} size="small" style="width: 100%; justify-content: center;">featured</Button>
              <Button onclick={() => { featured = false; visible = true }} variant={!featured && visible ? "primary" : "tertiary"} size="small" style="width: 100%; justify-content: center;">visible</Button>
              <Button onclick={() => { featured = false; visible = false }} variant={!visible ? "primary" : "tertiary"} size="small" style="width: 100%; justify-content: center;">hidden</Button>
            </div>
          </label>
        </section>

        <label>
          <span>description</span>
          <textarea rows={8} bind:value={description}></textarea>
        </label>
      </div>
    </Box>

    <Box label="gallery">
      <div class="editor-gallery">
        {#each gallery as url, i (i)}
          <button onclick={() => {
            const newUrl = prompt(`change image #${i+1} url:`, url);
            if (newUrl === null) return;

            const copy = [...gallery];
            if (newUrl.length <= 0) copy.splice(i, 1);
            else copy[i] = newUrl;

            gallery = copy;
          }}>
            <img src={url} alt={`Image ${i + 1}`} />
          </button>
        {/each}

        <button onclick={() => {
            const newUrl = prompt("add image url:");
            if (newUrl !== null && newUrl.length > 0) gallery = [...gallery, newUrl]
        }}>
          <Plus />
        </button>
      </div>
    </Box>

    <Box label="contributors">
      <section class="editor-input-grid">
        {#each contributors as contributor, i (i)}
          <div>
            <input placeholder="contributor name..." bind:value={contributor.name} />
            <input placeholder="contributor role..." bind:value={contributor.role} />
            <Button size="icon" onclick={() => contributors = contributors.filter((_, j) => j !== i)}><X /></Button>
          </div>
        {/each}
      </section>

      <br/>

      <Button style="margin: 0 auto;" size="tiny" onclick={() => contributors = [...contributors, { name: "", role: "" }]}><Plus /> add contributor</Button>
    </Box>

    <Box label="links">
      <section class="editor-input-grid">
        {#each links as link, i (i)}
          <div>
            <input placeholder="insert label..." bind:value={link.label} />
            <input placeholder="insert url..." bind:value={link.url} />
            <Button size="icon" onclick={() => links = links.filter((_, j) => j !== i)}><X /></Button>
          </div>
        {/each}
      </section>

      <br/>

      <Button style="margin: 0 auto;" size="tiny" onclick={() => links = [...links, { label: "", url: "" }]}><Plus /> add link</Button>
    </Box>
  {/if}
</main>

<style>
  .header-group {
    display: flex;
    flex-direction: column;

    background-color: var(--base-background);
    width: 100%;

    position: sticky;
    top: 1rem;
    z-index: 2;

    transition-property: width, margin, box-shadow;
    transition-timing-function: cubic-bezier(0, 0.55, 0.45, 1);
    transition-duration: 0.1s;
  }

  .header-group[data-downscrolled="true"] {
    width: calc(100% + 4rem);
    max-width: 100vw;

    box-shadow: 0 4px 8px var(--base-surface-mid);
  }

  @media screen and (max-width: 920px) {
    .header-group {
      top: 0px;
    }
  }

  .editor-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    border: 2px solid var(--base-accent);
    border-top: 0;
    padding: 0.75rem;
  }

  .editor-header > span {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.375rem;

    font-size: 1.25rem;
    font-weight: 500;
  }

  .editor-header aside {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;

    margin-left: auto;
  }

  .editor-info {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .editor-info .icon {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .editor-info .icon > img {
    width: 6.5rem;
    height: 6.5rem;

    background-color: var(--base-surface-off);
    color: transparent;
  }

  .editor-info .meta {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .editor-info .meta input {
    background-color: transparent;
    outline: none;
    border: none;
    
    color: inherit;
    font: inherit;

    padding: 0;
    width: 100%;
  }

  .editor-info .meta input:focus {
    background-color: var(--base-surface-off);
    padding: 0.25rem;
    margin: -0.25rem;
  }

  .editor-info .meta input[name="title"] {
    font-size: 1.75rem;
    font-weight: bold;
  }

  .editor-info .meta input[name="tagline"] {
    font-size: 1.25rem;
    opacity: 0.75;
  }

  .editor-info .details {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "a b c"
      "d d d";
    gap: 1rem;
  }

  .editor-info label {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .editor-info label > span {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
  }

  .editor-info label > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
  }
  
  .editor-gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    padding: 2px;
    gap: 0.5rem;

    width: 100%;
  }

  .editor-gallery > button {
    width: 100%;
    aspect-ratio: 1;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;

    background-color: var(--base-surface-off);
    color: var(--base-foreground);
    border: none;

    transition: background-color 0.1s, box-shadow 0.1s;
  }

  .editor-gallery > button:hover {
    background-color: var(--base-surface-mid);
    box-shadow: 0 0 0 2px var(--base-accent);
  }

  .editor-gallery > button img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

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

  .editor-input-grid {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .editor-input-grid > div {
    display: grid;
    grid-template-columns: 1fr 1fr max-content;
    align-items: center;
    gap: 0.5rem;
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

  .project-info > img {
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

  .project-info main > span > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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

  .additional {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
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
</style>
