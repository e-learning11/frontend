<template>
  <v-footer color="#000">
    <v-container fill-height class="white--text">
      <v-row no-gutters align="start" justify="center">
        <v-col md="3" sm="4" xs="12" class="list-center mt-5">
          <h2
            class="font-weight-bold text-center"
            :class="{
              'text-h6': $vuetify.breakpoint.xs,
              'text-h5': $vuetify.breakpoint.sm,
              'text-h4': $vuetify.breakpoint.mdAndUp
            }"
          >
            {{ language.aboutUs }}
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
            <router-link class="list-item" to="/">{{
              language.howItWorks
            }}</router-link>
            <router-link class="list-item" to="/">{{
              language.testimonials
            }}</router-link>
            <router-link class="list-item" to="/">{{
              language.careers
            }}</router-link>
            <router-link class="list-item" to="/">{{
              language.investors
            }}</router-link>
            <router-link class="list-item" to="/">{{
              language.terms
            }}</router-link>
          </v-list>
        </v-col>
        <v-col md="3" sm="4" cols="12" class="list-center fill-height mt-5">
          <h2
            class="font-weight-bold text-center"
            :class="{
              'text-h6': $vuetify.breakpoint.xs,
              'text-h5': $vuetify.breakpoint.sm,
              'text-h4': $vuetify.breakpoint.mdAndUp
            }"
          >
            {{ language.contactUs }}
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
            <router-link class="list-item" to="/">{{
              language.contact
            }}</router-link>
            <router-link class="list-item" to="/">{{
              language.support
            }}</router-link>
            <router-link class="list-item" to="/">{{
              language.destinations
            }}</router-link>
            <router-link class="list-item" to="/">{{
              language.sponsorships
            }}</router-link>
          </v-list>
        </v-col>
        <v-col md="3" sm="4" cols="12" class="list-center fill-height mt-5">
          <h2
            class="font-weight-bold text-center"
            :class="{
              'text-h6': $vuetify.breakpoint.xs,
              'text-h5': $vuetify.breakpoint.sm,
              'text-h4': $vuetify.breakpoint.mdAndUp
            }"
          >
            {{ language.socialMedia }}
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
            <a
              class="list-item"
              href="https://www.facebook.com/Shabab.aksa"
              target="_blank"
              >{{ language.facebook }}</a
            >
            <a
              class="list-item"
              href="https://www.instagram.com/shababalaksa/"
              target="_blank"
              >{{ language.instagram }}</a
            >
            <a
              class="list-item"
              href="https://www.youtube.com/channel/UCEbx62dCdoH0-LuQqOSD9HQ"
              target="_blank"
              >{{ language.youtube }}</a
            >
            <a
              class="list-item"
              href="https://twitter.com/shababalaksa"
              target="_blank"
              >{{ language.twitter }}</a
            >
            <a
              class="list-item"
              href="mailto:shabab.alaqsa.academy@gmail.com"
              >{{ language.mail }}</a
            >
          </v-list>
        </v-col>
      </v-row>
      <v-row no-gutters align="center" justify="center" class="mt-10 mb-3">
        <v-col md="4" sm="12" class="center-items">
          <router-link to="/">
            <v-img width="160" height="100" src="../assets/newLogo.svg"></v-img>
          </router-link>
        </v-col>
        <v-col md="4" sm="12" class="center-items"
          >&#169; {{ new Date().getFullYear() }}</v-col
        >
        <v-col md="4" sm="12" class="center-items">
          <v-btn
            icon
            href="https://www.facebook.com/Shabab.aksa"
            target="_blank"
            color="white"
            x-large
          >
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            icon
            href="https://www.instagram.com/shababalaksa/"
            target="_blank"
            color="white"
            x-large
          >
            <v-icon>mdi-instagram</v-icon>
          </v-btn>
          <v-btn
            icon
            href="https://www.youtube.com/channel/UCEbx62dCdoH0-LuQqOSD9HQ"
            target="_blank"
            color="white"
            x-large
          >
            <v-icon>mdi-youtube</v-icon>
          </v-btn>
          <v-btn
            icon
            href="https://twitter.com/shababalaksa"
            target="_blank"
            color="white"
            x-large
          >
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn
            icon
            href="mailto:shabab.alaqsa.academy@gmail.com"
            color="white"
            x-large
          >
            <v-icon>mdi-mail</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.state.language.footer;
    }
  }
};
</script>

<style scoped>
.footer-container {
  background-color: #000000;
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
