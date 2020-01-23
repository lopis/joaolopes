import Markdown from '@nuxt/markdown'
import content from '../data/posts/requirements.md'

const md = new Markdown({
  extend({ macros }) {
    macros.alert = (content, props, { transformer, eat }) => {
      return {
        type: 'AlertNode',
        data: {
          hName: 'div',
          hClassNames: ['alert alert-note'],
          hChildren: transformer.tokenizeBlock(content, eat.now())
        }
      }
    }
  }
})

export async function getMarkdown() {
  const rendered = await md.toMarkup(content)

  return rendered
}
