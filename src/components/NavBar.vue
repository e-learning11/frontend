<template>
  <div>
    <!-- Navigation Drawer for Mobiles -->
    <v-navigation-drawer
      color="black"
      app
      v-model="drawer"
      width="100%"
      bottom
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <!--Unregistered User Navigation Drawer buttons-->
      <ul
        v-if="$store.state.currentUser == null"
        class="Drawer-list mt-10 pl-0"
      >
        <v-btn
          v-for="i in buttons.length"
          :key="i"
          class="nav-btn text-none text-h6 font-weight-light"
          type="li"
          text
          x-large
          color="white"
          active-class="logo-active"
          :to="buttons[i - 1].route"
          width="220px"
        >
          <v-col>
            <v-icon>{{ buttons[i - 1].icon }}</v-icon>
          </v-col>
          <v-col>
            {{ buttons[i - 1].name }}
          </v-col></v-btn
        >
      </ul>

      <!--registered User Navigation Drawer buttons-->
      <template v-else>
        <v-row no-gutters class="mt-8 mx-5" justify="center">
          <v-col cols="12" class="text-center mb-5">
            <v-avatar size="90" color="white">
              <v-img :src="UserImage"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12">
            <h2 class="white--text text-center font-weight-light">
              {{ $store.state.currentUser.firstName || "John Doe" }}
            </h2>
          </v-col>
        </v-row>

        <ul class="Drawer-list mt-5 pl-0">
          <v-btn
            class="nav-btn text-none text-h6 font-weight-light"
            type="li"
            text
            x-large
            color="white"
            active-class="logo-active"
            :to="loggedButtons[3].route"
            width="220px"
            v-if="$store.state.currentUser.type == 'teacher'"
          >
            <v-col>
              <v-icon>{{ loggedButtons[3].icon }}</v-icon>
            </v-col>
            <v-col>
              {{ loggedButtons[3].name }}
            </v-col></v-btn
          >
          <v-btn
            class="nav-btn text-none text-h6 font-weight-light"
            type="li"
            text
            x-large
            color="white"
            active-class="logo-active"
            v-if="$store.state.currentUser.type === 'admin'"
            :to="userButtons[2].route"
            width="220px"
          >
            <v-col>
              <v-icon>{{ userButtons[2].icon }}</v-icon>
            </v-col>
            <v-col>
              {{ userButtons[2].name }}
            </v-col></v-btn
          >
          <v-btn
            v-for="j in userButtons.length - 1"
            :key="j"
            class="nav-btn text-none text-h6 font-weight-light"
            type="li"
            text
            x-large
            color="white"
            active-class="logo-active"
            :to="userButtons[j - 1].route"
            @click="logOut(userButtons[j - 1].action)"
            width="220px"
          >
            <v-col>
              <v-icon>{{ userButtons[j - 1].icon }}</v-icon>
            </v-col>
            <v-col>
              {{ userButtons[j - 1].name }}
            </v-col></v-btn
          >
          <v-btn
            v-for="i in loggedButtons.length - 1"
            :key="i + userButtons.length"
            class="nav-btn text-none text-h6 font-weight-light"
            type="li"
            text
            x-large
            color="white"
            active-class="logo-active"
            :to="loggedButtons[i - 1].route"
            width="220px"
          >
            <v-col>
              <v-icon>{{ loggedButtons[i - 1].icon }}</v-icon>
            </v-col>
            <v-col>
              {{ loggedButtons[i - 1].name }}
            </v-col></v-btn
          >
        </ul>
      </template>
    </v-navigation-drawer>

    <!-- Navigation Bar -->
    <v-app-bar
      app
      flat
      color="black"
      height="80"
      clipped-right
      clipped-left
      :class="{
        'px-0': $vuetify.breakpoint.smAndDown
      }"
    >
      <v-container
        fluid
        :class="{
          'px-0': $vuetify.breakpoint.smAndDown
        }"
      >
        <v-row
          :class="{
            'px-0': $vuetify.breakpoint.smAndDown
          }"
        >
          <!-- Logo and Name -->
          <v-col
            :class="{
              'col-3': $vuetify.breakpoint.mdAndUp,
              'col-auto': $vuetify.breakpoint.smAndDown
            }"
            class="center-horizontally center-vertically"
          >
            <v-btn
              to="/"
              active-class="logo-active"
              text
              height="50"
              class="text-h4 text-none mx-3"
              color="white"
              ><v-img
                width="96"
                height="60"
                src="../assets/newLogo.svg"
              ></v-img>
            </v-btn>

            <v-btn x-small @click="changeLanguage" outlined color="white">
              <v-icon color="white" v-if="!$vuetify.rtl"
                >mdi-abjad-arabic</v-icon
              >
              <v-icon color="white" v-else>mdi-alpha-e</v-icon>
            </v-btn>
          </v-col>
          <!-- Navigation list -->
          <v-col cols="7" v-if="$vuetify.breakpoint.mdAndUp">
            <!--Unregistered User Navigation List buttons-->
            <ul class="Nav-list" v-if="$store.state.currentUser == null">
              <li v-for="i in buttons.length - 1" :key="i">
                <v-btn
                  class="nav-btn text-none text-h6 font-weight-light"
                  text
                  x-large
                  color="white"
                  :active-class="buttons[i - 1].activeclass"
                  :to="buttons[i - 1].route"
                >
                  {{ buttons[i - 1].name }}</v-btn
                >
              </li>
            </ul>

            <!--registered User Navigation List buttons-->
            <ul class="Nav-list" v-else>
              <li class="list-item">
                <v-btn
                  class="nav-btn text-none text-h6 font-weight-light"
                  text
                  x-large
                  color="white"
                  :active-class="loggedButtons[3].activeclass"
                  :to="loggedButtons[3].route"
                  v-if="$store.state.currentUser.type == 'teacher'"
                >
                  {{ loggedButtons[3].name }}</v-btn
                >
              </li>
              <li
                v-for="i in loggedButtons.length - 1"
                :key="i"
                class="list-item"
              >
                <v-btn
                  class="nav-btn text-none text-h6 font-weight-light"
                  text
                  x-large
                  color="white"
                  @click="logOut(loggedButtons[i - 1].action)"
                  :active-class="loggedButtons[i - 1].activeclass"
                  :to="loggedButtons[i - 1].route"
                >
                  {{ loggedButtons[i - 1].name }}</v-btn
                >
              </li>
            </ul>
          </v-col>
          <!-- Register Button & and User menu-->
          <v-col
            cols="2"
            class="center-horizontally center-vertically"
            v-if="$vuetify.breakpoint.mdAndUp"
          >
            <v-btn
              x-large
              outlined
              v-if="$store.state.currentUser === null"
              tile
              to="/Register"
              class="text-none text-h6"
              color="white"
            >
              {{ $store.state.language.navbar.register }}
            </v-btn>
            <v-menu v-else offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="white"
                  outlined
                  v-on="on"
                  class="text-none pl-2 pr-2"
                  x-large
                  ><v-avatar size="30" class="mr-1 ml-0" color="white">
                    <v-img :src="UserImage"></v-img
                  ></v-avatar>
                  <v-spacer></v-spacer>
                  <div class="mr-5 ml-5 text-subtitle-1 font-weight-medium">
                    {{ $store.state.currentUser.firstName || "John Doe" }}
                  </div>
                  <v-spacer></v-spacer>
                  <v-avatar size="20" class="mx-1">
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-avatar>
                </v-btn>
              </template>

              <v-list dense color="black">
                <v-list-item
                  :to="userButtons[2].route"
                  active-class="btn-active-list"
                  v-if="$store.state.currentUser.type === 'admin'"
                >
                  <v-list-item-title
                    class="text-subtitle-1 font-weight-light white--text"
                    >{{ userButtons[2].name }}</v-list-item-title
                  >
                </v-list-item>
                <v-list-item
                  v-for="index in userButtons.length - 1"
                  :key="index"
                  :to="userButtons[index - 1].route"
                  active-class="btn-active-list"
                  @click="logOut(userButtons[index - 1].action)"
                >
                  <v-list-item-title
                    class="text-subtitle-1 font-weight-light white--text"
                    >{{ userButtons[index - 1].name }}</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </v-col>
          <!-- Navigation Button -->
          <v-col
            v-if="$vuetify.breakpoint.smAndDown"
            class="right-horizontally"
          >
            <v-btn icon color="white" @click="drawer = !drawer">
              <v-icon v-if="!drawer" class="text-h3">
                mdi-menu
              </v-icon>
              <v-icon v-else class="text-h3">
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
  </div>
</template>

<script>
import api from "api-client";

export default {
  data() {
    return {
      buttons: [
        {
          name: this.$store.state.language.navbar.home,
          route: "/",
          icon: "mdi-home",
          activeclass: "btn-active"
        },
        {
          name: this.$store.state.language.navbar.courses,
          route: "/courses",
          icon: "mdi-book",
          activeclass: "btn-active"
        },
        {
          name: this.$store.state.language.navbar.news,
          route: "/news",
          icon: "mdi-newspaper",
          activeclass: "btn-active"
        },
        {
          name: this.$store.state.language.navbar.login,
          route: "/login",
          icon: "mdi-login-variant",
          activeclass: "btn-active"
        },
        {
          name: this.$store.state.language.navbar.register,
          route: "/register",
          icon: "mdi-pencil",
          activeclass: "btn-active"
        }
      ],
      loggedButtons: [
        {
          name: this.$store.state.language.navbar.home,
          route: "/",
          icon: "mdi-home",
          isTeacher: true,
          activeclass: "btn-active"
        },
        {
          name: this.$store.state.language.navbar.courses,
          route: "/courses",
          icon: "mdi-book",
          isTeacher: true,
          activeclass: "btn-active"
        },
        {
          name: this.$store.state.language.navbar.news,
          route: "/news",
          icon: "mdi-newspaper",
          isTeacher: true,
          activeclass: "btn-active"
        },
        {
          name: this.$store.state.language.navbar.createCourse,
          route: "/createcourse",
          icon: "mdi-bank-plus",
          isTeacher: true,
          activeclass: "btn-active"
        }
      ],
      userButtons: [
        {
          name: this.$store.state.language.navbar.profile,
          route: "/profile",
          icon: "mdi-account-cog",
          activeclass: "logo-active",
          action: false,
          isAdmin: false
        },
        {
          name: this.$store.state.language.navbar.logout,
          route: undefined,
          icon: "mdi-login",
          isAdmin: false,
          activeclass: "logo-active",
          action: true
        },
        {
          name: this.$store.state.language.navbar.adminPanel,
          route: "/admin",
          icon: "mdi-cog-outline",
          isAdmin: true,
          activeclass: "logo-active",
          action: true
        }
      ],
      drawer: false
    };
  },
  methods: {
    async logOut(flag) {
      if (flag) {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("userToken");
        this.$store.state.newNotification.state = false;
        this.$store.state.currentUser = null;
        if (this.$route.name !== "Home") {
          this.$router.push("/");
        }
      }
    },
    changeLanguage() {
      // change the current language in local storage
      if (localStorage.getItem("lang") === "English")
        localStorage.setItem("lang", "Arabic");
      else localStorage.setItem("lang", "English");
      // reload page
      this.$router.go();
    }
  },
  computed: {
    UserImage() {
      return api.getImageSource(this.$store.state.currentUser.id, "user");
    }
  },
  created() {
    this.$store.state.currentUser = JSON.parse(
      localStorage.getItem("currentUser")
    );
  }
};
</script>

<style scoped>
.center-horizontally {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.right-horizontally {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.center-vertically {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.Nav-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
}
.Drawer-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
}
.nav-btn {
  color: white;
  font-size: 1.5rem;
}
.text-main {
  color: #ffffff;
  text-align: center;
}
.btn-active {
  border-bottom: 5px solid white;
  border-radius: 0;
}
.btn-active-list {
  border: 1px solid white;
  margin: 3px 5px;
  border-radius: 0;
}
.btn-active::before {
  opacity: 0 !important;
}
.logo-active::before {
  opacity: 0 !important;
}
.list-item {
  list-style: none;
}
</style>
