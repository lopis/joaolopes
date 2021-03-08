<template>
  <div>
    <SiteHeader />
    <h2>{{ title }}</h2>
    <p class="date">
      Originally published on: {{ date }}
    </p>
    <div v-safe-html="contents"></div>
  </div>
</template>
<script lang="ts">
import { VFile } from 'vfile'
import page from 'page'

import SiteHeader from '../components/SiteHeader.vue'
import fetchMarkdown from '../util/markdown'
import { Frontmatter } from '../util/types'

export default {
  components: {
    SiteHeader
  },
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
      this.date = data.date ? (new Date(data.date || '')).toLocaleDateString('pt') : ''
      this.description = data.description || ''
      this.tags = (data.tags || '').split(',')
      this.image = data.image || ''
      this.contents = String(file.contents)
    })
    .catch((e) => {
      page.redirect('404')
    })
  },
}
</script>
<style>
.date {
  font-size: 0.7em;
  font-weight: bold;
  color: var(--color-accent);
}
</style>
