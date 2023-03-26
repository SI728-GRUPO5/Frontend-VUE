<template>
  <v-card>
    <v-card-title>
      <span class="headline">Editar Oficina</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.id" label="Id"></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.address" label="Dirección de oficina" :rules="addressRules" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.floor" label="Piso de oficina" :rules="floorRules" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.capacity" label="Capacidad de oficina" :rules="capacityRules" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.price" label="Precio de oficina " :rules="priceRules" required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field v-model="item.description" label="Descripción de oficina" :rules="descriptionRules" required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-checkbox v-model="item.allow_resources" label="Permite Recursos"></v-checkbox>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
      <v-btn color="blue darken-1" text @click="save">Guardar</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import OfficeService from "../services/offices-service";

export default {
  name: "edit-office",
  data() {
    return {
      item: {
        id: 0,
        address: '',
        floor: 0,
        capacity: 0,
        price: 0,
        description: '',
        allow_resources: false,
        addressRules:[
          v=> !!v || 'Address is required'
        ],
        floorRules:[
          v=> !!v || 'Floor is required',
          v => !/(?=.*[A-Z])/.test(v) || 'Price cannot letters',
          v => !/(?=.*[a-z])/.test(v) || 'Price cannot letters',
          v => !/([!@#$%])/.test(v) || 'Floor cannot have special character'
        ],
        capacityRules:[
          v => !!v || 'Capacity is required',
          v => !/(?=.*[A-Z])/.test(v) || 'Price cannot letters',
          v => !/(?=.*[a-z])/.test(v) || 'Price cannot letters',
          v => !/([!@#$%])/.test(v) || 'Capacity cannot have special character'
        ],
        descriptionRules: [
          v => !!v || 'Description is required',
          v => !/([!@#$%])/.test(v) || 'Description cannot have special character'
        ],
        priceRules: [
          v => !!v || 'Price is required',
          v => !/(?=.*[A-Z])/.test(v) || 'Price cannot letters',
          v => !/(?=.*[a-z])/.test(v) || 'Price cannot letters',
          v => !/([!@#$%])/.test(v) || 'Cannot have special character [!@#$%]'
        ],
        allowResourceRules: [
          v => !!v || 'Status is required',
        ],
        yN: ['Yes','No'],
        aD: ['Activated','Deactivated'],
      }
    }
  },
  methods: {
    retrieveOffices(id) {
      OfficeService.getViewProvider(id)
      .then((response) => {
        this.item = response.data;
      })
      .catch(e=> {
        console.log((e));
      })
    },

    save() {
      OfficeService.update(this.item.id, this.item)
          .then(() => {
            this.navigateToOffices();
          })
          .catch(e => {
            console.log(e);
          })
    },
    close() {
      this.navigateToOffices();
    },
    navigateToOffices() {
      this.$router.push({name: 'offices'});
    }
  },
  created() {
    this.retrieveOffices(this.$route.params.id);
  }
}
</script>

<style scoped>

</style>
