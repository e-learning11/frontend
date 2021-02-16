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
            Course Overview
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
                Main Information
              </h2></v-col
            >
            <v-card flat elevation="0" outlined class="pa-5 rounded-xl mt-0">
              <v-row dense>
                <v-col cols="12">
                  <h2 class="font-weight-medium text-body-1">
                    Name:
                    <span class="font-weight-light"> {{ course.name }}</span>
                  </h2>
                </v-col>
                <v-col cols="12">
                  <div class="font-weight-medium text-body-1">
                    Summary:
                    <span class="font-weight-light"> {{ course.Summary }}</span>
                  </div>
                </v-col>
                <v-col cols="12">
                  <h2 class="font-weight-medium text-body-1">
                    Language:
                    <span class="font-weight-light">
                      {{ course.Language }}</span
                    >
                  </h2>
                </v-col>
                <v-col cols="12">
                  <h2 class="font-weight-medium text-body-1">
                    Upload Date:
                    <span class="font-weight-light"> {{ course.Date }}</span>
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
                Course Content
              </h2>
            </v-col>
            <CourseComponents
              :sections="course.sections"
              PageType="Main"
            ></CourseComponents>
          </v-row>
        </v-col>

        <!--Edit Course Button-->
        <v-col cols="12" class="text-center mt-5 mb-5">
          <v-btn
            x-large
            outlined
            class="text-h6"
            color="blue darken-3"
            to="edit"
          >
            Edit Course
          </v-btn>
        </v-col>
      </v-row>
      <v-divider class="mt-5 mb-5" v-if="CourseTests.length > 0"></v-divider>
      <!-- Review Student Tests-->
      <v-row
        v-if="CourseTests.length > 0"
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
            Review Tests
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
              :items="SimpleCourseTests"
              label="Select a Test"
            ></v-combobox>
          </v-responsive>

          <!--Students Tests Submitted-->
          <v-row
            justify="center"
            v-if="CourseTests[IndexCurrentTest.value].Submissions.length === 0"
          >
            <v-col cols="auto">No Submissions yet</v-col>
          </v-row>
          <v-card elevation="16" max-width="400" class="mx-auto" v-else>
            <v-list height="300" item-height="64" class="pa-0 test-list">
              <div
                v-for="(item, i) in CourseTests[IndexCurrentTest.value]
                  .Submissions"
                :key="i"
              >
                <v-list-item>
                  <v-list-item-action>
                    <v-btn fab small depressed color="primary">
                      {{ i + 1 }}
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title class="text-body-1 font-weight-medium">
                      {{ item.Name }}
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
          <v-card height="100%">
            <v-row justify="center" align="center"></v-row>
            <v-col cols="auto">
              <v-subheader class="text-center" v-if="currentTest === null">
                Please Select a Test to View
              </v-subheader>
              <template v-else>
                <v-form ref="GradeForm">
                  <v-row dense justify="center" class="pt-5 pb-5">
                    <v-col
                      cols="12"
                      class="text-h6 font-weight-bold text-center"
                    >
                      {{ currentTest.Name }}
                    </v-col>
                    <v-col
                      cols="12"
                      class="text-body-2 font-weight-light text-center"
                    >
                      {{ currentTest.Test.Name }}
                    </v-col>
                    <v-col>
                      <v-divider></v-divider>
                    </v-col>
                    <v-col
                      cols="12"
                      v-for="(item, i) in currentTest.Test.test"
                      :key="i"
                      class="px-5 mb-5"
                    >
                      <div class="text-body-1 font-weight-light mb-3">
                        <span class="font-weight-medium"
                          >Question {{ i + 1 }}:</span
                        >
                        {{ item.Q }}
                      </div>
                      <div class="text-body-2 font-weight-light">
                        <span class="font-weight-medium">Answer: </span
                        >{{ item.A }}
                      </div>
                    </v-col>
                    <v-col
                      v-if="currentTest.Test.Grade != null"
                      cols="12"
                      class="text-center text-overline"
                    >
                      Test Already Graded with
                      {{ currentTest.Test.Grade.Score }} /
                      {{ currentTest.Test.Grade.Max }}
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        :rules="[
                          rules.Required,
                          rules.CorrectGrade(
                            NewGrades.Grade,
                            NewGrades.MaxGrade
                          )
                        ]"
                        v-model="NewGrades.Grade"
                        type="Number"
                        label="Grade"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1" class="align-text"> / </v-col>
                    <v-col cols="4">
                      <v-text-field
                        type="Number"
                        label="Max Grade"
                        :rules="[rules.Required]"
                        v-model="NewGrades.MaxGrade"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="text-center">
                      <v-btn
                        large
                        outlined
                        class="text-subtitle-1"
                        color="blue darken-3"
                        @click="GradeTest"
                      >
                        Grade Test
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </template>
            </v-col>
          </v-card>
        </v-col>
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
    IndexCurrentTest: {
      text: "",
      value: 0
    },
    CourseTests: [],
    currentTest: null,
    NewGrades: {},
    rules: {
      Required: value => !!value || "Required.",
      CorrectGrade: (Grade, MaxGrade) =>
        Grade <= MaxGrade || "Grade Must Be Smaller or Equal To Max Grade"
    }
  }),
  computed: {
    SimpleCourseTests() {
      let i = 0;
      return this.CourseTests.map(v => ({ text: v.Name, value: i++ }));
    }
  },
  methods: {
    ChangeTest(Test) {
      // Changes the Current Test that is viewed
      this.currentTest = { Test: Test, Name: this.IndexCurrentTest.text };
    },
    GradeTest() {
      // Validate the form
      if (!this.$refs.GradeForm.validate()) return;
      // @TODO Send the Request for Grade
      // If successful Change grade
      if (this.NewGrades) {
        this.currentTest.Test.Grade = {
          Score: this.NewGrades.Grade,
          Max: this.NewGrades.MaxGrade
        };
        // Display a Success Notification
        this.$store.state.newNotification.Message = "Grading Successful";
        this.$store.state.newNotification.state = true;
      }
      // Else Display error
      else {
        // Display an Error Notification
        this.$store.state.newNotification.Message =
          "Something went Wrong Please Try Again";
        this.$store.state.newNotification.state = true;
      }
    }
  },
  async created() {
    // Send the request
    // @TODO check that the teacher owns the course
    // @TODO Improve this Code
    const response = await api.getCourseByid(this.$route.params.courseId);
    const Testresponse = await api.getCourseTests();

    // If response is successful
    if (response.status === 200 && Testresponse.status === 200) {
      // Set the Data recieved from response
      // whole course data
      this.course = response.data;
      // First component of the course
      this.CourseComponent = this.course.sections[0].components[0];
      // Set the CourseTests with the Data
      this.CourseTests = Testresponse.data;
      // Set indexCourseTest
      if (this.CourseTests.length > 0) {
        this.IndexCurrentTest = {
          text: this.CourseTests[0].Name,
          value: 0
        };
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
