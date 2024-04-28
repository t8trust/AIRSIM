<template>
  <a-modal title="Ajouter un vol"
    @ok="ok"
    @cancel="cancel"
    :open="$props.open !== undefined"
    >
    <a-form model="flightForm" ref="form">
      <a-form-item label="Aéroport départ" :rules="[{required: true }]">
        <a-select 
        @search="(str) => onSearchChange(from, str)" 
        @select="(selected) => onValueSelected(from, selected)" 
        placeholder="Entrez votre destination" 
        mode="search" 
        :status="fromStatus"
        :options="from.options"
        :filter-option="false"
        v-model:value="from.value"
        show-search></a-select>
      </a-form-item>

      <a-form-item label="Aéroport arrivée" :rules="[{required: true, }]">
        <a-select 
          placeholder="Aéroport arrivée"
          @search="(str) => onSearchChange(to, str)" 
          @select="(selected) => onValueSelected(to, selected)" 
          mode="search" 
          :status="toStatus"
          :options="to.options"
          :filter-option="false"
          v-model:value="to.value"
          show-search></a-select>
      </a-form-item>

      
      <a-form-item label="Consommation CO2 du vol" :rules="[{required: true, }]">
        <a-input-number v-model:value="co2_emissions"  :min="0" placeholder="5000"></a-input-number>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { Modal } from 'ant-design-vue';
import { TravelInput } from '@/components/home/AccueilSlot.vue';
import { Airports } from '@/api';

export default {
  emits: ["success", "update:open"],
  props: ["open", "input"],
  components: {
    AModal: Modal
  },
  data() {
    return {
      fetchTimeout: null,
      fromStatus: "",
      toStatus: "",
      co2_emissions: 0,
      inputVol: {},
      from: new TravelInput(),
      to: new TravelInput()
    }
  },
  watch: {
    open(data) {
      if(data){
        this.inputVol = {...data.flight};
        this.from.airport = this.inputVol.depart
        this.to.airport = this.inputVol.destination

        this.from.value = this.from.airport.nom;
        this.to.value = this.to.airport.nom;
        this.co2_emissions = this.inputVol.co2_emissions
      }
    },
  },
  methods: {
    ok() {
      this.fromStatus = ""
      this.toStatus = ""
      
      if (!this.from.airport) this.fromStatus = "error"
      if (!this.to.airport) this.toStatus = "error"

      if (!this.to.value || !this.from.value) return;

      const result = {
        ...this.inputVol,
        depart: this.from.airport,
        destination: this.from.airport,
        co2_emissions: this.co2_emissions
      }
      
      this.$emit("update:open", undefined)
      this.$emit("success", result, this.$props.open)
      this.reset()
    },
    cancel() {
      this.$emit("update:open", undefined)
      this.reset()
    },
    reset() {
      this.from = {}
      this.to = {}
    },
    onValueSelected(id, selected){
      const current = id
      current.selectAirport(selected)
    },

    onSearchChange(id, search){
      const current = id
      current.airport = null

      clearTimeout(current.fetchCallback)

      current.fetchCallback = setTimeout(async () => {
        if (search.length >= 3){
          current.fetchData = await Airports.findAll({ search, limit: 10 })
          current.options = current.fetchData.map((airport, index) => ({
            value: index,
            label: `${airport.nom}, ${airport.ville}, ${airport.pays}`
          }))
        }
      }, 200)
    },
  }
}
</script>

<style scoped></style>