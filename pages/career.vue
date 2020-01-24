<template>
  <div>
    <h2>{{ attributes.title }}</h2>
    <component :is="selectedArticle" />
  </div>
</template>

<script>
import articles from '../util/articles'

export default {
  validate({ query }) {
    return articles.career.includes(query.name)
  },
  data() {
    return {
      attributes: {},
      selectedArticle: null
    }
  },
  created() {
    const markdown = require(`~/data/career/${this.$route.query.name}.md`)
    this.attributes = markdown.attributes
    this.selectedArticle = markdown.vue.component

    // Use Async Components for the benefit of code splitting
    // https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components
    // this.selectedArticle = () => import(`~/articles/${this.$route.query.name}.md`).then(({ vue }) => vue.component)
  }
}
</script>
