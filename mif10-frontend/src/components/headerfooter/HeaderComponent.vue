<template>
    <a-layout-header style="background-color: #343a40; color: white; padding: 1rem;">
      <a-row align="middle" justify="space-between">
        <a-col>
          <a-avatar :src="imagePath" size="small" style="margin-right: 0.5rem;"></a-avatar>
          <span style="vertical-align: middle;">AIRSIM</span>
        </a-col>
        <a-button type="primary" shape="round">Favori</a-button>
      </a-row>
    </a-layout-header>
  </template>
  
  <script>
  import { Layout, Row, Col, Avatar, Button } from 'ant-design-vue';
  
  export default {
    components: {
      'a-layout-header': Layout.Header,
      'a-row': Row,
      'a-col': Col,
      'a-avatar': Avatar,
      'a-button': Button
    },
    data() {
        return {
        imagePath: require('@/assets/logo.png')
        };
    }
  }
  </script>
  
  <style scoped>
  </style>
  