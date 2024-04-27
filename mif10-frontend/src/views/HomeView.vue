<template>
  <div class="content">
    <div id="mapid" class="map-container">
      <MapComponent ref="map"
        @move-end="onMoveEnd"
        @set-departure="(d) => $refs.accueil.setDeparture(d)"
        @set-destination="(d) => $refs.accueil.setDestination(d)"
        />
    </div>
    <div class="actions-container">
      <div class="home-forms-container">
        <HomeForms>
          <AccueilSlot ref="accueil" v-if="showAccueilSlot" @on-travel="onTravel"></AccueilSlot>  
          <FavorisSlot v-if="showFavoris"></FavorisSlot>
          <div class="bottom-buttons"> 
            <a-button type="primary" shape="round" v-if="showFavsButton" @click="toggleFavoris">Favori</a-button>
            <a-button type="primary" shape="round" v-if="showReturnButton" @click="returnToAccueil">Retour</a-button>
          </div>     
        </HomeForms>
      </div>

      <div class="map-search">
        <a-auto-complete
          class="input"
          :options="searchOpts"
          :defaultActiveFirstOption="false"
          @select="onChange">

          <a-input-search 
            size="large" 
            placeholder="Charles de Gaule, Paris, France" 
            enter-button
            v-model:value="searchValue"
            @change="onChange"
            @search="onSearch"
            ></a-input-search>
        </a-auto-complete>
        <a-button size="large" @click="clear()">
          <template #icon><CloseOutlined /></template>
          Clear
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Airports } from '@/api'
import HomeForms from '../components/home/HomeForms.vue'
import MapComponent from '../components/MapComponent.vue'
import { AutoComplete, Button, InputSearch } from 'ant-design-vue'
import AccueilSlot from "../components/home/AccueilSlot.vue"
import FavorisSlot from "../components/home/FavorisSlot.vue"

export default {
  name: 'HomeView',
  components: {
    HomeForms,
    MapComponent,
    AAutoComplete: AutoComplete,
    AInputSearch: InputSearch,
    AButton: Button,
    AccueilSlot,
    FavorisSlot
  },
  data() {
    return {
      /** @type { "search" | "travel" | null} */
      mapMode: null,
      searchValue: "",
      searchData: [],
      searchOpts: [],
      searchCallback: null,
      showFavoris: false,
      showAccueilSlot: true,
      showReturnButton: false,
      showFavsButton: true
    }
  },
  methods: {
    map() { return this.$refs.map },
    accueil() { return this.$refs.accueil },
    onTravel(airport_a, airport_b){
      // const test = [{ name: 'Dakar', longitude: -17.4479, latitude: 14.6928 },
      //   { name: 'Londres', longitude: -0.1276, latitude: 51.5074 }]
      this.mapMode = "travel"
      this.map().clear()
      this.map().addAirportMarker(airport_a)
      this.map().addAirportMarker(airport_b)
      this.map().traceArc(airport_a, airport_b)
      this.map().move([airport_a, airport_b])
    },
    async onMoveEnd(){
      if (this.mapMode != null) return;

      const map = this.map();
      const extents = map.getExtents()
      const airports = await Airports.findAll({ bounds: extents, limit: 300 });
      map.clearMarkers()
      airports.forEach((airport) => {
        map.addAirportMarker(airport);
      });
    },

    async onSearch(){
      this.mapMode = "search"
      if (this.searchValue.length >= 3){
        this.searchData = await Airports.findAll({ search: this.searchValue, limit: 100 })
        this.searchOpts = this.searchData.map((airport) => ({
          value: airport.nom,
          label: `${airport.nom}, ${airport.ville}, ${airport.pays}`
        }))
        this.map().clear()
        this.searchData.forEach(airport => {
          this.map().addAirportMarker(airport)
        })
      }
    },

    onChange(){
      clearTimeout(this.searchCallback)

      this.searchCallback = setTimeout(async () => {
        if (this.searchValue.length >= 3){
          this.searchData = await Airports.findAll({ search: this.searchValue, limit: 100 })
          this.searchOpts = this.searchData.map((airport) => ({
            value: airport.nom,
            label: `${airport.nom}, ${airport.ville}, ${airport.pays}`
          }))
        }
      }, 200)
    },

    clear(){
      this.mapMode = null
      this.map().clear()
      this.accueil().clear()
      this.onMoveEnd()
    },

    toggleFavoris() {
      this.showFavoris = true;
      this.showAccueilSlot = false;
      this.showReturnButton = true;
      this.showFavsButton = false; 
    },

    returnToAccueil() {
      this.showFavoris = false;
      this.showAccueilSlot = true;
      this.showReturnButton = false; 
      this.showFavsButton = true; 
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

.actions-container{
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  pointer-events: none;
}

.actions-container > * {
  pointer-events: all;
}

.map-search {
  align-self: end;
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
  width: 100%;
  gap: 1em
}

.map-search .input {
  width: min(100%, 600px);
}


.content {
  position: relative;
  width: 100%;
}

.home-forms-container {
  left: 0; 
  top: 0;
  height: 100%;
}

.bottom-buttons {
  position: absolute;
  bottom: 0;
  right: 0;
  margin-bottom: 1em;
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
