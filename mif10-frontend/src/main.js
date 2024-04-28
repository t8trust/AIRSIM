import { createApp } from 'vue'
import AppRouter from './AppRouter.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { createRouter, createWebHistory } from 'vue-router'
import LoginComponent from "./components/admin/LoginComponent.vue"
import HomeView from './views/HomeView.vue'
import MapComponent from "./components/MapComponent.vue"
import DashComp from "./components/admin/DashComp.vue"
import { Auth } from './api'
import { message } from 'ant-design-vue';



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView, name: "index" },
    { path: '/map', component: MapComponent },
    { path: '/login', component: LoginComponent },
    { path: '/dashboard',name:'dashboard', component: DashComp, beforeEnter: () => {
      if (Auth.token ) return true;
      message.error("Vous n'avez pas accès à cette page")
      return { name: "index" } 
    }}
  ],
})

createApp(AppRouter)
  .use(Antd)
  .use(router)
  .mount('#app')
