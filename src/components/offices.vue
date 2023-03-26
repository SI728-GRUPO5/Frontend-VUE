<template>
  <v-card>
    <v-card-title>
      Mis Oficinas
      <v-spacer></v-spacer>
      <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Buscar"
          single-line
          hide-details
      ></v-text-field>
    </v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="displayOffices" :items-per-page="5" :search="search"
                    class="elevation-1"  ref="tutorialsTable">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="viewDetail(item.id)">mdi-magnify</v-icon>
          <v-icon small class="mr-2" @click="navigateToEditOffice(item.id)">mdi-pen</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.id" label="Id"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.title" label="Precio"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.address" label="Dirección"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.floor" label="Piso"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.capacity" label="Capacidad"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field v-model="editedItem.price" label="Precio"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-checkbox v-model="editedItem.allow_resources" label="Permite Recursos"></v-checkbox>
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
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline">Eliminar Item</v-card-title>
              <v-card-text>
                <p>Are you sure you want to delete the item <b>{{ editedItem.title }}</b></p>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </v-card-text>
    <v-card-actions>
      <v-btn small color="primary" @click="navigateToAddOffices">Crear Oficina</v-btn>
      <v-btn small color="error" @click="removeAllOffices">Remover Todo</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

import OfficeService from '../services/offices-service'

export default {
  name: "offices",
  data() {
    return {
      search: '',
      dialog: false,
      dialogDelete: false,
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Nombre', value: 'name'},
        {text: 'Dirección', value: 'address'},
        {text: 'Piso', value: 'floor'},
        {text: 'Capacidad', value: 'capacity'},
        {text: 'Precio', value: 'price'},
        {text: 'Permite Recursos', value: 'allowResource', sortable: false},
        {text: 'Acciones', value: 'actions', sortable: false}
      ],
      offices: [],
      displayOffices: [],
      editedIndex: -1,
      editedItem: {
        title: '',
        id: 0,
        address: '',
        floor: 0,
        capacity: 0,
        price: 0,
        description: '',
        allow_resources: false
      },
      defaultItem: {
        title: '',
        id: 0,
        address: '',
        floor: 0,
        capacity: 0,
        price: 0,
        description: '',
        allow_resources: false
      },

    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Crear Oficina' : 'Editar Oficina'
    },

    currentUser() {
      console.log(this.$store.state.auth.user);
      return this.$store.state.auth.user;
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

    retrieveMyOffices(){
      OfficeService.getOfficesByOffiProviderEmail(this.currentUser.username)
          .then(response => {
            this.offices = response.data;
            console.log(response.data)
            this.displayOffices = response.data.map(this.getDisplayOffice);
          })
          .catch((e) => {
            console.log(e);
          });
    },

    getDisplayOffice(office) {
      return {
        id: office.id,
        address: office.address,
        name: office.name,
        capacity: office.capacity,
        floor: office.floor,
        price: office.price,
        description: office.description,
        allowResources: office.allowResource ? "Permite" : "No permite",
      };
    },

    refreshList() {
      this.retrieveOffices();
    },

    removeAllOffices() {
      OfficeService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            alert("The Backend does not support this operation.");
            console.log(e);
          });
    },

    viewDetail(id) {
      this.$router.push({name: 'detail-office', params: { officeId: id }});
    },

    deleteItem(item) {
      this.editedIndex = this.displayOffices.indexOf(item);
      this.editedItem = Object.assign({}, this.offices[this.editedIndex]);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.deleteOffice(this.editedItem.id);
      this.offices.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        this.offices[this.editedIndex] = this.editedItem;
        this.displayOffices[this.editedIndex] = this.getDisplayOffice(this.offices[this.editedIndex]);
        OfficeService.update(this.editedItem.id, this.editedItem)
            .then(() => {
              this.refreshList();
            })
            .catch(e => {
              console.log(e);
            });

      } else {
        OfficeService.create(this.editedItem)
            .then(response => {
              let item = response.data;
              this.offices.push(item);
              this.displayOffices.push(this.getDisplayOffice(item));
            })
            .catch(e => {
              console.log(e);
            })
      }
      this.close()
    },

    deleteOffice(id) {
      OfficeService.delete(id)
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },

    navigateToAddOffices() {
      this.$router.push({name: 'add-office'});
    },
    navigateToEditOffice(id) {
      this.$router.push({name: 'edit-workplaces', params: { id: id}});
    }
  },

  mounted() {
      this.retrieveMyOffices();

  }

}
</script>

<style scoped>

</style>
