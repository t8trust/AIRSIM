<template>
  <div class="app-container">
    <HeaderComponent></HeaderComponent>
    <div class="content">
      <div id="mapid" class="map-container">
        <TestMap></TestMap>
      </div>
      <div class="home-forms-container">
        <HomeForms on-valid-travel></HomeForms>
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
import { ref } from "vue"


export default {
  name: 'App',
  setup() {
    return {
      map: ref(null)
    }
  },
  components: {
    HeaderComponent,
    FooterComponent,
    HomeForms,
    TestMap
  }
}
</script>

<style>
@import url("../node_modules/ol/ol.css");

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;

}

.content {
  position: relative;
}

.home-forms-container {
  position: absolute;
  left: 0; 
  top: 0;
  height: 100%;
  width: 0;
}

.map-container {
  flex: 1;
  min-width: 300px; 
  max-width: 100%; 
  position: relative;

}

footer {
  margin-top: auto; 
}


@media only screen and (max-width: 768px) {
  .flex-container {
    flex-direction: column; 
  }
}


</style>
