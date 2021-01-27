<template>
  <div>
    <!--New section Card Either a Quiz or A video-->
    <v-form ref="VideoForm">
      <v-card shaped color="white" class="pa-8">
        <v-row justify="center" class="mb-5">
          <v-col cols="6">
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
              v-model="VideoInfo.Title"
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
              v-model="VideoInfo.URL"
              :rules="[rules.Required]"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-form>

    <!-- Add Course Button-->
    <v-row class="mb-10 mt-10" justify="center" align="center">
      <v-btn
        x-large
        color="red darken-3"
        outlined
        class="white--text text-none text-h6 mr-5"
        @click="Reset"
        >Reset</v-btn
      >
      <v-btn
        x-large
        color="blue darken-2"
        outlined
        @click="AddVideo"
        class="white--text text-none text-h6"
        >Add Video</v-btn
      >
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      VideoInfo: {
        Title: "",
        URL: ""
      },
      rules: {
        Required: value => !!value || "Required."
      }
    };
  },
  methods: {
    Reset() {
      this.VideoInfo = {
        Title: "",
        URL: ""
      };
    },
    AddVideo() {
      //Check if form is valid
      if (!this.$refs.VideoForm.validate()) return;
      //Emit event to parent to recive data and Set component
      this.$root.$emit("NewComponent", this.VideoInfo);
      this.$store.state.CourseInfo.components.push({
        ...this.VideoInfo,
        type: "video"
      });
      //Call Reset
      this.Reset();
    }
  }
};
</script>

<style></style>
