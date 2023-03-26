<template>
  <div>
    <v-app-bar color="blue">
      <v-toolbar-title>OffiRent</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="hidden-sm-and-up">
        <v-btn @click.stop="drawer=!drawer">
          Menu
        </v-btn>
      </span>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn to="/" text>
          Inicio
        </v-btn>
        <v-btn to="search" text>
          <v-icon small left>mdi-magnify</v-icon>
          Oficinas
        </v-btn>
        <v-btn to="faq" text>
          FAQ
        </v-btn>
        <v-btn to="perfil" text>
          Perfil
          <v-icon small left>mdi-Account</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary right>
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" :to="item.link" link>
          {{item.title}}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "head",
  data() {
    return {
      drawer: false,
      items: [

        {
          title: "Inicio", link:"/"
        },
        {
          title: "Oficinas", link:"search"
        },
        {
          title: "FAQ", link:"faq"
        },
        {
          title: "Perfil", link:"perfil"
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>