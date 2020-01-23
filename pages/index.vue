<template>
  <div class="container">
    <div>
      <logo />
      <h1 class="title">
        joaolopes
      </h1>
      <h2 class="subtitle">
        Personal Page
      </h2>
      <div v-html="posts[0]" class="links"></div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
// import { getMarkdown } from '~/util/markdown'

export default {
  components: {
    Logo
  },
  asyncData({ app }) {
    const posts = [
      'creating-a-13kb-js-game-using-svg',
      'react_code_sharing',
      'how-to-design-a-javascript-game-in-13kb-or-less',
      'requirements',
      'hugo_netlify',
      'j13k_2018_postmortem'
    ]

    async function asyncImport(postName) {
      const content = await import(`~/data/posts/${postName}.md`)

      return content.default
    }

    return Promise.all(posts.map((post) => asyncImport(post))).then((res) => {
      return {
        posts: res
      }
    })
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
