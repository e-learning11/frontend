<template>
  <v-container fluid id="mycourses-section">
    <Loading type="content" v-if="Courses === null"></Loading>
    <v-container v-else fill-height class="new-container">
      <v-row
        no-gutters
        justify="center"
        align="center"
        class="mb-10"
        :class="{
          'mt-1': $vuetify.breakpoint.smAndDown,
          'mt-10': $vuetify.breakpoint.mdAndUp
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
            {{ language.myCourses }}
          </h2>
        </v-col>
        <v-col cols="12" class="mt-3">
          <v-divider></v-divider>
        </v-col>
        <v-col
          v-if="$store.state.currentUser.type == 'teacher'"
          cols="12"
          class="mt-5 center-horizontally"
        >
          <v-btn
            x-large
            outlined
            color="blue darken-2"
            class="text-h4 white--text mt-5 text-none font-weight-light pa-10"
            :class="{
              'text-h4': $vuetify.breakpoint.smAndUp,
              'text-h6': $vuetify.breakpoint.xs
            }"
            to="/createcourse"
          >
            {{ language.createCourses }}
          </v-btn>
        </v-col>
      </v-row>

      <!--Current Enrolled/Teached Courses-->
      <v-row v-if="Courses.length">
        <v-col
          v-for="i in Courses.length"
          :key="i"
          :class="{
            'col-6': $vuetify.breakpoint.smAndUp,
            'col-12': $vuetify.breakpoint.xs
          }"
          class="mb-10"
        >
          <CourseCard :height="height" :CardData="Courses[i - 1]"></CourseCard>
        </v-col>
      </v-row>

      <!--No Available courses-->
      <v-row v-else>
        <v-col cols="12" class="text-center font-weight-light mt-10 mb-10">
          <h3 class="text-overline">{{ language.noCoursesYet }}</h3>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import CourseCard from "@/components/CoursesCard.vue";
import Loading from "@/components/Loading.vue";
import api from "api-client";

export default {
  components: { CourseCard, Loading },
  data: () => ({
    height: 250,
    Courses: null
  }),
  computed: {
    language() {
      return this.$store.state.language.home;
    }
  },
  async created() {
    let response;
    // Get User Courses according to type
    if (this.$store.state.currentUser.type === "teacher") {
      response = await api.getCreatedCourses(
        JSON.parse(localStorage.getItem("userToken")),
        {
          limit: 200,
          offset: 0
        }
      );
    } else if (this.$store.state.currentUser.type === "student") {
      response = await api.getEnrolledCourses(
        JSON.parse(localStorage.getItem("userToken")),
        {
          limit: 200,
          offset: 0
        }
      );
    }

    if (response.status === 200) {
      this.Courses = response.data;
    }
  }
};
</script>

<style scoped>
.center-horizontally {
  text-align: center;
  margin: auto;
}
.center-horizontal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center-vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text-large {
  font-size: 5.5rem;
  line-height: 5.5rem;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
