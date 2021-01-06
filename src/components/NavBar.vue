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
      <ul class="Drawer-list mt-10 pl-0">
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
            <ul class="Nav-list">
              <li v-for="i in buttons.length - 1" :key="i">
                <v-btn
                  class="nav-btn text-none text-h6 font-weight-light"
                  text
                  x-large
                  color="white"
                  active-class="btn-active"
                  :to="buttons[i - 1].route"
                >
                  {{ buttons[i - 1].name }}</v-btn
                >
              </li>
            </ul>
          </v-col>
          <!-- Register Button -->
          <v-col
            cols="2"
            class="center-horizontally center-vertically"
            v-if="$vuetify.breakpoint.mdAndUp"
          >
            <v-btn
              x-large
              outlined
              tile
              to="/Register"
              class="text-none text-h6"
              color="white"
              >Register</v-btn
            >
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
        icon: "mdi-home"
      },
      {
        name: "Courses",
        route: "/courses",
        icon: "mdi-book"
      },
      {
        name: "Login",
        route: "/login",
        icon: "mdi-login-variant"
      },
      {
        name: "Register",
        route: "/register",
        icon: "mdi-pencil"
      }
    ],
    drawer: false
  })
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
