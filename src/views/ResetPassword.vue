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
                class="text-h6 white--text mt-5"
                @click="validate"
                :disabled="sentRequest"
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
      sentRequest: false,
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
      this.sentRequest = true;
      // Send the request
      const response = await api.resetPassword({
        token: this.token,
        password: this.password
      });

      // If the request was successful,
      if (response.status === 200) {
        this.$store.state.newNotification.Message = this.language.passwordChange;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "success";
        this.$router.push("/login");
      } else {
        this.$store.state.newNotification.Message = this.language.wrongToken;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
      }
      this.sentRequest = false;
      this.$refs.Resetform.reset();
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
