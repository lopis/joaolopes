import { defineConfig } from 'astro/config'

const setDefaultLayout = () => {
  return function (_, file) {
    const filePath = file.history && file.history[0] ? file.history[0] : '';
    if (filePath.includes('/games/')) {
      file.data.astro.frontmatter.layout =
        file.data.astro.frontmatter.layout || "@layouts/GameLayout.astro";
    } else {
      file.data.astro.frontmatter.layout =
        file.data.astro.frontmatter.layout || "@layouts/PostLayout.astro";
    }
  };
};

export default defineConfig({
  site: 'https://www.jlopes.dev',
  base: '/',
  trailingSlash: 'always',
  markdown: {
    remarkPlugins: [setDefaultLayout],
  },
})
