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
          <ReservationsTable status="Active"></ReservationsTable>
        </v-tab-item>
        <v-tab-item>
          <ReservationsTable status="Pending"></ReservationsTable>
        </v-tab-item>
        <v-tab-item>
          <ReservationsTable status="Finished"></ReservationsTable>
        </v-tab-item>
        <v-tab-item>
          <reservationsTable status="Canceled"></reservationsTable>
        </v-tab-item>
      </v-tabs-items>
    </v-content>
  </v-app>
</template>

<script>
import ReservationsTable from "../components/reservations-table";
export default {
  name: "user-reservations",
  components: {
    ReservationsTable,
  },
  data() {
    return {
      tab: null
    }
  }
};
</script>

<style scoped>

</style>
