<script>
  // @ts-nocheck
  import Card from '../components/Card.svelte'
  import Section from '../components/Section.svelte'
  import posts from '../data/posts.json'
  import projects from '../data/projects.json'
</script>

<div class="card">
  <Card />
</div>
<Section title="Posts" sectionLinks={posts} />
<Section title="Projects" sectionLinks={projects} />

<style>
.card {
  padding: 50px 0 30px;
}
</style>
