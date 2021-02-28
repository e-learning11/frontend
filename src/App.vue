<template>
  <v-app>
    <NavBar></NavBar>

    <!--Notification bar-->
    <v-toolbar
      v-if="$store.state.newNotification.state"
      absolute
      class="Notification-bar pb-2 white--text"
      dense
      :color="$store.state.newNotification.color"
    >
      <div
        class="white--text font-weight-light mr-5"
        :class="{
          'text-subtitle-1': $vuetify.breakpoint.smAndDown,
          'text-h6': $vuetify.breakpoint.mdAndUp
        }"
      >
        {{ $store.state.newNotification.Message }}
      </div>
      <v-btn
        icon
        @click="closeBar"
        rounded
        outlined
        small
        class="mx-5"
        color="white"
        ><v-icon color="white">mdi-close</v-icon></v-btn
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
import english from "@/languages/english.json";
import arabic from "@/languages/arabic.json";

export default {
  name: "App",

  components: { NavBar },
  methods: {
    closeBar() {
      this.$store.state.newNotification.state = false;
    }
  },
  computed: {
    notificationState() {
      return this.$store.state.newNotification.state;
    }
  },
  watch: {
    notificationState(newValue) {
      if (newValue === true)
        setTimeout(() => {
          this.$store.state.newNotification.state = false;
        }, 5000);
    }
  },
  created() {
    // Get the currentLanguage from local storage
    const lang = localStorage.getItem("lang");
    // set the store with the language
    if (lang === null || lang === "English") {
      this.$store.state.language = english;
      localStorage.setItem("lang", "English");
    } else if (lang === "Arabic") {
      this.$store.state.language = arabic;
      this.$vuetify.rtl = true;
    }
  }
};
</script>

<style scoped lang="scss">
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
