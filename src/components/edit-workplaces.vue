<template>
  <v-container>
    <v-card-title class="justify-start">Edit Workplace</v-card-title>
    <v-card class="workplace_card">
      <v-form v-model="isValid">
      <p>Workplace Information</p>
      <div>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
                label="Address"
                v-model="address1"
                :rules="addressRules"
                required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
                label="Floor"
                v-model="floor"
                :rules="floorRules"
                required></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
                v-model="capacity"
                :rules="capacityRules"
                label="Capacity"
                required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
                label="Description"
                v-model="description"
                :rules="descriptionRules"
                required>
            </v-text-field>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col cols="12" sm="3">
            <v-autocomplete
                label="Allow Resource"
                v-model="allowResource"
                :items="yN"
                :rules="allowResourceRules"
                required>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
                label="Price"
                v-model="price"
                :rules="priceRules"
                required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-autocomplete
                label="Status"
                v-model="status1"
                :items="aD"
                :rules="statusRules"
                required>
            </v-autocomplete>
          </v-col>
        </v-row>
      </div>
      </v-form>
    </v-card>
    <v-card-actions>
      <v-btn @click="backClick">Back</v-btn>
      <v-col class="text-right">
        <v-btn :class="saveButton" @click="saveClick" bottom center class="white--text" color="#4b7bff" :disabled="!isValid">Save Changes
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-container>
</template>

<script>

export default {
  name: "edit-workplace",
  props:{
    articles: Array
  },
  data(){
    return{
      address1: null,
      floor: null,
      capacity: null,
      description:null,
      price: null,
      status1: true,
      allowResource: true,
      saveButton:"saveButton",
      showWorkplace:true,
      isValid: true,
      addressRules:[
        v=> !!v || 'Address is required'
      ],
      floorRules:[
        v=> !!v || 'Floor is required',
        v => !/([!@#$%])/.test(v) || 'Floor cannot have special character'
      ],
      capacityRules:[
        v => !!v || 'Capacity is required',
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
      statusRules: [
        v => !!v || 'Status is required',
      ],
      allowResourceRules: [
        v => !!v || 'Status is required',
      ],
      yN: ['Yes','No'],
      aD: ['Activated','Deactivated'],

    }
  },
  methods:{
    backClick(){
      this.navigateToWorkplace();
    },
    navigateToWorkplace(){
      this.$router.push({name: 'offices'})
    }
  }
}
</script>

<style scoped>
</style>
