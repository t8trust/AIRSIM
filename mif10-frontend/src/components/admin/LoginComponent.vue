<template>
    <div>
        <HeaderComponent :showFavorisButton="false"></HeaderComponent>

        <div class="login-container">
            <a-card class="login-card">
                <div class="form-container">
                  <a-form ref="loginForm" :rules="rules" @finish="handleSubmit">
                    <a-form-item label="Email" name="email">
                        <a-input prefix-icon="mail" placeholder="Email"/>
                    </a-form-item>
                    <a-form-item label="Mot de passe" name="password">
                        <a-input type="password" prefix-icon="lock" placeholder="Password"/>
                    </a-form-item>
                    <a-form-item style="text-align: center;">
                        <a-button type="primary" class="login-form-button" @click="submitForm">
                            Connexion
                        </a-button>
                    </a-form-item>
                  </a-form>
                </div>
            </a-card>
        </div>
        <FooterComponent :showLoginButton="false"/>
    </div>
</template>

<script>
import HeaderComponent from '../headerfooter/HeaderComponent.vue'
import FooterComponent from '../headerfooter/FooterComponent.vue'
import { message } from 'ant-design-vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
  },
  data() {
    return {
        rules: {
            email: [{ required: true, message: 'Veuillez saisir votre email', trigger: 'blur' }],
            password: [{ required: true, message: 'Veuillez saisir votre mot de passe', trigger: 'blur' }]
        }
    }
  },
  methods: {
    handleSubmit() {
        this.$refs.loginForm.validate(valid => {
        if (valid) {
          message.success('Connexion réussie');
        } else {
          message.error('Veuillez remplir tous les champs');
          return false;
        }
      });
    }
  }
}
</script>

<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 100px); 
}

.login-card {
  width: 500px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  background-color: #f8f9fa;
}

.form-container {
  width: 100%; 
}
</style>