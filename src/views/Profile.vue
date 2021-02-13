<template>
  <div class="profile-container">
    <Loading v-if="waitRequest"></Loading>
    <template v-else>
      <!--Name and Profile Image-->
      <v-container class="new-container">
        <v-row justify="center" align="center" class="mt-10">
          <v-col cols="auto">
            <v-avatar size="120">
              <v-img :src="UserImage"></v-img>
            </v-avatar>
          </v-col>
          <v-col cols="12" class="center-horizontal"
            ><h2 class="text-h5 text-center font-weight-light">
              {{ $store.state.currentUser.firstName || "John Doe" }}
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
                {{ language.basicInfo }}
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
              <div class="mr-5 font-weight-light">{{ language.firstName }}</div>
              <p class="font-weight-medium">
                {{ $store.state.currentUser.firstName || "John" }}
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
              <div class="mr-5 font-weight-light">{{ language.lastName }}</div>
              <p class="font-weight-medium">
                {{ $store.state.currentUser.lastName || "John" }}
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
              <div class="mr-5 font-weight-light">{{ language.email }}</div>
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
              <div class="mr-5 font-weight-light">{{ language.gender }}</div>
              <p class="font-weight-medium">
                <span v-if="$store.state.currentUser.gender === 1">{{
                  language.male
                }}</span>
                <span v-else-if="$store.state.currentUser.gender === 2">{{
                  language.female
                }}</span>
                <span v-else>Unknown</span>
              </p>
            </v-col>
            <v-col
              :class="{
                'col-5': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            >
              <div class="mr-5 font-weight-light">{{ language.phone }}</div>
              <p class="font-weight-medium">
                {{ $store.state.currentUser.phone || "01XXXXXXXXX" }}
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
              <div class="mr-5 font-weight-light">
                {{ language.accountType }}
              </div>
              <p class="font-weight-medium">
                {{ $store.state.currentUser.type || "Unknown" }}
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
              <div class="mr-5 font-weight-light">{{ language.age }}</div>
              <p class="font-weight-medium">
                <span v-if="$store.state.currentUser.age !== null">
                  {{ $store.state.currentUser.age }}</span
                >
                <span v-else>Unknown</span>
              </p></v-col
            >
            <v-col
              :class="{
                'col-5': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            ></v-col>
          </v-row>
        </v-card>
      </v-container>

      <!--My Courses Section-->
      <v-container class="mt-10 mb-16 new-container">
        <v-card color="white" shaped elevation="2" class="pa-10">
          <v-row justify="center" align="center" class="mb-5">
            <v-col cols="12">
              <h2 class="text-h4 font-weight-light">
                {{ language.finishedCourses }}
              </h2></v-col
            >
          </v-row>
          <v-divider class="mb-5"></v-divider>
          <!--No Available courses-->
          <Loading type="content" v-if="finishedCourses === null"></Loading>
          <v-row v-else-if="finishedCourses.length === 0">
            <v-col cols="12" class="text-center font-weight-light mt-10 mb-10">
              <h3 class="text-overline">
                {{ language.noCourses }}
              </h3>
            </v-col>
          </v-row>
          <v-row justify="center" align="center" class="pa-10" v-else>
            <v-col
              cols="12"
              :class="{
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
              class="center-horizontal"
              v-for="(course, i) in finishedCourses"
              :key="i"
            >
              <v-col cols="auto">
                <v-icon size="40" color="#263238">mdi-book-open-variant</v-icon>
              </v-col>
              <v-col cols="auto">
                <div class="mr-5 font-weight-medium">
                  {{ course.name }}
                </div>
                <p class="font-weight-light">{{ course.Instructor.name }}</p>
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
            >{{ language.editProfile }}</v-btn
          >
        </v-row>
      </v-container>
    </template>

    <!--footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
import Loading from "@/components/Loading.vue";
import api from "api-client";

export default {
  data() {
    return {
      waitRequest: true,
      finishedCourses: null
    };
  },
  name: "Profile",
  components: { Footer, Loading },
  computed: {
    UserImage() {
      return api.getImageSource(this.$store.state.currentUser.id, "user");
    },
    language() {
      return this.$store.state.language.profile;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("currentUser") === null) next("/login");
    else next();
  },
  async created() {
    // Send the request to get finished Courses
    api
      .getFinishedCourses(JSON.parse(localStorage.getItem("userToken")))
      .then(response => {
        this.finishedCourses = response.data;
      });
    // Send the Request to get the User profile Info
    const profileResponse = await api.getUserProfile(
      JSON.parse(localStorage.getItem("userToken"))
    );
    if (profileResponse.status === 200) {
      // Get User info using the token
      const currentUser = profileResponse.data;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      this.$store.state.currentUser = currentUser;
      this.waitRequest = false;
    } else {
      this.$store.state.newNotification.Message =
        "Something went wrong. Please Try again";
      this.$store.state.newNotification.state = true;
    }
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
