<template>
  <v-card>
    <v-card-title class="profile">Profile</v-card-title>
      <v-spacer></v-spacer>
      <v-row no-gutters>
        <v-col cols="15" sm="10">
          <div>
            <a>
              <v-img class="image"
                     src="https://img.freepik.com/foto-gratis/hombre-negocios-trabajando-escritorio-oficina_79405-3705.jpg?size=626&ext=jpg"></v-img>
            </a>
          </div>
        </v-col>
        <v-col cols="10" sm="8" class="right-banner">
          <v-card-text class="right-text" >
            <div class="text-lg-left">Nombre: {{ profile.firstName }} </div>
            <br/>
            <div class="text-lg-left">Apellidos:{{ profile.lastName }} </div>
            <br/>
            <div class="text-lg-left">E-mail: {{ profile.email }}</div>
            <br/>
            <div class="text-lg-left">Identificacion: {{ profile.identification }}</div>
            <br/>
            <div class="text-lg-left">Celular: {{ profile.phone }}</div>
            <br/>
            <div class="text-lg-left">Token:  </div>
            <br/>
            <div class="text-lg-left">{{ currentUser.token }}  </div>
          </v-card-text>
        </v-col>


        <v-btn class="button" large color="primary" @click="navigateToEditProfile">Editar Perfil</v-btn>

        <v-btn class="button" large color="error" @click="logout">LogOut</v-btn>

            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{on, attrs}">
                <v-btn class="button" large color="error" v-bind="attrs" v-on="on">Deactivate Account</v-btn>
              </template>

              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                  <v-dialog v-model="dialog" max-width="500px">
                    <template v-slot:activator="{on, attrs}">
                      <v-btn small color="blue darken-1"  dark class="mb" v-bind="attrs" v-on="on" text @click="deleteAccount">Ok</v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="headline">{{ formTitle1 }}</span>
                      </v-card-title>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="save">Ok</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-card-actions>
              </v-card>
            </v-dialog>
      </v-row>
  </v-card>
</template>

<script>

import AccountService from "../services/accounts-service";

export default {
  name: "profile",
  props: {
  },
  data(){
    return{
      dialog: false,
      defaultItem: {
        id: 0,
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        identification: '',
      },
      displayProfile: [],
      profile: {

      },
      editedIndex: 1,
      accounts: [],
    }
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
    },
    formTitle() {
      return 'Are you sure to deactivate your account?'
    },
    formTitle1(){
      return 'Your account has been deactivated'
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    AccountService.getUserByEmail(this.currentUser.username)
        .then(response => {
          console.log(response.data);
          this.profile = response.data;
          this.displayProfile = response.data.map(this.getDisplayProfile);
        })
        .catch((e) => {
          console.log(e);
        });

  },

  methods:{

    retrieveAccount() {
      AccountService.getUserByEmail(this.currentUser.username)
          .then(response => {
            console.log(response.data);
            this.profile = response.data;
            this.displayProfile = response.data.map(this.getDisplayProfile);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayProfile(account){
      return {
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        phoneNumber: account.phoneNumber,
        identification: account.identification,
      };
    },
    refreshList() {
      this.retrieveAccount();
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteItem(item) {
      this.editedIndex = this.displayProfile.indexOf(item);
      this.editedItem = Object.assign({}, this.accounts[this.editedIndex]);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      console.log(this.editedItem.id);
      this.deleteAccount(this.editedItem.id);
      this.accounts.splice(this.editedIndex, 1);
      this.closeDelete();
    },
    editItem(item) {
      this.editedIndex = this.displayTutorials.indexOf(item);
      console.log(item);
      this.editedItem = this.tutorials[this.editedIndex];
      this.dialog = true;
    },
    deleteAccount() {
      AccountService.delete()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
    navigateToEditProfile(){
      this.$router.push({name: 'edit-account'});
    },

}

}
</script>

<style scoped>
.welcome{
  margin-top: 1em;
  margin-left: 0.5em;
  margin-bottom: 0.5em;
  font-family: 'Khula', sans-serif !important;
  font-weight: 300;
  font-size: 1.3em;
}
.profile{
  margin-top: 2vw;
  margin-left: 5vw;
  font-size: 2vw;
  font-family: 'Khula', sans-serif;
}
.image{
  margin-top: 2vw;
  margin-left: 5vw;
  width: 40%;
  height: 40%;
  border-radius: 10px;
}
.button{
  margin-top: 2vw;
  margin-left: 6.2vw;
  margin-bottom: 5vw;
  border-radius: 20px;
  width: 12%;
  height: 12%;
  font-size: 0.75vw;
}
.right-banner{
  margin-left: 45vw;
  margin-top: -20vw;
  font-size: 11vw;
}
.right-text{
  font-size: 1.5vw;
  margin-top: 2vw;
}
</style>
