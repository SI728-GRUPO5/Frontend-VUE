<template>
  <v-app>
    <div>
      <v-row>
        <v-col sm="10" offset-md="2" md="8" offset-sm="1">
          <h2> Oficinas en {{principalOfficeTitle}}</h2>
        </v-col>
      </v-row>
      <v-container grid-list-md>
        <v-layout row wrap>
          <v-flex xs12 sm4  class="mb-3" v-for="(office, index) in offices" :key="index">
            <v-card max-width="400px">
              <v-img :src="office.image"  aspect-ratio="1.6" contain></v-img>
              <v-card-title>{{office.name}}</v-card-title>
              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating :value="office.score" color="amber" dense readonly size="14"></v-rating>
                  <div class="grey--text ml-4">
                    {{office.score}}
                  </div>
                  <v-spacer/>
                  <div class="green--text">
                    {{"$ "+office.price}}
                  </div>
                </v-row>
              </v-card-text>
              <v-expand-transition>
                <div v-show="displayOffices[index].cardAction">
                  <v-divider></v-divider>
                  <v-card-subtitle class="pb-0">Descripcion</v-card-subtitle>
                  <v-card-text class="text--primary">
                    {{office.description}}
                  </v-card-text>
                  <v-card-subtitle class="pb-0">Direccion</v-card-subtitle>
                  <v-card-text class="text--primary">
                    {{office.address}}
                  </v-card-text>
                  <v-card-subtitle class="pb-0">Pisos</v-card-subtitle>
                  <v-card-text class="text--primary">
                    {{office.floor}} planta(s)
                  </v-card-text>
                  <v-card-subtitle class="pb-0">Aforo</v-card-subtitle>
                  <v-card-text class="text--primary">
                    {{office.capacity}} personas
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
                    @click="displayOffices[index].cardAction = !displayOffices[index].cardAction"
                >
                  <v-icon>{{ displayOffices[index].cardAction ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-pagination class="pagination mb-2" v-model="page" :length="pages" @input="updatePage"></v-pagination>
    </div>
  </v-app>
</template>

<script>
//import OfficeService from "../../services/offices-service";

export default {
name: "list-offices",
  props:{
    offices: [],
    displayOffices:[],
    principalOfficeTitle: String
  },
  data () {
    return {
      page: 1,
      pageSize: 6,

      listCount: 0,
      historyList: [],

    }
  },
  created() {
    let _this = this;
    _this.initPage();
    _this.updatePage(_this.page);



  },
  methods: {



    initPage: function() {
      let _this = this;
      _this.listCount = _this.offices.length;
      if (_this.listCount < _this.pageSize) {
        _this.historyList = _this.offices;
      } else {
        _this.historyList = _this.offices.slice(0, _this.pageSize);
      }
    },
    updatePage: function(pageIndex) {
      let _this = this;
      let _start = (pageIndex - 1) * _this.pageSize;
      let _end = pageIndex * _this.pageSize;
      _this.historyList = _this.offices.slice(_start, _end);
      _this.page = pageIndex;
    },
    reserve() {
      this.$router.push({name: 'add-reservation'});
      this.$gtag.event("Rerserve-button-click", {
        'event_category': "Reserve to Offices",
        'event_label': "Reserve button in Offices cards clicked",
        'value': 1
      });
    }
  },
  computed: {
    pages() {
      let _this = this;
      if (_this.pageSize == null || _this.listCount == null) return 0;
      return Math.ceil(_this.listCount / _this.pageSize);
    }
  },

  mounted() {

  }
}
</script>

<style scoped>

</style>
