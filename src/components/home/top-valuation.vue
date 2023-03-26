<template>
  <div>
    <v-row>
      <v-col sm="10" offset-md="2" md="8" offset-sm="1">
        <h2> Mejor valoradas</h2>
      </v-col>
    </v-row>
    <v-container grid-list-md>
      <v-layout row>
        <v-flex xs12 class="mb-6" v-for="office in offices.slice(0,2)" :key="office.id">
          <v-card max-width="1000px">
            <v-img src="https://www.incimages.com/uploaded_files/image/1920x1080/getty_898700298_2000131820009280352_424477.jpg"></v-img>
            <v-card-title>{{office.title}}</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating :value="office.rating" color="amber" dense readonly size="14"></v-rating>
                <div class="grey--text ml-4">
                  {{office.rating}}
                </div>
                <v-spacer/>
                <div class="green--text">
                  {{"$ "+office.price}}
                </div>
              </v-row>
            </v-card-text>
            <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  {{office.description}}
                </v-card-text>
              </div>
            </v-expand-transition>
            <v-card-actions>
              <v-btn
                  color="blue"
                  text
                  @click="reserve"
              >
                Reservar
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                  icon
                  @click="show = !show"
              >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
name: "top-valuation",
  data () {
    return {
      show: false,
      offices: [
        {
          id:1,
          status: false,
          title: "office 01",
          price: 250,
          rating: 4.5,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:2,
          status: false,
          title: "office 02",
          price: 300,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:3,
          status: false,
          title: "office 03",
          price: 300,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:4,
          status: false,
          title: "office 04",
          price: 300,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:5,
          status: false,
          title: "office 05",
          price: 300,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
      ],
    }
  },
  methods: {
    reserve() {
      this.$router.push({name: 'add-reservation'});
      this.$gtag.event("Rerserve-button-click", {
        'event_category': "Reserve to Offices",
        'event_label': "Reserve button in Offices cards clicked",
        'value': 1
      });
    }
  }
}
</script>

<style scoped>

</style>
