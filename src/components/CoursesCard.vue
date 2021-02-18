<template>
  <router-link :to="courseLink" class="clear-text" v-if="CardData">
    <v-card
      class="mx-auto card"
      @mouseenter="reveal = true"
      @mouseleave="reveal = false"
      rounded
      :class="{ 'definite-width': $vuetify.breakpoint.sm }"
      color="white"
    >
      <div class="anchor-img">
        <v-img :src="CourseImage" :height="height" class="zoom-img"> </v-img>
        <div
          :class="{
            'anchored-text-right': $vuetify.rtl,
            'anchored-text-left': !$vuetify.rtl
          }"
        >
          <h2 class="font-weight-light">{{ CardData.name }}</h2>
        </div>
      </div>
      <v-card-text class="black--text center-text">
        <h3 class="font-weight-medium text-body-1">
          {{ CardData.summary }}
        </h3>
        <p
          class="mx-5 mt-5 text-center font-weight-light"
          :class="{
            'text-subtitle-2': $vuetify.breakpoint.xs,
            'text-subtitle-2': $vuetify.breakpoint.sm,
            'text-subtitle-1': $vuetify.breakpoint.mdAndUp
          }"
          v-if="CardData.instructor"
        >
          {{ CardData.instructor.firstName }}
          {{ CardData.instructor.lastName }}
        </p>
      </v-card-text>
      <v-card-text v-if="CardData.private">
        <p class="black--text text-center text-overline">
          {{ $store.state.language.createCourseForms.private }}
        </p>
      </v-card-text>
    </v-card>
  </router-link>
</template>

<script>
import api from "api-client";

export default {
  data: () => ({
    reveal: false
  }),
  props: {
    CardData: Object,
    height: Number
  },
  computed: {
    courseLink() {
      if (this.CardData.private === true) return "";
      if (this.CardData.id != null) return "/course/" + this.CardData.id;
      return "/course/" + this.CardData.courseId;
    },
    CourseImage() {
      if (this.CardData.id != null)
        return api.getImageSource(this.CardData.id, "course");
      return api.getImageSource(this.CardData.courseId, "course");
    }
  }
};
</script>

<style scoped>
.card {
  overflow: hidden;
}
.clear-text {
  text-decoration: none;
}
.center-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30%;
}
.definite-width {
  max-width: 450px;
}
.anchored-text-left {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #1f98f4;
  color: white;
  font-size: 12px;
  padding: 7px;
}
.anchored-text-right {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #1f98f4;
  color: white;
  font-size: 12px;
  padding: 7px;
}
.anchor-img {
  position: relative;
  overflow: hidden;
}
.zoom-img {
  transition: transform 0.2s;
}
.zoom-img:hover {
  transform: scale(1.2);
}
</style>
