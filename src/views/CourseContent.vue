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
          {{ language.courseContent }}
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
          <!-- Loading Section for Test and Assignment Status -->
          <Loading
            v-if="
              (CourseComponent.type === 'Assignment' ||
                CourseComponent.type === 'Test') &&
                loadingStatus
            "
            type="content"
          >
          </Loading>
          <v-container
            class="test-section new-container mt-10 mb-10"
            v-if="CourseComponent.type === 'Test' && !loadingStatus"
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
                    {{ language.testYourUnderstanding }}
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
                      {{ language.question }} {{ i + 1 }}: {{ Question.Q }}
                    </h3>
                    <!--True or False and MCQ-->
                    <div
                      :class="{
                        'mx-10': $vuetify.breakpoint.smAndUp,
                        'mx-2': $vuetify.breakpoint.xs
                      }"
                      v-if="Question.type != 'Essay'"
                    >
                      <v-radio-group
                        required
                        :rules="[v => !!v || language.questionNotAnswered]"
                        v-model="TestData.finalAnswers[i]"
                      >
                        <v-radio
                          v-for="(Answer, j) in Question.Answers"
                          :key="j"
                          :class="{
                            'text-right': $vuetify.rtl
                          }"
                          :label="Answer.A"
                          :value="Answer.A"
                        ></v-radio>
                      </v-radio-group>
                    </div>
                    <!--Essay Questions-->
                    <v-textarea
                      v-else
                      :class="{
                        'mx-10': $vuetify.breakpoint.smAndUp,
                        'mx-2': $vuetify.breakpoint.xs
                      }"
                      required
                      filled
                      full-width
                      auto-grow
                      :rules="[v => !!v || language.questionNotAnswered]"
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
                      {{ language.submit }}
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>

              <!--Score Screen-->
              <v-row justify="center" v-if="!TestData.takeTest">
                <v-col cols="12">
                  <h3 class="text-center text-h5">
                    {{ language.currentScore }}
                  </h3>
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
                    {{ language.retake }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-container>

          <!--Assignmet Section-->
          <v-container
            class="test-section new-container mt-10 mb-10"
            v-if="CourseComponent.type === 'Assignment' && !loadingStatus"
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
              <v-row justify="center" v-if="TestData.takeTest">
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
                    @click="downloadFile"
                    target="_blank"
                  >
                    {{ language.downloadAssign }}
                  </v-btn>

                  <v-divider class="mt-5"></v-divider>
                </v-col>
                <v-col cols="10" class="mt-10 text-center">
                  <v-form ref="AssignmentForm" v-model="validAssignment">
                    <v-file-input
                      :label="language.uploadWork"
                      dense
                      v-model="AssignmentFile"
                      :rules="[v => !!v || language.noWork]"
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
                    {{ language.submit }}
                  </v-btn>
                </v-col>
              </v-row>
              <!--Score Screen-->
              <v-row justify="center" v-else>
                <v-col cols="12">
                  <h3 class="text-center text-h5">
                    {{ language.currentScore }}
                  </h3>
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
                    {{ language.retake }}
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
            <v-icon size="30" color="grey darken-2" v-if="!$vuetify.rtl"
              >mdi-chevron-left</v-icon
            >
            <v-icon size="30" color="grey darken-2" v-else
              >mdi-chevron-right</v-icon
            >
            {{ language.previous }}
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
            :disabled="MarkAsReadWaitRequest"
          >
            {{ language.mark }}
            <v-icon class="mx-2">mdi-sticker-check-outline</v-icon>
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
            {{ language.done }}
            <v-icon class="mx-2">mdi-sticker-check-outline</v-icon>
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
            {{ language.next
            }}<v-icon size="30" color="grey darken-2" v-if="$vuetify.rtl"
              >mdi-chevron-left</v-icon
            >
            <v-icon size="30" color="grey darken-2" v-else
              >mdi-chevron-right</v-icon
            >
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
          :class="{ 'btn-active': Tab.value === currentTab }"
          @click="currentTab = Tab.value"
        >
          {{ Tab.name }}
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
          {{ language.sections }}
        </v-btn>
        <v-btn
          height="60px"
          tile
          text
          class="text-none px-10 text-body-1 font-weight-black"
          to="forum"
        >
          {{ language.forum }}
        </v-btn>
        <v-btn
          height="60px"
          tile
          text
          class="text-none px-10 text-body-1 font-weight-black"
          @click="downloadFile"
          v-if="CourseComponent.hasFile && CourseComponent.type === 'Video'"
        >
          {{ language.file }}
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
                      >{{ language.episode }}
                      {{ CourseComponent.number }}:</span
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
                  <v-col cols="auto">
                    <div class="text-subtitle-2 font-weight-thin">
                      <v-icon size="16" class="mr-2" color="black"
                        >mdi-translate</v-icon
                      >
                      {{ language.language }}
                      <span class="font-weight-medium mx-3">
                        {{ course.language }}</span
                      >
                    </div>
                  </v-col>
                  <v-col cols="auto">
                    <div class="text-subtitle-2 font-weight-thin">
                      <v-icon size="16" class="mr-2" color="black"
                        >mdi-cloud-upload-outline</v-icon
                      >
                      {{ language.uploadDate }}
                      <span class="font-weight-medium mx-3">
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
                    :src="instructorImage"
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
      MarkAsReadWaitRequest: false,
      loadingStatus: true
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
      return this.$store.state.language.courseContent;
    },
    Tabs() {
      return [
        {
          name: this.language.about,
          value: "About"
        },
        {
          name: this.language.teacher,
          value: "Teacher"
        }
      ];
    }
  },
  methods: {
    calcRoute(routeNum) {
      return "/course/" + this.$route.params.courseId + "/" + routeNum;
    },
    fileSource() {
      return api.getFileSource(this.CourseComponent.id);
    },
    async validateTest() {
      // Validate the form
      if (!this.$refs.testForm.validate()) return;
      this.validForm = false;

      //Send the answers to server and get the Score
      let response = await api.gradeTest(
        JSON.parse(localStorage.getItem("userToken")),
        this.$route.params.courseId,
        this.CourseComponent.id,
        this.TestData.finalAnswers,
        this.CourseComponent.Questions
      );

      //Check the response
      if (response.status === 200) {
        // Return to top
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        // Send the Request for getting status
        this.getTestAssignStatus();
      }

      this.validForm = true;
      this.$refs.testForm.reset();
    },
    async SubmitAssignmet() {
      // Validate the form
      if (!this.$refs.AssignmentForm.validate()) return;

      //Send the request of Assignment
      const response = await api.gradeAssignment(
        JSON.parse(localStorage.getItem("userToken")),
        this.$route.params.courseId,
        this.CourseComponent.id,
        this.AssignmentFile
      );
      if (response.status === 200) {
        this.TestData.currentScore = !this.$vuetify.rtl
          ? "Submitted For Grading"
          : "قيد التصحيح";
        this.TestData.takeTest = false;
        this.TestData.finalAnswers = [];
      }
      this.$refs.AssignmentForm.reset();
    },
    async MarkAsRead() {
      // Disable the Button
      this.MarkAsReadWaitRequest = true;
      //Send the Request to Mark as done
      const response = await api.MarkAsDone(
        JSON.parse(localStorage.getItem("userToken")),
        this.course.id,
        this.CourseComponent.id
      );
      if (response.status === 200) {
        this.currentComponent++;
        await this.completeCourse();
      } else {
        if (response.data === "user didn't pass the test") {
          // Display Error Message
          this.$store.state.newNotification.Message = !this.$vuetify.rtl
            ? "You Need to Pass the Test First"
            : "يجب ان تنجح فى الاختبار اولا";
          this.$store.state.newNotification.state = true;
          this.$store.state.newNotification.color = "error";
        } else {
          // Display Error Message
          this.$store.state.newNotification.Message = !this.$vuetify.rtl
            ? "You Need to Pass the Assignment First"
            : "يجب ان تنجح فى الاختبار اولا";
          this.$store.state.newNotification.state = true;
          this.$store.state.newNotification.color = "error";
        }
      }
      // ReEnable the Button
      this.MarkAsReadWaitRequest = false;
    },
    async completeCourse() {
      //check if last component
      if (
        this.CourseComponent.number ===
        this.course.CourseSections[this.course.CourseSections.length - 1]
          .CourseSectionComponents[
          this.course.CourseSections[this.course.CourseSections.length - 1]
            .CourseSectionComponents.length - 1
        ].number
      ) {
        // send the complete course request
        await api.MarkAsComplete(
          JSON.parse(localStorage.getItem("userToken")),
          this.course.id
        );
      }
    },
    async getTestAssignStatus() {
      this.loadingStatus = true;
      // send the request of test
      if (this.CourseComponent.type === "Test") {
        const response = await api.getTestState(
          JSON.parse(localStorage.getItem("userToken")),
          this.$route.params.courseId,
          this.CourseComponent.id
        );
        if (response.status === 200) {
          // if Graded show the Grade
          if (response.data.testState === 1) {
            this.TestData.currentScore = response.data.grade;
            this.TestData.takeTest = false;
            this.TestData.finalAnswers = [];
          }
          // if Submitted Before but Not graded
          else if (response.data.testState === 2) {
            this.TestData.currentScore = !this.$vuetify.rtl
              ? "Submitted For Grading"
              : "قيد التصحيح";
            this.TestData.takeTest = false;
            this.TestData.finalAnswers = [];
          }
          // if Not Submitted Before take test
          else if (response.data.testState === 3) {
            this.TestData.currentScore = 0;
            this.TestData.takeTest = true;
            this.TestData.finalAnswers = [];
          }

          this.loadingStatus = false;
        }
      }
      // Send the Assignment request
      else if (this.CourseComponent.type === "Assignment") {
        const response = await api.getAssignmentState(
          JSON.parse(localStorage.getItem("userToken")),
          this.$route.params.courseId,
          this.CourseComponent.id
        );
        if (response.status === 200) {
          // if Graded show the Grade
          if (response.data.assignmentState === 1) {
            this.TestData.currentScore = response.data.grade;
            this.TestData.takeTest = false;
            this.TestData.finalAnswers = [];
          }
          // if Submitted Before but Not graded
          else if (response.data.assignmentState === 2) {
            this.TestData.currentScore = !this.$vuetify.rtl
              ? "Submitted For Grading"
              : "قيد التصحيح";
            this.TestData.takeTest = false;
            this.TestData.finalAnswers = [];
          }
          // if Not Submitted Before take test
          else if (response.data.assignmentState === 3) {
            this.TestData.currentScore = 0;
            this.TestData.takeTest = true;
            this.TestData.finalAnswers = [];
          }

          this.loadingStatus = false;
        }
      }
    },
    async downloadFile() {
      fetch(this.fileSource())
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = "download";
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        })
        .catch();
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
    // Reset test Values and Assignment Files
    this.TestData = {
      finalAnswers: [],
      takeTest: true,
      currentScore: 0
    };
    this.AssignmentFile = null;
    // check the status
    this.getTestAssignStatus();
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

      //Set currentComponent with the Data from server
      const serverComp = userStaterResponse.data.currentComponent;
      if (this.$route.params.componentNumber > serverComp) {
        this.$router.push(
          `/course/${this.$route.params.courseId}/${serverComp}`
        );
        return;
      } else this.currentComponent = Number(serverComp);

      // current component of the course
      this.CourseComponent = commonFunctions.FindComponent(
        this.$route.params.componentNumber,
        response.data
      );
      // check the status
      this.getTestAssignStatus();
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
