<template>
  <div class="admin-container">
    <Loading v-if="waitRequest"></Loading>
    <v-container v-else class="new-container">
      <v-row justify="center" align="center" class="mt-10">
        <v-col cols="12" class="center-horizontal"
          ><h2 class="text-h4 text-center font-weight-light">
            Admin Requests
          </h2></v-col
        >
      </v-row>
      <v-row class="mb-10 mt-5" justify="center">
        <v-col cols="12">
          <v-card color="white" elevation="2" class="pa-10">
            <v-row
              justify="center"
              align="center"
              class="mb-5"
              v-for="(entry, i) in Entries"
              :key="i"
            >
              <v-col cols="12" class="text-h6 text-center">
                Entry
              </v-col>
              <v-col cols="12"><v-divider></v-divider></v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!--footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
import Loading from "@/components/Loading.vue";
import api from "api-client";

export default {
  data() {
    return {
      waitRequest: false,
      Entries: [{}, {}]
    };
  },
  components: { Footer, Loading },
  computed: {
    UserImage() {
      return api.getImageSource(this.$store.state.currentUser.id, "user");
    },
    language() {
      return this.$store.state.language.profile;
    }
  }
};
</script>

<style scoped>
.admin-container {
  background-color: #f5f5f5;
}
.center-horizontal {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
