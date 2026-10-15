import { defineConfig } from 'astro/config'

const setDefaultLayout = () => {
  return function (_, file) {
    const filePath = file.history && file.history[0] ? file.history[0] : '';
    if (filePath.includes('/games/')) {
      file.data.astro.frontmatter.layout =
        file.data.astro.frontmatter.layout || "@layouts/GameLayout.astro";
    } else if (filePath.includes('/posts/') || filePath.includes('/projects/')) {
      file.data.astro.frontmatter.layout =
        file.data.astro.frontmatter.layout || "@layouts/PostLayout.astro";
    } else {
      file.data.astro.frontmatter.layout = undefined
    }
  };
};

export default defineConfig({
  site: 'https://www.jlopes.dev',
  base: '/',
  trailingSlash: 'ignore',
  image: {
    domains: [
      'dev-to-uploads.s3.amazonaws.com',
      'thepracticaldev.s3.amazonaws.com',
      'raw.githubusercontent.com',
    ],
  },
  markdown: {
    remarkPlugins: [setDefaultLayout],
  },
})
