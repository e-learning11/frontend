<template>
  <div>
    <Loading v-if="waitRequest"></Loading>
    <v-container v-else class="mt-10 mb-10 new-container">
      <v-card color="white" tile elevation="2" class="pa-5 pt-10">
        <v-form ref="EditForm">
          <v-row justify="center" align="center" class="mb-5">
            <v-col cols="6">
              <h2 class="text-h4 font-weight-light">
                Edit My Profile
              </h2></v-col
            >
            <v-col cols="auto"
              ><v-btn
                x-large
                to="/profile"
                color="blue darken-2"
                outlined
                class="white--text text-none text-h6"
                >My Profile</v-btn
              ></v-col
            >
          </v-row>
          <v-divider class="mb-5"></v-divider>
          <v-row justify="center" align="center" class="pa-10">
            <v-col cols="12">
              <v-row justify="center" align="center" class="mb-5">
                <v-col cols="auto">
                  <v-avatar size="120">
                    <v-img :src="UserImage"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="auto">
                  <v-file-input
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    v-model="NewData.image"
                    hide-input
                  ></v-file-input>
                </v-col>
              </v-row>
            </v-col>
            <v-col
              :class="{
                'col-7': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            >
              <div class="mr-5 font-weight-light">First Name:</div>
              <v-text-field
                dense
                v-model="NewData['firstName']"
                :placeholder="
                  $store.state.currentUser.firstName || 'No name Given'
                "
              ></v-text-field>
            </v-col>
            <v-col
              :class="{
                'col-7': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            >
              <div class="mr-5 font-weight-light">Last Name:</div>
              <v-text-field
                dense
                v-model="NewData['lastName']"
                :placeholder="
                  $store.state.currentUser.lastName || 'No name Given'
                "
              ></v-text-field>
            </v-col>
            <v-col
              :class="{
                'col-7': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            >
              <div class="mr-5 font-weight-light">Email:</div>
              <v-text-field
                dense
                v-model="NewData['email']"
                :placeholder="
                  $store.state.currentUser.email || 'No email Given'
                "
              ></v-text-field
            ></v-col>
            <v-col
              :class="{
                'col-7': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            >
              <div class="mr-5 font-weight-light">User Age:</div>
              <v-text-field
                dense
                type="Number"
                v-model="NewData['age']"
                :placeholder="
                  String($store.state.currentUser.age) || 'No Age Given'
                "
              ></v-text-field
            ></v-col>
            <v-col
              :class="{
                'col-7': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            >
              <div class="mr-5 font-weight-light">Phone Number:</div>
              <v-text-field
                dense
                v-model="NewData['phone']"
                :placeholder="
                  $store.state.currentUser.phone || 'No Phone Number Given'
                "
              ></v-text-field
            ></v-col>
            <v-col
              :class="{
                'col-7': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown,
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            >
              <div class="mr-5 font-weight-light">Gender:</div>
              <v-radio-group v-model="NewData['gender']" mandatory row>
                <v-radio label="Male" :value="Number(1)"></v-radio>
                <v-radio label="Female" :value="Number(2)"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row class="mb-10" justify="center" align="center">
            <v-btn
              x-large
              color="blue darken-2"
              outlined
              class="white--text text-none text-h6"
              :disabled="areObjectsEqual($store.state.currentUser, NewData)"
              @click="EditProfile"
              >Save Changes</v-btn
            >
          </v-row>
        </v-form>
      </v-card>
    </v-container>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
import Loading from "@/components/Loading.vue";
import api from "api-client";

export default {
  data: () => ({
    waitRequest: true,
    NewData: {}
  }),
  name: "EditProfile",
  components: { Footer, Loading },
  computed: {
    UserImage() {
      if (this.NewData.image == null)
        return api.getImageSource(this.$store.state.currentUser.id, "user");
      return URL.createObjectURL(this.NewData.image);
    }
  },
  methods: {
    areObjectsEqual(obj1, obj2) {
      return JSON.stringify(obj1) === JSON.stringify(obj2);
    },
    async EditProfile() {
      //Send the Request to Edit
      const EditResponse = await api.editUserProfile(
        JSON.parse(localStorage.getItem("userToken")),
        { ...this.NewData }
      );

      if (EditResponse.status === 200) {
        // Route to Profile
        this.$router.push("/profile");
      } else {
        this.$store.state.newNotification.Message =
          "Something went wrong. Please Try again";
        this.$store.state.newNotification.state = true;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("currentUser") == null) next("/login");
    else next();
  },
  async created() {
    // Send the Request to get the User profile Info
    const profileResponse = await api.getUserProfile(
      JSON.parse(localStorage.getItem("userToken"))
    );
    if (profileResponse.status === 200) {
      // Get User info using the token
      const currentUser = profileResponse.data;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      this.$store.state.currentUser = { ...currentUser };
      this.NewData = { ...currentUser };
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
