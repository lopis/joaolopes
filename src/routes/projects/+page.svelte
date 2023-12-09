<script>
  // @ts-nocheck
  import Section from '../../components/Section.svelte'
  import projects from '../../data/projects.json'
  import Nav from '../../components/Nav.svelte'
</script>

<Nav />
<Section title="Projects" sectionLinks={projects} />
