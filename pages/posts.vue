<template>
  <div>
    <h2>{{ attributes.title }}</h2>
    // eslint-disable-next-line vue/require-component-is
    <component :is="selectedArticle" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      attributes: {},
      selectedArticle: null
    }
  },
  created() {
    const markdown = require(`~/data/posts/${this.$route.query.name}.md`)
    this.attributes = markdown.attributes
    this.selectedArticle = markdown.vue.component

    // Use Async Components for the benefit of code splitting
    // https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
    // this.selectedArticle = () => import(`~/articles/${this.$route.query.name}.md`).then(({ vue }) => vue.component)
  }
}
</script>
