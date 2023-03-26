<template>
  <div class="home">
    <ViewUser></ViewUser>
    <Nuevos></Nuevos>

<!--    <img alt="Vue logo" src="../assets/offirent.png">-->

  </div>
</template>

<script>

import ViewUser from "../components/home/view-user";
import Nuevos from "../components/home/new";

export default {
  name: 'Home',
  components: {
    ViewUser,
    Nuevos,
  }
}

</script>
