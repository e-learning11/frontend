<template
  ><router-link to="/courses" class="clear-text"
    ><v-card
      class="mx-auto"
      :height="height"
      @mouseenter="reveal = true"
      @mouseleave="reveal = false"
      rounded
      max-width="450"
      elevation="5"
      color="grey lighten-4"
    >
      <v-img :src="CardData.image" height="70%"> </v-img>
      <v-card-text class="black--text center-text">
        <div class="text-h6">{{ CardData.Name }}</div>
        <p class="text-subtitle-1">{{ CardData.Author }}</p>
      </v-card-text>

      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%;"
          :color="CardData.color"
        >
          <v-card-text class="pb-0">
            <p class="display-1 text-center white--text">
              {{ CardData.text }}
            </p>
          </v-card-text>
        </v-card>
      </v-expand-transition>
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
.v-card--reveal {
  bottom: 0;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
</style>
