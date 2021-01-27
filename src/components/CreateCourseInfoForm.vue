<template>
  <div>
    <v-form ref="InfoForm">
      <v-card
        color="white"
        shaped
        :class="{
          'pa-8': $vuetify.breakpoint.smAndUp,
          'pa-3': $vuetify.breakpoint.xs
        }"
      >
        <v-row class="mb-5">
          <v-col cols="12">
            <h2 class="text-center text-h4 font-weight-light">
              Course Information
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
            <div class="font-weight-bold">Name :</div>
            <v-text-field
              :rules="[rules.Required]"
              dense
              v-model="$store.state.CourseInfo['Name']"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Description :</div>
            <v-textarea
              filled
              full-width
              :rules="[rules.Required]"
              class="mt-5 mb-0"
              auto-grow
              v-model="$store.state.CourseInfo['Description']"
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Photo :</div>
            <v-file-input
              label="Upload An Image"
              dense
              accept="image/*"
              prepend-icon="mdi-camera"
              v-model="$store.state.CourseInfo['photo']"
            ></v-file-input>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Gender :</div>
            <v-radio-group
              :rules="[rules.Required]"
              row
              v-model="$store.state.CourseInfo['Gender']"
            >
              <v-radio label="Male" value="Male"></v-radio>
              <v-radio label="Female" value="Female"></v-radio>
              <v-radio label="Both" value="Both"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Prerequisites :</div>
            <v-select
              :items="allCourses"
              multiple
              chips
              clearable
              deletable-chips
              hint="Select Prerequisite Courses"
              persistent-hint
              v-model="$store.state.CourseInfo['Prerequisites']"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">URL :</div>
            <v-text-field
              :rules="[rules.Required]"
              dense
              v-model="$store.state.CourseInfo['URL']"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Age :</div>
            <v-range-slider
              max="70"
              min="0"
              class="align-start mt-3"
              v-model="$store.state.CourseInfo['Age']"
            >
              <template v-slot:prepend>
                <p>
                  {{ $store.state.CourseInfo.Age[0] }}
                </p>
              </template>
              <template v-slot:append>
                <p>
                  {{ $store.state.CourseInfo.Age[1] }}
                </p>
              </template>
            </v-range-slider>
          </v-col>
          <v-col
            cols="12"
            class="mb-0 pb-0"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <h3 class="text-center">Components</h3>
          </v-col>
          <v-col
            cols="12"
            v-if="$store.state.CourseInfo.components.length == 0"
            class="mt-3 pt-0"
          >
            <p class="text-center text-h6 font-weight-light mb-0">
              There are no components yet
            </p>
            <p class="text-center text-subtitle-1 font-weight-bold mt-0">
              At least 1 Required
            </p>
          </v-col>
          <v-row class="mt-5" justify="center" v-else>
            <v-col
              cols="10"
              v-for="(component, i) in $store.state.CourseInfo.components"
              :key="i"
              class="text-h6 font-weight-light component-entry px-5 mb-5"
            >
              {{ i + 1 }}. {{ component.Title }}, Type : {{ component.type }}
              <v-btn icon @click="SwitchComponent(i, -1)">
                <v-icon color="black">mdi-arrow-up-circle</v-icon>
              </v-btn>
              <v-btn icon @click="SwitchComponent(i, 1)">
                <v-icon color="black">mdi-arrow-down-circle</v-icon>
              </v-btn>
              <v-btn icon @click="RemoveComponent(i)">
                <v-icon color="red">mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-row>
      </v-card>
    </v-form>

    <!-- Add Course Button-->
    <v-row class="mb-10 mt-10" justify="center" align="center">
      <v-col cols="auto">
        <v-btn
          large
          color="red darken-3"
          outlined
          class="white--text text-none"
          :class="{
            'text-h6': $vuetify.breakpoint.smAndUp,
            'mr-5': $vuetify.breakpoint.smAndUp,
            'text-body': $vuetify.breakpoint.xs
          }"
          @click="ResetAll"
          >Reset All</v-btn
        >
      </v-col>
      <v-col cols="auto">
        <v-btn
          large
          color="blue darken-2"
          outlined
          class="white--text text-none"
          :class="{
            'text-h6': $vuetify.breakpoint.smAndUp,
            'text-body': $vuetify.breakpoint.xs
          }"
          @click="SubmitCourse"
          >Finish And Submit Course</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        Required: value => !!value || "Required."
      },
      allCourses: ["Entry1", "Entry2"]
    };
  },
  methods: {
    ResetAll() {
      this.$store.state.CourseInfo = {
        Name: "",
        Description: "",
        photo: null,
        Gender: null,
        Prerequisites: [],
        URL: null,
        Age: [0, 70],
        components: []
      };
    },
    SubmitCourse() {
      // Check for validation
      if (
        !this.$refs.InfoForm.validate() ||
        this.$store.state.CourseInfo.components.length == 0
      )
        return;
      //@TODO Should Send the Request
      console.log(this.$store.state.CourseInfo);
      // Reset the data and Route to Home
      this.ResetAll();
      this.$router.push("/");
      // Display a Success Notification
      this.$store.state.newNotification.Message =
        "New Course Added Successfuly";
      this.$store.state.newNotification.state = true;
    },
    RemoveComponent(CNumber) {
      //Remove component from Array
      this.$store.state.CourseInfo.components.splice(CNumber, 1);
    },
    SwitchComponent(CNumber, offset) {
      // Check if out of bounds
      if (
        CNumber + offset == this.$store.state.CourseInfo.components.length ||
        CNumber + offset < 0
      )
        return;
      //Switch the components with the offset
      //Create a copy To swap because vue does not detect index changes
      let tempArray = [...this.$store.state.CourseInfo.components];
      let temp = tempArray[CNumber + offset];
      tempArray[CNumber + offset] = tempArray[CNumber];
      tempArray[CNumber] = temp;
      // Set the Array After Swap
      this.$store.state.CourseInfo.components = tempArray;
    }
  },
  created() {
    //@TODO Send request to get all the courses for allCourses
  }
};
</script>

<style scoped>
.component-entry {
  border: 1px solid black;
  border-radius: 20px;
}
</style>
