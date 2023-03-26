<template>
  <v-container>
    <v-card-title class="justify-start">Edit Profile</v-card-title>
    <v-card class="profile_card">
      <v-form v-model="isValid">
      <p>Personal Information</p>
      <div>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
                label="Name"
                v-model="firstName"
                :rules="nameRules"
                required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
                label="Last Name"
                v-model="lastName"
                :rules="lastNameRules"
                required></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
                ref="email"
                v-model="email"
                :rules="emailRules"
                label="Email"
                required></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
                label="Password"
                v-model="password"
                :rules="passwordRules"
                error-count="6"
                required>
            </v-text-field>
          </v-col>
        </v-row>
      </div>
      <div>
        <v-row>
          <v-col cols="12" sm="3">
            <v-text-field
                label="Phone Number"
                v-model="phoneNumber"
                :rules="phoneNumberRules"
                required>
            </v-text-field>
          </v-col>
          <v-col cols="12" sm="3">
            <v-text-field
                label="Identification"
                v-model="identification"
                :rules="identificationRules"
                required>
            </v-text-field>
          </v-col>
        </v-row>
      </div>
      </v-form>
    </v-card>
    <v-card-actions>
      <v-btn @click="backClick">Back</v-btn>
      <v-col class="text-right">
        <v-btn :class="saveButton" :disabled="!isValid" @click="saveClick" bottom center class="white--text" color="#4b7bff">Save Changes
        </v-btn>
      </v-col>
    </v-card-actions>
  </v-container>
</template>

<script>

export default {
  name: "edit-account",
  props:{
    articles: Array
  },
  data(){
    return{
    email: null,
    password: null,
    identification: null,
    phoneNumber:null,
    firstName: null,
    lastName: null,
    saveButton:"saveButton",
    editProfile:true,
    isValid: true,
    nameRules:[
        v=> !!v || 'Name is required',
        v=> !/(?=.*\d)/.test(v)||'Name cannot have a number',
        v => !/([!@#$%])/.test(v) || 'Name cannot have special character'
    ],
    lastNameRules:[
        v=> !!v || 'Last Name is required',
        v=> !/(?=.*\d)/.test(v)||'Last Name cannot have a number',
        v => !/([!@#$%])/.test(v) || 'Last Name cannot have special character'
    ],
      emailRules:[
        v => !!v || 'Email is required',
        v => /.+@.+/.test(v) || 'Email must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 5) || 'Password must have at least 5 characters',
        v => /(?=.*[A-Z])/.test(v) || 'Password must have at least one uppercase character',
        v => /(?=.*[a-z])/.test(v) || 'Password must have at least one lowercase character',
        v => /(?=.*\d)/.test(v) || 'Must have one number',
        v => /([!@#$%])/.test(v) || 'Must have one special character [!@#$%]'
      ],
      phoneNumberRules: [
        v => !!v || 'Phone Number is required',
        v => !/(?=.*[A-Z])/.test(v) || 'Phone Number cannot letters',
        v => !/(?=.*[a-z])/.test(v) || 'Phone Number cannot letters',
        v => (v && v.length === 9) || 'Phone Number must have 9 numbers',
        v => !/([!@#$%])/.test(v) || 'Cannot have special character [!@#$%]'
      ],
      identificationRules: [
        v => !!v || 'Identification is required',
        v => !/([!@#$%])/.test(v) || 'Cannot have special character [!@#$%]'
      ]

    }
  },
  methods:{
      backClick(){
      this.navigateToAccount();
    },
    navigateToAccount(){
      this.$router.push({name: 'detail-account'})
    }
  }
}
</script>

<style scoped>
</style>