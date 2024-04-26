
<template>
  <h3 class="info-vols-title" v-if="$props.travels.length > 0">Meilleures options de vol</h3>
  <div class="flight-options">
    <Card class="card" v-for="(travel, index) in $props.travels" :key="index" :hoverable="true">
      <template v-slot:title>
        <div class="title">
          Option de vol {{ index + 1 }}
          <Tag :color="index == 0 ? 'green' : 'red'">{{ index == 0 ? 'Moins' : 'Plus' }} polluant</Tag>
        </div>
      </template>
      <div class="description">
        <div>
          <div><span class="from">Départ:</span> <span>{{ `${travel.airports[0].nom}, ${travel.airports[0].ville}, ${travel.airports[0].pays}` }}</span></div>
          <div><span class="to">Arrivée:</span> <span>{{ `${travel.airports[1].nom}, ${travel.airports[1].ville}, ${travel.airports[1].pays}` }}</span></div>
        </div>
        <Tag class="tag" :color="index == 0 ? 'green' : 'red'">{{ travel.co2 }}g CO2</Tag>
      </div>  
    </Card>
  </div>
</template>

<script>
/**
  * @typedef {{
  *   airports: Airport[],
  *   co2: number
  * }} Travel
  */

import { Card, Tag } from 'ant-design-vue';

export default {
  name: 'FlightOptions',
  components: {
    Card,
    Tag,
  },
  props: ["travels"],
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
