import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import {createApp} from 'vue'
import VueVirtualScroller from 'vue3-virtual-scroller'
import App from './App.vue'
import router from "./routers/index"
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'




const app = createApp(App)
const pinia = createPinia()
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(ElementPlus)
app.use(router)
app.use(VueVirtualScroller)
app.mount("#app")


