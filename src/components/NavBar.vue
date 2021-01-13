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
      <template v-else>
        <v-row no-gutters class="mt-5 mx-5" justify="center">
          <v-col cols="12" class="text-center">
            <v-icon size="30" color="white">mdi-account</v-icon>
          </v-col>
          <v-col cols="12">
            <h2 class="white--text text-center font-weight-light">
              {{ $store.state.currentUser.name || "John Doe" }}
            </h2>
          </v-col>
        </v-row>

        <ul class="Drawer-list mt-5 pl-0">
          <v-btn
            v-for="j in userButtons.length"
            :key="j"
            class="nav-btn text-none text-h6 font-weight-light"
            type="li"
            text
            x-large
            color="white"
            active-class="logo-active"
            :to="userButtons[j - 1].route"
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
            v-for="i in loggedButtons.length"
            :key="i + userButtons.length"
            class="nav-btn text-none text-h6 font-weight-light"
            type="li"
            text
            x-large
            color="white"
            active-class="logo-active"
            @click="logOut(loggedButtons[i - 1].action)"
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
    <v-app-bar app flat color="black" height="80">
      <v-container fluid>
        <v-row>
          <!-- Logo and Name -->
          <v-col md="3" sm="6" class="center-horizontally center-vertically">
            <v-btn
              to="/"
              active-class="logo-active"
              text
              class="text-h4 text-none"
              color="white"
            >
              Brand
              <v-icon large>mdi-fleur-de-lis</v-icon>
            </v-btn>
          </v-col>
          <!-- Navigation list -->
          <v-col cols="7" v-if="$vuetify.breakpoint.mdAndUp">
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
            <ul class="Nav-list" v-else>
              <li v-for="i in loggedButtons.length" :key="i">
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
              v-if="$store.state.currentUser == null"
              tile
              to="/Register"
              class="text-none text-h6"
              color="white"
              >Register</v-btn
            >
            <v-menu v-else offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  depressed
                  color="white"
                  v-on="on"
                  class="text-none pl-2 pr-2"
                  x-large
                  tile
                  ><v-avatar size="30" class="mr-1 ml-0"
                    ><v-icon size="30" color="grey darken-3"
                      >mdi-account-circle</v-icon
                    ></v-avatar
                  >
                  <v-spacer></v-spacer>
                  <div class="mr-5 ml-5 text-subtitle-1 font-weight-medium">
                    {{ $store.state.currentUser.name || "John Doe" }}
                  </div>
                  <v-spacer></v-spacer>
                  <v-avatar size="20" class="mx-1">
                    <v-icon>mdi-chevron-down</v-icon>
                  </v-avatar>
                </v-btn>
              </template>

              <v-list dense>
                <v-list-item
                  v-for="(item, index) in userButtons"
                  :key="index"
                  :to="item.route"
                >
                  <v-list-item-title class="text-subtitle-2">{{
                    item.name
                  }}</v-list-item-title>
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
export default {
  data: () => ({
    buttons: [
      {
        name: "Home",
        route: "/",
        icon: "mdi-home",
        logged: 0,
        activeclass: "btn-active"
      },
      {
        name: "Courses",
        route: "/courses",
        icon: "mdi-book",
        logged: 0,
        activeclass: "btn-active"
      },
      {
        name: "Login",
        route: "/login",
        icon: "mdi-login-variant",
        logged: 1,
        activeclass: "btn-active"
      },
      {
        name: "Register",
        route: "/register",
        icon: "mdi-pencil",
        logged: 1,
        activeclass: "btn-active"
      }
    ],
    loggedButtons: [
      {
        name: "Home",
        route: "/",
        icon: "mdi-home",
        logged: 0,
        activeclass: "btn-active",
        action: false
      },
      {
        name: "Courses",
        route: "/courses",
        icon: "mdi-book",
        logged: 0,
        activeclass: "btn-active",
        action: false
      },
      {
        name: "Log Out",
        route: "/",
        icon: "mdi-login",
        activeclass: "logo-active",
        action: true
      }
    ],
    userButtons: [
      {
        name: "Profile",
        route: "/profile",
        icon: "mdi-account-cog",
        activeclass: "logo-active",
        action: true
      }
    ],
    drawer: false
  }),
  methods: {
    logOut(flag) {
      if (flag) {
        localStorage.removeItem("currentUser");
        this.$store.state.currentUser = null;
      }
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
.btn-active::before {
  opacity: 0 !important;
}
.logo-active::before {
  opacity: 0 !important;
}
</style>
