<template>
  <div class="newsstory-container">
    <Loading v-if="waitRequest"></Loading>
    <!--Story-->
    <v-container v-else class="new-container">
      <v-row class="mb-5 mt-5" justify="center">
        <v-col cols="12">
          <v-card color="white" elevation="2">
            <v-img height="300" :src="NewsImage"></v-img>
            <v-row
              justify="center"
              align="center"
              class="mb-5"
              :class="{
                'pa-10': $vuetify.breakpoint.mdAndUp,
                'pa-5': $vuetify.breakpoint.smAndDown
              }"
            >
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
          <v-btn outlined color="blue" to="/news" exact>
            {{ language.backNews }}</v-btn
          >
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
      waitRequest: true,
      story: {}
    };
  },
  components: { Footer, Loading },
  computed: {
    NewsImage() {
      return api.getImageSource(this.story.id, "news");
    },
    language() {
      return this.$store.state.language.navbar;
    }
  },
  async created() {
    this.waitRequest = true;
    // Send request
    const response = await api.getNews(0, 1, this.$route.params.story);
    if (response.status === 200) {
      this.story = response.data[0];
      this.waitRequest = false;
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
