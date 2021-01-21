<template>
  <div class="single-course-container">
    <!--Skeleton loader Until request finishes-->
    <v-container class="mt-10 mb-10" v-if="courseData === null">
      <v-row dense>
        <v-col cols="12">
          <v-skeleton-loader type="image,card-avatar,image"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>
    <!--Video Section-->
    <v-container fluid class="video-container" v-if="courseData != null">
      <div id="video-wrapper">
        <iframe
          :src="videoURL"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          id="video-frame"
        ></iframe>
      </div>
    </v-container>

    <!--Main Section-->
    <v-container class="new-container mb-10 px-0" v-if="courseData != null">
      <!--Name and Info section-->
      <v-row justify="center" class="mt-5 mb-5">
        <v-col
          cols="auto"
          class="arrow"
          v-if="$route.params.componentNumber != 1"
        >
          <v-btn
            icon
            color="white"
            :to="calcRoute($route.params.componentNumber - 1)"
          >
            <v-icon size="40" color="grey">mdi-chevron-left</v-icon>
          </v-btn>
        </v-col>
        <v-col
          cols="10"
          class="pill-text common-background white--text text-center"
        >
          <h2 class="text-h4 font-weight-medium mb-3 mt-5">
            {{ course.name }}
          </h2>
          <p class="text-h6 font-weight-light">
            Episode {{ courseData.number }}: {{ courseData.name }}
          </p>
        </v-col>
        <v-col
          cols="auto"
          class="arrow"
          v-if="$route.params.componentNumber != this.course.components.length"
        >
          <v-btn
            color="white"
            icon
            class="rounded-lg"
            :to="calcRoute(Number($route.params.componentNumber) + 1)"
          >
            <v-icon size="40" color="grey">mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <!--Comments Section-->
        <v-col cols="9" class="pa-10">
          <v-row>
            <!--Comments Header-->
            <v-col
              cols="12"
              class="pill-text mb-5 common-background white--text"
            >
              <h2
                class=" text-h5 pt-3 pb-3 pl-3 font-weight-medium text-center"
              >
                Comments
              </h2>
            </v-col>
          </v-row>
          <!--Single comments-->
          <v-row>
            <v-col
              cols="12"
              v-for="(comment, i) in courseData.comments"
              :key="i"
              class="pill-text mt-3 mb-2 pt-5"
            >
              <v-row dense align="start">
                <v-col cols="auto">
                  <v-icon size="60" color="grey darken-2">
                    mdi-account-circle
                  </v-icon>
                </v-col>
                <v-col cols="auto" class="pl-3">
                  <h3 class="text-h6 font-weight-medium">
                    {{ comment.userName }}
                  </h3>
                  <h4 class="text-caption font-weight-light">
                    {{ comment.date }}
                  </h4>
                  <p class="text-body font-weight-light mt-5 mb-2">
                    {{ comment.data }}
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <!--Course RoadMap-->
        <v-col cols="3" class="pt-8">
          <div class="pa-3 courses-card">
            <h2
              class="text-center text-h6 font-weight-medium pill-text pt-2 pb-2 common-background white--text mb-5"
            >
              Components
            </h2>
            <v-row dense align="center" justify="center">
              <v-col
                v-for="(comp, i) in course.components"
                :key="i"
                cols="12"
                class="text-left mb-1"
              >
                <router-link
                  :to="calcRoute(i + 1)"
                  active-class="active-component-link"
                  class="text-none text-body text-left component-link"
                >
                  <div class="ml-2 mr-2 number-circle">{{ comp.number }}</div>
                  <div class="ml-2 mr-2">
                    {{ comp.name }}
                  </div>
                </router-link>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!--Footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
//import Player from "@vimeo/player";
import api from "api-client";

export default {
  components: { Footer },
  data() {
    return {
      courseData: null,
      course: null
    };
  },
  computed: {
    videoURL() {
      return "https://player.vimeo.com/video/" + this.courseData.videoID;
    }
  },
  methods: {
    calcRoute(routeNum) {
      return "/course/" + this.$route.params.courseId + "/" + routeNum;
    }
  },

  async beforeRouteUpdate(to, from, next) {
    if (to.params.componentNumber) {
      this.courseData = this.course.components[to.params.componentNumber - 1];
    }
    next();
  },
  async created() {
    const response = await api.getCourseByid(
      this.$route.params.courseId,
      this.$route.params.componentNumber
    );
    if (response.status === 200) {
      this.course = response.data;
      this.courseData = this.course.components[
        this.$route.params.componentNumber - 1
      ];
    } else {
      this.$router.push("/404");
    }
  }
};
</script>

<style scoped>
.new-container {
  background-color: #ffffff;
}
.video-container {
  background-color: #000;
}
#video-wrapper {
  position: relative;
  width: 100%;
  height: 80vh;
  background-color: #000;
}
#video-frame {
  position: absolute;
  width: 100%;
  height: 100%;
}
.pill-text {
  background-color: rgba(250, 250, 250, 1);
  border-radius: 10px;
  border: 1px solid rgba(237, 237, 237, 1);
  margin: 5px;
}
.header-text {
  color: #2196f3;
}
.common-background {
  background-color: #01579b;
}
.arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 5px;
  background-color: rgba(237, 237, 237, 1);
}
.courses-card {
  border: 1px solid rgba(237, 237, 237, 1);
  border-radius: 10px;
}
.component-link .number-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(237, 237, 237, 1);
}
.number-circle:hover {
  background-color: #01579b;
  color: white;
}
.component-link {
  text-decoration: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 3px;
  border-radius: 10px;
  color: #000;
  background-color: rgba(250, 250, 250, 1);
  border-radius: 10px;
  border: 1px solid rgba(250, 250, 250, 1);
}
.active-component-link {
  color: #000;
  background-color: rgba(237, 237, 237, 1);
  border-radius: 10px;
  border: 1px solid rgba(237, 237, 237, 1);
}
.active-component-link .number-circle {
  border: 2px solid #fff;
  background-color: #01579b;
  color: #fff;
}
.component-link:hover {
  background-color: rgba(237, 237, 237, 1);
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
