import Home from './pages/Home.vue'
import Post from './pages/Post.vue'
// import Project from './pages/Project.vue'

export default {
  '/': Home,
  '/posts/:id': Post,
  // '/projects/:id': Project,
  '*': Home
}
