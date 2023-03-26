<template>
  <v-card>
    <v-card-title>
      Office Reservations
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="displayReservations" :items-per-page="5" :search="search"
                    class="elevation-1" ref="tutorialsTable">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon v-if="status==='Pending'" small @click="acceptItem(item)">mdi-check</v-icon>
          <v-icon v-if="status==='Pending'" small @click="denyItem(item)">mdi-cancel</v-icon>

        </template>
        <template v-slot:top>
          <v-dialog v-model="dialogDeny" max-width="500px">
            <v-card>
              <v-card-title class="headline">Deny Item</v-card-title>
              <v-card-text>
                <p>Are you sure you want to deny the reservation <b>{{ editedItem.id }}</b>?</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDeny">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="denyItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
            <v-dialog v-model="dialogAccept" max-width="500px">
            <v-card>
              <v-card-title class="headline">Accept Item</v-card-title>
              <v-card-text>
                <p>Are you sure you want to accept the reservation <b>{{ editedItem.id }}</b>?</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteAccept">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="acceptItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import ReservationService from '../services/reservation-service';

export default {
  name: "officeReservationsTable",
  props: {
    status: String
  },
  data() {
    return {
      search: '',
      dialog: false,
      dialogDeny: false,
      dialogAccept: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Initial Date', value: 'initialDate'},
        {text: 'Finish Date', value: 'finishDate'},
        {text: 'Account Name', value: 'accountName'},
        {text: 'Account Phone Number', value: 'accountPhone'},
        {text: 'Actions', value: 'actions', sortable: false}
      ],
      reservations: [],
      displayReservations: [],
      editedIndex: -1,
      editedItem: {
        id: 0,
        title: '',
        description: '',
        published: false
      },
      defaultItem: {
        id: 0,
        title: '',
        description: '',
        published: false
      },
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDeleteDeny(val) {
      val || this.closeDeleteDeny()
    },
    dialogDeleteAccept(val) {
      val || this.closeDeleteAccept()
    },
  },
  methods: {
    retrieveReservations() {
      // console.log(this.$route.params.id);
      ReservationService.getAllByOffice(this.$route.params.id, this.status)
          .then(response => {
            // console.log(response.data);
            this.reservations = response.data;
            this.displayReservations = response.data.map(this.getDisplayReservation);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayReservation(reservation) {
      return {
        id: reservation.id,
        initialDate: reservation.initialDate,
        finishDate: reservation.finishDate,
        accountName: reservation.account.firstName + ' ' + reservation.account.lastName,
        accountPhone: reservation.account.phoneNumber,
      };
    },

    refreshList() {
      this.retrieveReservations();
    },


    denyItem(item) {
      this.editedIndex = this.displayReservations.indexOf(item);
      this.editedItem = Object.assign({}, this.reservations[this.editedIndex]);
      this.dialogDeny = true;
    },

    acceptItem(item) {
      this.editedIndex = this.displayReservations.indexOf(item);
      this.editedItem = Object.assign({}, this.reservations[this.editedIndex]);
      this.dialogAccept = true;
    },

    denyItemConfirm() {
      // console.log(this.editedItem.id);
      this.setStatus(this.editedItem.id, 'Canceled');
      // this.deleteReservation(this.editedItem.id);
      this.reservations.splice(this.editedIndex, 1);
      this.closeDeleteDeny();
    },

    acceptItemConfirm() {
      // console.log(this.editedItem.id);
      this.setStatus(this.editedItem.id,'Active');
      // this.deleteReservation(this.editedItem.id);
      this.reservations.splice(this.editedIndex, 1);
      this.closeDeleteAccept();
    },


    closeDeleteDeny() {
      this.dialogDeny = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDeleteAccept() {
      this.dialogAccept = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    setStatus(id, status) {
      // console.log(status);
      // console.log(this.$route.params.id);
      ReservationService.setStatus(id, status)
            .then(() => {
              this.refreshList();
            })
            .catch((e) => {
              console.log(e);
            });
    },



    navigateToReservationDetail(id) {
      // console.log(id);
      this.$router.push({name: 'detail-reservation-provider', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveReservations();
  }

}
</script>

<style scoped>

</style>
