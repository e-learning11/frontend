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
              {{ language.newAssignment }}
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
            <div class="mr-5 font-weight-bold">{{ language.assignTitle }}</div>
            <v-text-field
              dense
              v-model="AssignInfo.name"
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
            <div class="mr-5 font-weight-bold">
              {{ language.assignDescription }}
            </div>
            <v-textarea
              filled
              full-width
              class="mt-5 mb-0"
              auto-grow
              v-model="AssignInfo.description"
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
            <div class="mr-5 font-weight-bold">{{ language.assignFile }}</div>
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
          >{{ language.reset }}</v-btn
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
          v-if="ComponentToEdit === -1"
          >{{ language.addAssign }}</v-btn
        >
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
          v-else
          >{{ language.finishEdit }}</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    ComponentToEdit: Number
  },
  data() {
    return {
      AssignInfo: {
        name: "",
        description: "",
        File: null
      },
      rules: {
        Required: value => !!value || "Required."
      }
    };
  },
  computed: {
    language() {
      return this.$store.state.language.createCourseForms;
    }
  },
  methods: {
    Reset() {
      this.AssignInfo = {
        name: "",
        description: "",
        File: null
      };
    },
    AddAssign() {
      //Check if form is valid
      if (!this.$refs.AssignForm.validate()) return;
      //Emit event to parent to recive data and Set component
      this.$root.$emit("NewComponent", this.AssignInfo);
      // If not an Edit push the value
      if (this.ComponentToEdit === -1) {
        this.$store.state.CourseInfo.components.push({
          ...this.AssignInfo,
          type: "Assignment"
        });
      }
      // Else change it
      else {
        this.$store.state.CourseInfo.components[this.ComponentToEdit] = {
          ...this.AssignInfo,
          type: "Assignment"
        };
      }
      //Call Reset
      this.Reset();
      this.$refs.AssignForm.reset();
    }
  },
  created() {
    // check if prop is not -1 then set the value to the component
    if (this.ComponentToEdit !== -1) {
      this.AssignInfo = {
        ...this.$store.state.CourseInfo.components[this.ComponentToEdit]
      };
    }
  },
  destroyed() {
    this.$root.$emit("FinishEdit");
  }
};
</script>

<style></style>
