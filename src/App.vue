<template>
  <div>
    <component :is="pageComponent" :pageId="pageId" />
  </div>
</template>

<script>
import page from 'page'
import routes from './routes'

export default {
  data() {
    return {
      pageComponent: null,
      pageId: null,
    }
  },
  computed: {
    currentPageComponent() {
      console.log(this.pageComponent);
      return this.pageComponent
    }
  },
  created () {
    for (let route in routes) {
      page(route, (ctx) => {
        console.log('route', route);
        this.pageComponent = routes[route]
        this.pageId = ctx.params.id
        // this.$forceUpdate()
      })
    }

    page()
  },
  updated() {
    console.log('updated');
  },
}
</script>
<style>
:root {
  --color-background: #ffffff;
  --color-text: #2c3e50;
  --color-accent: #0075ae;
}

html {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
  background-attachment: fixed;
  height: 100vh;
}

body {
  margin: 0 0 0 5vw;
}

#app {
  background: rgba(255,255,255,0.95);
	font-family: sans-serif;
	color: var(--color-text);
	max-width: 70ch;
	font-size: 19px;
	line-height: 1.5;
  min-height: 100vh;
  padding: 2vw;
  box-sizing: border-box;
}

ul {
  list-style: none;
  padding: 0;
}

a {
	color: var(--color-accent);
	text-decoration-style: dotted;
}

a:visited {
  color: var(--color-text);
}

pre {
	max-width: 100%;
	overflow-x: scroll;
	font-size: 80%;
	background: #e0fff9;
	padding: 1ch;
	border: 1px solid #84fab0;
}

blockquote {
	border-left: 1ch solid #84fab0;
	margin: 0;
	padding: 0 2ch;
	font-size: 0.9em;
	font-style: italic;
	text-indent: 4ch;
}

p img {
	max-width: calc(80vw);
	border: 20px solid white;
	margin-left: -20px;
}

@media screen and (min-width: 960px) {
  p {
    text-align: justify;
  }
}
</style>
