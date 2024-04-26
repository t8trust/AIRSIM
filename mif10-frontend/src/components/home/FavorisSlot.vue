<template>
    <div>
      <Card v-for="(option, index) in favoris" :key="index" :title="option.title" :hoverable="true" style="width: 300px">
        {{ option.content }}
        <Tag :color="option.pollution === 'Moins' ? 'green' : 'red'">{{ option.pollution }} polluant</Tag>
      </Card>
    </div>
  </template>
  
  <script>
  import { Card, Tag } from 'ant-design-vue';
  
  export default {
    name: 'FavorisSlot',
    components: {
      Card,
      Tag,
    },
    data() {
      return {
        favoris: [
          { title: 'Option de vol 1', content: 'Contenu option  1', pollution: 'Moins' },
          { title: 'Option de vol 2', content: 'Contenu option 2', pollution: 'Plus' },
          { title: 'Option de vol 3', content: 'Contenu option 2', pollution: 'Plus' },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  </style>
  