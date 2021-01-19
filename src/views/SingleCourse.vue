<template>
  <div class="single-course-container">
    <!--Video Section-->
    <v-container fluid class="video-container">
      <div id="video-wrapper">
        <iframe
          src="https://player.vimeo.com/video/48815306"
          frameborder="0"
          webkitallowfullscreen
          mozallowfullscreen
          allowfullscreen
          id="video-frame"
        ></iframe>
      </div>
    </v-container>
    <v-container class="new-container mb-10 px-0">
      <!--Main Section-->

      <v-row>
        <!--Comments Section-->
        <v-col cols="8">
          <v-row>
            <v-col cols="12">
              <h2 class="pill-text pl-10 text-h4 pt-1 pb-1 font-weight-medium">
                Discussion
              </h2>
            </v-col>
          </v-row>
        </v-col>
        <v-divider vertical inset></v-divider>

        <!--Course RoadMap-->
        <v-col cols="3">
          <v-card outlined class="pt-5 pb-5">
            <v-row>
              <v-col>
                <h2 class="text-center text-h6 font-weight-light pill-text">
                  Components
                </h2></v-col
              >
            </v-row>
            <v-divider class="mx-5"></v-divider>
            <v-row dense align="center" justify="center">
              <v-col
                v-for="i in 10"
                :key="i"
                cols="12"
                class="text-center mb-3"
              >
                this is a section
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!--Footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
import Player from "@vimeo/player";

export default {
  components: { Footer },
  mounted() {
    let iframe = document.querySelector("iframe");
    new Player(iframe);
  }
};
//background-image: linear-gradient(90deg, #5b79a2, #2e4469);
</script>

<style scoped>
.new-container {
  background-color: #ffffff;
}
.video-container {
  background-color: #000;
}
#video-wrapper {
  position: relative;
  width: 100%;
  height: 80vh;
  background-color: #000;
}
#video-frame {
  position: absolute;
  width: 100%;
  height: 100%;
}
.pill-text {
  background-color: rgba(237, 237, 237, 1);
  border-radius: 10px;
  margin: 5px;
}
.header-text {
  color: #2196f3;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
