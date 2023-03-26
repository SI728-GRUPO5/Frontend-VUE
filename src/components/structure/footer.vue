<template>
  <v-footer
      dark
      padless
  >
    <v-card
        class="flex"
        flat
        tile
    >
      <v-card-title class="grey--text" >
        <v-list class="grey--text ">
          <v-list-item  v-for="item in items" :key="item.title" :to="item.link" link>
            {{item.title}}
          </v-list-item>
        </v-list>

        <v-spacer></v-spacer>

        <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4"
            dark
            icon
        >
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
name: "footer",
  data() {
    return {
      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],
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
          title: "Profile", link:"profile"
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>
