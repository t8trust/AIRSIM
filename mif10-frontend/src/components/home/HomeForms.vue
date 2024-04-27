<script>
import { Row as ARow, Col as ACol, Button as AButton } from 'ant-design-vue'
import { MenuOutlined } from "@ant-design/icons-vue"

export default {
  components: {
    ARow,
    ACol,
    AButton,
    MenuOutlined,
  },

  data(){
    return {
      menuToggle: false,
    }
  },
};
</script>


<template>
  <div class="menu-container" :class="{folded: menuToggle}">
  <div class="full-height-container container-fluid background-light-gray">
    <!-- Div containing the menu-->
    <a-row :gutter="4" class="full-height-row">
      <a-col :span="24">
        <div class="sidebar">
          <slot></slot>
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
  
