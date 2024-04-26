<template>
  <div class="content">
    <div id="mapid" class="map-container">
      <MapComponent ref="map"
        @move-end="onMoveEnd"
        />
    </div>
    <div class="home-forms-container">
      <HomeForms 
        @on-travel="onTravel"
        />
    </div>
  </div>
</template>

<script>
import { Airports } from '@/api'
import HomeForms from '../components/home/HomeForms.vue'
import MapComponent from '../components/MapComponent.vue'

export default {
  name: 'HomeView',
  components: {
    HomeForms,
    MapComponent
  },
  methods: {
    map() { return this.$refs.map },
    onTravel(airport_a, airport_b){
      // const test = [{ name: 'Dakar', longitude: -17.4479, latitude: 14.6928 },
      //   { name: 'Londres', longitude: -0.1276, latitude: 51.5074 }]
      this.map().clearArcs()
      this.map().traceArc(airport_a, airport_b)
      this.map().move([airport_a, airport_b])
    },
    async onMoveEnd(){
      const map = this.map();
      const extents = map.getExtents()
      const airports = await Airports.findAll({ bounds: extents, limits: 100 });
      map.clearMarkers()
      airports.forEach((airport) => {
        map.addAirportMarker(airport);
      });
    },
    reset() { 
      this.map().clearArcs();
    }

  }
}
</script>

<style>
@import url("../../node_modules/ol/ol.css");

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
