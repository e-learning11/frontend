<template>
  <!-- Hero Container -->
  <v-container fluid class="hero-container white--text">
    <v-row dense align="center">
      <v-col cols="12" class="center-horizontally">
        <h1 class="text-h1 font-weight-bold mb-5">Courses</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.hero-container {
  background: url(../assets/img-2.jpg) center center/cover no-repeat;
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
