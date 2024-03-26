<template>
    <Button label="Cliquez-moi" @click="handleClick"/>
  </template>
  
  <script>
  import Button from 'primevue/button';
  
  export default {
    components: {
      Button
    },
    methods: {
      handleClick() {
        alert('Le bouton a été cliqué');
      }
    }
  }
  </script>

  