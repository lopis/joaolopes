<template>
  <div>
    <div class="pic-container">
      <img :src="require(`~/assets/img/train_station.jpg`)" />
    </div>
    <h1>jlopes.dev</h1>
    <h2>About</h2>
    <section>
      <article class="bio">
        <div>
          {{ about.bio }}
        </div>
        <div class="links">
          <a :href="about.twitter">Twitter</a>
          <a :href="about.github">Github</a>
          <a :href="about.resume">Resume</a>
          <a
            v-for="website in about.websites"
            v-bind:key="website"
            :href="website.split('|')[1]"
            >{{ website.split('|')[0] }}</a
          >
        </div>
      </article>
    </section>

    <section>
      <article>
        <h2>Posts</h2>
        <ul>
          <li v-for="post in posts" :key="post">
            <a :href="post.location">{{ post.title }}</a>
          </li>
        </ul>
      </article>

      <article>
        <h2>Projects</h2>
        <ul>
          <li v-for="project in projects" :key="project">
            <a :href="project.location">{{ project.title }}</a>
            <br />
            <small>{{ project.description }}</small>
          </li>
        </ul>
      </article>

      <article>
        <h2>Career</h2>
        <ul>
          <li v-for="job in career" :key="job">
            <a :href="job.location">{{ job.title }}</a>
          </li>
        </ul>
      </article>
    </section>
  </div>
</template>

<script>
import articles from '../util/articles'

export default {
  data() {
    return {
      posts: [],
      projects: [],
      career: []
    }
  },
  created() {
    Object.keys(articles).forEach((category) => {
      this[category] = articles[category].reduce((rest, article) => {
        const { attributes } = require(`~/data/${category}/${article}.md`)
        rest.push({
          location: `${category}?name=${article}`,
          title: attributes.title,
          description: attributes.description,
          image: attributes.image
        })

        return rest
      }, [])

      this.about = require(`~/data/about/me.md`).attributes
    })
  }
}
</script>

<style>
.bio {
  display: flex;
  flex-wrap: wrap;
}

.pic-container {
  height: 200px;
  width: 200px;
  overflow: hidden;
  float: right;
}

.pic-container img {
  height: 100%;
  width: auto;
}

.links {
  margin-top: 0.5em;
  flex-grow: 1;
}

.links a {
  text-decoration: underline;
  margin-right: 0.5em;
}
</style>
