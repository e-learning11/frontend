<template>
  <div class="newsstory-container">
    <Loading v-if="waitRequest"></Loading>
    <!--Story-->
    <v-container v-else class="new-container">
      <v-row class="mb-10 mt-5" justify="center">
        <v-col cols="12">
          <v-card color="white" elevation="2" class="pa-10">
            <v-row justify="center" align="center" class="mb-5">
              <v-col cols="12" class="text-h3">
                {{ story.title }}
              </v-col>
              <v-col cols="12" class="text-h6">
                {{ story.text }}
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="auto">
          <v-btn outlined color="blue" to="/news" exact>Back to News</v-btn>
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
      story: {
        title: "Title 1",
        text: "text text text"
      }
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
.newsstory-container {
  background-color: #f5f5f5;
}
.center-horizontal {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.new-container {
  min-height: 80vh;
}

@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
