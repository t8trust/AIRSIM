<template>
    <a-button type = "primary" @click="handleClick">{{ label }}</a-button>
  </template>
  
  <script>
  import { Button } from 'ant-design-vue';
  export default {
    components: {
      AButton: Button,
    },
    data() {
      return {
        // Définition de la propriété label
        label: 'Cliquez-moi',
      };
    },
    methods: {
      handleClick() {
        alert('Le bouton a été cliqué');
      }
    }
  }
  </script>

  