<script>
	import Card from '../components/Card.svelte'
	import Section from '../components/Section.svelte'
  import ThemeProvider from '../components/ThemeProvider.svelte'
  import posts from '../data/posts.json'
  import projects from '../data/projects.json'
</script>

<ThemeProvider>
  <main>
    <div class="content">
      <div class="card">
        <Card />
      </div>
      <Section title="Posts" sectionLinks={posts} />
      <Section title="Projects" sectionLinks={projects} />
    </div>
  </main>
</ThemeProvider>

<style>
  main {
    padding-bottom: 50px;
    background: linear-gradient(-10deg, var(--light2) 30%, var(--light1) 100%) fixed;
    color: var(--dark2);
  }

  .content {
    max-width: 1000px;
    margin: auto;
  }

  .card {
    padding: 50px 0 30px;
  }
</style>
