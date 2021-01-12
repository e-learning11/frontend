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
            ><v-btn color="white" text @click="scrollto('success-section')"
              ><v-icon size="40" color="white"
                >mdi-chevron-triple-down</v-icon
              ></v-btn
            ></v-col
          >
        </v-row>
      </v-container>
    </v-container>

    <!--Road to success Section-->
    <v-container
      id="success-section"
      class="new-container"
      :class="{
        'mb-0': $vuetify.breakpoint.smAndDown,
        'mt-0': $vuetify.breakpoint.smAndDown,
        'pb-5': $vuetify.breakpoint.mdAndUp,
        'pt-5': $vuetify.breakpoint.mdAndUp
      }"
    >
      <v-row
        class="mt-10 mb-10"
        :class="{
          'mb-1': $vuetify.breakpoint.smAndDown,
          'mt-1': $vuetify.breakpoint.smAndDown
        }"
      >
        <v-col
          md="6"
          sm="12"
          class="center-vertical"
          :class="{
            'center-horizontal': $vuetify.breakpoint.smAndDown,
            'pr-3': $vuetify.breakpoint.smAndDown,
            'pr-16': $vuetify.breakpoint.mdAndUp
          }"
        >
          <h2
            class="mb-10 mt-10 font-weight-light"
            :class="{
              'text-h3': $vuetify.breakpoint.smAndDown,
              'text-center': $vuetify.breakpoint.smAndDown,
              'text-h2': $vuetify.breakpoint.md,
              'text-large': $vuetify.breakpoint.lgAndUp
            }"
          >
            Your Course to Success
          </h2>
          <p
            class="text-h6 mb-5 mt-5 font-weight-light"
            :class="{
              'text-subtitle-1': $vuetify.breakpoint.smAndDown,
              'text-center': $vuetify.breakpoint.smAndDown,
              'text-subtitle-1': $vuetify.breakpoint.md,
              'text-h6': $vuetify.breakpoint.lgAndUp
            }"
          >
            Build skills with courses, certificates, and degrees online from
            world-class universities and companies.
          </p>
          <v-btn
            x-large
            width="200"
            height="80"
            to="/register"
            color="blue darken-1"
            class="white--text mb-10 text-h6"
            outlined
            :class="{
              'text-subtitle-1': $vuetify.breakpoint.smAndDown,
              'text-center': $vuetify.breakpoint.smAndDown
            }"
            >Join Now</v-btn
          >
        </v-col>
        <v-col v-if="$vuetify.breakpoint.mdAndUp" md="6">
          <v-img
            height="500"
            src="../assets/Mountain-succes.png"
            class="rounded-img"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>

    <!--Goals Section-->
    <v-container fluid class="goals-section pt-10 pb-10">
      <v-container class="new-container">
        <v-row
          justify="center"
          align="center"
          class="mt-3"
          :class="{
            'mb-5': $vuetify.breakpoint.xs,
            'mb-14': $vuetify.breakpoint.smAndUp
          }"
        >
          <v-col
            ><h2
              class="text-center"
              :class="{
                'text-h5': $vuetify.breakpoint.xs,
                'text-h4': $vuetify.breakpoint.sm,
                'text-h3': $vuetify.breakpoint.mdAndUp
              }"
            >
              Achieve your goals with Us
            </h2></v-col
          >
        </v-row>
        <v-row>
          <v-col md="3" sm="6" cols="12">
            <v-card
              color="rgb(245, 245, 245)"
              elevation="0"
              class="text-center pa-5"
            >
              <v-icon size="60" color="blue lighten-1" class="mb-8"
                >mdi-school-outline</v-icon
              >
              <h3 class="mb-3 text-h6 font-weight-medium">Learn new skills</h3>
              <p class="text-h6 font-weight-light">
                like Managment, graphic design and more
              </p>
            </v-card>
          </v-col>

          <v-col md="3" sm="6" cols="12">
            <v-card
              color="rgb(245, 245, 245)"
              elevation="0"
              class="text-center pa-5"
            >
              <v-icon size="60" color="blue lighten-1" class="mb-8"
                >mdi-teach</v-icon
              >
              <h3 class="mb-3 text-h6 font-weight-medium">
                Study for a career
              </h3>
              <p class="text-h6 font-weight-light">
                in the high-demand fields that are open for work
              </p>
            </v-card>
          </v-col>

          <v-col md="3" sm="6" cols="12">
            <v-card
              color="rgb(245, 245, 245)"
              elevation="0"
              class="text-center pa-5"
            >
              <v-icon size="60" color="blue lighten-1" class="mb-8"
                >mdi-certificate-outline</v-icon
              >
              <h3 class="mb-3 text-h6 font-weight-medium">
                Earn a Certificate
              </h3>
              <p class="text-h6 font-weight-light">
                to show your progress and your hardwork
              </p>
            </v-card>
          </v-col>

          <v-col md="3" sm="6" cols="12">
            <v-card
              color="rgb(245, 245, 245)"
              elevation="0"
              class="text-center pa-5"
            >
              <v-icon size="60" color="blue lighten-1" class="mb-8"
                >mdi-account-group</v-icon
              >
              <h3 class="mb-3 text-h6 font-weight-medium">
                Benefit your Society
              </h3>
              <p class="text-h6 font-weight-light">
                help others by knowing more about the world
              </p>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!--Accesible Section-->
    <v-container
      class="new-container"
      :class="{
        'mb-0': $vuetify.breakpoint.smAndDown,
        'mt-0': $vuetify.breakpoint.smAndDown,
        'pb-5': $vuetify.breakpoint.mdAndUp,
        'pt-5': $vuetify.breakpoint.mdAndUp
      }"
    >
      <v-row
        class="mt-10 mb-10 accessible-section"
        :class="{
          'mb-1': $vuetify.breakpoint.smAndDown,
          'mt-1': $vuetify.breakpoint.smAndDown
        }"
      >
        <v-col
          :class="{
            'col-12': $vuetify.breakpoint.smAndDown,
            'col-6': $vuetify.breakpoint.mdAndUp
          }"
        >
          <v-row
            class="circles-container center-horizontally"
            :class="{
              'ma-10': $vuetify.breakpoint.lgAndUp
            }"
          >
            <div id="circle-one-outer">
              <div id="circle-one-inner" class="center-horizontal text-center">
                <div class="text-h4">3000+</div>
                <div class="text-h6">Courses & Specializations</div>
              </div>
            </div>
            <div id="circle-two-outer">
              <div id="circle-two-inner" class="center-horizontal text-center">
                <div class="text-h4">20+</div>
                <div class="text-h6">University Degrees & Tracks</div>
              </div>
            </div>
            <div id="circle-three-outer">
              <div
                id="circle-three-inner"
                class="center-horizontal text-center"
              >
                <div class="text-h4">13+</div>
                <div class="text-h6">Professional Certificates</div>
              </div>
            </div>
          </v-row>
        </v-col>
        <v-col
          class="center-vertical"
          :class="{
            'col-12': $vuetify.breakpoint.smAndDown,
            'col-6': $vuetify.breakpoint.mdAndUp,
            'center-horizontal': $vuetify.breakpoint.smAndDown,
            'pa-10': $vuetify.breakpoint.smAndDown,
            'pr-16': $vuetify.breakpoint.mdAndUp
          }"
        >
          <h2
            class="mb-10 mt-10 font-weight-light"
            :class="{
              'text-h3': $vuetify.breakpoint.smAndDown,
              'text-center': $vuetify.breakpoint.smAndDown,
              'text-h2': $vuetify.breakpoint.md,
              'text-large': $vuetify.breakpoint.lgAndUp
            }"
          >
            Accessible & Diverse
          </h2>
          <p
            class="text-h6 mb-5 mt-5 font-weight-light"
            :class="{
              'text-subtitle-1': $vuetify.breakpoint.smAndDown,
              'text-center': $vuetify.breakpoint.smAndDown,
              'text-subtitle-1': $vuetify.breakpoint.md,
              'text-h6': $vuetify.breakpoint.lgAndUp
            }"
          >
            Choose from many courses, certificates and degrees. Learning at your
            own pace, 100% online.
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Courses Section -->
    <v-container fluid class="courses-container">
      <v-container fill-height class="courses-section new-container">
        <v-row
          no-gutters
          justify="center"
          align="center"
          class="mb-10"
          :class="{
            'mt-1': $vuetify.breakpoint.smAndDown,
            'mt-10': $vuetify.breakpoint.mdAndUp
          }"
        >
          <h2
            :class="{
              'text-h5': $vuetify.breakpoint.xs,
              'text-center': $vuetify.breakpoint.smAndDown,
              'text-h4': $vuetify.breakpoint.sm,
              'text-h3': $vuetify.breakpoint.mdAndUp
            }"
          >
            Check Out These Amazing Courses
          </h2>
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
import img1 from "@/assets/img-4.jpg";
import img2 from "@/assets/img-5.jpg";
import img3 from "@/assets/img-6.jpg";
import img4 from "@/assets/img-7.jpg";
import img5 from "@/assets/img-8.jpg";

export default {
  name: "Home",
  components: { Footer, CourseCard },
  methods: {
    scrollto(el) {
      var element = document.getElementById(el);
      var headerOffset = 80;
      var elementPosition = element.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;

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
.goals-section {
  background-color: rgb(245, 245, 245);
}
.circles-container {
  position: relative;
  overflow: hidden;
  height: 400px;
  max-width: 500px;
}
#circle-one-outer {
  position: absolute;
  top: 0;
  left: 50%;
}
#circle-one-inner {
  position: relative;
  left: -50%;
  border: 5px solid #546e7a;
  color: #546e7a;
  font-size: 32px;
  font-weight: 500;
  border-radius: 50%;
  width: 270px;
  height: 270px;
  z-index: 2;
  background-color: #ffffff;
}
#circle-two-outer {
  position: absolute;
  bottom: 0;
  left: 25%;
}
#circle-two-inner {
  position: relative;
  left: -50%;
  border: 5px solid #546e7a;
  color: #546e7a;
  font-size: 26px;
  font-weight: 500;
  border-radius: 50%;
  width: 230px;
  height: 230px;
  z-index: 1;
  background-color: #ffffff;
}
#circle-three-outer {
  position: absolute;
  bottom: 5%;
  left: 75%;
}
#circle-three-inner {
  position: relative;
  left: -50%;
  border: 5px solid #546e7a;
  color: #546e7a;
  font-size: 22px;
  font-weight: 500;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  z-index: 3;
  background-color: #ffffff;
}

@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
@media (max-width: 600px) {
  .circles-container {
    height: auto;
    max-width: 500px;
    display: flex;
    justify-content: center;
  }
  #circle-one-outer {
    position: static;
    margin-bottom: 5px;
  }
  #circle-one-inner {
    position: static;
    width: 220px;
    height: 220px;
  }
  #circle-two-outer {
    position: static;
    margin-bottom: 5px;
  }
  #circle-two-inner {
    position: static;
    width: 220px;
    height: 220px;
  }
  #circle-three-inner {
    position: static;
    width: 220px;
    height: 220px;
  }
  #circle-three-outer {
    position: static;
  }
}
</style>
