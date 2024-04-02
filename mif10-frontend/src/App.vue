<template>
  <div class="app-container">
    <HeaderComponent></HeaderComponent>
    <div class="content">
      <div class="container-fluid">
        <div class="flex-container">
          <div class="container-fluid" style="background-color: #343a40;">
            <div class="row">
              <HomeForms></HomeForms>
            </div>
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
}

.map-container {
  flex: 1;
  /* Ajoutez ici les styles spécifiques à la carte */
}

footer {
  margin-top: auto; 
}
</style>
