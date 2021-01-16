<template>
  <v-container class="mt-10">
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
              Sign Up
            </h1>
          </v-col>
        </v-row>
        <v-row class="mt-10" justify="center" align="center">
          <v-col md="8" sm="12" class="px-0">
            <v-form ref="Registerform" class="form-center" v-model="valid">
              <v-row dense>
                <v-col md="6" cols="12">
                  <v-text-field
                    color="blue darken-3"
                    outlined
                    label="First Name"
                    required
                    v-model="Userform.firstName"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12">
                  <v-text-field
                    color="blue darken-3"
                    outlined
                    label="Last Name"
                    required
                    v-model="Userform.lastName"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                color="blue darken-3"
                outlined
                label="E-mail"
                v-model="Userform.email"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                outlined
                color="blue darken-3"
                label="Password"
                required
                v-model="Userform.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="show1 ? 'text' : 'password'"
                @click:append="show1 = !show1"
              ></v-text-field>

              <v-text-field
                outlined
                color="blue darken-3"
                label="Confirm Password"
                required
                v-model="Userform.confirmpassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  rules.required,
                  rules.Matchingchar(
                    Userform.password,
                    Userform.confirmpassword
                  )
                ]"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
              ></v-text-field>

              <v-btn
                x-large
                color="blue darken-3"
                class="text-h5 white--text mt-5"
                @click="validate"
              >
                Sign Up
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
      show1: false,
      show2: false,
      Userform: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmpassword: ""
      },
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Not a valid Email";
        },
        Matchingchar: (Confirmpassword, password) =>
          this.IsMatching(Confirmpassword, password) || "Passwords Must Match"
      }
    };
  },
  methods: {
    async validate() {
      // Validate the form
      if (!this.$refs.Registerform.validate()) return;

      // Send the request
      const response = await api.RegisterUser({
        email: this.Userform.email,
        password: this.Userform.password,
        name: this.Userform.firstName + this.Userform.lastName
      });

      // If the request was successful,
      // add the currentUser to localStorage
      // and route to home
      // 200 OK
      if (response.status === 200) {
        const currentUser = response.data;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        this.$store.state.currentUser = currentUser;

        // Display welcome Message
        this.$store.state.newNotification.Message = "Welcome! Nice to Have you";
        this.$store.state.newNotification.state = true;

        this.$router.push("/");
      } else {
        this.$store.state.newNotification.Message = response.data.message;
        this.$store.state.newNotification.state = true;
      }
    },

    IsMatching(Confirmpassword, password) {
      if (Confirmpassword !== password) return false;
      return true;
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
