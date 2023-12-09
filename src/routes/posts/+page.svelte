<script>
  // @ts-nocheck
  import Section from '../../components/Section.svelte'
  import posts from '../../data/posts.json'
  import Nav from '../../components/Nav.svelte'
</script>

<Nav />
<Section title="Posts" sectionLinks={posts} />
