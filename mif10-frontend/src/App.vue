<template>
  <div class="app-container">
    <HeaderComponent></HeaderComponent>
    <div class="content">
      <div class="container-fluid">
        <div class="flex-container">
          <div class="home-forms-container">
            <HomeForms></HomeForms>
          </div>
          <div id="mapid" class="map-container">
            <TestMap></TestMap>
          </div>
        </div>
      </div>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from './components/headerfooter/HeaderComponent.vue'
import FooterComponent from './components/headerfooter/FooterComponent.vue'
import HomeForms from './components/home/HomeForms.vue'
import TestMap from './components/TestMap.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
    HomeForms,
    TestMap
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

.flex-container {
  display: flex;
  flex-wrap: wrap; /* Permet aux éléments de s'enrouler sur une nouvelle ligne */
}

.home-forms-container {
  flex: 1;
  min-width: 300px; /* Largeur minimale pour éviter le rétrécissement excessif */
  max-width: 20%; /* Limite la largeur pour assurer la lisibilité */
}

.map-container {
  flex: 1;
  min-width: 300px; /* Largeur minimale pour éviter le rétrécissement excessif */
  max-width: 80%; /* Limite la largeur pour assurer la lisibilité */
}

footer {
  margin-top: auto; 
}

/* Media queries pour des ajustements spécifiques aux écrans de petite taille */
@media only screen and (max-width: 768px) {
  .flex-container {
    flex-direction: column; /* Réorganiser les éléments en colonne */
  }
}
</style>
