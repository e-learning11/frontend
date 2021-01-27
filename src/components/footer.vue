<template>
  <div class="footer-container">
    <v-container fill-height class="white--text">
      <v-row no-gutters align="start" justify="center">
        <v-col md="3" sm="4" xs="12" class="list-center mt-5">
          <h2
            class="font-weight-bold"
            :class="{
              'text-h6': $vuetify.breakpoint.xs,
              'text-h5': $vuetify.breakpoint.sm,
              'text-h4': $vuetify.breakpoint.mdAndUp
            }"
          >
            About Us
          </h2>
          <v-list
            color="black"
            class="list-center ml-3 font-weight-light"
            :class="{
              'text-subtitle-2': $vuetify.breakpoint.xs,
              'text-subtitle-1': $vuetify.breakpoint.sm,
              'text-subtitle-1': $vuetify.breakpoint.mdAndUp
            }"
          >
            <router-link class="list-item" to="/">How it Works</router-link>
            <router-link class="list-item" to="/">Testimonials</router-link>
            <router-link class="list-item" to="/">Careers</router-link>
            <router-link class="list-item" to="/">Investors</router-link>
            <router-link class="list-item" to="/">Terms of Service</router-link>
          </v-list>
        </v-col>
        <v-col md="3" sm="4" cols="12" class="list-center fill-height mt-5">
          <h2
            class="font-weight-bold"
            :class="{
              'text-h6': $vuetify.breakpoint.xs,
              'text-h5': $vuetify.breakpoint.sm,
              'text-h4': $vuetify.breakpoint.mdAndUp
            }"
          >
            Contact Us
          </h2>
          <v-list
            color="black"
            class="list-center ml-3 font-weight-light"
            :class="{
              'text-subtitle-2': $vuetify.breakpoint.xs,
              'text-subtitle-1': $vuetify.breakpoint.sm,
              'text-subtitle-1': $vuetify.breakpoint.mdAndUp
            }"
          >
            <router-link class="list-item" to="/">Contact</router-link>
            <router-link class="list-item" to="/">Support</router-link>
            <router-link class="list-item" to="/">Destinations</router-link>
            <router-link class="list-item" to="/">Sponsorships</router-link>
          </v-list>
        </v-col>
        <v-col md="3" sm="4" cols="12" class="list-center fill-height mt-5">
          <h2
            class="font-weight-bold"
            :class="{
              'text-h6': $vuetify.breakpoint.xs,
              'text-h5': $vuetify.breakpoint.sm,
              'text-h4': $vuetify.breakpoint.mdAndUp
            }"
          >
            Social Media
          </h2>
          <v-list
            color="black"
            class="list-center ml-3 font-weight-light"
            :class="{
              'text-subtitle-2': $vuetify.breakpoint.xs,
              'text-subtitle-1': $vuetify.breakpoint.sm,
              'text-subtitle-1': $vuetify.breakpoint.mdAndUp
            }"
          >
            <router-link class="list-item" to="/">Facebook</router-link>
            <router-link class="list-item" to="/">Instagram</router-link>
            <router-link class="list-item" to="/">Youtube</router-link>
            <router-link class="list-item" to="/">Twitter</router-link>
            <router-link class="list-item" to="/">Linkedin</router-link>
          </v-list>
        </v-col>
      </v-row>
      <v-row no-gutters align="center" justify="center" class="mt-10">
        <v-col md="4" sm="12" class="center-items">
          <v-btn
            to="/"
            active-class="btn-active"
            text
            class="text-h4 text-none"
            color="white"
          >
            Brand
            <v-icon large>mdi-fleur-de-lis</v-icon>
          </v-btn>
        </v-col>
        <v-col md="4" sm="12" class="center-items">Brand &#169; 2020</v-col>
        <v-col md="4" sm="12" class="center-items">
          <v-btn icon to="#" color="white" x-large>
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn icon to="#" color="white" x-large>
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn icon to="#" color="white" x-large>
            <v-icon>mdi-youtube</v-icon>
          </v-btn>
          <v-btn icon to="#" color="white" x-large>
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn icon to="#" color="white" x-large>
            <v-icon>mdi-linkedin</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.footer-container {
  background-color: #000000;
  padding: 4rem 0 2rem 0;
}
.list-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center-items {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.list-item {
  text-decoration: none;
  color: #ffffff;
}

.btn-active::before {
  opacity: 0 !important;
}
</style>
