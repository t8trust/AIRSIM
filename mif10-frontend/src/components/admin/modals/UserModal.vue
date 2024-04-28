<template>
<a-modal
    title="Modifier le profil"
    :open="$props.open !== undefined"
    @ok="ok"
    @cancel="cancel"
>
    <a-form model="userProfileForm">
        <a-form-item label="Login">
            <a-input disabled :value="login" placeholder="Votre login"></a-input>
        </a-form-item>

        <a-form-item label="Nouveau mot de passe">
            <a-input-password v-model:value="password" placeholder="Entrez le nouveau mot de passe"></a-input-password>
        </a-form-item>

        <a-form-item label="Confirmation">
            <a-input-password v-model:value="password" placeholder="Confirmez le nouveau mot de passe"></a-input-password>
        </a-form-item>
    </a-form>
</a-modal>
</template>
<script>
  import { Modal } from 'ant-design-vue';
  export default {
    emits: ["success", "update:open"],
    props: ["open"],
    components: {
      AModal: Modal
    },
    watch: {
      open(val) {
        this.airport = {...val};
      },
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
        this.$emit("update:open", undefined)
        this.$emit("success", { login: this.login, password: this.password }, this.$props.input)
        this.reset()
      },
      cancel() {
        this.$emit("update:open", undefined)
        this.reset()
      },
      reset() {
        this.login = ""
        this.password = ""
      }
    }
  }
  </script>
  
  <style scoped></style>