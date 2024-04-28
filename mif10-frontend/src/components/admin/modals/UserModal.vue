<template>
<a-modal
    title="Modifier le profil"
    :open="showDialog"
    @ok="ok"
    @cancel="cancel"
>
    <a-form model="userProfileForm">
        <a-form-item label="Login">
            <a-input disabled :value="login" placeholder="Votre login"></a-input>
        </a-form-item>

        <a-form-item label="Nouveau mot de passe">
            <a-input-password v-model:value="password" placeholder="Entrez votre nouveau mot de passe"></a-input-password>
        </a-form-item>

        <a-form-item label="Confirmation">
            <a-input-password v-model:value="password" placeholder="Confirmez votre nouveau mot de passe"></a-input-password>
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
    watch: {
      open(val) {
        this.$data.showDialog = val;
      },
      input(val) {
        this.airport = {...val};
      }
    },
    data() {
      return {
        showDialog: false,
        fetchTimeout: null,
        login: "",
        password: ""
      }
    },
    methods: {
      ok() {
        this.showDialog = false
        this.$emit("success", { login: this.login, password: this.password }, this.$props.input)
      },
      cancel() {
        this.showDialog = false
      }
    }
  }
  </script>
  
  <style scoped></style>