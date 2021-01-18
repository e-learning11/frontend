<template>
  <div>
    <!-- Hero Container -->
    <v-container fluid class="hero-container white--text">
      <v-container class="new-container">
        <v-row dense align="center">
          <v-col cols="12" class="text-center">
            <h1
              class="font-weight-bold mb-5"
              :class="{
                'text-h4': $vuetify.breakpoint.xs,
                'text-h3': $vuetify.breakpoint.sm,
                'text-h1': $vuetify.breakpoint.mdAndUp
              }"
            >
              Courses
            </h1>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!--Search query section-->
    <v-container fluid class="search-section">
      <v-container class="new-container">
        <v-row dense align="center" justify="center" class="mt-10 mb-5">
          <v-col cols="12" class="text-center text-h5 font-weight-light">
            Showing {{ Courses.length }} Total Results
          </v-col>
          <v-col
            cols="12"
            class="text-center font-weight-medium text-subtitle-1 mb-10"
          >
            Filter by
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col
            v-for="i in 5"
            :key="i"
            cols="auto"
            class="text-left center-horizontal"
          >
            <v-menu offset-y>
              <template v-slot:activator="{ on }">
                <v-btn
                  color="blue"
                  class="black-text text-none text-left"
                  elevation="0"
                  tile
                  outlined
                  v-on="on"
                  max-width="150"
                >
                  Language
                  <v-icon class="ml-5"> mdi-chevron-down</v-icon>
                </v-btn>
              </template>
              <v-list dense>
                <li
                  v-for="(item, index) in items"
                  :key="index"
                  class="list-item"
                >
                  <div>{{ item.title }}</div>
                </li>
              </v-list>
            </v-menu>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!--Courses Searched section-->
    <v-container fluid class="courses-section">
      <v-container class="new-container">
        <v-row dense align="center" justify="center">
          <v-col
            cols="12"
            class="text-left"
            v-for="i in Courses.length"
            :key="i"
            md="4"
            sm="12"
          >
            <CourseCard
              class="pa-10"
              :height="CardHeight"
              :CardData="Courses[i - 1]"
            ></CourseCard>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

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
      },
      {
        image: img5,
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
      },
      {
        image: img5,
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
      },
      {
        image: img5,
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
    CardHeight: 250,
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me 2" }
    ]
  })
};
</script>

<style scoped>
.hero-container {
  background: url(../assets/img-2.jpg) center center/cover no-repeat;
  width: 100%;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  object-fit: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
}

.search-section {
  background-color: rgb(245, 245, 245);
}
.list-item {
  list-style: none;
  padding: 5px;
}
.list-item:hover {
  color: #2196f3;
  cursor: pointer;
  border: 2px solid #2196f3;
}

.center-horizontal {
  display: flex;
  justify-content: center;
}

@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
