<template>
    <a-modal :title="`${input ? 'Editer ' : 'Ajouter'} un Aéroport`" ref="modal"
      @ok="ok"
      @cancel="cancel"
      :open="$props.open !== undefined"
      >
      <a-form model="flightForm">
        <a-form-item label="IATA" :validateStatus="errorIata" :help="errorIata ? 'Le Iata doit être 3 caractères au minimum' : ''">
          <a-input v-model:value="airport.iata" placeholder="CDG"></a-input>
        </a-form-item>
  
        <a-form-item label="Nom de l'aéroport" :validateStatus="errorNom" :help="errorNom ? 'La chaine ne doit pas être vide' : ''">
          <a-input v-model:value="airport.nom" placeholder="Charles de Gaulle"></a-input>
        </a-form-item>

        <a-form-item label="Ville" :validateStatus="errorVille" :help="errorVille ? 'La chaine ne doit pas être vide' : ''">
          <a-input v-model:value="airport.ville" placeholder="Paris"></a-input>
        </a-form-item>

        <a-form-item label="Pays" :validateStatus="errorPays" :help="errorPays ? 'La chaine ne doit pas être vide' : ''">
          <a-input v-model:value="airport.pays" placeholder="France"></a-input>
        </a-form-item>

        <a-form-item label="Longitude (degrée)">
          <a-input-number 
            v-model:value="airport.longitude" 
            :min="-180"
            :max="180"
            :step="0.001"
            :placeholder="18.05"/>
        </a-form-item>

        <a-form-item label="Latitude (degrée)">
          <a-input-number 
            v-model:value="airport.latitude" 
            :min="-90"
            :max="90"
            :step="0.001"
            :placeholder="18.05"/>
        </a-form-item>

      </a-form>
    </a-modal>
  </template>
  
  <script>
  import { Modal } from 'ant-design-vue';
  import { ref } from 'vue';
  export default {
    emits: ["success", "update:open"],
    props: ["open"],
    components: {
      AModal: Modal
    },
    watch: {
      open(val) {
        this.airport = {...val}
      }
    },
    data() {
      return {
        errorIata: ref(""),
        errorNom: ref(""),
        errorVille: ref(""),
        errorPays: ref(""),
        airport: {
          iata: "",
          nom: "",
          latitude: 0,
          longitude: 0,
          pays: "",
          ville: ""
        }
      }
    },
    methods: {
      ok() {
        this.errorIata = ""
        this.errorNom = ""
        this.errorVille = ""
        this.errorPays = ""

        if (this.airport.iata.length <= 3) this.errorIata = "error"
        if (this.airport.nom.length == 0) this.errorNom = "error"
        if (this.airport.ville.length == 0) this.errorVille = "error"
        if (this.airport.pays.length == 0) this.errorPays = "error"
        
        if (this.errorIata || this.errorNom || this.errorPays || this.errorVille)
          return

        this.$emit("update:open", undefined)
        this.$emit("success", this.airport, this.$props.input)
        this.reset()
      },
      cancel() {
        this.$emit("update:open", undefined)
        this.reset()
      },
      reset(){
        this.airport = {
          iata: "",
          nom: "",
          latitude: 0,
          longitude: 0,
          pays: "",
          ville: ""
        }
      }
    }
  }
  </script>
  
  <style scoped></style>