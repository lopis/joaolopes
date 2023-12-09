<script>
import { page } from '$app/stores'

const path = $page.url.pathname
const isHome = path === '/'
const isPosts = path === '/posts'
const isProjects = path === '/projects'
</script>

<nav>
  <ul>
    <li>
      <a class={isHome ? 'current' : ''} href="/">Home</a>
    </li>
    <li>
      <a class={isPosts ? 'current' : ''} href="posts">Posts</a>
    </li>
    <li>
      <a class={isProjects ? 'current' : ''} href="projects">Projects</a>
    </li>
  </ul>
</nav>

<style>
nav {
  padding: 16px;
  opacity: 0.7;
  font-size: 28px;
}

ul {
  margin: 0;
  display: flex;
  list-style: none;
  padding: 0;
  gap: 16px;
  font-weight: bold;
  justify-content: center;
}

a, a:visited {
  color: inherit;
}

a.current {
  text-decoration: none;
  color: var(--dark1);
}
</style>
