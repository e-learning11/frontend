<template>
  <router-link to="/courses" class="clear-text">
    <v-card
      class="mx-auto card"
      @mouseenter="reveal = true"
      @mouseleave="reveal = false"
      rounded
      :class="{ 'definite-width': $vuetify.breakpoint.sm }"
      color="white"
    >
      <div class="anchor-img">
        <v-img :src="CardData.image" :height="height" class="zoom-img"> </v-img>
        <div class="anchored-text">
          <h2 class="font-weight-medium">{{ CardData.Name }}</h2>
        </div>
      </div>
      <v-card-text class="black--text center-text">
        <h3
          class="font-weight-bold mx-5"
          :class="{
            'text-subtitle-1': $vuetify.breakpoint.xs,
            'text-subtitle-1': $vuetify.breakpoint.sm,
            'text-h6': $vuetify.breakpoint.mdAndUp
          }"
        >
          {{ CardData.text }}
        </h3>
        <p
          class="mx-5 text-center"
          :class="{
            'text-subtitle-2': $vuetify.breakpoint.xs,
            'text-subtitle-2': $vuetify.breakpoint.sm,
            'text-subtitle-1': $vuetify.breakpoint.mdAndUp
          }"
        >
          {{ CardData.Author }}
        </p>
      </v-card-text>
    </v-card>
  </router-link>
</template>

<script>
export default {
  data: () => ({
    reveal: false
  }),
  props: {
    CardData: Object,
    height: Number
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
.anchored-text {
  position: absolute;
  bottom: 0;
  left: 15px;
  background-color: #1f98f4;
  color: white;
  font-size: 12px;
  padding: 3px;
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
