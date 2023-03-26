<template>
  <v-card>
    <v-spacer></v-spacer>
    <v-text-field
        v-model="search"
        append-icon="mdi-map-marker-multiple"
        label="Buscar distrito"
        single-line
        hide-details
    ></v-text-field> <!-- propiedad de este tag comentada: append-icon="mdi-magnify" -->
    <v-list tile="prueba">

      <v-list-item  v-for="item in districts" :key="item.name" :to="item.link" link @click="filterDistrict(item)">
        {{item.name}}
      </v-list-item>
      <v-list-item link @click="filterAllDistricts">Todos los distritos</v-list-item>
    </v-list>

    <v-card>
      <v-spacer></v-spacer>
      <v-text-field
          v-model="searchPrice"
          append-icon="mdi-currency-usd"
          label="Buscar por precio"
          single-line
          hide-details
      ></v-text-field> <!-- propiedad de este tag comentada: append-icon="mdi-magnify" -->
      <v-list tile="prueba">

        <v-list-item  v-for="item in prices" :key="item.title" :to="item.link" link @click="filterPrices(item)">
          S/.{{item.minPrice}}.00 - S/.{{item.maxPrice}}.00
        </v-list-item>
        <v-list-item link @click="filterAllPrices">Todos los precios</v-list-item>
      </v-list>
    </v-card>
  </v-card>



</template>

<script>
//import DistrictService from "../../services/district-service";
//import ListOffices from "../offices/list-offices";

export default {
name: "search",
  components:{
  },
  props:{
    displayDistricts: [],
    prices: []
  },
  data() {
    return{
      search: '',
      searchPrice:'',
      itemsPrice: [],
      districts: [
        {
          id: 2, name: "Surco"
        },
        {
          id: 1, name: "San Miguel"
        },
        {
          id: 3, name: "Magdalena"
        },
        {
          id: 4, name: "San Isidro"
        }
      ]
    }
  },
  methods: {
      trackSurco(){
        this.$gtag.event("Surco-option-click", {
          'event_category': "Alternative search for districs",
          'event_label': "Surco button in districts filter clicked",
          'value': 1
          });
      },
      trackSanMiguel(){
        this.$gtag.event("San Miguel-option-click", {
          'event_category': "Alternative search for districs",
          'event_label': "Magdalena button in districts filter clicked",
          'value': 1
        });
      },
      trackMagdalena(){
        this.$gtag.event("Magdalena-option-click", {
          'event_category': "Alternative search for districs",
          'event_label': "San Miguel button in districts filter clicked",
          'value': 1
        });
      },
      trackSanIsidro(){
        this.$gtag.event("San Isidro-option-click", {
          'event_category': "Alternative search for districs",
          'event_label': "San Isidro button in districts filter clicked",
          'value': 1
        });
      },
      trackOptionalDistrict(item){
        switch (item){
          case "Surco":
            this.trackSurco();
            break;

          case "San Miguel":
            this.trackSanMiguel();
            break;

          case "Magdalena":
            this.trackMagdalena();
            break;

          case "San Isidro":
            this.trackSanIsidro();
            break;

          default:
            break;
        }
      },


      trackFilterDistrict(){
        this.$gtag.event("district-filter-select", {
          'event_category': "General filters for offices",
          'event_label': "District filter button clicked",
          'value': 1
        });
      },
      trackFilterPrices(){
        this.$gtag.event("price-filter-select", {
          'event_category': "General filters for offices",
          'event_label': "Price filter button clicked",
          'value': 1
        });
      },




      trackFilterDistrictAndOptionalDistrict(item){
        this.trackOptionalDistrict(item.name);
        this.trackFilterDistrict(item.name);
      },

      filterDistrict(item) {
        this.trackFilterDistrictAndOptionalDistrict(item);
        this.$emit('anyButtonDistrictPressed', item)
      },





      filterPrices(item){
        this.trackFilterPrices();
        this.$emit('buttonPricesPressed', item)
      },
      filterAllDistricts(){
        this.trackFilterDistrict();
        this.$emit('buttonAllDistrictsPressed')
      },
      filterAllPrices(){
      this.trackFilterPrices();
      this.$emit('buttonAllPricesPressed')
      }

  }
}
</script>

<style scoped>

</style>
