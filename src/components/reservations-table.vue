<template>
  <v-card>
    <v-card-title>
      My Reservations
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
          <v-icon small class="mr-2" @click="navigateToReservationDetail(item.id)">mdi-magnify</v-icon>
<!--          <template v-if="this.status != 'Pending'">-->
            <v-icon v-if="status==='Pending'" small @click="deleteItem(item)">mdi-cancel</v-icon>
<!--          </template>-->
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Delete Item</v-card-title>
              <v-card-text>
                <p>Are you sure you want to delete the item <b>{{ editedItem.id }}</b>?</p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
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
  name: "reservationsTable",
  props: {
    status: String
  },
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Initial Date', value: 'initialDate'},
        {text: 'Finish Date', value: 'finishDate'},
        {text: 'Description', value: 'description'},
        {text: 'Price', value: 'price'},
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
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  methods: {
    retrieveReservations() {
      ReservationService.getAllByAccount(this.status)
          .then(response => {
            console.log(response.data);
            this.reservations = response.data;
            this.displayReservations = response.data.map(this.getDisplayReservation);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayReservation(reservation) {
      // console.log(reservation);
      return {
        id: reservation.id,
        initialDate: reservation.initialDate,
        finishDate: reservation.finishDate,
        description: reservation.office.description,
        price: '$'+reservation.office.price,
      };
    },

    refreshList() {
      this.retrieveReservations();
    },



    deleteItem(item) {
      this.editedIndex = this.displayReservations.indexOf(item);
      this.editedItem = Object.assign({}, this.reservations[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      console.log(this.editedItem.id);
      this.deleteReservation(this.editedItem.id);
      this.reservations.splice(this.editedIndex, 1);
      this.closeDelete();
    },


    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },


    deleteReservation(id) {
      ReservationService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToReservationDetail(id) {
      console.log(id);
      this.$router.push({name: 'detail-reservation-user', params: { id: id}});
    }
  },
  mounted() {
    this.retrieveReservations();
  }

}
</script>

<style scoped>

</style>
