<template>
  <div>
    <v-container class="new-container">
      <v-row
        ><v-col cols="12" class="text-h1 text-center whole-page">
          404 NOT FOUND</v-col
        ></v-row
      >
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.whole-page {
  height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
