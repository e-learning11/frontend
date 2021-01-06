<template>
  <div>
    <!-- Hero Container -->
    <v-container fluid class="hero-container white--text">
      <v-row no-gutters align="center">
        <v-col cols="12" class="center-horizontally">
          <h1
            class="font-weight-bold mb-5"
            :class="{
              'text-h4': $vuetify.breakpoint.xs,
              'text-h3': $vuetify.breakpoint.sm,
              'text-h1': $vuetify.breakpoint.mdAndUp
            }"
          >
            Courses
          </h1>
        </v-col>
      </v-row>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";

export default {
  components: {
    Footer
  }
};
</script>

<style scoped>
.hero-container {
  background: url(../assets/img-2.jpg) center center/cover no-repeat;
  width: 100%;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  object-fit: contain;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.center-horizontally {
  text-align: center;
}
</style>
