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
                'text-h2': $vuetify.breakpoint.mdAndUp
              }"
            >
              {{ language.resetPassword }}
            </h1>
          </v-col>
        </v-row>
        <v-row class="mt-16" justify="center" align="center">
          <v-col md="8" sm="12" class="px-0">
            <v-form ref="Resetform" class="form-center" v-model="valid">
              <v-text-field
                color="blue darken-2"
                outlined
                :label="language.token"
                v-model="token"
                required
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                outlined
                color="blue darken-3"
                :label="language.password"
                required
                v-model="password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
              ></v-text-field>

              <v-text-field
                outlined
                color="blue darken-3"
                :label="language.confirmPassword"
                required
                v-model="confirmpassword"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  rules.required,
                  rules.Matchingchar(password, confirmpassword)
                ]"
                :type="showConfirmPassword ? 'text' : 'password'"
                @click:append="showConfirmPassword = !showConfirmPassword"
              ></v-text-field>

              <v-btn
                x-large
                color="blue darken-2"
                class="text-h5 white--text mt-5"
                @click="validate"
              >
                {{ language.resetPassword }}
              </v-btn>
            </v-form>
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
      showConfirmPassword: false,
      confirmpassword: "",
      token: "",
      rules: {
        required: value => !!value || "Required.",
        Matchingchar: (Confirmpassword, password) =>
          this.IsMatching(Confirmpassword, password) || "Passwords Must Match"
      }
    };
  },
  computed: {
    language() {
      return this.$store.state.language.register;
    }
  },
  methods: {
    IsMatching(Confirmpassword, password) {
      if (Confirmpassword !== password) return false;
      return true;
    },
    async validate() {
      // Validate the form
      if (!this.$refs.Resetform.validate()) return;

      // Send the request
      const loginResponse = await api.loginUser({
        token: this.token,
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
          // if Correct
        } else {
          this.$store.state.newNotification.Message = this.language.wentWrong;
          this.$store.state.newNotification.state = true;
        }
      } else {
        this.$store.state.newNotification.Message = this.language.wrong;
        this.$store.state.newNotification.state = true;
      }
    }
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
