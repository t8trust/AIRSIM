<template>
    <div class="page-container">
        <!--<HeaderComponent :showFavorisButton="false"></HeaderComponent>-->

        <div class="login-container">
            <a-card class="login-card">
              <h2 class="card-title">Connexion administrateur</h2>
                <div class="form-container">
                  <a-form>
                    <a-form-item label="Login" name="login" :validateStatus="loginError ? 'error' : ''" :help="loginError">
                        <a-input v-model:value="login" prefix-icon="login" placeholder="Login"/>
                    </a-form-item>
                    <a-form-item label="Mot de passe" name="password" :validateStatus="passwordError ? 'error' : ''" :help="passwordError">
                        <a-input v-model:value="password" type="password" prefix-icon="lock" placeholder="Password"/>
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
import { Auth, StatusError } from '@/api';
import { ref } from 'vue';

export default {
  components: {
    //HeaderComponent,
    //FooterComponent,
  },
  setup(){
    return {
      login: ref(''),
      password: ref(''),
      loginError: ref(''),
      passwordError: ref('')
    }
  },
  data() {
    return {
    }
  },
  methods: {
    async submitForm() {
      this.loginError = '';
      this.passwordError = '';
      if(!this.login) {
        this.loginError = 'Le login est obligatoire'
      }
      if(!this.password) {
        this.passwordError = 'Le mot de passe est obligatoire'
      }

      if (this.loginError || this.passwordError) return;
      
      try {
        await Auth.login(this.login, this.password);
        message.success('Connexion réussie');
        this.$router.push({name: 'dashboard'});
      } catch (err) {
        let msg = "Erreur Inconnue à la connexion"
        if (err instanceof StatusError){
          if (err.code === 401) msg = "L'identifiant ou le mot de passe est incorrect"
        }
        message.error(msg)
      }
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