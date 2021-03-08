import { createApp, h, markRaw } from 'vue'
import VueSafeHTML from 'vue-safe-html'
import App from './App.vue'

const app = createApp(App)
app.use(VueSafeHTML, {
  allowedTags: [
    'a','b','br','del','em','h1','h2','h3','i','ins',
    'mark','p','small','strong','sub','sup',
  ],
})
app.mount('#app')
