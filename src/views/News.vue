<template>
  <div class="news-container">
    <Loading v-if="waitRequest"></Loading>

    <!--News Header-->
    <v-container v-else class="new-container">
      <v-row justify="center" align="center" class="mt-10">
        <v-col cols="12" class="center-horizontal"
          ><h2 class="text-h3 text-center font-weight-light">
            {{ language.news }}
          </h2></v-col
        >
      </v-row>
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
            <router-link append :to="String(story.id)" class="remove-underline">
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
.new-container {
  min-height: calc(100vh - 80px);
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
