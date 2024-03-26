import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'


const app = createApp(App).mount('#app')

//Utilisation de PrimeVue
app.use(PrimeVue)

