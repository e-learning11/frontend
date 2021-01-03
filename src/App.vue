<template>
  <v-app>
    <NavBar></NavBar>

    <v-main app>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",

  components: { NavBar },

  data: () => ({
    //
  })
};
</script>

<style scoped></style>
