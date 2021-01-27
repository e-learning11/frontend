<template>
  <div>
    <!--New section Card Either a Quiz or A video-->
    <v-form ref="AssignForm">
      <v-card
        shaped
        color="white"
        :class="{
          'pa-8': $vuetify.breakpoint.smAndUp,
          'pa-3': $vuetify.breakpoint.xs
        }"
      >
        <v-row justify="center" class="mb-5">
          <v-col
            :class="{
              'cols-6': $vuetify.breakpoint.smAndUp,
              'cols-12': $vuetify.breakpoint.xs
            }"
          >
            <h2 class="text-center text-h4 font-weight-light">
              New Assignment
            </h2></v-col
          >
        </v-row>
        <v-row>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Assignment Title :</div>
            <v-text-field
              dense
              v-model="AssignInfo.Title"
              :rules="[rules.Required]"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Assignment Description :</div>
            <v-textarea
              filled
              full-width
              class="mt-5 mb-0"
              auto-grow
              v-model="AssignInfo.Description"
              :rules="[rules.Required]"
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Assignment File :</div>
            <v-file-input
              label="Upload A File"
              dense
              v-model="AssignInfo.File"
              :rules="[rules.Required]"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card>
    </v-form>

    <!-- Add Course Button-->
    <v-row class="mb-10 mt-10" justify="center" align="center">
      <v-col cols="auto">
        <v-btn
          x-large
          color="red darken-3"
          outlined
          class="white--text text-none"
          :class="{
            'text-h6': $vuetify.breakpoint.smAndUp,
            'text-body': $vuetify.breakpoint.xs
          }"
          @click="Reset"
          >Reset</v-btn
        >
      </v-col>
      <v-col cols="auto">
        <v-btn
          x-large
          color="blue darken-2"
          outlined
          class="white--text text-none"
          :class="{
            'text-h6': $vuetify.breakpoint.smAndUp,
            'text-body': $vuetify.breakpoint.xs
          }"
          @click="AddAssign"
          >Add Assignment</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AssignInfo: {
        Title: "",
        Description: "",
        File: null
      },
      rules: {
        Required: value => !!value || "Required."
      }
    };
  },
  methods: {
    Reset() {
      this.AssignInfo = {
        Title: "",
        Description: "",
        File: null
      };
    },
    AddAssign() {
      //Check if form is valid
      if (!this.$refs.AssignForm.validate()) return;
      //Emit event to parent to recive data and Set component
      this.$root.$emit("NewComponent", this.AssignInfo);
      this.$store.state.CourseInfo.components.push({
        ...this.AssignInfo,
        type: "Assignment"
      });
      //Call Reset
      this.Reset();
    }
  }
};
</script>

<style></style>
