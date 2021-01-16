<template>
  <div class="profile-container">
    <!--Name and Profile Image-->
    <v-container class="new-container">
      <v-row justify="center" align="center" class="mt-10">
        <v-col cols="12" class="center-horizontal"
          ><v-icon size="100">mdi-account</v-icon></v-col
        >
        <v-col cols="12" class="center-horizontal"
          ><h2 class="text-h5 text-center font-weight-light">
            {{ $store.state.currentUser.name || "John Doe" }}
          </h2></v-col
        >
      </v-row>
    </v-container>

    <!--Basic Info Section-->
    <v-container class="mt-10 mb-16 new-container">
      <v-card color="white" shaped elevation="2" class="pa-10">
        <v-row justify="center" align="center" class="mb-5">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-light">
              Basic Information
            </h2></v-col
          >
        </v-row>
        <v-divider class="mb-5"></v-divider>
        <v-row justify="center" align="center" class="pa-10">
          <v-col
            :class="{
              'col-5': $vuetify.breakpoint.mdAndUp,
              'col-12': $vuetify.breakpoint.smAndDown,
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-light">Name:</div>
            <p class="font-weight-medium">
              {{ $store.state.currentUser.name || "John Doe" }}
            </p></v-col
          >
          <v-col
            :class="{
              'col-5': $vuetify.breakpoint.mdAndUp,
              'col-12': $vuetify.breakpoint.smAndDown,
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-light">Email:</div>
            <p class="font-weight-medium">
              {{ $store.state.currentUser.email || "John@Doe.com" }}
            </p></v-col
          >
          <v-col
            :class="{
              'col-5': $vuetify.breakpoint.mdAndUp,
              'col-12': $vuetify.breakpoint.smAndDown,
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-light">Phone No:</div>
            <p class="font-weight-medium">
              {{ $store.state.currentUser.pnumber || "01XXXXXXXXX" }}
            </p></v-col
          >
          <v-col
            :class="{
              'col-5': $vuetify.breakpoint.mdAndUp,
              'col-12': $vuetify.breakpoint.smAndDown,
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-light">Address:</div>
            <p class="font-weight-medium">
              {{ $store.state.currentUser.address || "3 John street, Doe" }}
            </p></v-col
          >
        </v-row>
      </v-card>
    </v-container>

    <!--My Courses Section-->
    <v-container class="mt-10 mb-16 new-container">
      <v-card color="white" shaped elevation="2" class="pa-10">
        <v-row justify="center" align="center" class="mb-5">
          <v-col cols="12">
            <h2 class="text-h4 font-weight-light">
              My Courses
            </h2></v-col
          >
        </v-row>
        <v-divider class="mb-5"></v-divider>
        <v-row justify="center" align="center" class="pa-10">
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
            class="center-horizontal"
          >
            <v-col cols="auto">
              <v-icon size="40" color="#263238">mdi-book-open-variant</v-icon>
            </v-col>
            <v-col cols="auto">
              <div class="mr-5 font-weight-medium">
                Reading and Writing your First Code with python
              </div>
              <p class="font-weight-light">John Doe</p>
            </v-col>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
            class="center-horizontal"
          >
            <v-col cols="auto">
              <v-icon size="40" color="#263238">mdi-book-open-variant</v-icon>
            </v-col>
            <v-col cols="auto">
              <div class="mr-5 font-weight-medium">
                Reading and Writing your First Code with python
              </div>
              <p class="font-weight-light">John Doe</p>
            </v-col>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
            class="center-horizontal"
          >
            <v-col cols="auto">
              <v-icon size="40" color="#263238">mdi-book-open-variant</v-icon>
            </v-col>
            <v-col cols="auto">
              <div class="mr-5 font-weight-medium">
                Reading and Writing your First Code with python
              </div>
              <p class="font-weight-light">John Doe</p>
            </v-col>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!--Edit button-->
    <v-container class="mt-10 mb-16 new-container">
      <v-row justify="center" align="center" class="mb-10">
        <v-btn
          x-large
          to="/edit-profile"
          color="blue darken-2"
          outlined
          class="white--text text-none text-h6"
          >Edit my Profile</v-btn
        >
      </v-row>
    </v-container>

    <!--footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";

export default {
  name: "Profile",
  components: { Footer },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("currentUser") == null) next("/login");
    else next();
  }
};
</script>

<style scoped>
.profile-container {
  background-color: #f5f5f5;
}
.center-horizontal {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
