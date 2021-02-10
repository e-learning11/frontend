<template>
  <div>
    <!--New section Card Either a Quiz or A video-->
    <v-form ref="VideoForm">
      <v-card
        shaped
        color="white"
        class="pb-5"
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
              New Video
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
            <div class="mr-5 font-weight-bold">Video Title :</div>
            <v-text-field
              v-model="VideoInfo.name"
              :rules="[rules.Required]"
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Video URL :</div>
            <v-text-field
              v-model="VideoInfo.videoID"
              :rules="[rules.Required]"
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Video Description :</div>
            <v-textarea
              filled
              full-width
              class="mt-5 mb-0"
              auto-grow
              v-model="VideoInfo.description"
              :rules="[rules.Required]"
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            class="mb-3"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Attach a File :</div>
            <v-file-input
              label="Upload A File"
              dense
              v-model="VideoInfo.File"
            ></v-file-input>
          </v-col>
        </v-row>
      </v-card>
    </v-form>

    <!-- Add Course Button-->
    <v-row class="mb-10 mt-10" justify="center" align="center">
      <v-btn
        large
        color="red darken-3"
        outlined
        class="white--text text-none text-h6 mr-5"
        @click="Reset"
        >Reset</v-btn
      >
      <v-btn
        large
        color="blue darken-2"
        outlined
        @click="AddVideo"
        class="white--text text-none text-h6"
        v-if="ComponentToEdit === -1"
        >Add Video</v-btn
      >
      <v-btn
        large
        color="blue darken-2"
        outlined
        @click="AddVideo"
        class="white--text text-none text-h6"
        v-else
        >Finish Edit</v-btn
      >
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
      VideoInfo: {
        name: "",
        videoID: "",
        File: null,
        description: ""
      },
      rules: {
        Required: value => !!value || "Required."
      }
    };
  },
  methods: {
    Reset() {
      this.VideoInfo = {
        name: "",
        videoID: "",
        File: null,
        description: ""
      };
    },
    AddVideo() {
      //Check if form is valid
      if (!this.$refs.VideoForm.validate()) return;
      //Emit event to parent to recive data and Set component
      this.$root.$emit("NewComponent", this.VideoInfo);
      // If not an Edit push the value
      if (this.ComponentToEdit === -1) {
        this.$store.state.CourseInfo.components.push({
          ...this.VideoInfo,
          type: "Video"
        });
      }
      // Else change it
      else {
        this.$store.state.CourseInfo.components[this.ComponentToEdit] = {
          ...this.VideoInfo,
          type: "Video"
        };
      }
      //Call Reset
      this.Reset();
    }
  },
  created() {
    // check if prop is not -1 then set the value to the component
    if (this.ComponentToEdit !== -1) {
      this.VideoInfo = this.$store.state.CourseInfo.components[
        this.ComponentToEdit
      ];
    }
  },
  destroyed() {
    this.$root.$emit("FinishEdit");
  }
};
</script>

<style></style>
