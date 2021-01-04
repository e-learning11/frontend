<template>
  <div>
    <!-- Hero Container -->
    <v-container fluid class="hero-container white--text">
      <v-row dense align="center">
        <v-col cols="12" class="center-horizontally">
          <h1
            class="font-weight-bold mb-5"
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
      </v-row>
    </v-container>
    <!-- Courses Section -->
    <v-container fill-height class="courses-section">
      <v-row no-gutters justify="center" align="center" class="mb-5 mt-5">
        <h2
          :class="{
            'text-subtitle-1': $vuetify.breakpoint.xs,
            'text-h6': $vuetify.breakpoint.sm,
            'text-h3': $vuetify.breakpoint.mdAndUp
          }"
        >
          Check Out These Amazing Courses
        </h2>
      </v-row>
      <v-row>
        <v-col v-for="i in 5" :key="i" :md="CardHeights[i - 1].cols" sm="12">
          <CourseCard
            :height="
              $vuetify.breakpoint.smAndDown ? 250 : CardHeights[i - 1].height
            "
            :CardData="Courses[i - 1]"
          ></CourseCard>
        </v-col>
      </v-row>
    </v-container>

    <!--footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
import CourseCard from "@/components/CoursesCard.vue";
import img1 from "@/assets/img-4.jpg";
import img2 from "@/assets/img-5.jpg";
import img3 from "@/assets/img-6.jpg";
import img4 from "@/assets/img-7.jpg";
import img5 from "@/assets/img-8.jpg";

export default {
  name: "Home",
  components: { Footer, CourseCard },
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
      { height: 450, cols: 6 },
      { height: 450, cols: 6 },
      { height: 300, cols: 4 },
      { height: 300, cols: 4 },
      { height: 300, cols: 4 }
    ]
  })
};
</script>

<style scoped>
.courses-section {
  min-height: 150vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;
}
.hero-container {
  background: url(../assets/img-home.jpg) center center/cover no-repeat;
  min-height: 90vh;
  width: 100%;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.3);
  object-fit: contain;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.center-horizontally {
  text-align: center;
}
</style>
