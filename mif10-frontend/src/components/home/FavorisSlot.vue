<template>
  <h3 class="info-vols-title" >Options de vol favories</h3>
  <div class="flight-options">
    <Card class="card" v-for="(favoritedFlight, index) in favoritedFlights" :key="index">
      <template v-slot:title>
        <div class="title">
          Option de vol {{ index + 1 }}
          <Tag :color=" 'green' ">{{  'Moins' }} polluant</Tag>
        </div>
      </template>
      <div class="description">
        <div>
          <div><span class="from">Départ:</span> <span>{{ favoritedFlight.airports[0].nom }}</span></div>
          <div><span class="to">Arrivée:</span> <span>{{ favoritedFlight.airports[1].nom }}</span></div>
        </div>
        <Tag class="tag" :color=" 'green'">{{ favoritedFlight.co2 }}g CO2</Tag>
        <a-button @click="removeFavorite(index)" :icon="h(DeleteTwoTone)"></a-button>
      </div>  
    </Card>
  </div>
</template>

<script setup>
    import { h } from 'vue';
    import { DeleteTwoTone } from '@ant-design/icons-vue';
</script>

  <script>
  import { Card, Tag } from 'ant-design-vue';
  
  export default {
    name: 'FavorisSlot',
    components: {
      Card,
      Tag,
    },
    data() {
      return {
        favoritedFlights: [], 
      };
    },
    mounted() {
      const favoritedFlightsStr = localStorage.getItem('favoritedFlights');
      if (favoritedFlightsStr) {
        this.favoritedFlights = JSON.parse(favoritedFlightsStr);
      }
    },
    methods: {
      removeFavorite(index) {
        this.favoritedFlights.splice(index, 1);
        localStorage.setItem('favoritedFlights', JSON.stringify(this.favoritedFlights));
      }
    }
  };
  </script>
  
<style scoped>

  .info-vols-title {
      margin-top: 10px; 
      text-align: center;
      margin-bottom: 35px;
      font-weight: 600;
      font-size: 1.2em;
  
    }
  .flight-options {
    display: grid;
    gap: 1em;
    width: 100%;
  }
  .flight-options > *{
    width: 100%;
  }
  .title {
    display: flex;
    justify-content: space-between;
  }
  .description {
    display: grid;
    gap: 0.5em
  }
  .tag{
    margin-left: auto;
  }
  .from{
    font-weight: 700;
  }
  .to{
    font-weight: 700;
  }
  
</style>
  
  