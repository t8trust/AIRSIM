<script>
import FlightOptions from './FlightOptions.vue'
import { Row as ARow, Col as ACol, Form as AForm, Button as AButton, Select as ASelect } from 'ant-design-vue'
import { MenuOutlined } from "@ant-design/icons-vue"
  import { Airports } from '@/api';

class TravelInput {
  airport = null
  fetchCallback = null
  fetchData = []
  options = []

  selectAirport(id){
    this.airport = this.fetchData[id]
  }
}

export default {
  components: {
    ARow,
    ACol,
    AForm,
    AFormItem: AForm.Item,
    FlightOptions,
    AButton,
    ASelect,
    MenuOutlined,
  },
  emits: ["onTravel"],

  data(){
    return {
      menuToggle: false,
      input: [
        new TravelInput(),
        new TravelInput()
      ]
    }
  },

  methods: {
    /**
     * @param {Airport} airport 
     * */
    onValueSelected(id, selected){
      const current = this.input[id]
      current.selectAirport(selected)
      this.checkValidTravel()
    },

    onSearchChange(id, search){
      const current = this.input[id]
      current.airport = null

      clearTimeout(current.fetchCallback)

      current.fetchCallback = setTimeout(async () => {
        if (search.length >= 3){
          current.fetchData = await Airports.findAll({ name: search, limits: 10 })
          current.options = current.fetchData.map((airport, index) => ({
            value: index,
            label: `${airport.nom}, ${airport.ville}, ${airport.pays}`
          }))
        }
      }, 200)
    },

    checkValidTravel() {
      if (!this.input[0].airport || !this.input[1].airport) return;
      this.$emit("onTravel", this.input[0].airport, this.input[1].airport)
      console.log(this.input[0].airport)
    }

  }

};
</script>


<template>
  <div class="menu-container" :class="{folded: menuToggle}">
  <div class="full-height-container container-fluid background-light-gray">
    <!-- Div containing the menu-->
    <a-row :gutter="4" class="full-height-row">
      <a-col :span="24">
        <div class="sidebar">
          <h2 class="centered-heading info-vols-title">Infos de vols</h2>
          <a-form>
            <a-form-item label="Départ" class="form-item">
              <!--<a-input placeholder="Entrez votre point de départ" />-->
              <a-select 
                @search="(str) => onSearchChange(0, str)" 
                @select="(selected) => onValueSelected(0, selected)" 
                placeholder="Entrez votre point de départ" 
                mode="search" 
                :options="input[0].options"
                :filter-option="false"
                show-search>
              </a-select>
            </a-form-item>
            <a-form-item label="Arrivée">
              <!--<a-input placeholder="Entrez votre destination" />-->
              <a-select 
                @search="(str) => onSearchChange(1, str)" 
                @select="(selected) => onValueSelected(1, selected)" 
                placeholder="Entrez votre destination" 
                mode="search" 
                :options="input[1].options"
                :filter-option="false"
                show-search>
              </a-select>
            </a-form-item>
            <div class="flight-options fo-item">
                <h3 class="section-title fo-item">Meilleures options de vol</h3>
              <FlightOptions></FlightOptions>
            </div>
          </a-form>
        </div>
      </a-col>
    </a-row>
  </div>
  <div class="menu-open-button">
    <a-button shape="circle" size="large" @click="menuToggle = ! menuToggle"><MenuOutlined/></a-button>
  </div>
  </div>
</template>
  
<style scoped>
  /** ====== Menu principal  ======= */

  .menu-container {
    display: flex; width: max-content; height: 100%;
    width: max-content;
    position: relative;

    /* Animer la propriété translate par une animation de 0.25s */
    transition: translate 0.25s;

    /* Variable globale */
    --menu-btn-padding: 1em;
  }

  .menu-open-button {
    position: absolute;
    right: 0;
    bottom: 0;
    margin: var(--menu-btn-padding);
    align-self: flex-end;
    translate: calc(100% + 2 * var(--menu-btn-padding));
  }

  /** Si le menu est caché (atribut .folded) */
  .menu-container.folded {
    translate: -100%;
  }
  

  /* Version mobile: Si le menu n'est pas caché, afficher le bouton à la gauche du menu*/
  @media only screen and (max-width: 500px) {
    :not(.folded) > .menu-open-button{
      translate: calc(-100% + 2 * var(--menu-btn-padding));
    } 
  }
  
  /** ============= */

  .background-gradient {
    background: linear-gradient(135deg, #7e7c7c);
  }
  
  .wider-form {
    width: 100%;
  }
  
  .wider-options {
    width: 100%; 
  }
  
  .background-light-gray {
    background-color: #ffffff94;
    backdrop-filter: blur(7px);
    padding: 1.5em
  }
  
    .centered-heading {
        text-align: center; 
    }
  
   .centered-button {
    display: block;
    margin: 0 auto; 
   }
  
   .flight-options {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .full-height-row {
    height: 100%;
   }

  .full-height-container {
    height: 100%;
    width: min(100vw, 400px);
    overflow: scroll;
   }

   .form-item {
    margin-bottom: 25px; 
  }

  .fo-item {
    margin-bottom: 35px;
  }

  .section-title {
    text-align: center;
    margin-top: 20px;
  }

  .info-vols-title {
    margin-top: 10px; 
  }


  @media only screen and (max-width: 500px) {
  .full-height-container {
    width: 100vw;
  }
}


  
</style>
  
