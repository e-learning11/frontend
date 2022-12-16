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
              {{ language.courseInfo }}
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
            <div class="font-weight-bold mr-5">{{ language.name }}</div>
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
            <div class="mr-5 font-weight-bold">{{ language.description }}</div>
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
            <div class="mr-5 font-weight-bold">{{ language.summary }}</div>
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
            <div class="mr-5 font-weight-bold">{{ language.photo }}</div>
            <v-file-input
              :label="language.uploadImage"
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
            <div class="mr-5 font-weight-bold">{{ language.gender }}</div>
            <v-radio-group
              :rules="[rules.Required]"
              row
              v-model="$store.state.CourseInfo['gender']"
            >
              <v-radio :label="language.male" value="1"></v-radio>
              <v-radio :label="language.female" value="2"></v-radio>
              <v-radio :label="language.both" value="3"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">
              {{ language.prerequisites }}
            </div>
            <v-select
              :items="allCourses"
              multiple
              chips
              clearable
              deletable-chips
              :hint="language.selectPrerequisites"
              persistent-hint
              v-model="$store.state.CourseInfo['prerequisites']"
              class="scroll-leftright"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">
              {{ language.CourseCategories }}
            </div>
            <v-select
              :items="AllCategories"
              multiple
              chips
              clearable
              deletable-chips
              :hint="language.selectCourseCategories"
              persistent-hint
              v-model="$store.state.CourseInfo['CourseCategories']"
              class="scroll-leftright"
            ></v-select>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">{{ language.URL }}</div>
            <v-text-field
              dense
              v-model="$store.state.CourseInfo['url']"
              :hint="language.URLhint"
              :rules="[rules.URLRequired]"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">{{ language.private }}</div>
            <v-radio-group
              row
              mandatory
              v-model="$store.state.CourseInfo['private']"
              :hint="language.privateURL"
              persistent-hint
            >
              <v-radio :label="language.no" :value="false"></v-radio>
              <v-radio :label="language.yes" :value="true"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">{{ language.nonBlocking }}</div>
            <v-radio-group
              row
              v-model="$store.state.CourseInfo['nonBlocking']"
              :hint="language.blockingHint"
              mandatory
              persistent-hint
            >
              <v-radio :label="language.no" :value="false"></v-radio>
              <v-radio :label="language.yes" :value="true"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">{{ language.age }}</div>
            <v-range-slider
              max="70"
              min="0"
              class="align-start mt-3"
              v-model="$store.state.CourseInfo['age']"
            >
              <template v-slot:prepend>
                <p>
                  {{ $store.state.CourseInfo.age[0] }}
                </p>
              </template>
              <template v-slot:append>
                <p>
                  {{ $store.state.CourseInfo.age[1] }}
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
            <h3 class="text-center">{{ language.components }}</h3>
          </v-col>
          <v-col
            cols="12"
            v-if="$store.state.CourseInfo.components.length == 0"
            class="mt-3 pt-0"
          >
            <p class="text-center text-h6 font-weight-light mb-0">
              {{ language.noComponents }}
            </p>
            <p class="text-center text-subtitle-1 font-weight-bold mt-0">
              {{ language.leastRequired }}
            </p>
          </v-col>
          <v-row class="mt-5" justify="center" v-else>
            <v-col
              cols="10"
              v-for="(component, i) in $store.state.CourseInfo.components"
              :key="i"
              class="text-h6 font-weight-light component-entry px-5 mb-5"
            >
              {{ i + 1 }}. {{ component.name }}, {{ language.type }}
              {{ component.type }}
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
              <v-switch
                v-if="isEdit"
                v-model="component.reset"
                :label="language.reset"
                hide-details
                class="mx-5"
                style="display:inline-block;"
              ></v-switch>
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
            <h3 class="text-center">{{ language.sections }}</h3>
          </v-col>
          <v-col
            cols="12"
            v-if="$store.state.CourseInfo.sections.length == 0"
            class="mt-3 pt-0"
          >
            <p class="text-center text-h6 font-weight-light mb-0">
              {{ language.noSections }}
            </p>
            <p class="text-center text-subtitle-1 font-weight-bold mt-0">
              {{ language.sectionsCover }}
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
                {{ language.section }} {{ i + 1 }}
                <v-btn icon @click="DeleteSection(i)">
                  <v-icon color="red">mdi-close-circle-outline</v-icon>
                </v-btn>
              </div>
              <v-text-field
                :placeholder="language.sectionName"
                class="mx-5"
                v-model="$store.state.CourseInfo.sections[i].name"
                :rules="[rules.Required]"
              ></v-text-field>

              <v-row justify="center">
                <v-col cols="auto">
                  {{ language.start }}
                  <span class="font-weight-bold mr-3">{{ section.start }}</span>
                  <v-btn icon @click="ChangeSection(i, 0, 1)">
                    <v-icon color="black">mdi-arrow-up-circle</v-icon>
                  </v-btn>
                  <v-btn icon @click="ChangeSection(i, 0, -1)">
                    <v-icon color="black">mdi-arrow-down-circle</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="auto">
                  {{ language.end }}
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
              >{{ language.addSection }}</v-btn
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
        >
          {{ language.resetAll }}
        </v-btn>
      </v-col>
      <!-- <v-col cols="auto" v-if="!this.isEdit">
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
          >{{ language.saveProgress }}</v-btn
        >
      </v-col> -->
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
          :disabled="sendRequest"
          @click="SubmitCourse"
        >
          {{ language.finishAndSubmit }}</v-btn
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
        Required: value =>
          !!value || this.$store.state.language.createCourseForms.required,
        URLRequired: value => {
          if (this.$store.state.CourseInfo.private == "true" && !value)
            return this.$store.state.language.createCourseForms.required;
          return true;
        }
      },
      allCourses: [],
      AllCategories: [],
      isEdit: false,
      sendRequest: false
    };
  },
  computed: {
    language() {
      return this.$store.state.language.createCourseForms;
    }
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
        CourseCategories: [],
        url: null,
        age: [0, 70],
        private: false,
        components: [],
        sections: []
      };
      if (!this.isEdit) localStorage.removeItem("CourseInfo");
    },
    async SubmitCourse() {
      // disable button
      this.sendRequest = true;
      // Check for validation
      if (!this.$refs.InfoForm.validate()) {
        this.sendRequest = false;
        this.$store.state.newNotification.Message = this.language.fieldErrors;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
        return;
      }
      if (this.$store.state.CourseInfo.components.length == 0) {
        this.sendRequest = false;
        this.$store.state.newNotification.Message = this.language.componentsNeeded;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
        return;
      }
      if (!this.ValidateSections()) {
        this.sendRequest = false;
        return;
      }
      //process the components to be under the correct section
      this.ProcessSections();

      // Show the user that the request is sent please wait
      this.$store.state.newNotification.Message = this.language.pleaseWait;
      this.$store.state.newNotification.state = true;
      this.$store.state.newNotification.color = "info";

      // Sends the Request and remove components property
      // Send Two different Requests one for edit and other for Create
      if (this.$route.name === "CreateCourse") {
        const response = await api.CreateCourse(
          {
            ...this.$store.state.CourseInfo,
            language: localStorage.getItem("lang")
          },
          JSON.parse(localStorage.getItem("userToken"))
        );
        if (response.status === 200) {
          // Reset the data and Route to Home
          this.ResetAll();
          this.$router.push("/");
          // Display a Success Notification
          this.$store.state.newNotification.Message = this.language.addedSuccess;
          this.$store.state.newNotification.state = true;
          this.$store.state.newNotification.color = "success";
        } else {
          this.$store.state.newNotification.Message = response.data;
          this.$store.state.newNotification.state = true;
          this.$store.state.newNotification.color = "error";
        }
      } else {
        // ADD deletedComponents
        this.$store.state.CourseInfo.deletedComponents = this.deletedComponents;
        const response = await api.EditCourse(
          {
            ...this.$store.state.CourseInfo,
            language: localStorage.getItem("lang")
          },
          JSON.parse(localStorage.getItem("userToken"))
        );
        if (response.status === 200) {
          // Reset the data and Route to Home
          this.ResetAll();
          this.$router.push("/");
          // Display a Success Notification
          this.$store.state.newNotification.Message = this.language.addedSuccess;
          this.$store.state.newNotification.state = true;
          this.$store.state.newNotification.color = "success";
        } else {
          this.$store.state.newNotification.Message = response.data;
          this.$store.state.newNotification.state = true;
          this.$store.state.newNotification.color = "error";
        }
      }
      // // Re Enable button
      this.sendRequest = false;
      //this.$refs.InfoForm.reset();
    },
    // SaveProgress() {
    //   localStorage.setItem(
    //     "CourseInfo",
    //     JSON.stringify(this.$store.state.CourseInfo)
    //   );

    //   // Display a Success Notification
    //   this.$store.state.newNotification.Message = this.language.progressSaved;
    //   this.$store.state.newNotification.state = true;
    //   this.$store.state.newNotification.color = "success";
    // },
    RemoveComponent(CNumber) {
      if (this.$store.state.CourseInfo.components[CNumber].id) {
        this.$store.state.CourseInfo.deleted.push({
          id: this.$store.state.CourseInfo.components[CNumber].id,
          type: "component"
        });
      }
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
      if (this.$store.state.CourseInfo.sections[SNumber].id) {
        this.$store.state.CourseInfo.deleted.push({
          id: this.$store.state.CourseInfo.sections[SNumber].id,
          type: "section"
        });
      }
      //Remove a certain section
      this.$store.state.CourseInfo.sections.splice(SNumber, 1);
    },
    ValidateSections() {
      const errorInSections = () => {
        // Display an Error Notification
        this.$store.state.newNotification.Message = this.language.incorrectSections;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
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
          section.components.push({
            ...this.$store.state.CourseInfo.components[i]
          });
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
    // Get Categories
    api.getAllCategories().then(res => {
      if (res.status === 200) {
        this.AllCategories = res.data.map(v => ({
          text: v.name,
          value: v.id
        }));
      }
    });
    //Send request to get all the courses for allCourses
    const response = await api.getAllCourses(0, 200);
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
