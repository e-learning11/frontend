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
              {{ language.forgetPassword }}
            </h1>
          </v-col>
        </v-row>
        <v-row class="mt-16" justify="center" align="center">
          <v-col md="8" sm="12" class="px-0">
            <v-form ref="Resetform" class="form-center" v-model="valid">
              <v-text-field
                color="blue darken-2"
                outlined
                :label="language.email"
                v-model="email"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-btn
                x-large
                color="blue darken-2"
                class="text-h6 white--text mt-5 text-none"
                @click="validate"
                :disabled="sentRequest"
              >
                {{ language.sendEmail }}
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
      email: "",
      sentRequest: false,
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
      return this.$store.state.language.register;
    }
  },
  methods: {
    async validate() {
      // Validate the form
      if (!this.$refs.Resetform.validate()) return;
      this.sentRequest = true;

      // Send the request
      const SendEmail = await api.forgetPassword({
        email: this.email
      });

      // If the request was successful,
      if (SendEmail.status === 200) {
        this.$router.push("/resetpassword");
      }
      this.sentRequest = false;
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
