<template>
  <div>
    <v-container fluid id="mycourses-section">
      <v-container fill-height class="new-container mt-5 mb-5">
        <v-card
          width="100%"
          :class="{ 'px-10': $vuetify.breakpoint.smAndUp }"
          color="#F5F5F5"
        >
          <!--Header-->
          <v-row
            class="mb-10"
            justify="center"
            :class="{
              'mt-1': $vuetify.breakpoint.smAndDown,
              'mt-3': $vuetify.breakpoint.mdAndUp
            }"
          >
            <v-col cols="12">
              <h2
                class="text-center font-weight-light"
                :class="{
                  'text-h5': $vuetify.breakpoint.xs,
                  'text-h4': $vuetify.breakpoint.sm,
                  'text-h3': $vuetify.breakpoint.mdAndUp
                }"
              >
                Create Course
              </h2>
            </v-col>
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
                <component :is="currentTab"></component>
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
import MainInfo from "@/components/CreateCourseInfoForm";
import TestForm from "@/components/CreateCourseTestForm";
import VideoForm from "@/components/CreateCourseVideoForm";
import AssignForm from "@/components/CreateCourseAssignForm";

export default {
  components: { MainInfo, TestForm, VideoForm, AssignForm, Footer },
  data() {
    return {
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
    // Change to Main Info on New component
    this.$root.$on("NewComponent", () => {
      this.currentTab = "MainInfo";
    });
  },
  beforeRouteEnter(to, from, next) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.type === "Teacher") next();
    else next("/");
  }
};
</script>

<style scoped></style>
