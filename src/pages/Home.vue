<template>
  <h1 class="title">João Lopes</h1>
  <img src="/photo.jpg" alt="blurry photo of me" class="photo" />
  <nav>
    <ul>
      <li>
        <h2>Posts</h2>
        <ul>
          <li>
            <a href="/posts/clicking-stuff-in-cypress">
              Clicking Stuff in E2E tests - smooth scrolling, Electron flags,
              and Cypress
            </a>
          </li>
          <li>
            <a href="/posts/writing-vue-storybook-stories-in-markdown">
              Writing Vue Storybook stories in markdown
            </a>
          </li>
          <li>
            <a href="/posts/creating-a-13kb-js-game-using-svg">
              Creating a 13KB JS Game using SVG
            </a>
          </li>
          <li>
            <a href="/posts/how-to-design-a-javascript-game-in-13kb-or-less">
              How to design a javascript game? (in 13KB or less)
            </a>
          </li>
          <li>
            <a href="/posts/j13k_2018_postmortem">
              JS13K 2018 Game competition postmortem
            </a>
          </li>
          <li>
            <a href="/posts/hugo_netlify">
              Hugo, Netlify and dynamic author lists
            </a>
          </li>
          <li>
            <a href="/posts/react_code_sharing">
              Multi-app React code sharing in a monorepo
            </a>
          </li>
          <li>
            <a href="/posts/requirements"> Requirements are bull crap </a>
          </li>
        </ul>
      </li>
      <li>
        <h2>Projects</h2>
        <ul>
          <li>
            <a href="/projects/for-o-foughr">
              For O'Foughr - multiplayer game with "AI"
            </a>
          </li>
          <li>
            <a href="/projects/regresso"> Regresso - strategy clicker game </a>
          </li>
          <li>
            <a href="/projects/signalmon">
              Signalmon - tamagochi-like JS game
            </a>
          </li>
          <li>
            <a href="/projects/time-tracker"> Time Tracker </a>
          </li>
          <li>
            <a href="/projects/my-hf">
              myHF - Scraping real time local bus web data
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
  <div v-safe-html="bio"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import fetchMarkdown from "../util/markdown";

export default defineComponent({
  name: "App",
  data() {
    return {
      bio: "",
    };
  },
  mounted() {
    fetchMarkdown("about/me").then((file) => {
      this.bio = String(file.contents);
    });
  },
});
</script>

<style>
.photo {
  position: relative;
  right: -100px;
  height: 250px;
  width: 250px;
  object-fit: cover;
  overflow: hidden;
  border-radius: 500px;
  background: var(--color-text);
  float: right;
}
@media screen and (max-width: 960px) {
  .photo {
    display: none;
  }
}
</style>
