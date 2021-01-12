<template>
  <v-app>
    <NavBar></NavBar>

    <!--Notification bar-->
    <v-toolbar
      v-if="$store.state.newNotification.state"
      absolute
      class="Notification-bar pb-2"
    >
      <div
        class="black--text font-weight-light mr-5"
        :class="{
          'text-subtitle-1': $vuetify.breakpoint.smAndDown,
          'text-h6': $vuetify.breakpoint.mdAndUp
        }"
      >
        {{ $store.state.newNotification.Message }}
      </div>
      <v-btn icon @click="closeBar" rounded outlined small
        ><v-icon color="black">mdi-close</v-icon></v-btn
      >
    </v-toolbar>

    <!--Main-->
    <v-main app>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "App",

  components: { NavBar },
  methods: {
    closeBar() {
      this.$store.state.newNotification.state = false;
    }
  },
  data: () => ({
    //
  })
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.Notification-bar {
  position: fixed;
  top: 80px;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 5;
}
</style>
