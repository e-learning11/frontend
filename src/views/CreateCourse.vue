<template>
  <v-container fluid id="mycourses-section">
    <v-container fill-height class="new-container">
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
            Create a new Course
          </h2>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser && currentUser.type === "Teacher") next();
    else next("/");
  }
};
</script>

<style scoped></style>
