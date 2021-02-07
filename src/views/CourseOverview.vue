<template>
  <v-container fluid class="pa-0">
    <!--loader Until request finishes-->
    <Loading v-if="course === null"></Loading>

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
                <v-col cols="12" class="text-left">
                  <h2 class="font-weight-medium text-body-1">
                    Language:
                    <span class="font-weight-light">
                      {{ course.Language }}</span
                    >
                  </h2>
                </v-col>
                <v-col cols="12" class="text-left">
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
        <v-col
          :class="{
            'col-5': $vuetify.breakpoint.mdAndUp,
            'col-12': $vuetify.breakpoint.smAndDown
          }"
          class="text-left px-5"
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
      <v-divider class="mt-5 mb-5"></v-divider>
      <v-row
        class="mt-3"
        :class="{
          'pa-2': $vuetify.breakpoint.smAndDown
        }"
      >
        <v-col cols="12 pb-1">
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
        <v-col cols="12">
          <v-card>
            Hey Review Me
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
  data() {
    return {
      course: null
    };
  },
  async created() {
    // Send the request
    // @TODO check that the teacher owns the course
    const response = await api.getCourseByid(this.$route.params.courseId);
    // If response is successful
    if (response.status === 200) {
      // Set the Data recieved from response
      // whole course data
      this.course = response.data;
      // First component of the course
      this.CourseComponent = this.course.sections[0].components[0];
    }
    // Else route to Not found
    else {
      this.$router.push("/404");
    }
  }
};
</script>

<style scoped>
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
