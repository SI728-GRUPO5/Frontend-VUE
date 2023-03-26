<template>
  <v-app class="content">
    <v-row no-gutters>
      <v-col cols="12" md="5" class="left_banner">
        <v-card-text class="header">
          <v-row>
            <v-col cols="12" sm="6">
              <div>
                <a href="/login">
                  <img class="logo" src="@/assets/offirent.png" alt="">
                </a>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-form v-model="isValid" @submit.prevent="handleRegister">
          <v-card-text class="register">
            <div class="form">
<!--              <v-text-field class="text-field" type="text" label="Id"-->
<!--                            v-model="user.id" required>-->

<!--              </v-text-field>-->
              <v-text-field class="text-field"
                            v-model="user.email"
                            :rules="emailRules"
                            label="E-mail"
              ></v-text-field>
            </div>
            <div class="form">
              <v-row>
                <v-col>
                  <v-text-field class="text-field first_name"  label="Nombre" v-model="user.firstName"
                                :rules="[v => !!v || 'Nombre y Apellidos son requeridos']"
                                required>
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field class="text-field last_name"  label="Apellidos" v-model="user.lastName"
                                :rules="[v => !!v || 'Nombre y Apellidos son requeridos']"
                                required>
                  </v-text-field>
                </v-col>
              </v-row>
            </div>
            <div class="form">
              <v-text-field class="text-field"  label="Identification" v-model="user.identification" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[v => !!v || 'numero identificacion es requerido']" required>

              </v-text-field>
            </div>
            <div class="form">
              <v-text-field class="text-field"  label="Phone Number" v-model="user.phone" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[v => !!v || 'numero telefonico es requerido']" required>

              </v-text-field>
            </div>
            <div class="form">
              <v-text-field class="text-field"  label="Contraseña" v-model="user.password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="passwordRules"
                            :type="show1 ? 'text' : 'password'" required @click:append="show1 = !show1">

              </v-text-field>
            </div>
            <div class="form">
              <v-text-field class="text-field" label="Confirma tu contraseña" v-model="user.password" :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[v => !!v || 'Las contraseñas deben coincidir']"
                            :type="show2 ? 'text' : 'password'" required @click:append="show2 = !show2">

              </v-text-field>
            </div>
            <div>
              <div v-if="message">{{ message }}}</div>
              <v-card-text class="btn">
                <v-btn type="submit" :disabled="loading" class="register_btn">Registrate
                  <v-progress-circular indeterminate color="primary" v-if="loading">
                  </v-progress-circular>
                </v-btn>
                <v-btn to='/login' class="register_btn">¿Ya tienes una cuenta?</v-btn>
              </v-card-text>
            </div>
          </v-card-text>
        </v-form>
      </v-col>
      <v-col cols="12" md="7" class="right_banner">
        <v-card-text class="right_text">
          <p class="text-lg-left">Bienvenido a</p>
          <br/><br/><br/><br/><br/>
          <h1 class="text-lg-center-left">OffiRent</h1>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <p class="text-lg-left">Registrate</p>
        </v-card-text>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>

import Account from '../../models/account';

export default {
  name: "Register",
  data () {
    return {
      user: new Account('','','','','',''),
      submitted: false,
      successful: false,
      message: '',
      loading: false,
      isValid: true,
      show1: false,
      show2: false,
      emailRules: [
        v => !!v || 'Email is required',
        v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail inválido.',
      ],
      passwordRules: [
        v => !!v || 'Contraseña es requerida',
        v => /(?=.*[A-Z])/.test(v) || 'La contraseña debe tener una mayúscula',
        v => /(?=.*[a-z])/.test(v) || 'La contraseña debe tener una minúscula',
        v => /(?=.*\d)/.test(v) || 'La contraseña debe tener un número',
        v => /([!@#$%])/.test(v) || 'La contraseña debe tener un carácter especial [!@#$%]',
        v => (v && v.length >= 5) || 'La contraseña debe tener como mínimo 6 caracteres'
      ],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push('/profile');
    }
  },
  methods: {
    handleRegister() {
      this.message = '';
      this.submitted = true;
      if (this.isValid) {
        this.$store.dispatch('auth/register', this.user).then(
            data => {
              this.message = data.message;
              this.successful = true;
            },
            error => {
              this.message = (error.response && error.response.data)
                  || error.message || error.toString();
              this.successful = false;
            }
        )
      }
    }
  }
}
</script>

<style scoped>
.right_text{
  margin-top: 6vw;
  margin-left: 7vw;
  color: white;
  font-size: 3.5vw;
}
.form{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-left: 3vw;
}
.left_banner{
  font-size: 3vw;
}
.right_banner{
  font-size: 11vw;
  color: white;
  background-color: #2d2d33;
}
.register{
  text-decoration:none !important;
  color: #282a3f !important;
  font-size: 1.2vw;
}
.left_banner{
  font-size: 3vw;
}
.register{
  margin-top: 0.5em;
}
.logo{
  margin-top: 3vw;
  margin-left: 14vw;
  width: 60%;
  height: 60%;
}
.register_btn{
  margin-top: 1vw;
  background-color: #2d2d33 !important;
  width: 80%;
  border-radius: 20px;
  margin-left: 3vw;
  height: 100%;
  color: white !important;
}
.first_name{
  width: 100%;
}
.last_name{
  width: 100%;
}
</style>
