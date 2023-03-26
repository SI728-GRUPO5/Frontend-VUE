<template>
  <v-app >
    <v-main>
      <v-layout justify-center>
        <v-card max-width="1000" >
          <v-img
              class="white--text align-end"
              height="500px"
              src="https://www.businessopportunitystartup.com/wp-content/uploads/2020/03/dexus-office-space.jpg">
            <v-card-title>{{this.item.address}}</v-card-title>
          </v-img>
          <v-card-text>
            <div>
              $ {{ this.item.price }}      | ★ {{this.item.score}}      | Aforo: {{this.item.score}}
            </div>
            <p class="display-1 text--primary">
              {{this.item.title}}
           </p>
            <div class="text--primary">
              {{this.item.description}}
            </div>
          </v-card-text>

          <v-card-actions v-model="item">
            <v-btn
                @click="goBack"
                text
                color="deep-purple accent-4">
              Regresar
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                @click="reservationTriggered"
                v-if="!amIOWner()"
                text
                color="deep-purple accent-4">
              Reservar
            </v-btn>
            <v-btn v-if="amIOWner()"
                   text
                   color="deep-purple accent-4">
              Actualizar
            </v-btn>
            <v-btn
                   @click="officeHasReservations"
                   v-if="amIOWner()"
                   text
                   color="deep-purple accent-4">
              Archivar
            </v-btn>
            <v-btn
                   @click="navigateToOfficeReservation(item.id)"
                   v-if="amIOWner()"
                   text
                   color="deep-purple accent-4">
              Ver Reservas
            </v-btn>
          </v-card-actions>
          <v-dialog v-model="dialogDeny" max-width="500px">
            <v-card>
              <v-card-title class="headline">Eliminar Workspace</v-card-title>
              <v-card-text>
                <p>No puedes borrar una oficina que tiene reservas activas</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogReservation" max-width="500px">
            <v-card>
              <v-card-title class="headline">Reservar Oficina</v-card-title>
              <v-card-text>
                <p>Reservar la oficina {{this.item.title}} ?</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeReservationDialog">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="gotoCreation" >Confirmar</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>


      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
import OfficesServices from "@/services/offices-service";
import ReservationService from "@/services/reservation-service";
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css';

export default {
  name: "detail-office-provider",
  data() {
    return {
      tab: null,
      item: {
        title: '',
        id: 0,
        url:'',
        address: '',
        floor: '',
        capacity: '',
        allowResource: false,
        score: 0,
        description: '',
        price: 0,
        status: false,
        comment: '',
        services: [],
        accountId: 0
      },
      dialogDeny: false,
      dialogReservation: false,
    }
  },
  computed: {
    displayOfficeStatus() {
      return this.item.status ? 'Activated' : 'Disabled';
    }
  },
  methods: {

    amIOWner() {
      return parseInt(100) == parseInt(this.item.accountId)
      // console.log(parseInt(100) === parseInt(this.item.accountId))
    },

    navigateToOfficeReservation(id){
      console.log('queso');
      this.$router.push({name: 'office-reservations', params: { id: id}});
    },

    reservationTriggered(){
      this.dialogReservation = true;
    },

    officeHasReservations(){
      console.log(this.$route.params.officeId)
      ReservationService.getAllByOfficeNoStatus(this.$route.params.officeId)
          .then(response => {
            // console.log(response.data);
            this.reservations = response.data;
            if (response.data.length > 1 ){
              this.dialogDeny = true;
              console.log(response.data);
            }
          }).catch((e) => {
            console.log(e);
          });
    },
    closeDialog(){
      this.dialogDeny = false
    },

    closeReservationDialog(){
      this.dialogReservation = false;
    },

    goBack() {
      this.$router.push({name: 'offices'});
    },
    mounted() {
      this.retrieveOffice();
    },

    refreshList() {
      this.retrieveOffice();
    },

    retrieveOffice() {
      OfficesServices.getViewProvider(this.$route.params.officeId)
          .then((response) => {
            this.item.id = response.data.id
            this.item.title = response.data.title
            this.item.url - response.data.url,
            this.item.address = response.data.address;
            this.item.capacity = response.data.capacity;
            this.item.score = response.data.score;
            this.item.description = response.data.description;
            this.item.price = response.data.price;
            this.item.accountId = response.data.accountId;
            console.log(response.data)
          })
          .catch(e => {
            console.log(e);
          })
    },
    navigateToOffices() {
      this.$router.push({name: 'tutorials'}); // necesita cambiar a componente de lista de oficinas del proveedor
    },

    gotoCreation(){
      this.$router.push({name: 'add-reservation'});
    },

    close() {
      this.navigateToOffices();
    },
    navigateToEditOffices() {
      this.$router.push({name:'tutorials'}) // necesita cambiar a componente de editar oficina
    },
    navigateToListOfReservationsOfOffice() {
      this.$router.push({name: 'tutorials'}); // necesita cambiar a componente de lista de reservaciones que tiene la oficina
    }
  },
  created() {
    this.retrieveOffice(this.$route.params.id);
  }
}
</script>

<style scoped>
action {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
</style>
