import { createApp } from 'vue'
import AppRouter from './AppRouter.vue'
import App from "./App.vue"
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import TestMap from "./components/TestMap.vue"
import { createMemoryHistory, createRouter } from 'vue-router'

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: App },
    { path: '/map', component: TestMap }
  ],
})

createApp(AppRouter)
  .use(Antd)
  .use(router)
  .mount('#app')
