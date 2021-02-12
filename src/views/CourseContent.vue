<template>
  <div class="single-course-container">
    <!--Skeleton loader Until request finishes-->
    <Loading v-if="CourseComponent === null"></Loading>

    <!--Single Course Page After Fetching Data-->
    <template v-if="CourseComponent != null">
      <v-navigation-drawer
        class="component-nav pa-0"
        app
        clipped
        right
        color="#fbfbf8"
        width="25%"
        v-if="$vuetify.breakpoint.mdAndUp"
      >
        <v-card
          flat
          outlined
          tile
          class="font-weight-medium text-h6 pa-3 text-center"
        >
          <v-icon size="25" color="grey darken-3" class="mr-3">mdi-book</v-icon>
          Course Content
        </v-card>
        <CourseComponents
          :sections="course.CourseSections"
          PageType="Content"
          :CourseNumber="Number($route.params.courseId)"
          :currentComponent="currentComponent"
        ></CourseComponents>
      </v-navigation-drawer>

      <!--Main Content Container-->
      <v-row no-gutters>
        <v-col cols="12">
          <v-container
            class="test-section new-container mt-10 mb-10"
            v-if="CourseComponent.type === 'Test'"
          >
            <!--Test Form section-->
            <v-card
              color="white"
              shaped
              elevation="2"
              :class="{
                'pa-10': $vuetify.breakpoint.smAndUp,
                'pa-4': $vuetify.breakpoint.xs
              }"
              max-width="900"
            >
              <v-row justify="center" align="center" class="mb-2">
                <v-col cols="12">
                  <h2 class="text-h3 font-weight-light">
                    Test your Understanding
                  </h2></v-col
                >
              </v-row>
              <v-divider class="mb-8"></v-divider>
              <!--Indivdual Questions-->
              <v-form
                v-model="validForm"
                ref="testForm"
                v-if="TestData.takeTest"
              >
                <v-row
                  :class="{
                    'px-16': $vuetify.breakpoint.smAndUp,
                    'px-4': $vuetify.breakpoint.xs
                  }"
                >
                  <v-col
                    cols="12"
                    v-for="(Question, i) in CourseComponent.Questions"
                    :key="i"
                  >
                    <h3 class="text-h5 font-weight-medium mb-3">
                      Question {{ i + 1 }}: {{ Question.Q }}
                    </h3>
                    <!--True or False and MCQ-->
                    <div class="ml-10" v-if="Question.type != 'Essay'">
                      <v-radio-group
                        required
                        :rules="[v => !!v || 'Question not Answered']"
                        v-model="TestData.finalAnswers[i]"
                      >
                        <v-radio
                          v-for="(Answer, j) in Question.Answers"
                          :key="j"
                          :label="Answer.A"
                          :value="Answer.A"
                        ></v-radio>
                      </v-radio-group>
                    </div>
                    <!--Essay Questions-->
                    <v-textarea
                      v-else
                      class="ml-10"
                      required
                      filled
                      full-width
                      auto-grow
                      :rules="[v => !!v || 'Question not Answered']"
                      v-model="TestData.finalAnswers[i]"
                    >
                    </v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="auto">
                    <v-btn
                      x-large
                      outlined
                      color="blue darken-2"
                      class="text-h5 white--text mt-5 text-none"
                      @click="validateTest"
                      :disabled="!validForm"
                    >
                      Submit
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

              <!--Score Screen-->
              <v-row justify="center" v-if="!TestData.takeTest">
                <v-col cols="12">
                  <h3 class="text-center text-h5">Your Current Score is</h3>
                  <h4 class="text-center text-h6">
                    {{ TestData.currentScore }}
                  </h4>
                </v-col>
                <v-col cols="auto">
                  <v-btn
                    x-large
                    outlined
                    color="blue darken-2"
                    class="text-h5 white--text mt-5 text-none"
                    @click="TestData.takeTest = true"
                  >
                    Retake
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-container>

          <!--Assignmet Section-->
          <v-container
            class="test-section new-container mt-10 mb-10"
            v-if="CourseComponent.type === 'Assignment'"
          >
            <v-card
              color="white"
              shaped
              elevation="2"
              :class="{
                'pa-10': $vuetify.breakpoint.smAndUp,
                'pa-1': $vuetify.breakpoint.xs
              }"
              max-width="900"
            >
              <v-row justify="center">
                <v-col cols="12">
                  <h3 class="text-center text-h4">
                    {{ CourseComponent.name }}
                  </h3>
                </v-col>
                <v-col cols="12" class="text-center">
                  <v-btn
                    large
                    outlined
                    color="blue darken-2"
                    class="text-h6 white--text mt-5 text-none"
                    @click="DownloadFile"
                  >
                    Download Assignment
                  </v-btn>

                  <v-divider class="mt-5"></v-divider>
                </v-col>
                <v-col cols="10" class="mt-10 text-center">
                  <v-form ref="AssignmentForm" v-model="validAssignment">
                    <v-file-input
                      label="Upload your work"
                      dense
                      v-model="AssignmentFile"
                      :rules="[v => !!v || 'No Work Submitted']"
                    ></v-file-input>
                  </v-form>

                  <v-btn
                    large
                    outlined
                    color="blue darken-2"
                    class="text-h6 white--text mt-5 text-none"
                    :disabled="!validAssignment"
                    @click="SubmitAssignmet"
                  >
                    Submit
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-container>

          <!--Video Section-->
          <v-container
            fluid
            class="video-container pt-0 pb-0"
            :class="{
              'px-12': $vuetify.breakpoint.mdAndUp,
              'px-0': $vuetify.breakpoint.smAndDown
            }"
            v-if="CourseComponent.type === 'Video'"
          >
            <div class="iframe-container">
              <iframe
                :src="videoURL"
                frameborder="0"
                webkitallowfullscreen
                mozallowfullscreen
                allowfullscreen
              ></iframe>
            </div>
          </v-container>
        </v-col>
      </v-row>
      <!--Next and Previous button-->
      <v-row
        justify="center"
        align="center"
        no-gutters
        class="common-background"
      >
        <v-col
          class="arrow"
          :class="{
            'col-4': $vuetify.breakpoint.smAndUp,
            'col-12': $vuetify.breakpoint.xs
          }"
        >
          <v-btn
            x-large
            tile
            text
            color="grey darken-2"
            class="text-none"
            :disabled="Number($route.params.componentNumber) === 1"
            :to="calcRoute(Number($route.params.componentNumber) - 1)"
          >
            <v-icon size="30" color="grey darken-2">mdi-chevron-left</v-icon>
            Previous
          </v-btn>
        </v-col>
        <v-col
          class="arrow"
          :class="{
            'col-auto': $vuetify.breakpoint.smAndUp,
            'col-12': $vuetify.breakpoint.xs
          }"
        >
          <v-btn
            color="grey darken-2"
            tile
            text
            x-large
            class="text-body-1 white--text text-none"
            v-if="Number($route.params.componentNumber) === currentComponent"
            @click="MarkAsRead"
          >
            Mark As Done
            <v-icon class="ml-2">mdi-sticker-check-outline</v-icon>
          </v-btn>
          <v-btn
            v-else
            tile
            text
            x-large
            color="grey darken-2"
            class="text-body-1 white--text text-none text-center"
            disabled
          >
            Done
            <v-icon class="ml-2">mdi-sticker-check-outline</v-icon>
          </v-btn>
        </v-col>
        <v-col
          :class="{
            'col-4': $vuetify.breakpoint.smAndUp,
            'col-12': $vuetify.breakpoint.xs
          }"
          class="arrow"
        >
          <v-btn
            x-large
            tile
            color="grey darken-2"
            text
            class="text-none"
            :disabled="
              Number($route.params.componentNumber) === currentComponent ||
                Number($route.params.componentNumber) ===
                  course.CourseSections[course.CourseSections.length - 1]
                    .CourseSectionComponents[
                    course.CourseSections[course.CourseSections.length - 1]
                      .CourseSectionComponents.length - 1
                  ].number
            "
            :to="calcRoute(Number($route.params.componentNumber) + 1)"
          >
            Next
            <v-icon size="30" color="grey darken-2">mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <!--Toolbar to change sections-->
      <v-card outlined flat class="pa-0">
        <v-btn
          v-for="(Tab, i) in Tabs"
          :key="i"
          height="60px"
          tile
          text
          class="text-none px-10 text-body-1 font-weight-black"
          :class="{ 'btn-active': Tab === currentTab }"
          @click="currentTab = Tab"
        >
          {{ Tab }}
        </v-btn>
        <v-btn
          height="60px"
          tile
          text
          class="text-none px-10 text-body-1 font-weight-black"
          :class="{ 'btn-active': 'Sections' === currentTab }"
          @click="currentTab = 'Sections'"
          v-if="$vuetify.breakpoint.smAndDown"
        >
          Sections
        </v-btn>
        <v-btn
          height="60px"
          tile
          text
          class="text-none px-10 text-body-1 font-weight-black"
          to="forum"
        >
          Forum
        </v-btn>
      </v-card>

      <!--Information Section-->
      <v-container class="new-container mb-10 mt-5 px-5">
        <v-row justify="center">
          <v-col cols="10">
            <!--About Section-->
            <template v-if="currentTab === 'About'">
              <v-row justify="center" class="mb-3 mt-2">
                <v-col cols="12" class="text-center pa-0">
                  <h2
                    :class="{
                      'text-h5': $vuetify.breakpoint.smAndUp,
                      'text-h6': $vuetify.breakpoint.xs
                    }"
                    class="font-weight-medium"
                  >
                    {{ course.name }}
                  </h2>
                </v-col>
                <v-col cols="12" class="text-center">
                  <h2
                    :class="{
                      'text-h6': $vuetify.breakpoint.smAndUp,
                      'text-h6': $vuetify.breakpoint.xs
                    }"
                    class="font-weight-light mb-3"
                  >
                    <span class="font-weight-medium"
                      >Episode {{ CourseComponent.number }}:</span
                    >
                    {{ CourseComponent.name }}
                  </h2>
                </v-col>
                <v-col
                  :class="{
                    'col-8': $vuetify.breakpoint.smAndUp,
                    'col-12': $vuetify.breakpoint.xs
                  }"
                  class="text-center"
                >
                  <div
                    :class="{
                      'text-h6': $vuetify.breakpoint.smAndUp,
                      'text-subtitle-1': $vuetify.breakpoint.xs
                    }"
                    class="font-weight-thin mb-3"
                  >
                    {{ course.summary }}
                  </div>
                </v-col>
                <v-row justify="center" align="center">
                  <v-col cols="auto" class="text-left">
                    <div class="text-subtitle-2 font-weight-thin">
                      <v-icon size="16" class="mr-2" color="black"
                        >mdi-translate</v-icon
                      >
                      Language :
                      <span class="font-weight-medium ml-3">
                        {{ course.language }}</span
                      >
                    </div>
                  </v-col>
                  <v-col cols="auto" class="text-left">
                    <div class="text-subtitle-2 font-weight-thin">
                      <v-icon size="16" class="mr-2" color="black"
                        >mdi-cloud-upload-outline</v-icon
                      >
                      Upload Date :
                      <span class="font-weight-medium ml-3">
                        {{
                          course.date.slice(0, course.date.indexOf("T"))
                        }}</span
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-row>
            </template>
            <!--Teacher Section-->
            <template v-if="currentTab === 'Teacher'">
              <v-row justify="center" align="center" v-if="course.instructor">
                <v-col cols="auto" class="pa-5 text-center">
                  <v-img
                    width="100"
                    height="100"
                    class="rounded-circle"
                    src="..\assets\user-img.jpg"
                  ></v-img>
                </v-col>
                <v-col cols="12">
                  <h3 class="font-weight-bold text-h5 mb-3 text-center">
                    {{ course.instructor.firstName }}
                    {{ course.instructor.lastName }}
                  </h3>
                </v-col>

                <v-col cols="12">
                  <div class="font-weight-light text-body-1 text-center">
                    {{ course.instructor.about }}
                  </div>
                </v-col>
              </v-row>
            </template>
            <!--Nav Section-->
            <CourseComponents
              v-if="$vuetify.breakpoint.smAndDown && currentTab === 'Sections'"
              :sections="course.CourseSections"
              PageType="Content"
              :CourseNumber="Number($route.params.courseId)"
              :currentComponent="currentComponent"
            ></CourseComponents>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!--Footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import commonFunctions from "@/plugins/commonFunction.js";
import Footer from "@/components/footer.vue";
import api from "api-client";
import Loading from "../components/Loading.vue";
import CourseComponents from "../components/CourseComponents.vue";

export default {
  components: { Footer, Loading, CourseComponents },
  data() {
    return {
      CourseComponent: null,
      course: null,
      currentComponent: 1,
      canView: true,
      validForm: false,
      newCommentText: "",
      TestData: {
        finalAnswers: [],
        takeTest: true,
        currentScore: 0
      },
      AssignmentFile: null,
      validAssignment: false,
      currentTab: "About",
      Tabs: ["About", "Teacher"]
    };
  },
  computed: {
    videoURL() {
      return this.CourseComponent.videoID;
    }
  },
  methods: {
    calcRoute(routeNum) {
      return "/course/" + this.$route.params.courseId + "/" + routeNum;
    },
    async validateTest() {
      // Validate the form
      if (!this.$refs.testForm.validate()) return;

      //Send the answers to server and get the Score
      let response = await api.getTestScore(this.TestData.finalAnswers);

      //Check the response
      if (response.status === 200) {
        this.TestData.currentScore = response.data;
        this.TestData.takeTest = false;
        this.TestData.finalAnswers = [];

        // Return ot top
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    },
    SubmitAssignmet() {
      // Validate the form
      if (!this.$refs.AssignmentForm.validate()) return;

      //@TODO Send the request of Assignment
      //@TODO check How the Assignment Would be graded
    },
    DownloadFile() {
      //@TODO Check how the file will come from request and Download
    },
    MarkAsRead() {
      //@TODO Should send a request
      this.currentComponent++;
    }
  },

  async beforeRouteUpdate(to, from, next) {
    // If routing to the same component change current component number
    if (to.params.componentNumber) {
      this.CourseComponent = commonFunctions.FindComponent(
        to.params.componentNumber,
        this.course
      );
    }
    // @TODO Take values from request
    // Reset test Values and Assignment Files
    this.TestData = {
      finalAnswers: [],
      takeTest: true,
      currentScore: 0
    };
    this.AssignmentFile = null;
    // call next
    next();
  },
  async created() {
    //Check if there isnt a user logged or the user has registered this course
    if (this.$store.state.currentUser == null) {
      this.$router.push(`/course/${this.$route.params.courseId}`);
      return;
    }

    //Check if there the user has registered this course
    let userStaterResponse = await api.getCourseUserState(
      this.$route.params.courseId,
      JSON.parse(localStorage.getItem("userToken"))
    );

    if (userStaterResponse.status !== 200) {
      this.$router.push(`/course/${this.$route.params.courseId}`);
      return;
    }

    // Send the request to get the Course
    const response = await api.getCourseByid(this.$route.params.courseId);
    // If response is successful
    if (response.status === 200) {
      // Set the Data recieved from response
      // whole course data
      this.course = response.data;

      // @TODO Change this to take from the request
      // current component of the course
      this.CourseComponent = commonFunctions.FindComponent(
        this.$route.params.componentNumber,
        response.data
      );
      this.currentComponent = Number(this.$route.params.componentNumber);
    }
    // Else route to Not found
    else {
      this.$router.push("/404");
    }
  }
};
</script>

<style scoped>
.center-horizontally {
  display: flex;
  justify-content: center;
}
.new-container {
  background-color: #ffffff;
}
.test-section {
  display: flex;
  justify-content: center;
}
.video-container {
  background-color: #000;
}
.component-nav {
  border: 1px solid #111;
}
.iframe-container {
  overflow: hidden;
  padding-top: 56.25%; /* 16:9*/
  position: relative;
  height: 200px;
}
.iframe-container iframe {
  border: 0;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.pill-text {
  background-color: rgba(250, 250, 250, 1);
  border-radius: 10px;
  border: 1px solid rgba(237, 237, 237, 1);
  margin: 5px;
}
.btn-active {
  border-bottom: 2px solid grey;
}
.header-text {
  color: #2196f3;
}
.common-background {
  background-color: rgba(237, 237, 237, 1);
}
.arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(237, 237, 237, 1);
}
.courses-card {
  border: 1px solid rgba(237, 237, 237, 1);
  border-radius: 10px;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
@media (max-width: 500px) {
  #video-wrapper {
    height: 320px;
  }
}
</style>
