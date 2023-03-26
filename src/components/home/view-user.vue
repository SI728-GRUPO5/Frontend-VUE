<template>
  <v-carousel :show-arrows="false" cycle :interval="intervalo">
    <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
    >
      <v-row
          class="fill-height"
          align="center"
          justify="center"
      >
        <h2 >
          OffiRent
        </h2>
      </v-row>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
name: "view-user",
  data () {
    return {
      intervalo: 3000,
      items: [
        {
          src: 'https://estaticos.elperiodico.com/resources/jpg/3/6/1548354212463.jpg',
        },
        {
          src: 'https://assets.entrepreneur.com/content/3x2/2000/20190304001639-oficinas.jpeg',
        },
        {
          src: 'https://contractworkplaces.com/web/wp-content/uploads/2018/10/Oficinas-Mercado-Libre-LlanoFotografia-7474.jpg',
        },
        {
          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        },
      ],
    }
  },
}
</script>

<style scoped>

</style>