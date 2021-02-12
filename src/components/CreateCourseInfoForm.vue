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
        <!--Course Info Header-->
        <v-row class="mb-5">
          <v-col cols="12">
            <h2 class="text-center text-h4 font-weight-light">
              Course Information
            </h2></v-col
          >
        </v-row>

        <!--Course Data Input-->
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
              v-model="$store.state.CourseInfo['name']"
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
              v-model="$store.state.CourseInfo['description']"
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Course Summary :</div>
            <v-textarea
              filled
              full-width
              :rules="[rules.Required]"
              class="mt-5 mb-0"
              auto-grow
              v-model="$store.state.CourseInfo['summary']"
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
              v-model="$store.state.CourseInfo['gender']"
            >
              <v-radio label="Male" value="1"></v-radio>
              <v-radio label="Female" value="2"></v-radio>
              <v-radio label="Both" value="3"></v-radio>
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
              v-model="$store.state.CourseInfo['prerequisites']"
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
              v-model="$store.state.CourseInfo['age']"
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

          <!--Course Components-->
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
              <v-btn icon @click="EditComponent(i)">
                <v-icon color="grey darken-2">mdi-pen</v-icon>
              </v-btn>
              <v-btn icon @click="RemoveComponent(i)">
                <v-icon color="red">mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <!--Sections Of Components-->
          <v-col
            cols="12"
            class="mb-0 pb-0 mt-5"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <h3 class="text-center">Sections</h3>
          </v-col>
          <v-col
            cols="12"
            v-if="$store.state.CourseInfo.sections.length == 0"
            class="mt-3 pt-0"
          >
            <p class="text-center text-h6 font-weight-light mb-0">
              There are no sections yet
            </p>
            <p class="text-center text-subtitle-1 font-weight-bold mt-0">
              Sections Must Cover All Components Created
            </p>
          </v-col>
          <v-row class="mt-5" justify="center">
            <v-col
              cols="10"
              v-for="(section, i) in $store.state.CourseInfo.sections"
              :key="i"
              class="text-h6 font-weight-light component-entry px-5 mb-5 text-center"
            >
              <div>
                Section {{ i + 1 }}
                <v-btn icon @click="DeleteSection(i)">
                  <v-icon color="red">mdi-close-circle-outline</v-icon>
                </v-btn>
              </div>
              <v-text-field
                placeholder="Section Name"
                class="mx-5"
                v-model="$store.state.CourseInfo.sections[i].name"
                :rules="[rules.Required]"
              ></v-text-field>

              <v-row justify="center">
                <v-col cols="auto">
                  Start:
                  <span class="font-weight-bold mr-3">{{ section.start }}</span>
                  <v-btn icon @click="ChangeSection(i, 0, 1)">
                    <v-icon color="black">mdi-arrow-up-circle</v-icon>
                  </v-btn>
                  <v-btn icon @click="ChangeSection(i, 0, -1)">
                    <v-icon color="black">mdi-arrow-down-circle</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  End:
                  <span class="font-weight-bold mr-3">{{ section.end }}</span>
                  <v-btn icon @click="ChangeSection(i, 1, 1)">
                    <v-icon color="black">mdi-arrow-up-circle</v-icon>
                  </v-btn>
                  <v-btn icon @click="ChangeSection(i, 1, -1)">
                    <v-icon color="black">mdi-arrow-down-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-col cols="12" class="text-center">
            <v-btn
              large
              color="blue darken-3"
              outlined
              :disabled="
                $store.state.CourseInfo.components.length <=
                  $store.state.CourseInfo.sections.length
              "
              @click="AddSection"
              class="white--text text-none text-h6"
              >Add Section</v-btn
            >
          </v-col>
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
      <v-col cols="auto" v-if="!this.isEdit">
        <v-btn
          large
          color="green darken-3"
          outlined
          class="white--text text-none"
          :class="{
            'text-h6': $vuetify.breakpoint.smAndUp,
            'mr-5': $vuetify.breakpoint.smAndUp,
            'text-body': $vuetify.breakpoint.xs
          }"
          @click="SaveProgress"
          >Save Progress</v-btn
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
import api from "api-client";

export default {
  props: {
    PageType: String
  },
  data() {
    return {
      rules: {
        Required: value => !!value || "Required."
      },
      allCourses: [],
      isEdit: false
    };
  },
  methods: {
    ResetAll() {
      this.$store.state.CourseInfo = {
        name: "",
        description: "",
        summary: "",
        photo: null,
        gender: null,
        prerequisites: [],
        URL: null,
        age: [0, 70],
        components: [],
        sections: []
      };
      if (!this.isEdit) localStorage.removeItem("CourseInfo");
    },
    async SubmitCourse() {
      // Check for validation
      if (
        !this.$refs.InfoForm.validate() ||
        this.$store.state.CourseInfo.components.length == 0 ||
        !this.ValidateSections()
      )
        return;
      //process the components to be under the correct section
      this.ProcessSections();
      //Sends the Request and remove components property
      //@TODO Send Two different Requests one for edit and other for Create
      const response = await api.CreateCourse(
        { ...this.$store.state.CourseInfo },
        JSON.parse(localStorage.getItem("userToken"))
      );
      if (response.status === 200) {
        // Reset the data and Route to Home
        this.ResetAll();
        this.$router.push("/");
        // Display a Success Notification
        this.$store.state.newNotification.Message =
          "New Course Added Successfuly";
        this.$store.state.newNotification.state = true;
      } else {
        this.$store.state.newNotification.Message = response.data;
        this.$store.state.newNotification.state = true;
      }
    },
    SaveProgress() {
      localStorage.setItem(
        "CourseInfo",
        JSON.stringify(this.$store.state.CourseInfo)
      );

      // Display a Success Notification
      this.$store.state.newNotification.Message = "Progress Saved";
      this.$store.state.newNotification.state = true;
    },
    RemoveComponent(CNumber) {
      //Remove component from Array
      this.$store.state.CourseInfo.components.splice(CNumber, 1);
    },
    EditComponent(CNumber) {
      // Emit an event to Main Component
      const Payload = {
        Number: CNumber,
        Type: this.$store.state.CourseInfo.components[CNumber].type
      };
      this.$root.$emit("EditComponent", Payload);
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
    },
    AddSection() {
      // Add a new section
      let newSection;
      //Special case: First Section
      if (this.$store.state.CourseInfo.sections.length === 0) {
        newSection = {
          name: "",
          start: 1,
          end: this.$store.state.CourseInfo.components.length
        };
      }
      //Normal Case
      // Its end is always the last component available
      // And the beginning is the end of its previous section
      else {
        newSection = {
          name: "",
          start: this.$store.state.CourseInfo.components.length,
          end: this.$store.state.CourseInfo.components.length
        };
      }
      this.$store.state.CourseInfo.sections.push(newSection);
    },
    ChangeSection(SNumber, Case, offset) {
      //Change the start and end of the sections
      // Case 0 is start
      if (Case === 0) {
        const newValue =
          this.$store.state.CourseInfo.sections[SNumber].start + offset;
        // return if start + offset is less than 1 or more than end
        if (
          newValue < 1 ||
          newValue > this.$store.state.CourseInfo.sections[SNumber].end
        )
          return;
        // Update Value
        this.$store.state.CourseInfo.sections[SNumber].start = newValue;
      }

      // Case 1 is end
      else {
        const newValue =
          this.$store.state.CourseInfo.sections[SNumber].end + offset;
        // return if end + offset is less than start or more than length of components
        if (
          newValue < this.$store.state.CourseInfo.sections[SNumber].start ||
          newValue > this.$store.state.CourseInfo.components.length
        )
          return;
        // Update Value
        this.$store.state.CourseInfo.sections[SNumber].end = newValue;
      }
    },
    DeleteSection(SNumber) {
      //Remove a certain section
      this.$store.state.CourseInfo.sections.splice(SNumber, 1);
    },
    ValidateSections() {
      const errorInSections = () => {
        // Display an Error Notification
        this.$store.state.newNotification.Message =
          "Sections Do not Cover All Created Components Correctly";
        this.$store.state.newNotification.state = true;
        return false;
      };
      //Create temp Variable
      const tempArray = [...this.$store.state.CourseInfo.sections];
      // if Empty return false
      if (tempArray.length === 0) return errorInSections();
      //Special case if length is 1
      if (tempArray.length === 1) {
        if (
          tempArray[0].start === 1 &&
          tempArray[0].end === this.$store.state.CourseInfo.components.length
        )
          return true;
        return errorInSections();
      }
      //Loop through sections to check if they cover all components correctly
      for (let i = 0; i < tempArray.length - 1; i++) {
        // If first element check that begin is 1
        if (i === 0 && tempArray[0].start !== 1) return errorInSections();

        // Regular case
        if (tempArray[i].end + 1 !== tempArray[i + 1].start)
          return errorInSections();
      }
      // If Last element check that end is components length
      if (
        tempArray[tempArray.length - 1].end !==
        this.$store.state.CourseInfo.components.length
      )
        return errorInSections();

      // All checks successful
      return true;
    },
    ProcessSections() {
      // Processes the Components to be under the correct Section
      this.$store.state.CourseInfo.sections.forEach(section => {
        section.components = [];
        for (let i = section.start - 1; i < section.end; i++) {
          //Add Number to component
          this.$store.state.CourseInfo.components[i].number = i + 1;
          // Push the component to the section
          section.components.push(this.$store.state.CourseInfo.components[i]);
        }
      });
    }
  },
  beforeUpdate() {
    //Check if the Page is an Edit
    if (this.PageType === "EditCourse") this.isEdit = true;
    else this.isEdit = false;
  },
  async created() {
    //Check if the Page is an Edit
    if (this.PageType === "EditCourse") this.isEdit = true;
    else this.isEdit = false;
    //Send request to get all the courses for allCourses
    const response = await api.getAllCourses(0, 20);
    if (response.status === 200) {
      this.allCourses = response.data.map(v => ({
        text: v.name,
        value: v.courseId
      }));
    }
  }
};
</script>

<style scoped>
.component-entry {
  border: 1px solid black;
  border-radius: 20px;
}
</style>
