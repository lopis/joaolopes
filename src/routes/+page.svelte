<script>
  // @ts-nocheck
  import Card from '../components/Card.svelte'
  import Section from '../components/Section.svelte'
  import posts from '../data/posts.json'
  import projects from '../data/projects.json'
  import Nav from '../components/Nav.svelte'

</script>

<div class="card">
  <Card />
</div>
<Nav />
<div class="columns">
  <Section title="Projects" sectionLinks={projects.slice(0, 3)} more="projects"/>
  <Section title="Posts" sectionLinks={posts.slice(0, 3)} more="posts"/>
</div>

<style>
.card {
  padding: 50px 0 30px;
}

.columns {
  display: flex;
  margin: auto;
  flex-wrap: wrap;
}

.columns :global(section) {
  flex-grow: 1;
  flex-basis: 400px;
}
</style>
