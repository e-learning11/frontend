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
            <v-col cols="8" class="white--text text-left px-10">
              <h2 class="text-h4 font-weight-medium mb-3 mt-5">
                {{ course.name }}
              </h2>
              <div class="text-h6 font-weight-thin mb-3">
                {{ course.Summary }}
              </div>
              <div class="text-body font-weight-light mb-3">
                Created by
                <span class="text-body white--text font-weight-black mb-3">{{
                  course.Instructor.name
                }}</span>
              </div>
              <div class="text-subtitle-2 font-weight-thin">
                <v-icon size="16" class="mr-2" color="white"
                  >mdi-translate</v-icon
                >
                Language :
                <span class="font-weight-medium ml-3">
                  {{ course.Language }}</span
                >
              </div>
              <div class="text-subtitle-2 font-weight-thin mb-3">
                <v-icon size="16" class="mr-2" color="white"
                  >mdi-cloud-upload-outline</v-icon
                >
                Upload Date :
                <span class="font-weight-medium ml-3"> {{ course.Date }}</span>
              </div>
            </v-col>
            <v-col cols="4" class="pa-0 text-center">
              <v-card flat height="100%" class="pa-1 rounded-lg">
                <div class="iframe-container">
                  <iframe
                    :src="videoURL"
                    width="560"
                    height="315"
                    webkitallowfullscreen
                    mozallowfullscreen
                    allowfullscreen
                  ></iframe>
                </div>
                <div class="pa-3" v-if="!course.registered">
                  <h4 class="font-weight-light mt-5 mb-3 grey--text">
                    <v-icon color="grey darken-3"
                      >mdi-information-outline</v-icon
                    >
                    You are Not Registered For This Course Yet!
                  </h4>
                  <v-btn
                    large
                    width="80%"
                    outlined
                    color="grey darken-4"
                    class="white--text text-h6 mb-5 text-none"
                    @click="registerCourse"
                  >
                    Register Now
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
                    Go to Course
                  </v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-container>

      <!--About Course-->
      <v-container class="new-container mb-10 px-3">
        <v-row justify="center" class="mt-5 mb-5">
          <v-col cols="7" class="text-left px-5">
            <h3 class="font-weight-bold text-h5 mb-3 header-text">
              Course Content
            </h3>
            <v-card>
              Hello
            </v-card>
          </v-col>
          <v-col cols="5" class="text-left px-5 ">
            <v-card outlined class="pa-5 mb-5 rounded-xl">
              <h3 class="font-weight-bold text-h5 mb-3 header-text text-center">
                Description
              </h3>
              <p class="font-weight-light text-subtitle-2 mb-0">
                {{ course.Description }}
              </p>
            </v-card>
            <v-card outlined class="pa-5 mb-5 rounded-xl">
              <h3 class="font-weight-bold text-h5 mb-3 header-text text-center">
                Instructor
              </h3>
              <v-row justify="center" align="center">
                <v-col cols="4" class="pa-5">
                  <v-img
                    width="100"
                    height="100"
                    class="rounded-circle"
                    src="..\assets\user-img.jpg"
                  ></v-img>
                </v-col>
                <v-col cols="8">
                  <div class="font-weight-bold text-subtitle-1">
                    {{ course.Instructor.name }}
                  </div>
                  <div class="font-weight-light text-subtitle-2">
                    {{ course.Instructor.about }}
                  </div>
                </v-col>
              </v-row>
            </v-card>

            <div v-if="course.prerequisites">
              <h3 class="font-weight-bold text-h5 mb-3">Prerequisites</h3>
              <p>you need to have Finished the Following Courses:</p>
              <ul>
                <li v-for="i in course.prerequisites" :key="i">
                  {{ i }}
                </li>
              </ul>
            </div>
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
//import Player from "@vimeo/player";
import api from "api-client";

export default {
  components: { Footer, Loading },
  data() {
    return {
      CourseComponent: null,
      course: null,
      validForm: false
    };
  },
  computed: {
    videoURL() {
      return "https://player.vimeo.com/video/" + this.CourseComponent.videoID;
    }
  },
  methods: {
    registerCourse() {
      // if there is no user redirect him to login
      if (this.$store.state.currentUser == null) this.$router.push("/login");
      // @TODO Send the request to register the user
      this.course.registered = true;
    }
  },
  async created() {
    // Send the request
    const response = await api.getCourseByid(this.$route.params.courseId);
    // If response is successful
    if (response.status === 200) {
      // Set the Data recieved from response
      // whole course data
      this.course = response.data;
      // First component of the course
      this.CourseComponent = this.course.components[0];
      //Check if there isnt a user logged or the user has registered this course
      if (this.$store.state.currentUser == null || !this.course.registered) {
        // Set can View to false
        this.canView = false;
      }
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
  color: #0d47a1;
  opacity: 0.9;
}
.IntroSection {
  background-color: #0d47a1;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
