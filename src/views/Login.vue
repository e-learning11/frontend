<template>
  <v-container class="mt-16">
    <v-row justify="center" align="center">
      <v-col cols="8">
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
              Login
            </h1>
          </v-col>
        </v-row>
        <v-row class="mt-16" justify="center" align="center">
          <v-col md="8" sm="12" class="px-0">
            <v-form ref="form" class="form-center" v-model="valid">
              <v-text-field
                color="blue darken-2"
                outlined
                label="E-mail"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                outlined
                color="blue darken-2"
                label="Password"
                required
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-btn
                x-large
                color="blue darken-2"
                class="text-h5 white--text mt-5"
                @click="validate"
              >
                Login
              </v-btn>
            </v-form>

            <v-row no-gutters class="mt-3">
              <v-col md="6" sm="12" class="link-center">
                <router-link to="#" class="link-style text-center"
                  >Forgot password?</router-link
                >
              </v-col>
              <v-col md="6" sm="12" class="link-center">
                <router-link to="/register" class="link-style text-center"
                  >Don't have an account? Sign Up</router-link
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
export default {
  data() {
    return {
      valid: true,
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "",
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Not a valid Email";
        }
      }
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.$router.push("/");
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
.link-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.link-style {
  text-decoration: none;
}
</style>
