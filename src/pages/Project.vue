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
    <p>
      <a :href="repository">Check on github</a>
    </p>
  </div>
</template>
<script lang="ts">
import page from 'page'
import { VFile } from 'vfile'

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
    .catch((e) => {
      page.redirect('404')
    })
  },
}
</script>
<style lang="">

</style>
