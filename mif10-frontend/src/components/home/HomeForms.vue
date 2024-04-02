<template>
    <div class="full-height-container container-fluid background-light-gray">
    <a-row :gutter="4" class="full-height-row">
      <a-col :span="24">
        <div class="sidebar">
          <h2 class="centered-heading info-vols-title">Infos de vols</h2>
          <a-form>
            <a-form-item label="Départ" class="form-item">
              <a-input placeholder="Entrez votre point de départ" />
            </a-form-item>
            <a-form-item label="Arrivée">
              <a-input placeholder="Entrez votre destination" />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" class="centered-button">Submit</a-button>
            </a-form-item>
            <a-form-item label="Émission de CO2" class="form-item">
              <a-input placeholder="CO2" readonly />
            </a-form-item>
            <div class="flight-options fo-item">
                <h3 class="section-title fo-item">Meilleures options de vol</h3>
              <FlightOptions></FlightOptions>
            </div>
            <!--<a-form-item>
              <a-button type="primary" html-type="submit" class="centered-button">Favori</a-button>
            </a-form-item>-->
          </a-form>
        </div>
      </a-col>
      <!--<a-col :span="16">
        <div id="mapid" class="map-container"></div>
      </a-col>-->
    </a-row>
  </div>
</template>
  
<script>
    import FlightOptions from './FlightOptions.vue'
    import { Row as ARow, Col as ACol, Form as AForm, Input as AInput } from 'ant-design-vue';
  
  export default {
    components: {
    ARow,
    ACol,
    AForm,
    AFormItem: AForm.Item,
    AInput,
    //AButton,
    FlightOptions
    //ATag
  }
    
  };
</script>
  
<style scoped>
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
     background-color: #f4f4f4; 
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
    height: 86vh;
   }

   .form-item {
    margin-bottom: 45px; /* Ajoute de la marge entre les éléments */
  }

  .fo-item {
    margin-bottom: 75px;
  }

  .section-title {
    text-align: center;
    margin-top: 20px;
  }

  .info-vols-title {
    margin-top: 40px; /* Ajoute de la marge au titre */
  }
  
</style>
  