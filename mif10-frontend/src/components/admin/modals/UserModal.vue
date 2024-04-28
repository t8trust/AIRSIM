<template>
<a-modal
    title="Modifier le profil"
    :open="$props.open !== undefined"
    @ok="ok"
    @cancel="cancel"
>
    <a-form model="userProfileForm">
        <a-form-item label="Login">
            <a-input v-model:value="login" placeholder="Votre login"></a-input>
        </a-form-item>

        <a-form-item label="Nouveau mot de passe" :validateStatus="passwordError" :help="passwordError ? 'Les mots de passes doivent être égaux et de taille minimum à 4ch': ''">
            <a-input-password v-model:value="password"  placeholder="Entrez le nouveau mot de passe"></a-input-password>
        </a-form-item>

        <a-form-item label="Confirmation" :validateError="passwordError">
            <a-input-password v-model:value="password2" placeholder="Confirmez le nouveau mot de passe"></a-input-password>
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
      async open(data) {
        if (data && data.user){
          this.login = {...data.user}.login;
        }
      },
    },
    data() {
      return {
        showDialog: false,
        fetchTimeout: null,
        login: "",
        password: "",
        password2: "",
        passwordError: "",
      }
    },
    methods: {
      ok() {
        this.passwordError = ""

        const empty = this.password == "" && this.password2 == ""

        if (!empty && (this.password !== this.password2 || this.password.length < 4)){
          this.passwordError = "error"
          return
        }

        if (!this.login) throw "Login must exist"

        this.$emit("update:open", undefined)
        this.$emit("success", { login: this.login, mot_de_passe: this.password }, this.$props.open)
        this.reset()
      },
      cancel() {
        this.$emit("update:open", undefined)
        this.reset()
      },
      reset() {
        this.login = ""
        this.password = ""
        this.password2 = ""
      }
    }
  }
  </script>
  
  <style scoped></style>