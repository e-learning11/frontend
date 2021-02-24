<template>
  <v-container class="mt-10 mb-10">
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
              {{ language.signup }}
            </h1>
          </v-col>
        </v-row>
        <v-row class="mt-10" justify="center" align="center">
          <v-col md="8" sm="12" class="px-0">
            <v-form ref="Registerform" class="form-center" v-model="valid">
              <v-row justify="center" align="center" class="mb-5">
                <v-col cols="auto">
                  <v-avatar size="120">
                    <v-img :src="UserImage"></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="auto">
                  <v-file-input
                    accept="image/*"
                    prepend-icon="mdi-camera"
                    v-model="Userform.image"
                    hide-input
                  ></v-file-input>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col md="6" cols="12">
                  <v-text-field
                    color="blue darken-3"
                    outlined
                    :label="language.firstName"
                    required
                    v-model="Userform.firstName"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col md="6" cols="12">
                  <v-text-field
                    color="blue darken-3"
                    outlined
                    :label="language.lastName"
                    required
                    v-model="Userform.lastName"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-text-field
                color="blue darken-3"
                outlined
                :label="language.email"
                v-model="Userform.email"
                required
                :rules="[rules.required, rules.email]"
              ></v-text-field>

              <v-text-field
                outlined
                color="blue darken-3"
                :label="language.password"
                required
                v-model="Userform.password"
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
                v-model="Userform.confirmpassword"
                :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[
                  rules.required,
                  rules.Matchingchar(
                    Userform.password,
                    Userform.confirmpassword
                  )
                ]"
                :type="showConfirmPassword ? 'text' : 'password'"
                @click:append="showConfirmPassword = !showConfirmPassword"
              ></v-text-field>

              <v-text-field
                outlined
                color="blue darken-3"
                :label="language.age"
                required
                type="Number"
                max="70"
                v-model="Userform.age"
                :rules="[rules.required, rules.correctAge]"
              ></v-text-field>

              <v-text-field
                outlined
                color="blue darken-3"
                :label="language.phone"
                v-model="Userform.phone"
                :rules="[rules.correctPhone]"
              ></v-text-field>

              <v-row no-gutters>
                <v-col
                  cols="12"
                  class="text-h6 font-weight-light mr-5 grey--text"
                  >{{ language.gender }}</v-col
                >

                <v-radio-group
                  v-model="Userform.gender"
                  mandatory
                  row
                  class="mt-0"
                >
                  <v-radio :label="language.male" :value="Number(1)"></v-radio>
                  <v-radio
                    :label="language.female"
                    :value="Number(2)"
                  ></v-radio>
                </v-radio-group>
              </v-row>

              <v-row no-gutters>
                <v-col
                  cols="12"
                  class="text-h6 font-weight-light mr-5 grey--text"
                  >{{ language.accountType }}</v-col
                >

                <v-radio-group
                  v-model="Userform.type"
                  mandatory
                  row
                  class="mt-0"
                >
                  <v-radio :label="language.teacher" value="teacher"></v-radio>
                  <v-radio :label="language.student" value="student"></v-radio>
                </v-radio-group>
              </v-row>

              <v-btn
                x-large
                color="blue darken-3"
                class="text-h5 white--text mt-5"
                @click="validate"
              >
                {{ language.signup }}
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
import tempImage from "@/assets/user-img2.jpg";

export default {
  data() {
    return {
      valid: true,
      showPassword: false,
      showConfirmPassword: false,
      Userform: {
        image: null,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        type: "",
        password: "",
        confirmpassword: "",
        gender: "",
        age: ""
      },
      rules: {
        required: value => !!value || "Required.",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Not a valid Email";
        },
        Matchingchar: (Confirmpassword, password) =>
          this.IsMatching(Confirmpassword, password) || "Passwords Must Match",
        correctAge: value =>
          (value >= 5 && value <= 100) || "Age must be between 5 and 100",
        correctPhone: value => {
          if (value === "") return true;
          const pattern = /^(\d{10}|\d{11}|\d{12})$/;
          return pattern.test(value) || "Please write 10, 11 or 12 Numbers";
        }
      }
    };
  },
  computed: {
    UserImage() {
      if (this.Userform.image === null) return tempImage;
      return URL.createObjectURL(this.Userform.image);
    },
    language() {
      return this.$store.state.language.register;
    }
  },
  methods: {
    async validate() {
      // Validate the form
      if (!this.$refs.Registerform.validate()) return;

      // Send the request
      const registerResponse = await api.RegisterUser({ ...this.Userform });

      // If Teacher Route to Home and view Awaiting Approval
      if (registerResponse.status === 204) {
        // Display welcome Message
        this.$store.state.newNotification.Message = this.language.awaitApprove;
        this.$store.state.newNotification.state = true;
        this.$router.push("/");
        return;
      }

      // If the request was successful,
      if (registerResponse.status === 200) {
        // Save the token
        const token = registerResponse.data;
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
          this.$store.state.newNotification.Message = this.language.accountSuccess;
          this.$store.state.newNotification.state = true;
          this.$router.push("/");
        } else {
          this.$store.state.newNotification.Message = this.language.accountLogin;
          this.$store.state.newNotification.state = true;
          this.$router.push("/login");
        }
      } else {
        this.$store.state.newNotification.Message = registerResponse.data;
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
  },
  created() {
    console.log(this.language);
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
