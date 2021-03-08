<template>
  <div>
    <h1 class="title">
      <a href="/">
        João Lopes
      </a>
    </h1>
    <h2>{{ title }}</h2>
    <p class="date">
      Originally published on: {{ formattedDate }}
    </p>
    <div v-safe-html="contents"></div>
  </div>
</template>
<script lang="ts">
import fetchMarkdown from '../util/markdown'
import { VFile } from 'vfile'
import { Frontmatter } from '../util/types'

export default {
  props: {
    pageId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      title: '',
      path: '',
      date: '',
      repository: '',
      description: '',
      status: '',
      image: '',
      contents: '',
    }
  },
  mounted() {
    fetchMarkdown(`projects/${this.pageId}`)
    .then((file: VFile) => {
      const data = file.data as Frontmatter
      this.title = data.title
      this.path = data.path
      this.date = data.date || ''
      this.repository = data.repository || ''
      this.description = data.description || ''
      this.status = data.status || ''
      this.image = data.image || ''
      this.contents = String(file.contents)
    })
  },
}
</script>
<style lang="">

</style>
