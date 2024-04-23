<template>
    <a-modal
      :visible="visible"
      title="Confirmation de suppression"
      :ok-text="'Supprimer'"
      @ok="confirmDelete"
      @cancel="cancelDelete"
    >
      <p>Voulez-vous vraiment supprimer ?</p>
    </a-modal>
  </template>
  
  <script>
  import { Modal } from 'ant-design-vue';
  
  export default {
    components: {
      'a-modal': Modal
    },
    props: {
      visible: Boolean
    },
    methods: {
      confirmDelete() {
        this.$emit('update:visible', false); 
        this.$emit('delete'); 
      },
      cancelDelete() {
        this.$emit('update:visible', false); 
      }
    }
  };
  </script>
  