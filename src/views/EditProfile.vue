<template>
  <div>
    <v-container class="mt-10 mb-10 new-container">
      <v-card color="white" tile elevation="2" class="pa-5 pt-10">
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
          <v-col
            :class="{
              'col-7': $vuetify.breakpoint.mdAndUp,
              'col-12': $vuetify.breakpoint.smAndDown,
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-light">Name:</div>
            <v-text-field
              dense
              :placeholder="$store.state.currentUser.name || 'No name Given'"
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
              :placeholder="$store.state.currentUser.email || 'No email Given'"
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
            <div class="mr-5 font-weight-light">Phone No:</div>
            <v-text-field
              dense
              :placeholder="
                $store.state.currentUser.pnumber || 'No Phone Number Given'
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
            <div class="mr-5 font-weight-light">Address:</div>
            <v-text-field
              dense
              :placeholder="
                $store.state.currentUser.address || 'No Address Given'
              "
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row class="mb-10" justify="center" align="center">
          <v-btn
            x-large
            to="/profile"
            color="blue darken-2"
            outlined
            class="white--text text-none text-h6"
            >Save Changes</v-btn
          >
        </v-row>
      </v-card>
    </v-container>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";

export default {
  name: "EditProfile",
  components: { Footer }
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
