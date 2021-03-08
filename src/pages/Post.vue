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
      description: '',
      tags: [] as string[],
      image: '',
      contents: '',
    }
  },
  mounted() {
    fetchMarkdown(`posts/${this.pageId}`)
    .then((file: VFile) => {
      const data = file.data as Frontmatter
      this.title = data.title
      this.path = data.path
      this.date = (data.date || '')
      this.description = data.description || ''
      this.tags = (data.tags || '').split(',')
      this.image = data.image || ''
      this.contents = String(file.contents)
    })
  },
}
</script>
<style lang="">

</style>
