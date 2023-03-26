<template>
  <div class="offices">
    <v-row>
      <v-col sm="3" offset-lg="0" align-self="start">
        <Search  :prices="prices"
                @anyButtonDistrictPressed="filterOfficesByDistrictId"
                @buttonPricesPressed="filterOfficesByPricesRange"
                @buttonAllDistrictsPressed="retrieveAllOffices"
                @buttonAllPricesPressed="retrieveAllOffices"></Search>
      </v-col>
      <v-col sm="9"  offset-lg="0">
        <ListOffices :offices="offices" :display-offices="displayOffices" :principal-office-title="districtTitle" ></ListOffices>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Search from "../components/offices/search";
import ListOffices from "../components/offices/list-offices";
import OfficeService from "../services/offices-service";
import DistrictService from "../services/district-service";
export default {
name: "Offices",
  data(){
    return{
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
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:4,
          status: false,
          title: "office 04",
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:5,
          status: false,
          title: "office 05",
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:6,
          status: false,
          title: "office 06",
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:7,
          status: false,
          title: "office 07",
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:8,
          status: false,
          title: "office 08",
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:9,
          status: false,
          title: "office 09",
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:10,
          status: false,
          title: "office 10",
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:11,
          status: false,
          title: "office 11",
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:12,
          status: false,
          title: "office 12",
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
        {
          id:13,
          status: false,
          title: "office 13",
          price: 305,
          rating: 5.0,
          description: "fasfiuagfuafgauifagsfuiasfgauifagfuiafgauifagsfbuiasfga"
        },
      ],
      displayOffices:[],
      districts: [
        {id: '', name: ''},
      ],
      districtTitle:'',
      prices: [
        {
          minPrice: 0.00,
          maxPrice: 100.00
        },
        {
          minPrice: 100.00,
          maxPrice: 250.00
        },
        {
          minPrice: 250.00,
          maxPrice: 500.00
        },
        {
          minPrice: 500.00,
          maxPrice: 1000.00
        }
      ]
    }
  },
  components: {
    Search,
    ListOffices
  },
  methods: {
    retrieveAllOffices() {
      OfficeService.getAllOffices()
          .then(response => {
            this.offices = response.data;
            console.log(response.data)
            this.displayOffices = response.data.map(this.getDisplayOffice);
            this.districtTitle = "todos los distritos";
          })
          .catch((e) => {
            console.log(e);
          });
    },

    //funcion de vistas inicial de oficians en surco
    retrieveAllOfficesByDistrictSurco() {
      OfficeService.getAllOfficesByDistricId("2")
          .then(response => {
            this.offices = response.data;
            console.log(response.data)
            this.displayOffices = response.data.map(this.getDisplayOffice);
            this.districtTitle = "Surco";
          })
          .catch((e) => {
            console.log(e);
          });
    },
    getDisplayOffice(office) {
      return {
        title: office.name,
        image: office.image,
        address: office.address,
        floor: office.floor,
        capacity: office.capacity,
        allowResources: office.allowResource ? "Permite" : "No permite",
        score: office.score,
        description: office.description,
        price: office.price,
        status: office.status,
        comment: office.comment,
        cardAction: false
      };
    },

    retrieveAllDistricts (){
      DistrictService.getAllDistricts()
          .then(response => {
            this.districts = response.data;
            console.log(response.data)
          })
          .catch((e) => {
            console.log(e);
          });
    },


    filterOfficesByPricesRange(item){
      OfficeService.getOfficesByPricesRange(item.minPrice, item.maxPrice)
          .then(response => {
            this.offices = response.data;
            console.log(response.data)
            this.displayOffices = response.data.map(this.getDisplayOffice);
            this.districtTitle = "todos los distritos";
          })
          .catch((e) => {
            console.log(e);
          });
    },

    filterOfficesByDistrictId(district) {
      OfficeService.getAllOfficesByDistricId(district.id)
          .then(response => {
            this.offices = response.data;
            console.log(response.data)
            this.displayOffices = response.data.map(this.getDisplayOffice);
            this.districtTitle = district.name;
          })
          .catch((e) => {
            console.log(e);
          });

    }
  },
    mounted() {
      //this.retrieveAllOfficesByDistrictSurco();
      this.retrieveAllOffices();
      this.retrieveAllDistricts();
    }
}
</script>

<style scoped>

</style>
