<template>
  <div class="news-container">
    <Loading v-if="waitRequest"></Loading>

    <!--News Header-->
    <v-container v-else class="new-container">
      <v-row justify="center" align="center" class="mt-10">
        <v-col cols="12" class="center-horizontal"
          ><h2 class="text-h3 text-center font-weight-light">
            News
          </h2></v-col
        >
      </v-row>
      <!-- Stories -->
      <v-row class="mb-10 mt-5">
        <v-col v-for="(story, i) in stories" :key="i" cols="12">
          <router-link append :to="story.title" class="remove-underline">
            <v-card color="white" elevation="2" class="pa-10">
              <v-row justify="center" align="center" class="mb-5" no-gutters>
                <v-col cols="12" class="text-h5">
                  {{ story.title }}
                </v-col>
                <v-col cols="12" class="text-body">
                  {{ story.text }}
                </v-col>
              </v-row>
            </v-card>
          </router-link>
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
      stories: [
        {
          title: "Title 1",
          text: "text text text"
        },
        {
          title: "Title 1",
          text: "text text text"
        },
        {
          title: "Title 1",
          text: "text text text"
        }
      ]
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
.news-container {
  background-color: #f5f5f5;
}
.center-horizontal {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.remove-underline {
  text-decoration: none;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
