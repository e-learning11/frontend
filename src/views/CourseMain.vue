<template>
  <div class="single-course-container">
    <!--loader Until request finishes-->
    <Loading v-if="CourseComponent === null"></Loading>

    <!--Single Course Page After Fetching Data-->
    <template v-if="CourseComponent != null">
      <!--Name and Intro section-->
      <v-container fluid class="IntroSection pt-0 pb-0">
        <v-container class="new-container">
          <v-row justify="center" class="mt-5 mb-3">
            <v-col
              :class="{
                'col-8': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'px-10': $vuetify.breakpoint.smAndUp
              }"
              class="white--text"
            >
              <h2
                :class="{
                  'text-h4': $vuetify.breakpoint.smAndUp,
                  'mt-5': $vuetify.breakpoint.smAndUp,
                  'text-h5': $vuetify.breakpoint.xs,
                  'mt-0': $vuetify.breakpoint.xs
                }"
                class="font-weight-medium mb-3"
              >
                {{ course.name }}
              </h2>
              <div
                :class="{
                  'text-h6': $vuetify.breakpoint.smAndUp,
                  'text-subtitle-1': $vuetify.breakpoint.xs
                }"
                class="font-weight-thin mb-3"
              >
                {{ course.summary }}
              </div>
              <div class="text-body font-weight-light mb-3">
                {{ language.createdBy }}
                <span class="text-body white--text font-weight-black mb-3"
                  >{{ course.instructor.firstName }}
                  {{ course.instructor.lastName }}</span
                >
              </div>
              <div class="text-subtitle-2 font-weight-thin">
                <v-icon size="16" class="mr-2" color="white"
                  >mdi-translate</v-icon
                >
                {{ language.language }}
                <span class="font-weight-medium ml-3">
                  {{ course.language }}</span
                >
              </div>
              <div class="text-subtitle-2 font-weight-thin mb-3">
                <v-icon size="16" class="mr-2" color="white"
                  >mdi-cloud-upload-outline</v-icon
                >
                {{ language.uploadDate }}
                <span class="font-weight-medium ml-3">
                  {{ course.date.slice(0, course.date.indexOf("T")) }}</span
                >
              </div>
            </v-col>
            <v-col
              :class="{
                'col-4': $vuetify.breakpoint.mdAndUp,
                'col-8': $vuetify.breakpoint.sm,
                'col-12': $vuetify.breakpoint.xs
              }"
              class="pa-0 text-center"
            >
              <v-card
                v-if="
                  $store.state.currentUser === null ||
                    $store.state.currentUser.type != 'teacher' ||
                    CourseComponent.videoID
                "
                elevation="10"
                class="pa-1 rounded-lg center-vertical"
              >
                <v-row align="center" justify="center" no-gutters>
                  <v-col cols="12">
                    <div
                      class="iframe-container"
                      v-if="CourseComponent.videoID"
                    >
                      <iframe
                        :src="videoURL"
                        width="560"
                        height="315"
                        webkitallowfullscreen
                        mozallowfullscreen
                        allowfullscreen
                      ></iframe>
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    v-if="
                      $store.state.currentUser === null ||
                        $store.state.currentUser.type != 'teacher'
                    "
                  >
                    <div
                      class="pa-3"
                      v-if="!registered || $store.state.currentUser === null"
                    >
                      <h4 class="font-weight-light mt-5 mb-3 grey--text">
                        <v-icon color="grey darken-3"
                          >mdi-information-outline</v-icon
                        >
                        {{ language.notRegistered }}
                      </h4>
                      <v-btn
                        large
                        width="80%"
                        outlined
                        color="grey darken-4"
                        class="white--text text-h6 mb-5 text-none"
                        @click="registerCourse"
                      >
                        {{ language.registerNow }}
                      </v-btn>
                    </div>
                    <div class="pa-3 mt-3 mb-3" v-else>
                      <v-btn
                        large
                        width="80%"
                        outlined
                        color="grey darken-4"
                        class="white--text text-h6 text-none"
                        append
                        to="1"
                      >
                        {{ language.goToCourse }}
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <v-row v-if="OwnsCourse"
        ><v-col cols="12" class="text-center mt-10 mb-0">
          <v-btn
            x-large
            outlined
            class="text-h6"
            color="blue darken-3"
            append
            to="overview"
          >
            {{ language.courseOverview }}
          </v-btn>
        </v-col>
      </v-row>

      <!--About Course-->
      <v-container
        class="new-container px-3"
        :class="{
          'mb-10': $vuetify.breakpoint.smAndUp,
          'mb-0': $vuetify.breakpoint.xs
        }"
      >
        <v-row justify="center" class="mt-5 mb-5">
          <v-col
            :class="{
              'col-7': $vuetify.breakpoint.mdAndUp,
              'col-12': $vuetify.breakpoint.smAndDown
            }"
            class="px-5"
          >
            <h3 class="font-weight-medium text-h4 mb-5 header-text text-center">
              {{ language.courseContent }}
            </h3>
            <CourseComponents
              :sections="course.CourseSections"
              PageType="Main"
            ></CourseComponents>
          </v-col>
          <v-col
            :class="{
              'col-5': $vuetify.breakpoint.mdAndUp,
              'col-12': $vuetify.breakpoint.smAndDown
            }"
            class="px-5 "
          >
            <v-card outlined class="pa-5 mb-5 rounded-xl">
              <h3 class="font-weight-bold text-h5 mb-3 header-text text-center">
                {{ language.description }}
              </h3>
              <p class="font-weight-light text-subtitle-2 mb-0">
                {{ course.description }}
              </p>
            </v-card>
            <v-card outlined class="pa-5 mb-5 rounded-xl">
              <h3 class="font-weight-bold text-h5 mb-3 header-text text-center">
                {{ language.instructor }}
              </h3>
              <v-row justify="center" align="center">
                <v-col cols="auto" class="pa-5">
                  <v-img
                    width="100"
                    height="100"
                    class="rounded-circle"
                    :src="instructorImage"
                  ></v-img>
                </v-col>
                <v-col
                  :class="{
                    'col-8': $vuetify.breakpoint.mdAndUp,
                    'col-11': $vuetify.breakpoint.smAndDown
                  }"
                  v-if="course.instructor"
                >
                  <div
                    class="font-weight-bold text-subtitle-1 mx-auto text-center"
                  >
                    {{ course.instructor.firstName }}
                    {{ course.instructor.lastName }}
                  </div>
                  <div class="font-weight-light text-subtitle-2">
                    {{ course.instructor.about }}
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <v-card
              outlined
              class="pa-5 mb-5 rounded-xl"
              v-if="course.prequisites && course.prequisites.length"
            >
              <h3 class="font-weight-bold text-h5 mb-3 header-text text-center">
                {{ language.prequisites }}
              </h3>
              <p class="font-weight-light text-subtitle-1 mb-3">
                {{ language.finishedCourses }}
              </p>
              <ul class="font-weight-bold pa-5">
                <li
                  v-for="(obj, i) in course.prequisites"
                  :key="i"
                  class="mb-3"
                >
                  {{ obj.name }}
                </li>
              </ul>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!--Footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
import Loading from "@/components/Loading.vue";
import CourseComponents from "@/components/CourseComponents.vue";
//import Player from "@vimeo/player";
import api from "api-client";

export default {
  components: { Footer, Loading, CourseComponents },
  data() {
    return {
      CourseComponent: null,
      course: null,
      OwnsCourse: false,
      registered: false
    };
  },
  computed: {
    videoURL() {
      return this.CourseComponent.videoID;
    },
    instructorImage() {
      return api.getImageSource(this.course.instructor.id, "user");
    },
    language() {
      return this.$store.state.language.courseMain;
    }
  },
  methods: {
    async registerCourse() {
      // if there is no user redirect him to login
      if (this.$store.state.currentUser == null) {
        this.$router.push("/login");
        return;
      }
      // Send the request to register the user
      const response = await api.enrollUserCourse(
        this.$route.params.courseId,
        JSON.parse(localStorage.getItem("userToken"))
      );
      if (response.status === 200) {
        // Display a Success Notification
        this.$store.state.newNotification.Message = this.language.successMessage;
        this.$store.state.newNotification.state = true;
        this.registered = true;
      } else {
        // Display a Success Notification
        this.$store.state.newNotification.Message = response.data;
        this.$store.state.newNotification.state = true;
        this.registered = false;
      }
    }
  },
  async created() {
    // Send the request
    const response = await api.getCourseByid(this.$route.params.courseId);
    // If response is successful
    if (response.status === 200) {
      // Send the Request to know if the User is Registered
      if (
        this.$store.state.currentUser !== null &&
        this.$store.state.currentUser.type != "teacher"
      ) {
        const stateResponse = await api.getCourseUserState(
          this.$route.params.courseId,
          JSON.parse(localStorage.getItem("userToken"))
        );
        if (stateResponse.status === 200) {
          this.registered = true;
        } else {
          this.registered = false;
        }
      }

      // Set the Data recieved from response
      // whole course data
      this.course = response.data;
      // First component of the course
      this.CourseComponent = this.course.CourseSections[0].CourseSectionComponents[0];
      // check if user is the Teacher that owns the course
      if (
        this.course.instructor.id === this.$store.state.currentUser.id &&
        this.$store.state.currentUser.type === "teacher"
      )
        this.OwnsCourse = true;
      else this.OwnsCourse = false;
    }
    // Else route to Not found
    else {
      this.$router.push("/404");
    }
  }
};
</script>

<style scoped>
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%; /* 16:9*/
  position: relative;
}

.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.border-small {
  border: 1px solid #000;
}
.header-text {
  color: #000;
  opacity: 0.8;
}
.IntroSection {
  background-color: #0d47a1;
  opacity: 0.95;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
