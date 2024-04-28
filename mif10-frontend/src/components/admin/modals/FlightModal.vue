<template>
  <a-modal title="Ajouter un vol"
    @ok="ok"
    @cancel="cancel"
    :open="open"
    >
    <a-form model="flightForm">
      <a-form-item label="Aéroport départ">
        <a-select placeholder="Aéroport départ"></a-select>
      </a-form-item>

      <a-form-item label="Aéroport arrivée">
        <a-select placeholder="Aéroport arrivée"></a-select>
      </a-form-item>

      
      <a-form-item label="Consommation CO2 du vol">
        <a-input placeholder="5000"></a-input>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { Modal } from 'ant-design-vue';
export default {
  emits: ["success"],
  props: ["open", "input"],
  components: {
    AModal: Modal
  },
  data() {
    return {
      fetchTimeout: null,
      from: {},
      to: {}
    }
  },
  watch: {
    open(val) {
      this.$data.showDialog = val;
    },
    input(val) {
      this.airport = {...val};
    }
  },
  methods: {
    ok() {
      this.showDialog = false
      this.$emit("success", undefined, this.$props.input)
    },
    cancel() {
      this.showDialog = false
    }
  }
}
</script>

<style scoped></style>