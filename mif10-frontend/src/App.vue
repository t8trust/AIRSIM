<template>
  <div class="app-container">
    <HeaderComponent></HeaderComponent>
    <div class="content">
      <!-- Le contenu principal  -->
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from './components/headerfooter/HeaderComponent.vue'
import FooterComponent from './components/headerfooter/FooterComponent.vue'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

.content {
  flex: 1; 
}

footer {
  margin-top: auto; 
}
</style>
