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
            <v-form ref="form" class="form-center" v-model="valid">
              <v-row dense>
                <v-col md="6" cols="12">
                  <v-text-field
                    color="blue darken-3"
                    outlined
                    label="First Name"
                    required
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12">
                  <v-text-field
                    color="blue darken-3"
                    outlined
                    label="Last Name"
                    required
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                color="blue darken-3"
                outlined
                label="E-mail"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                outlined
                color="blue darken-3"
                label="Password"
                required
                v-model="password"
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
                v-model="confirmpassword"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  rules.required,
                  rules.Matchingchar(password, confirmpassword)
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
export default {
  data() {
    return {
      valid: true,
      show1: false,
      show2: false,
      password: "",
      confirmpassword: "",
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
    validate() {
      if (this.$refs.form.validate()) {
        this.$router.push("/");
      }
    },

    IsMatching(Confirmpassword, password) {
      if (Confirmpassword !== password) return false;
      return true;
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
