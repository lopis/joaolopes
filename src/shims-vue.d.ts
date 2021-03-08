declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-safe-html' {
  import { Plugin } from '@vue/runtime-core'
  const VueSafeHTML:Plugin

  export default VueSafeHTML
}
