<template>
  <div>
    <!-- Hero Container -->
    <v-container fluid class="hero-container white--text">
      <v-container class="new-container">
        <v-row dense align="center">
          <v-col cols="12" class="text-center">
            <h1
              class="font-weight-bold mb-5"
              :class="{
                'text-h4': $vuetify.breakpoint.xs,
                'text-h3': $vuetify.breakpoint.sm,
                'text-h1': $vuetify.breakpoint.mdAndUp
              }"
            >
              {{ language.news }}
            </h1>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <div class="news-container">
      <Loading v-if="waitRequest"></Loading>

      <!--News Header-->
      <v-container v-else class="new-container">
        <!-- Stories -->
        <v-row
          v-if="stories.length === 0"
          class="mb-10 mt-5"
          justify="center"
          align="center"
        >
          <v-col cols="auto">
            <h2 class="text-overline">
              {{ language.noNews }}
            </h2>
          </v-col>
        </v-row>
        <v-row class="mb-10 mt-5" v-else id="infinite-list">
          <v-col
            v-for="(story, i) in stories"
            :key="i"
            :class="{
              'col-6': $vuetify.breakpoint.mdAndUp,
              'col-12': $vuetify.breakpoint.smAndDown
            }"
          >
            <v-card color="white" elevation="2" class="pa-0">
              <router-link
                append
                :to="String(story.id)"
                class="remove-underline"
              >
                <v-img :src="ImageSrc(story.id)" height="300"></v-img>
                <v-row
                  justify="center"
                  align="center"
                  class="mb-5 px-10 pt-5 pb-5"
                  no-gutters
                >
                  <v-col cols="12" class="text-h5">
                    {{ story.title }}
                  </v-col>
                </v-row>
              </router-link>
              <v-row justify="center">
                <v-col
                  cols="auto"
                  v-if="
                    $store.state.currentUser &&
                      $store.state.currentUser.type === 'admin'
                  "
                >
                  <v-btn x-small color="error" @click="deleteNews(story.id)">
                    {{ language.delete }}
                  </v-btn></v-col
                >
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

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
      stories: [],
      getNewNews: false
    };
  },
  components: { Footer, Loading },
  computed: {
    language() {
      return this.$store.state.language.navbar;
    }
  },
  methods: {
    ImageSrc(id) {
      return api.getImageSource(id, "news");
    },
    async getNews(offset) {
      if (offset != null) this.stories = [];
      const response = await api.getNews(this.stories.length, 20);
      if (response.status === 200) {
        this.stories = response.data;
        if (response.data.length !== 0) this.getNewNews = false;
      }
    },
    async loadMore() {
      if (this.getNewNews === true || this.stories.length % 20 != 0) return;
      const listElm = document.querySelector("#infinite-list");
      if (listElm == null) return;
      let rect = listElm.getBoundingClientRect();
      let elemBottom = rect.bottom;
      if (elemBottom <= window.innerHeight) {
        this.getNewNews = true;
        await this.getNews();
      }
    },
    async deleteNews(id) {
      //Delete the News
      const response = await api.deleteNews(
        JSON.parse(localStorage.getItem("userToken")),
        id
      );
      if (response.status === 200) {
        this.waitRequest = true;
        await this.getNews(0);
        this.waitRequest = false;
      }
    }
  },
  async created() {
    // Get the News
    await this.getNews();
    this.waitRequest = false;
    document.addEventListener("scroll", this.loadMore, true);
  }
};
</script>

<style scoped>
.hero-container {
  background: url(../assets/news-image.png) center center/cover no-repeat;
  width: 100%;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  object-fit: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
}

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
  color: black;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
