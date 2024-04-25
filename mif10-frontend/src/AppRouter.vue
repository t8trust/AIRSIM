<template>
  <div class="app-container">
    <HeaderComponent/>
    <RouterView/>
    <FooterComponent/>
  </div>
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'

export default {
  
  name: 'AppRouter',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>
