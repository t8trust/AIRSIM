<template>
    <div class="page-container">
        <!--<HeaderComponent :showFavorisButton="false"></HeaderComponent>-->

        <div class="login-container">
            <a-card class="login-card">
              <h2 class="card-title">Connexion administrateur</h2>
                <div class="form-container">
                  <a-form ref="loginForm" :rules="rules" @finish="handleSubmit">
                    <a-form-item label="Login" name="email">
                        <a-input type="email" prefix-icon="login" placeholder="Login"/>
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
        <!--<FooterComponent :showLoginButton="false"/>-->
    </div>
</template>

<script>
//import HeaderComponent from '../HeaderComponent.vue'
//import FooterComponent from '../FooterComponent.vue'
import { message } from 'ant-design-vue';

export default {
  components: {
    //HeaderComponent,
    //FooterComponent,
  },
  data() {
    return {
        rules: {
            email: [{ required: true, message: 'Veuillez saisir votre login', trigger: 'blur' }],
            password: [{ required: true, message: 'Veuillez saisir votre mot de passe', trigger: 'blur' }]
        },
        deletePopupVisible: false
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

.page-container {
  background-color: #dbecfd;
}

.card-title {
  text-align: center;
  margin-bottom: 20px; 
}
</style>