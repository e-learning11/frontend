<template>
  <v-container class="mt-16">
    <v-row justify="center" align="center">
      <v-col
        :class="{
          'col-10': $vuetify.breakpoint.xs,
          'col-8': $vuetify.breakpoint.sm,
          'col-9': $vuetify.breakpoint.md,
          'col-6': $vuetify.breakpoint.lg,
          'col-4': $vuetify.breakpoint.xl
        }"
      >
        <v-row>
          <v-col>
            <h1
              class="text-center font-weight-medium"
              :class="{
                'text-h4': $vuetify.breakpoint.xs,
                'text-h3': $vuetify.breakpoint.sm,
                'text-h1': $vuetify.breakpoint.mdAndUp
              }"
            >
              {{ language.login }}
            </h1>
          </v-col>
        </v-row>
        <v-row class="mt-16" justify="center" align="center">
          <v-col md="8" sm="12" class="px-0">
            <v-form ref="Loginform" class="form-center" v-model="valid">
              <v-text-field
                color="blue darken-2"
                outlined
                :label="language.email"
                v-model="email"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                outlined
                color="blue darken-2"
                :label="language.password"
                required
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-btn
                x-large
                color="blue darken-2"
                class="text-h5 white--text mt-5"
                @click="validate"
              >
                {{ language.login }}
              </v-btn>
            </v-form>

            <v-row no-gutters class="mt-3">
              <v-col
                cols="auto"
                :class="{
                  'text-center': $vuetify.breakpoint.smAndDown,
                  'text-left': $vuetify.breakpoint.mdAndUp
                }"
              >
                <router-link to="#" class="link-style">{{
                  language.forget
                }}</router-link>
              </v-col>
              <v-spacer></v-spacer>
              <v-col
                cols="auto"
                :class="{
                  'text-center': $vuetify.breakpoint.smAndDown,
                  'text-right': $vuetify.breakpoint.mdAndUp
                }"
              >
                <router-link
                  to="/register"
                  class="link-style"
                  :class="{
                    'text-center': $vuetify.breakpoint.smAndDown,
                    'text-right': $vuetify.breakpoint.mdAndUp
                  }"
                  >{{ language.newAccount }}</router-link
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "api-client";

export default {
  data() {
    return {
      valid: true,
      showPassword: false,
      password: "",
      email: "",
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Not a valid Email";
        }
      }
    };
  },
  computed: {
    language() {
      return this.$store.state.language.login;
    }
  },
  methods: {
    async validate() {
      // Validate the form
      if (!this.$refs.Loginform.validate()) return;

      // Send the request
      const loginResponse = await api.loginUser({
        email: this.email,
        password: this.password
      });

      // If the request was successful,
      if (loginResponse.status === 200) {
        // Save the token
        const token = loginResponse.data;
        localStorage.setItem("userToken", JSON.stringify(token));

        // Send the Request to get the User profile Info
        const profileResponse = await api.getUserProfile(
          JSON.parse(localStorage.getItem("userToken"))
        );

        // If the request was successful,
        // add the currentUser to localStorage
        // and route to home
        // 200 OK
        if (profileResponse.status === 200) {
          // Get User info using the token
          const currentUser = profileResponse.data;
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          this.$store.state.currentUser = currentUser;

          // Display welcome Message
          this.$store.state.newNotification.Message = this.language.welcome;
          this.$store.state.newNotification.state = true;
          this.$router.push("/");
        } else {
          this.$store.state.newNotification.Message = this.language.wentWrong;
          this.$store.state.newNotification.state = true;
        }
      } else {
        this.$store.state.newNotification.Message = this.language.wrong;
        this.$store.state.newNotification.state = true;
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("currentUser") == null) next();
    else next("/");
  }
};
</script>

<style scoped>
.form-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.link-style {
  text-decoration: none;
}
</style>
