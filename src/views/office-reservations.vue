<template>
  <v-app>
    <v-content>
      <v-tabs v-model="tab" centered>
        <v-tab>Active</v-tab>
        <v-tab>Pending</v-tab>
        <v-tab>Finished</v-tab>
        <v-tab>Canceled</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <officeReservationsTable status="Active"></officeReservationsTable>
        </v-tab-item>
        <v-tab-item>
          <officeReservationsTable status="Pending"></officeReservationsTable>
        </v-tab-item>
        <v-tab-item>
          <officeReservationsTable status="Finished"></officeReservationsTable>
        </v-tab-item>
        <v-tab-item>
          <officeReservationsTable status="Canceled"></officeReservationsTable>
        </v-tab-item>
      </v-tabs-items>
      <v-btn color="primary" @click="returnToOffice">
        Volver a oficina
      </v-btn>
    </v-content>
  </v-app>
</template>

<script>
import officeReservationsTable from "../components/office-reservations-table";
// import ReservationService from "@/services/reservation-service";
export default {
  name: "user-reservations",
  components: {
    officeReservationsTable,
  },
  data() {
    return {
      tab: null
    }
  },
  methods: {
    returnToOffice() {
      console.log('this.$route.params.id');
      this.$router.push({name: 'detail-office', params: { officeId: this.$route.params.id}});
    },


  }
};
</script>

<style scoped>

</style>
