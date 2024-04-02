<template>
  <RouterLink to="/map">Go to About</RouterLink>
    <a-layout-footer class="footer">
      <a-row :gutter="16">
        <a-col :span="8" class="text-left">
          <a-button type="primary" shape="round" @click="$router.push('map')">Login</a-button>
        </a-col>
        <a-col :span="8" class="text-center">
          <p>&copy; 2024 Groupe 15 AIRSIM. Tous droits réservés.</p>
        </a-col>
        <a-col :span="8" class="text-right">
            <!--Autre contenu-->
            <a-button type="primary" shape="round">Login</a-button>
        </a-col>
      </a-row>
    </a-layout-footer>
  </template>
  
  <script>
  import { Layout, Row, Col, Button } from 'ant-design-vue';
  
  export default {
    components: {
      'a-layout-footer': Layout.Footer,
      'a-row': Row,
      'a-col': Col,
      'a-button': Button
    }
  }
  </script>
  
  <style scoped>
  .footer {
    background-color: #f8f9fa;
    color: #333;
    padding: 1rem;
  }
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  </style>
  
