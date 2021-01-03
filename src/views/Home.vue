<template>
  <div>
    <!-- Hero Container -->
    <v-container fluid class="hero-container white--text">
      <v-row dense align="center">
        <v-col cols="12" class="center-horizontally">
          <h1 class="text-h1 font-weight-bold mb-5">Adventure Awaits</h1>
          <p class="text-h4 mb-10">What are you waiting for?</p>
          <v-btn color="white" x-large>Get Started</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <!-- Courses Section -->
    <v-container class="courses-section">Courses </v-container>

    <!--footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";

export default {
  name: "Home",
  components: { Footer }
};
</script>

<style scoped>
.courses-section {
  min-height: 150vh;
}
.hero-container {
  background: url(../assets/img-home.jpg) center center/cover no-repeat;
  min-height: 90vh;
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
