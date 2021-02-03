<template>
  <v-container class="cover">
    <v-progress-circular
      :size="300"
      color="blue darken-3"
      indeterminate
    ></v-progress-circular>

    <!-- <v-row dense>
      <v-col cols="12">
        <v-skeleton-loader type="image,card-avatar,image"></v-skeleton-loader>
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.cover {
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
