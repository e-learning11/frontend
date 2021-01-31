<template>
  <div class="single-course-container">
    <!--Skeleton loader Until request finishes-->
    <v-container class="mt-10 mb-10" v-if="CourseComponent === null">
      <v-row dense>
        <v-col cols="12">
          <v-skeleton-loader type="image,card-avatar,image"></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-container>

    <!--Single Course Page After Fetching Data-->
    <template v-if="CourseComponent != null">
      <!--Test Form section-->
      <v-container
        class="test-section new-container mt-10 mb-10"
        v-if="CourseComponent.type === 'Test'"
      >
        <v-card
          color="white"
          shaped
          elevation="2"
          class="pa-10"
          max-width="900"
        >
          <v-row justify="center" align="center" class="mb-2">
            <v-col cols="12">
              <h2 class="text-h3 font-weight-light">
                Test your Understanding
              </h2></v-col
            >
          </v-row>
          <v-divider class="mb-8"></v-divider>
          <!--Indivdual Questions-->
          <v-form v-model="validForm" ref="testForm" v-if="TestData.takeTest">
            <v-row class="px-16">
              <v-col
                cols="12"
                v-for="(Question, i) in CourseComponent.Test"
                :key="i"
              >
                <h3 class="text-h5 font-weight-medium mb-3">
                  Question {{ i + 1 }}: {{ Question.Q }}
                </h3>
                <div class="ml-10">
                  <v-radio-group
                    required
                    :rules="[v => !!v || 'Question not Answered']"
                    v-model="TestData.finalAnswers[i]"
                  >
                    <v-radio
                      v-for="(Answer, j) in Question.A"
                      :key="j"
                      :label="Answer"
                      :value="Answer"
                    ></v-radio>
                  </v-radio-group>
                </div>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col cols="auto">
                <v-btn
                  x-large
                  outlined
                  color="blue darken-2"
                  class="text-h5 white--text mt-5 text-none"
                  @click="validateTest"
                  :disabled="!validForm"
                >
                  Submit
                </v-btn>
              </v-col>
            </v-row>
          </v-form>

          <!--Score Screen-->
          <v-row justify="center" v-if="!TestData.takeTest">
            <v-col cols="12">
              <h3 class="text-center text-h5">Your Current Score is</h3>
              <h4 class="text-center text-h6">{{ TestData.currentScore }}</h4>
            </v-col>
            <v-col cols="auto">
              <v-btn
                x-large
                outlined
                color="blue darken-2"
                class="text-h5 white--text mt-5 text-none"
                @click="TestData.takeTest = true"
              >
                Retake
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <!--Assignmet Section-->
      <v-container
        class="test-section new-container mt-10 mb-10"
        v-if="CourseComponent.type === 'Assignment'"
      >
        <v-card
          color="white"
          shaped
          elevation="2"
          class="pa-10"
          max-width="900"
        >
          <v-row justify="center">
            <v-col cols="12">
              <h3 class="text-center text-h4">{{ CourseComponent.name }}</h3>
            </v-col>
            <v-col cols="12" class="text-center">
              <v-btn
                large
                outlined
                color="blue darken-2"
                class="text-h6 white--text mt-5 text-none"
                @click="DownloadFile"
              >
                Download Assignment
              </v-btn>

              <v-divider class="mt-5"></v-divider>
            </v-col>
            <v-col cols="10" class="mt-10 text-center">
              <v-form ref="AssignmentForm" v-model="validAssignment">
                <v-file-input
                  label="Upload your work"
                  dense
                  v-model="AssignmentFile"
                  :rules="[v => !!v || 'No Work Submitted']"
                ></v-file-input>
              </v-form>

              <v-btn
                large
                outlined
                color="blue darken-2"
                class="text-h6 white--text mt-5 text-none"
                :disabled="!validAssignment"
                @click="SubmitAssignmet"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>

      <!--Video Section-->
      <v-container
        fluid
        class="video-container"
        v-if="CourseComponent.type === 'Video'"
      >
        <div id="video-wrapper">
          <iframe
            :src="videoURL"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            id="video-frame"
          ></iframe>
        </div>
      </v-container>

      <!--Main Section-->
      <v-container class="new-container mb-10 px-3">
        <!--Course Registration button-->
        <v-row justify="center" class="mt-5 mb-5" v-if="!canView">
          <v-col cols="auto">
            <v-btn
              x-large
              height="100"
              outlined
              color="blue darken-3"
              class="white--text mb-5 text-none"
              :class="{
                'text-h4': $vuetify.breakpoint.smAndUp,
                'text-h6': $vuetify.breakpoint.xs
              }"
              @click="registerCourse"
            >
              Register For this Course
              <v-icon class="ml-3" size="40">mdi-notebook-edit-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <!--Name and Info section-->
        <v-row justify="center" class="mt-5 mb-5">
          <v-col
            cols="auto"
            class="arrow"
            v-if="$route.params.componentNumber != 1 && canView"
          >
            <v-btn
              icon
              color="white"
              :to="calcRoute($route.params.componentNumber - 1)"
            >
              <v-icon size="40" color="grey">mdi-chevron-left</v-icon>
            </v-btn>
          </v-col>
          <v-col
            cols="10"
            class="pill-text common-background white--text text-center"
          >
            <h2 class="text-h4 font-weight-medium mb-3 mt-5">
              {{ course.name }}
            </h2>
            <p class="text-h6 font-weight-light">
              Episode {{ CourseComponent.number }}: {{ CourseComponent.name }}
            </p>
            <template v-if="canView">
              <v-btn
                x-large
                outlined
                color="white"
                class="text-h5 white--text mb-5 text-none"
                v-if="
                  Number($route.params.componentNumber) === currentComponent
                "
                @click="currentComponent++"
              >
                Mark as Read
                <v-icon class="ml-2">mdi-sticker-check-outline</v-icon>
              </v-btn>
              <v-btn
                v-else
                x-large
                outlined
                color="white"
                class="text-h5 white--text mb-5 text-none"
                disabled
              >
                Marked as Read
                <v-icon class="ml-2">mdi-sticker-check-outline</v-icon>
              </v-btn>
            </template>
          </v-col>
          <v-col
            cols="auto"
            class="arrow"
            v-if="
              $route.params.componentNumber != this.course.components.length &&
                canView
            "
          >
            <v-btn
              color="white"
              icon
              class="rounded-lg"
              :to="calcRoute(Number($route.params.componentNumber) + 1)"
              :disabled="$route.params.componentNumber >= currentComponent"
            >
              <v-icon size="40" color="grey">mdi-chevron-right</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row justify="center">
          <!--Comments Section-->
          <v-col
            :class="{
              'col-9': $vuetify.breakpoint.mdAndUp,
              'col-10': $vuetify.breakpoint.sm,
              'col-12': $vuetify.breakpoint.xs
            }"
            class="pa-10"
          >
            <v-row>
              <!--Comments Header-->
              <v-col
                cols="12"
                class="pill-text mb-5 common-background white--text"
              >
                <h2
                  class=" text-h5 pt-3 pb-3 pl-3 font-weight-medium text-center"
                >
                  Comments
                </h2>
              </v-col>
            </v-row>
            <!--Single comments-->
            <v-row>
              <v-col
                cols="12"
                v-for="(comment, i) in CourseComponent.comments"
                :key="i"
                class="pill-text mt-3 mb-2 pt-5"
              >
                <v-row dense align="start">
                  <v-col cols="auto">
                    <v-icon size="60" color="grey darken-2">
                      mdi-account-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="auto" class="pl-3">
                    <h3 class="text-h6 font-weight-medium">
                      {{ comment.userName }}
                    </h3>
                    <h4 class="text-caption font-weight-light">
                      {{ comment.date }}
                    </h4>
                    <p class="text-body font-weight-light mt-5 mb-2">
                      {{ comment.data }}
                    </p>
                  </v-col>
                </v-row>
              </v-col>

              <!-- Add a Comment-->
              <v-col cols="12" class="pill-text mt-3 mb-2 pt-5" v-if="canView">
                <v-row dense align="start">
                  <v-col cols="auto">
                    <v-icon size="60" color="grey darken-2">
                      mdi-account-circle
                    </v-icon>
                  </v-col>
                  <v-col cols="10" class="pl-3">
                    <h3 class="text-h6 font-weight-medium">
                      {{ $store.state.currentUser.name }}
                    </h3>
                    <v-textarea
                      filled
                      full-width
                      name="newComment"
                      label="Share a Comment"
                      class="mt-7 mb-0"
                      auto-grow
                      v-model="newCommentText"
                    ></v-textarea>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-btn
                    x-large
                    outlined
                    color="blue darken-2"
                    class="text-h5 white--text mb-5 text-none"
                    @click="addComment"
                  >
                    Add Comment
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-col>

          <!--Course RoadMap-->
          <v-col
            :class="{
              'col-3': $vuetify.breakpoint.mdAndUp,
              'col-8': $vuetify.breakpoint.sm,
              'col-12': $vuetify.breakpoint.xs,
              'order-first': $vuetify.breakpoint.smAndDown
            }"
            class="pt-8"
          >
            <div class="pa-3 courses-card">
              <h2
                class="text-center text-h6 font-weight-medium pill-text pt-2 pb-2 common-background white--text mb-5"
              >
                Components
              </h2>
              <v-row dense align="center" justify="center">
                <v-col
                  v-for="(comp, i) in course.components"
                  :key="i"
                  cols="12"
                  class="text-left mb-1"
                >
                  <router-link
                    :to="calcRoute(i + 1)"
                    active-class="active-component-link"
                    class="text-none text-body text-left component-link"
                    :class="{
                      'disabled-link': currentComponent < i + 1
                    }"
                  >
                    <div class="ml-2 mr-2 number-circle">{{ comp.number }}</div>
                    <div class="ml-2 mr-2">
                      {{ comp.name }}
                    </div>
                  </router-link>
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>

    <!--Footer-->
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
//import Player from "@vimeo/player";
import api from "api-client";

export default {
  components: { Footer },
  data() {
    return {
      CourseComponent: null,
      course: null,
      currentComponent: 1,
      canView: true,
      validForm: false,
      newCommentText: "",
      TestData: {
        finalAnswers: [],
        takeTest: true,
        currentScore: 0
      },
      AssignmentFile: null,
      validAssignment: false
    };
  },
  computed: {
    videoURL() {
      return "https://player.vimeo.com/video/" + this.CourseComponent.videoID;
    }
  },
  methods: {
    calcRoute(routeNum) {
      return "/course/" + this.$route.params.courseId + "/" + routeNum;
    },
    async validateTest() {
      // Validate the form
      if (!this.$refs.testForm.validate()) return;

      //Send the answers to server and get the Score
      let response = await api.getTestScore(this.TestData.finalAnswers);

      //Check the response
      if (response.status === 200) {
        this.TestData.currentScore = response.data;
        this.TestData.takeTest = false;
        this.TestData.finalAnswers = [];

        // Return ot top
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    },
    registerCourse() {
      // if there is no user redirect him to login
      if (this.$store.state.currentUser == null) this.$router.push("/login");
      // @TODO Send the request to register the user
      this.canView = true;
    },
    addComment() {
      // if There is no data in the comment return
      if (this.newCommentText === "") return;
      //Get the Comment data from the page
      const newComment = {
        userName: this.$store.state.currentUser.name,
        date: "Now",
        data: this.newCommentText
      };
      // @TODO Send the request to add comment

      // If successful add the comment to the data
      this.newCommentText = "";
      this.CourseComponent.comments.push(newComment);
    },
    SubmitAssignmet() {
      // Validate the form
      if (!this.$refs.AssignmentForm.validate()) return;

      //@TODO Send the request of Assignment
      //@TODO check How the Assignment Would be graded
    },
    DownloadFile() {
      //@TODO Check how the file will come from request and Download
    }
  },

  async beforeRouteUpdate(to, from, next) {
    // If routing to the same component change current component number
    if (to.params.componentNumber) {
      this.CourseComponent = this.course.components[
        to.params.componentNumber - 1
      ];
    }
    // @TODO Take values from request
    // Reset test Values and Assignment Files
    this.TestData = {
      finalAnswers: [],
      takeTest: true,
      currentScore: 0
    };
    this.AssignmentFile = null;
    // call next
    next();
  },
  async created() {
    // Send the request
    const response = await api.getCourseByid(
      this.$route.params.courseId,
      this.$route.params.componentNumber
    );
    // If response is successful
    if (response.status === 200) {
      // Set the Data recieved from response
      // whole course data
      this.course = response.data;
      // current component of the course
      this.CourseComponent = this.course.components[
        this.$route.params.componentNumber - 1
      ];
      //Check if there isnt a user logged or the user has registered this course
      if (this.$store.state.currentUser == null || !this.course.registered) {
        // Set can View to false and push the router to the first page of course
        this.canView = false;
        if (Number(this.$route.params.componentNumber) !== 1)
          this.$router.push(`/course/${this.course.id}/1`);
      }
      // else Set the Current Component
      else {
        // @TODO Change this to take from the request
        this.currentComponent = Number(this.$route.params.componentNumber);
      }
    }
    // Else route to Not found
    else {
      this.$router.push("/404");
    }
  }
};
</script>

<style scoped>
.new-container {
  background-color: #ffffff;
}
.test-section {
  display: flex;
  justify-content: center;
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
  background-color: rgba(250, 250, 250, 1);
  border-radius: 10px;
  border: 1px solid rgba(237, 237, 237, 1);
  margin: 5px;
}
.header-text {
  color: #2196f3;
}
.common-background {
  background-color: #01579b;
}
.arrow {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin: 5px;
  background-color: rgba(237, 237, 237, 1);
}
.courses-card {
  border: 1px solid rgba(237, 237, 237, 1);
  border-radius: 10px;
}
.component-link .number-circle {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(237, 237, 237, 1);
}
.component-link {
  text-decoration: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 5px 3px;
  border-radius: 10px;
  color: #000;
  background-color: rgba(250, 250, 250, 1);
  border-radius: 10px;
  border: 1px solid rgba(250, 250, 250, 1);
}
.active-component-link {
  color: #000;
  background-color: rgba(237, 237, 237, 1);
  border-radius: 10px;
  border: 1px solid rgba(237, 237, 237, 1);
}
.active-component-link .number-circle {
  border: 2px solid #fff;
  background-color: #01579b;
  color: #fff;
}
.component-link:hover {
  background-color: rgba(237, 237, 237, 1);
}
.disabled-link {
  opacity: 0.5;
  pointer-events: none;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
@media (max-width: 500px) {
  #video-wrapper {
    height: 320px;
  }
}
</style>
