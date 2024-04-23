import { createApp } from 'vue'
import AppRouter from './AppRouter.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createMemoryHistory, createRouter } from 'vue-router'
import LoginComponent from "./components/admin/LoginComponent.vue"
import HomeView from './views/HomeView.vue'
import MapComponent from "./components/MapComponent.vue"

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/map', component: MapComponent },
    { path: '/login', component: LoginComponent }

  ],
})

createApp(AppRouter)
  .use(Antd)
  .use(router)
  .mount('#app')
