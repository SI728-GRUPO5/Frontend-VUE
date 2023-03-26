<template>
  <v-card>
    <v-card-title>
      <span class="headline">Crear Reserva</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.initialDate" label="Fecha Inicial" ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.finishDate" label="Fecha Final" ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
      <v-btn color="blue darken-1" text @click="ExecuteReservation">Crear</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import ReservationsService from "../services/reservations-service";
import AccountService from "../services/accounts-service";

export default {
  name: "add-reservation",
  data () {
    return {
      item: {
        initialDate: '',
        finishDate: '',
        status: 'Pending',
        accountId: 100,
        officeId: this.$route.params.id,
      },
    }
  },
  computed: {
    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
      }
    },
  methods: {

    ExecuteReservation() {
      console.log('this')
      ReservationsService.addReservation(this.item, this.item.accountId)
          .then(() => {
            this.$router.push({name: 'user-reservations'});
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToOffices();
    },
    navigateToOffices() {
      this.$router.push({name: 'workplaces'});
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
  }


}
</script>

<style scoped>

</style>
