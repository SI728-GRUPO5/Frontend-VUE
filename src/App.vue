<template>
  <v-app>

    <div>
      <v-content>
        <router-view/>
      </v-content>

    </div>

    <v-app-bar app dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>OffiRent</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only" >
        <v-btn depressed class="white--text" to="/">Home</v-btn>
        <v-btn depressed class="white--text" to="/workplaces">Busqueda</v-btn>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-xs-only" v-if="currentUser">
        <v-btn depressed class="white--text" to="/reservations/">Reservas</v-btn>

        <v-btn depressed class="white--text" to="/myworkplaces/">Mis Oficinas</v-btn>

        <v-btn depressed class="white--text" to="/profile"  >{{ currentUser.username }}</v-btn>

        <v-btn depressed class="white--text" @click.prevent="logout">Sign Out</v-btn>
      </v-toolbar-items>

      <v-toolbar-items class="hidden-xs-only" v-else>
        <v-btn depressed class="white--text" to="/register">Sign Up</v-btn>

        <v-btn depressed class="white--text" to="/login">Sign in</v-btn>

      </v-toolbar-items>
    </v-app-bar>>


<!--    <v-main>-->
<!--      <v-container>-->
<!--        <router-view></router-view>-->
<!--&lt;!&ndash;        <Head></Head>&ndash;&gt;-->
<!--      </v-container>-->
<!--    </v-main>-->
    <Footer></Footer>
  </v-app>
</template>





<script>
// import Head from "./components/head";
//const Head=require("./components/head");
import Footer from "./components/structure/footer";

export default {
  name: 'App',

  components: {
    // Head,
    Footer
  },
  computed : {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data: () => ({

  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
.v-application a {
  color: #FFFF;
}
a:hover {
  color: #00F
}
</style>
