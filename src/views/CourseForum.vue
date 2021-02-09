<template>
  <div>
    <v-container fluid class="search-section">
      <v-container class="new-container">
        Forum Page of course {{ $route.params.courseId }}
      </v-container>
    </v-container>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";

export default {
  components: { Footer }
};
</script>

<style scoped>
.center-horizontal {
  display: flex;
  justify-content: center;
}

@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
