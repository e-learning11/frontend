<template>
  <div>
    <!-- Hero Container -->
    <v-container fluid class="hero-container white--text">
      <v-container class="new-container">
        <v-row dense align="center">
          <v-col cols="12" class="center-horizontal">
            <h1
              class="font-weight-bold mb-5 text-center"
              :class="{
                'text-h4': $vuetify.breakpoint.xs,
                'text-h3': $vuetify.breakpoint.sm,
                'text-h1': $vuetify.breakpoint.mdAndUp
              }"
            >
              Adventure Awaits
            </h1>
            <p
              class="mb-10"
              :class="{
                'text-subtitle-1': $vuetify.breakpoint.xs,
                'text-h6': $vuetify.breakpoint.sm,
                'text-h4': $vuetify.breakpoint.mdAndUp
              }"
            >
              What are you waiting for?
            </p>
            <v-btn
              rounded
              color="white"
              class="font-weight-medium text-none"
              x-large
              :class="{
                'text-subtitle-1': $vuetify.breakpoint.xs,
                'text-h6': $vuetify.breakpoint.sm,
                'text-h5': $vuetify.breakpoint.mdAndUp
              }"
              outlined
              >Get Started</v-btn
            >
          </v-col>
          <v-col cols="12" class="center-horizontal mt-5"
            ><v-btn
              color="white"
              text
              @click="scrollto('success-section', 'mycourses-section')"
              ><v-icon size="40" color="white"
                >mdi-chevron-triple-down</v-icon
              ></v-btn
            ></v-col
          >
        </v-row>
      </v-container>
    </v-container>

    <!--New User sections-->
    <NewUserHome v-if="$store.state.currentUser == null"></NewUserHome>

    <!--Registered Users Sections-->
    <RegisteredUserHome v-else> </RegisteredUserHome>

    <!-- Courses Section -->
    <v-container fluid class="courses-container">
      <v-container fill-height class="courses-section new-container">
        <v-row
          no-gutters
          justify="center"
          class="mb-10"
          :class="{
            'mt-1': $vuetify.breakpoint.smAndDown,
            'mt-10': $vuetify.breakpoint.mdAndUp
          }"
        >
          <v-col cols="12">
            <h2
              class="font-weight-light"
              :class="{
                'text-h5': $vuetify.breakpoint.xs,
                'text-center': $vuetify.breakpoint.smAndDown,
                'text-h4': $vuetify.breakpoint.sm,
                'text-h3': $vuetify.breakpoint.mdAndUp
              }"
            >
              Check Out These Amazing Courses
            </h2>
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-for="i in 5"
            :key="i"
            :md="CardHeights[i - 1].cols"
            sm="12"
            class="mb-10"
          >
            <CourseCard
              :height="
                $vuetify.breakpoint.smAndDown ? 250 : CardHeights[i - 1].height
              "
              :CardData="Courses[i - 1]"
            ></CourseCard>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!--footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
import CourseCard from "@/components/CoursesCard.vue";
import NewUserHome from "@/components/NewUserHome.vue";
import RegisteredUserHome from "@/components/RegisteredUserHome.vue";

import img1 from "@/assets/img-4.jpg";
import img2 from "@/assets/img-5.jpg";
import img3 from "@/assets/img-6.jpg";
import img4 from "@/assets/img-7.jpg";
import img5 from "@/assets/img-8.jpg";

export default {
  name: "Home",
  components: { Footer, CourseCard, NewUserHome, RegisteredUserHome },
  methods: {
    scrollto(el, secondaryel) {
      let bodyRect = document.body.getBoundingClientRect().top;
      let element = document.getElementById(el);
      if (element == null) element = document.getElementById(secondaryel);
      let headerOffset = 80;
      let elementPosition = element.getBoundingClientRect().top;
      let offsetPosition = elementPosition - bodyRect - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  },
  data: () => ({
    Courses: [
      {
        image: img1,
        Name: "React Course",
        Author: "Mohamed Elsharbawy",
        text: "Explore the hidden waterfall deep inside the Amazon jungle",
        color: "blue"
      },
      {
        image: img2,
        Name: "React Course",
        Author: "Mohamed Elsharbawy",
        text: "Explore the hidden waterfall deep inside the Amazon jungle",
        color: "blue"
      },
      {
        image: img3,
        Name: "React Course",
        Author: "Mohamed Elsharbawy",
        text: "Explore the hidden waterfall deep inside the Amazon jungle",
        color: "blue"
      },
      {
        image: img4,
        Name: "React Course",
        Author: "Mohamed Elsharbawy",
        text: "Explore the hidden waterfall deep inside the Amazon jungle",
        color: "blue"
      },
      {
        image: img5,
        Name: "React Course",
        Author: "Mohamed Elsharbawy",
        text: "Explore the hidden waterfall deep inside the Amazon jungle",
        color: "blue"
      }
    ],
    CardHeights: [
      { height: 400, cols: 6 },
      { height: 400, cols: 6 },
      { height: 260, cols: 4 },
      { height: 260, cols: 4 },
      { height: 260, cols: 4 }
    ]
  })
};
</script>

<style scoped>
.courses-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
  margin-top: 30px;
}
.courses-container {
  background-color: rgb(245, 245, 245);
}
.hero-container {
  background: url(../assets/img-home.jpg) center center/cover no-repeat;
  height: calc(100vh - 80px);
  width: 100%;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
  object-fit: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center-horizontally {
  text-align: center;
  margin: auto;
}
.center-horizontal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.center-vertical {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.text-large {
  font-size: 5.5rem;
  line-height: 5.5rem;
}
</style>
