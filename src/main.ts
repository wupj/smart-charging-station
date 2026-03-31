import { createSSRApp } from 'vue'
import App from './App.vue'
import '@/utils/interceptor'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
