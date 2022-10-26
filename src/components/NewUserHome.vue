<template>
  <div>
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
            {{ language.courseToSuccess }}
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
            {{ language.successIntro }}
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
          >
            {{ language.joinNow }}
          </v-btn>
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
              {{ language.achieveGoals }}
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
              <h3 class="mb-3 text-h6 font-weight-medium">
                {{ language.learnSkills }}
              </h3>
              <p class="text-h6 font-weight-light">
                {{ language.learnSkillsBody }}
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
                >mdi-human-male-board</v-icon
              >
              <h3 class="mb-3 text-h6 font-weight-medium">
                {{ language.studyCareer }}
              </h3>
              <p class="text-h6 font-weight-light">
                {{ language.studyCareerBody }}
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
                {{ language.earnCert }}
              </h3>
              <p class="text-h6 font-weight-light">
                {{ language.earnCertBody }}
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
                {{ language.benefitSociety }}
              </h3>
              <p class="text-h6 font-weight-light">
                {{ language.benefitSocietyBody }}
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
                <div class="text-h6">{{ language.circleOne }}</div>
              </div>
            </div>
            <div id="circle-two-outer">
              <div id="circle-two-inner" class="center-horizontal text-center">
                <div class="text-h4">20+</div>
                <div class="text-h6">{{ language.circleTwo }}</div>
              </div>
            </div>
            <div id="circle-three-outer">
              <div
                id="circle-three-inner"
                class="center-horizontal text-center"
              >
                <div class="text-h4">13+</div>
                <div class="text-h6">{{ language.circleThree }}</div>
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
            {{ language.accessible }}
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
            {{ language.accessibleBody }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    language() {
      return this.$store.state.language.home;
    }
  }
};
</script>

<style scoped>
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
