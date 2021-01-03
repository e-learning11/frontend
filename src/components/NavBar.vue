<template>
  <!-- Navigation Bar -->
  <v-app-bar
    app
    dense
    flat
    color="black"
    height="80px"
    class="white--text"
    dark
  >
    <v-container fluid>
      <v-row>
        <!-- Logo and Name -->
        <v-col cols="3" class="center-horizontally center-vertically text-h4">
          Brand
        </v-col>
        <!-- Navigation list -->
        <v-col cols="7">
          <ul class="Nav-list">
            <v-btn
              v-for="i in buttons.length"
              :key="i"
              class="nav-btn text-none"
              type="li"
              text
              :to="buttons[i - 1].route"
            >
              {{ buttons[i - 1].name }}</v-btn
            >
          </ul>
        </v-col>
        <!-- Register Button -->
        <v-col cols="2" class="center-horizontally center-vertically">
          <v-btn dark outlined tile to="/Register">Register</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    buttons: [
      {
        name: "Home",
        route: "/"
      },
      {
        name: "Courses",
        route: "/courses"
      },
      {
        name: "Login",
        route: "/login"
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
.nav-btn {
  color: white;
  font-size: 1.5rem;
}
.text-main {
  color: #ffffff;
  text-align: center;
}
</style>
