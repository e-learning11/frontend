<template>
  <v-container fluid class="pa-0">
    <!--loader Until request finishes-->
    <Loading v-if="course === null"></Loading>

    <!--Main Page-->
    <v-container v-else class="new-container mb-10 mt-10">
      <v-row
        justify="center"
        :class="{
          'pa-2': $vuetify.breakpoint.smAndDown
        }"
      >
        <v-col cols="12" class="text-center">
          <h1
            class="text-center font-weight-light"
            :class="{
              'text-h5': $vuetify.breakpoint.xs,
              'text-h4': $vuetify.breakpoint.sm,
              'text-h3': $vuetify.breakpoint.mdAndUp
            }"
          >
            {{ language.overview }}
          </h1>
        </v-col>
        <v-col
          :class="{
            'col-5': $vuetify.breakpoint.mdAndUp,
            'col-12': $vuetify.breakpoint.smAndDown
          }"
          class="px-5"
        >
          <!--Main Info About the Course-->
          <v-row justify="center" class="mb-3 mt-2">
            <v-col cols="12" class="pb-1">
              <h2
                :class="{
                  'text-h5': $vuetify.breakpoint.smAndUp,
                  'text-h6': $vuetify.breakpoint.xs
                }"
                class="font-weight-medium mb-5 text-center"
              >
                {{ language.maininfo }}
              </h2></v-col
            >
            <v-card flat elevation="0" outlined class="pa-5 rounded-xl mt-0">
              <v-row dense>
                <v-col cols="12">
                  <h2 class="font-weight-medium text-body-1">
                    {{ language.name }}
                    <span class="font-weight-light"> {{ course.name }}</span>
                  </h2>
                </v-col>
                <v-col cols="12">
                  <div class="font-weight-medium text-body-1">
                    {{ language.summary }}
                    <span class="font-weight-light"> {{ course.summary }}</span>
                  </div>
                </v-col>
                <v-col cols="12">
                  <h2 class="font-weight-medium text-body-1">
                    {{ language.summary }}
                    <span class="font-weight-light">
                      {{ course.language }}</span
                    >
                  </h2>
                </v-col>
                <v-col cols="12">
                  <h2 class="font-weight-medium text-body-1">
                    {{ language.date }}
                    <span class="font-weight-light">
                      {{ course.date.split("T")[0] }}</span
                    >
                  </h2>
                </v-col>
              </v-row>
            </v-card>
          </v-row>
        </v-col>
        <v-divider vertical class="mr-5 ml-2 mt-10 mb-5" inset></v-divider>

        <!--Course Content-->
        <v-col
          :class="{
            'col-5': $vuetify.breakpoint.mdAndUp,
            'col-12': $vuetify.breakpoint.smAndDown
          }"
          class="px-5"
        >
          <v-row class="mt-2 mb-3">
            <v-col cols="12 pb-1">
              <h2
                :class="{
                  'text-h5': $vuetify.breakpoint.smAndUp,
                  'text-h6': $vuetify.breakpoint.xs
                }"
                class="font-weight-medium mb-5 text-center"
              >
                {{ language.courseContent }}
              </h2>
            </v-col>
            <v-col cols="12">
              <CourseComponents
                :sections="course.CourseSections"
                PageType="Main"
              ></CourseComponents>
            </v-col>
          </v-row>
        </v-col>

        <!--Edit Course Button-->
        <v-col cols="auto" class="text-center mt-5 mb-5">
          <v-btn
            x-large
            outlined
            class="text-h6 mt-3 mx-3"
            color="blue darken-3"
            to="edit"
          >
            {{ language.editCourse }}
          </v-btn>
          <v-btn
            x-large
            outlined
            class="text-h6 mt-3 mx-3"
            color="blue darken-3"
            to="forum"
          >
            {{ language.forum }}
          </v-btn>
          <v-btn
            x-large
            outlined
            class="text-h6 mt-3 mx-3"
            color="blue darken-3"
            exact
            :to="`/course/${$route.params.courseId}`"
          >
            {{ language.courseMain }}
          </v-btn>
        </v-col>
      </v-row>
      <v-divider class="mt-5 mb-5"></v-divider>
      <!-- Add A Teacher to Course -->
      <v-row justify="center" class="mt-3">
        <v-col
          cols="12"
          :class="{
            'text-h5': $vuetify.breakpoint.smAndUp,
            'text-h6': $vuetify.breakpoint.xs
          }"
          class="font-weight-medium mb-5 text-center"
          >{{ language.addATeacher }}</v-col
        >
        <v-col cols="12" class="text-center"
          ><v-responsive max-width="400" class="mx-auto mb-4">
            <v-combobox
              :label="language.selectTeacher"
              v-model="currentTeacher"
              :items="simpleTeachers"
              @input.native="getAllTeachers($event.srcElement.value)"
            ></v-combobox> </v-responsive
        ></v-col>
        <v-col cols="12" class="text-center"
          ><v-btn
            x-large
            outlined
            class="text-h6"
            color="blue darken-3"
            @click="addTeacher"
          >
            {{ language.addTeacher }}
          </v-btn></v-col
        >
      </v-row>
      <v-divider
        class="mt-5 mb-5"
        v-if="SimpleCourseTests.length > 0"
      ></v-divider>
      <!-- Review Student Tests-->
      <v-row
        v-if="SimpleCourseTests.length > 0"
        class="mt-3"
        :class="{
          'pa-2': $vuetify.breakpoint.smAndDown
        }"
      >
        <v-col cols="12">
          <h2
            :class="{
              'text-h5': $vuetify.breakpoint.smAndUp,
              'text-h6': $vuetify.breakpoint.xs
            }"
            class="font-weight-medium mb-5 text-center"
          >
            {{ language.reviewTests }}
          </h2>
        </v-col>
        <v-col
          :class="{
            'col-6': $vuetify.breakpoint.mdAndUp,
            'col-12': $vuetify.breakpoint.smAndDown
          }"
        >
          <!-- Component Choice-->
          <v-responsive max-width="400" class="mx-auto mb-4">
            <v-combobox
              v-model="IndexCurrentTest"
              :disabled="searchLoading"
              :items="SimpleCourseTests"
              :label="language.selectTest"
              @change="
                getSubmissions(0);
                currentSubmission = null;
              "
            ></v-combobox>
          </v-responsive>

          <!--Students Tests Submitted-->
          <v-row justify="center" v-if="submissionsArray.length === 0">
            <v-col cols="auto">{{ language.noSubmissions }}</v-col>
          </v-row>
          <v-card elevation="16" max-width="400" class="mx-auto" v-else>
            <Loading type="list" v-if="searchLoading"></Loading>
            <v-list height="300" item-height="64" class="pa-0 test-list" v-else>
              <div v-for="(item, i) in submissionsArray" :key="i">
                <v-list-item>
                  <v-list-item-action>
                    <v-btn fab small depressed class="white--text blue">
                      <span v-if="!item.isGraded">{{ i + 1 }}</span>
                      <v-icon v-else>mdi-check</v-icon>
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title class="text-body-1 font-weight-medium">
                      {{ language.userid }} {{ item.UserId }}
                    </v-list-item-title>
                    <v-list-item-title class="text-body-1 font-weight-medium">
                      {{ language.questionid }} {{ item.QuestionId }}
                    </v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn icon @click="ChangeTest(item)">
                      <v-icon small>
                        mdi-open-in-new
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </v-list-item>
                <v-divider></v-divider>
              </div>
              <v-row justify="center" v-if="newSubmissionsAvailable"
                ><v-col cols="12"
                  ><v-btn
                    width="100%"
                    color="grey"
                    tile
                    icon
                    @click="getSubmissions()"
                    ><v-icon>mdi-chevron-double-down</v-icon></v-btn
                  ></v-col
                ></v-row
              >
            </v-list>
          </v-card>
        </v-col>
        <!-- View Selected Test and Grade-->
        <v-col
          :class="{
            'col-6': $vuetify.breakpoint.mdAndUp,
            'col-12': $vuetify.breakpoint.smAndDown
          }"
        >
          <v-card height="100%" min-height="450">
            <v-row justify="center" align="center"></v-row>
            <v-col cols="auto">
              <v-subheader
                class="text-center"
                v-if="currentSubmission === null"
              >
                {{ language.selectView }}
              </v-subheader>
              <template v-else>
                <v-form ref="GradeForm" v-model="validSubmitGrade">
                  <v-row dense justify="center" class="pt-5 pb-5">
                    <v-col
                      cols="12"
                      class="text-h6 font-weight-bold text-center"
                    >
                      {{ currentSubmission.Name }}
                    </v-col>
                    <v-col
                      cols="12"
                      class="text-body-2 font-weight-light text-center "
                    >
                      {{ currentSubmission.Test.Name }}
                    </v-col>
                    <v-col>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col
                      cols="12"
                      class="px-5 mt-6 mb-6"
                      v-if="IndexCurrentTest.type === 'Test'"
                    >
                      <div class="text-body-1 font-weight-light mb-3">
                        <span class="font-weight-medium">{{
                          language.question
                        }}</span>
                        {{
                          getQuestionWithID(currentSubmission.Test.QuestionId)
                        }}
                      </div>
                      <div class="text-body-2 font-weight-light mt-10">
                        <span class="font-weight-medium"
                          >{{ language.answer }} </span
                        >{{ currentSubmission.Test.text }}
                      </div>
                    </v-col>
                    <v-col cols="12" class="px-5 mt-6 mb-6 text-center" v-else>
                      <v-btn outlined color="blue" @click="downloadFile">
                        {{ language.download }}
                      </v-btn>
                    </v-col>
                    <v-col
                      v-if="currentSubmission.Test.isGraded"
                      cols="12"
                      class="text-center text-overline"
                    >
                      {{ language.alreadyGraded }}
                      {{ currentSubmission.Test.grade }}
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        :rules="[rules.Required]"
                        v-model="NewGrades.Grade"
                        type="Number"
                        :label="language.grade"
                        class="text-center"
                      ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="1" class="align-text"> / </v-col>
                    <v-col cols="4">
                      <v-text-field
                        type="Number"
                        label="Max Grade"
                        :rules="[rules.Required]"
                        v-model="NewGrades.MaxGrade"
                      ></v-text-field>
                    </v-col> -->

                    <v-col cols="12" class="text-center">
                      <v-btn
                        large
                        outlined
                        class="text-subtitle-1"
                        color="blue darken-3"
                        @click="GradeTest"
                        :disabled="!validSubmitGrade"
                      >
                        {{ language.gradeTest }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </template>
            </v-col>
          </v-card>
        </v-col>

        <!-- Delete Course -->
        <v-row justify="center" class="mt-3">
          <v-col cols="12">
            <v-divider class="mt-5 mb-5"></v-divider>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h3': $vuetify.breakpoint.smAndUp,
              'text-h4': $vuetify.breakpoint.xs
            }"
            class="font-weight-light mb-5 text-center"
            >{{ language.deleteCourse }}</v-col
          >
          <v-col cols="12" class="text-center"
            ><v-btn
              large
              outlined
              class="text-body-1"
              color="error"
              @click="deleteCourse"
            >
              {{ language.deleteCourse }}
            </v-btn></v-col
          >
        </v-row>
      </v-row>
    </v-container>

    <!--Footer-->
    <Footer></Footer>
  </v-container>
</template>

<script>
import Footer from "@/components/footer.vue";
import api from "api-client";
import Loading from "../components/Loading.vue";
import CourseComponents from "../components/CourseComponents.vue";

export default {
  components: { Footer, Loading, CourseComponents },
  data: () => ({
    course: null,
    SimpleCourseTests: [],
    IndexCurrentTest: null,
    currentSubmission: null,
    submissionsArray: [],
    newSubmissionsAvailable: true,
    searchLoading: false,
    NewGrades: {},
    validSubmitGrade: false,
    currentTeacher: null,
    simpleTeachers: [],
    rules: {
      Required: value => !!value || "Required.",
      CorrectGrade: (Grade, MaxGrade) =>
        Grade <= MaxGrade || "Grade Must Be Smaller or Equal To Max Grade"
    }
  }),
  computed: {
    language() {
      return this.$store.state.language.courseOverview;
    }
  },
  methods: {
    ChangeTest(Test) {
      // Changes the Current Test that is viewed
      this.currentSubmission = { Test: Test, Name: this.IndexCurrentTest.text };
    },
    async GradeTest() {
      // Validate the form
      if (!this.$refs.GradeForm.validate()) return;
      // Disable button
      this.validSubmitGrade = false;
      // Send the Request for Grade
      const response = await api.gradeCourseTestsAndAssignments(
        JSON.parse(localStorage.getItem("userToken")),
        this.$route.params.courseId,
        this.currentSubmission.Test.id,
        this.NewGrades.Grade,
        this.IndexCurrentTest.type
      );
      // If successful Change grade
      if (response.status === 200) {
        // Reset Submission and send the Request for submissions
        this.currentSubmission = null;
        this.getSubmissions(0);
        // Display a Success Notification
        this.$store.state.newNotification.Message = "Grading Successful";
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "success";
      }
      // Else Display error
      else {
        // Display an Error Notification
        this.$store.state.newNotification.Message =
          "Something went Wrong Please Try Again";
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
      }
      // ReEnable button
      this.validSubmitGrade = true;
      this.$refs.GradeForm.reset();
    },
    mapTestsAndAssignments(courseSections) {
      let SimpleCourseTests = [];
      courseSections.forEach(section => {
        section.CourseSectionComponents.forEach(component => {
          // if test or assignment add their Id and name
          if (component.type === "Test" || component.type === "Assignment") {
            SimpleCourseTests.push({
              value: component.id,
              text: component.name,
              type: component.type,
              Questions: component.Questions
            });
          }
        });
      });
      return SimpleCourseTests;
    },
    async getSubmissions(offset) {
      this.searchLoading = true;
      const response = await api.getCourseTestsAndAssignments(
        JSON.parse(localStorage.getItem("userToken")),
        20,
        offset != null ? offset : this.submissionsArray.length,
        this.$route.params.courseId,
        this.IndexCurrentTest.value,
        this.IndexCurrentTest.type
      );

      if (response.status === 200) {
        if (offset == null) {
          this.submissionsArray.push(...response.data);
        } else {
          this.submissionsArray = response.data;
          this.newSubmissionsAvailable = false;
        }
        if (response.data.length < 20) {
          this.newSubmissionsAvailable = false;
        }
      }
      this.searchLoading = false;
    },
    getQuestionWithID(id) {
      let QuestionName;
      this.IndexCurrentTest.Questions.forEach(q => {
        if (q.id === id) {
          QuestionName = q.Q;
          return;
        }
      });
      return QuestionName;
    },
    downloadFile() {
      let blob = new Blob(
        [new Uint8Array(this.currentSubmission.Test.file.data)],
        {
          type: this.currentSubmission.Test.contentType
        }
      );
      let link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "download";
      link.click();
    },
    async deleteCourse() {
      if (this.$store.state.currentUser.type === "admin") {
        const response = await api.approveRequests(
          JSON.parse(localStorage.getItem("userToken")),
          "Delete Courses",
          this.course.id
        );
        if (response.status === 200) {
          this.$router.push("/");
        }
      } else if (this.$store.state.currentUser.type === "teacher") {
        const response = await api.deleteCourseRequest(
          JSON.parse(localStorage.getItem("userToken")),
          this.course.id
        );
        if (response.status === 200) {
          this.$store.state.newNotification.Message = this.language.deleteRequest;
          this.$store.state.newNotification.state = true;
          this.$store.state.newNotification.color = "success";
        }
      }
    },
    async addTeacher() {
      // Add teacher to Course
      if (this.currentTeacher == null || this.currentTeacher.value == null)
        return;
      const response = await api.assignTeacherToCourse(
        JSON.parse(localStorage.getItem("userToken")),
        this.course.id,
        this.currentTeacher.value
      );
      if (response.status === 200) {
        this.$store.state.newNotification.Message = this.language.teacherAdded;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "success";
      } else {
        this.$store.state.newNotification.Message = this.language.teacherError;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
      }
    },
    async getAllTeachers(value) {
      const response = await api.getAllTeachers(
        JSON.parse(localStorage.getItem("userToken")),
        20,
        0,
        value
      );
      if (response.status === 200) {
        // Change combobox list
        this.simpleTeachers = response.data.map(t => ({
          text: t.firstName + t.lastName,
          value: t.id
        }));
        console.log(this.simpleTeachers);
      }
    }
  },
  async created() {
    // Send the request
    const courseResponse = await api.getCourseByid(this.$route.params.courseId);

    // If courseResponse is successful
    if (courseResponse.status === 200) {
      // Set the Data recieved from courseResponse
      // whole course data
      this.course = courseResponse.data;
      // Set the Submissions Array
      this.SimpleCourseTests = this.mapTestsAndAssignments(
        this.course.CourseSections
      );
      if (this.SimpleCourseTests.length > 0) {
        this.IndexCurrentTest = this.SimpleCourseTests[0];
        // get the Submissions
        this.getSubmissions(0);
      }
    }
    // Else route to Not found
    else {
      this.$router.push("/404");
    }
  },
  beforeRouteEnter(to, from, next) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.type === "teacher") next();
    else next("/");
  }
};
</script>

<style scoped>
.align-text {
  display: flex;
  align-items: center;
  justify-content: center;
}
.test-list {
  overflow: auto;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
