<template>
  <div>
    <v-container class="new-container">
      <v-row
        ><v-col cols="12">
          This is the {{ $route.params.id }} course page</v-col
        ></v-row
      >
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
