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
}

a {
	color: #0075ae;
	text-decoration-style: dotted;
}

a:visited {
  color: #6d2faa;
}

.title, .title a {
  margin: 0;
  color: #8fd3f4;
  text-shadow: 1px 1px rgb(59, 170, 222);
  text-decoration: none;
}

pre {
	max-width: 100%;
	overflow-x: scroll;
	font-size: 80%;
	background: rgba(0,0,0,0.1);
	padding: 1ch;
	border: 1px solid #8fd3f4;
}

p img {
	max-width: calc(80vw);
	border: 20px solid white;
	margin-left: -25px;
}

@media screen and (min-width: 960px) {
  p {
    text-align: justify;
  }
}
</style>
