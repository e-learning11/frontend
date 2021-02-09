<template>
  <div>
    <v-container fluid id="mycourses-section">
      <!--Loading Till request finishes if is an edit-->
      <Loading
        v-if="this.$route.name === 'EditCourse' && !requestFinished"
      ></Loading>
      <v-container v-else fill-height class="new-container mt-5 mb-5">
        <!--Header-->
        <v-row class="mb-5">
          <v-col cols="12">
            <h1
              class="text-center font-weight-light"
              :class="{
                'text-h5': $vuetify.breakpoint.xs,
                'text-h4': $vuetify.breakpoint.sm,
                'text-h3': $vuetify.breakpoint.mdAndUp
              }"
              v-if="$route.name === 'CreateCourse'"
            >
              Create Course
            </h1>
            <h1
              class="text-center font-weight-light"
              :class="{
                'text-h5': $vuetify.breakpoint.xs,
                'text-h4': $vuetify.breakpoint.sm,
                'text-h3': $vuetify.breakpoint.mdAndUp
              }"
              v-if="$route.name === 'EditCourse'"
            >
              Edit Course
            </h1>
          </v-col></v-row
        >
        <v-card
          width="100%"
          :class="{ 'px-10': $vuetify.breakpoint.smAndUp }"
          color="#F5F5F5"
        >
          <v-row
            class="mb-10"
            justify="center"
            :class="{
              'mt-1': $vuetify.breakpoint.smAndDown,
              'mt-3': $vuetify.breakpoint.mdAndUp
            }"
          >
            <v-col
              v-for="(tab, i) in tabs"
              :key="i"
              :class="{
                'col-auto': $vuetify.breakpoint.smAndUp,
                'col-12': $vuetify.breakpoint.xs
              }"
              class="text-center"
            >
              <!--Form Components-->
              <v-btn
                :outlined="currentTab != tab.component"
                color="blue darken-1"
                class="mx-1 white--text"
                :class="{
                  'col-auto': $vuetify.breakpoint.smAndUp,
                  'col-10': $vuetify.breakpoint.xs,
                  'text-body': $vuetify.breakpoint.xs
                }"
                @click="currentTab = tab.component"
              >
                {{ tab.name }}
              </v-btn>
            </v-col>
          </v-row>

          <!--New Course Cards-->
          <v-row justify="center">
            <v-col
              :class="{
                'col-10': $vuetify.breakpoint.smAndUp,
                'col-11': $vuetify.breakpoint.xs
              }"
            >
              <v-fade-transition>
                <component
                  :ComponentToEdit="ComponentToEdit"
                  :PageType="$route.name"
                  :is="currentTab"
                ></component>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
import Loading from "@/components/Loading.vue";
import MainInfo from "@/components/CreateCourseInfoForm";
import TestForm from "@/components/CreateCourseTestForm";
import VideoForm from "@/components/CreateCourseVideoForm";
import AssignForm from "@/components/CreateCourseAssignForm";

export default {
  components: { MainInfo, TestForm, VideoForm, AssignForm, Footer, Loading },
  methods: {
    async GetCourseInfo() {
      // Get the Course Info
      if (this.$route.name === "CreateCourse") {
        // Check if CourseInfo is in LocalStorage
        let CourseInfo = JSON.parse(localStorage.getItem("CourseInfo"));
        if (CourseInfo != null) this.$store.state.CourseInfo = CourseInfo;
        else
          this.$store.state.CourseInfo = {
            Name: "",
            Description: "",
            Summary: "",
            photo: null,
            Gender: null,
            Prerequisites: [],
            URL: null,
            Age: [0, 70],
            components: [],
            sections: []
          };
      } else if (this.$route.name === "EditCourse") {
        // @TODO Send Request to get course
        await setTimeout(() => {
          this.requestFinished = true;
          // Set the value with the one gotten from the Server
          this.$store.state.CourseInfo = {
            Name: "From Server",
            Description: "",
            Summary: "",
            photo: null,
            Gender: null,
            Prerequisites: [],
            URL: null,
            Age: [0, 70],
            components: [],
            sections: []
          };
        }, 1000);
      }
    }
  },
  data() {
    return {
      ComponentToEdit: -1,
      requestFinished: false,
      currentTab: "MainInfo",
      tabs: [
        {
          name: "Main Info",
          component: "MainInfo"
        },
        {
          name: "Add Test",
          component: "TestForm"
        },
        {
          name: "Add Video",
          component: "VideoForm"
        },
        {
          name: "Add Assignment",
          component: "AssignForm"
        }
      ]
    };
  },
  mounted() {
    this.GetCourseInfo();
    // Change to Main Info on New component
    this.$root.$on("NewComponent", () => {
      this.currentTab = "MainInfo";
    });
    this.$root.$on("EditComponent", data => {
      // Send the correct prop
      this.ComponentToEdit = data.Number;
      // Change to the tab That is needed
      if (data.Type === "Video") this.currentTab = "VideoForm";
      else if (data.Type === "Test") this.currentTab = "TestForm";
      else this.currentTab = "AssignForm";
    });
    this.$root.$on("FinishEdit", () => {
      this.ComponentToEdit = -1;
    });
  },
  beforeRouteEnter(to, from, next) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.type === "teacher")
      next(vm => vm.GetCourseInfo());
    else next("/");
  }
};
</script>

<style scoped></style>
