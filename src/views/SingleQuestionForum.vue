<template>
  <div class="forum-container">
    <Loading v-if="waitRequest"></Loading>
    <v-container fluid v-else>
      <v-container class="new-container pa-0">
        <v-card
          outlined
          color="#FAFAFA"
          class="pa-5 rounded-t-xl border-card text-center text-h5 mt-5 font-weight-bold"
          tile
          flat
        >
          {{ Question.tag }}
        </v-card>
        <v-card outlined tile flat class="rounded-b-lg pt-5 pb-7 px-5 mb-10">
          <!--Question and its Comments-->
          <v-row dense>
            <v-col
              :class="{
                'text-center': $vuetify.breakpoint.xs,
                'col-auto': $vuetify.breakpoint.smAndUp,
                'col-12': $vuetify.breakpoint.xs
              }"
              class="text-center font-weight-light px-5"
              ><v-avatar size="70" color="white">
                <v-img :src="UserImage"></v-img>
              </v-avatar>
            </v-col>
            <v-col
              :class="{
                'col-10': $vuetify.breakpoint.smAndUp,
                'col-12': $vuetify.breakpoint.xs
              }"
              class="px-5"
            >
              <div class="text-subtitle-1 font-weight-light">
                {{ language.postedBy }}
                <span class="font-weight-medium">{{ Question.name }}</span>
              </div>
              <div class="text-h4 font-weight-bold">
                {{ Question.title }}
              </div>
              <div class="text-body-1 font-weight-light mt-7 mb-5">
                {{ Question.body }}
              </div>
              <v-card
                flat
                elevation="0"
                color="grey lighten-4"
                class="pa-8 mt-10 rounded-xl"
              >
                <v-row>
                  <!--comments-->
                  <v-col cols="12">
                    <v-row
                      dense
                      v-for="(comment, i) in Question.comments"
                      :key="i"
                    >
                      <v-col
                        :class="{
                          'text-center': $vuetify.breakpoint.xs,
                          'col-auto': $vuetify.breakpoint.smAndUp,
                          'col-12': $vuetify.breakpoint.xs
                        }"
                        class="text-center font-weight-light"
                        ><v-avatar size="30" color="white">
                          <v-img :src="UserImage"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col
                        :class="{
                          'col-10': $vuetify.breakpoint.smAndUp,
                          'col-12': $vuetify.breakpoint.xs,
                          'text-center': $vuetify.breakpoint.xs
                        }"
                        class="px-5"
                      >
                        <div class="text-caption font-weight-light">
                          {{ language.postedBy }}
                          <span class="font-weight-medium text-subtitle-2">{{
                            comment.name
                          }}</span>
                        </div>
                        <div class="text-body-2 font-weight-light mt-2 mb-5">
                          {{ comment.title }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>
            <v-col cols="12" class="text-center mt-5">
              <v-btn
                text
                outlined
                class="text-none"
                @click="showMainComment = !showMainComment"
                >Add Comment<v-icon color="grey" size="20" class="mx-3"
                  >mdi-message-reply</v-icon
                ></v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-expand-transition>
                <v-form class="mt-10" v-show="showMainComment">
                  <v-row justify="center" align="center">
                    <v-col
                      :class="{
                        'text-center': $vuetify.breakpoint.xs,
                        'col-auto': $vuetify.breakpoint.smAndUp,
                        'col-12': $vuetify.breakpoint.xs
                      }"
                      class="text-center font-weight-light"
                      ><v-avatar size="30" color="white">
                        <v-img :src="UserImage"></v-img>
                      </v-avatar>
                      <div class="mt-4 text-caption">
                        Posting as
                        <span class="font-weight-medium">{{
                          $store.state.currentUser.firstName
                        }}</span>
                      </div>
                    </v-col>
                    <v-col
                      :class="{
                        'col-8': $vuetify.breakpoint.smAndUp,
                        'col-12': $vuetify.breakpoint.xs
                      }"
                    >
                      <v-textarea
                        filled
                        full-width
                        :rules="[rules.Required]"
                        auto-grow
                        :placeholder="language.addQuestion"
                        hide-details
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="text-center mb-5">
                      <v-btn
                        outlined
                        class="mx-5 text-none"
                        color="blue darken-4"
                      >
                        {{ language.askQuestion }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-expand-transition>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-10">
            <v-col cols="12" class="mx-10 text-h6">
              {{ Question.answers.length }} Answers
            </v-col>
            <v-col cols="12" class="px-0 mt-5">
              <v-divider
                class="grey--text text-center divider"
              ></v-divider></v-col
          ></v-row>
          <!--Answers and Their Comments-->
          <v-row
            dense
            v-for="(answer, i) in Question.answers"
            :key="i"
            class="mt-10"
          >
            <v-col
              :class="{
                'text-center': $vuetify.breakpoint.xs,
                'col-auto': $vuetify.breakpoint.smAndUp,
                'col-12': $vuetify.breakpoint.xs
              }"
              class="text-center font-weight-light px-5"
              ><v-avatar size="70" color="white">
                <v-img :src="UserImage"></v-img>
              </v-avatar>
            </v-col>
            <v-col
              :class="{
                'col-10': $vuetify.breakpoint.smAndUp,
                'col-12': $vuetify.breakpoint.xs
              }"
              class="px-5"
            >
              <v-row>
                <v-col
                  :class="{
                    'text-center': $vuetify.breakpoint.xs,
                    'col-10': $vuetify.breakpoint.smAndUp,
                    'col-12': $vuetify.breakpoint.xs
                  }"
                >
                  <div class="text-caption font-weight-light">
                    {{ language.postedBy }}
                    <span class="font-weight-medium text-body-1">{{
                      answer.name
                    }}</span>
                  </div>
                  <div class="text-body-1 font-weight-light mt-7 mb-5">
                    {{ answer.title }}
                  </div>
                </v-col>
                <v-spacer></v-spacer>
                <v-col
                  :class="{
                    'col-auto': $vuetify.breakpoint.smAndUp,
                    'col-12': $vuetify.breakpoint.xs
                  }"
                  class="text-center"
                >
                  <v-card
                    max-width="40"
                    color="grey lighten-4"
                    outlined
                    flat
                    tile
                    class="rounded-xl mx-auto"
                  >
                    <v-row no-gutters justify="center" align="center">
                      <v-col
                        cols="12"
                        :class="{ 'text-center': $vuetify.breakpoint.xs }"
                        class="text-center"
                      >
                        <v-btn icon
                          ><v-icon>mdi-chevron-up</v-icon></v-btn
                        ></v-col
                      >
                      <v-col cols="12" class="text-center">
                        5
                      </v-col>
                      <v-col cols="12" class="text-center">
                        <v-btn icon
                          ><v-icon>mdi-chevron-down</v-icon></v-btn
                        ></v-col
                      >
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
              <v-card
                flat
                elevation="0"
                color="grey lighten-4"
                class="pa-8 mt-10 rounded-xl"
              >
                <v-row>
                  <!--comments-->
                  <v-col cols="12">
                    <v-row
                      dense
                      v-for="(comment, i) in answer.comments"
                      :key="i"
                    >
                      <v-col
                        :class="{
                          'text-center': $vuetify.breakpoint.xs,
                          'col-auto': $vuetify.breakpoint.smAndUp,
                          'col-12': $vuetify.breakpoint.xs
                        }"
                        class="text-center font-weight-light"
                        ><v-avatar size="30" color="white">
                          <v-img :src="UserImage"></v-img>
                        </v-avatar>
                      </v-col>
                      <v-col
                        :class="{
                          'col-10': $vuetify.breakpoint.smAndUp,
                          'col-12': $vuetify.breakpoint.xs,
                          'text-center': $vuetify.breakpoint.xs
                        }"
                        class="px-5"
                      >
                        <div class="text-caption font-weight-light">
                          {{ language.postedBy }}
                          <span class="font-weight-medium text-subtitle-2">{{
                            comment.name
                          }}</span>
                        </div>
                        <div class="text-body-2 font-weight-light mt-2 mb-5">
                          {{ comment.title }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-col>

            <v-col cols="12" class="text-center mt-5 mb-5">
              <v-btn
                text
                outlined
                class="text-none"
                @click="toggleCommentAnswer(answer.id)"
                >Add Comment<v-icon color="grey" size="20" class="mx-3"
                  >mdi-message-reply</v-icon
                ></v-btn
              >
            </v-col>
            <v-col cols="12">
              <v-expand-transition>
                <v-form class="mt-10" v-show="showAnswersComment[answer.id]">
                  <v-row justify="center" align="center">
                    <v-col
                      :class="{
                        'text-center': $vuetify.breakpoint.xs,
                        'col-auto': $vuetify.breakpoint.smAndUp,
                        'col-12': $vuetify.breakpoint.xs
                      }"
                      class="text-center font-weight-light"
                      ><v-avatar size="30" color="white">
                        <v-img :src="UserImage"></v-img>
                      </v-avatar>
                      <div class="mt-4 text-caption">
                        Posting as
                        <span class="font-weight-medium">{{
                          $store.state.currentUser.firstName
                        }}</span>
                      </div>
                    </v-col>
                    <v-col
                      :class="{
                        'col-8': $vuetify.breakpoint.smAndUp,
                        'col-12': $vuetify.breakpoint.xs
                      }"
                    >
                      <v-textarea
                        filled
                        full-width
                        :rules="[rules.Required]"
                        auto-grow
                        :placeholder="language.addQuestion"
                        hide-details
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="text-center mb-5">
                      <v-btn
                        outlined
                        class="mx-5 text-none"
                        color="blue darken-4"
                      >
                        {{ language.askQuestion }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-expand-transition>
            </v-col>

            <v-col cols="12" v-if="i !== Question.answers.length - 1">
              <v-responsive max-width="80%" class="mx-auto">
                <v-divider
                  class="grey--text text-center"
                ></v-divider></v-responsive
            ></v-col>
          </v-row>

          <!--Add an Answer-->
          <v-row no-gutters class="mt-10">
            <v-col cols="12" class="mx-10 text-h6">
              Add an Answer
            </v-col>
            <v-col cols="12" class="px-0 mt-5">
              <v-divider
                class="grey--text text-center divider"
              ></v-divider></v-col
          ></v-row>
          <v-form class="mt-10">
            <v-row justify="center" align="start">
              <v-col
                :class="{
                  'text-center': $vuetify.breakpoint.xs,
                  'col-auto': $vuetify.breakpoint.smAndUp,
                  'col-12': $vuetify.breakpoint.xs
                }"
                class="text-center font-weight-light"
                ><v-avatar size="70" color="white">
                  <v-img :src="UserImage"></v-img>
                </v-avatar>
                <div class="mt-4">
                  Posting as
                  <span class="font-weight-medium">{{
                    $store.state.currentUser.firstName
                  }}</span>
                </div>
              </v-col>
              <v-col
                :class="{
                  'col-8': $vuetify.breakpoint.smAndUp,
                  'col-12': $vuetify.breakpoint.xs
                }"
              >
                <v-textarea
                  filled
                  full-width
                  :rules="[rules.Required]"
                  auto-grow
                  hide-details
                  :placeholder="language.addQuestion"
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="text-center">
                <v-btn outlined class="mx-5 text-none" color="blue darken-4">
                  {{ language.askQuestion }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-container>
    </v-container>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
import Loading from "@/components/Loading.vue";
import api from "api-client";

export default {
  components: { Footer, Loading },
  data() {
    return {
      waitRequest: true,
      rules: {
        Required: value => !!value || "Required."
      },
      showMainComment: false,
      showAnswersComment: {},
      Question: {
        tag: "JavaScript",
        name: "Asker",
        title: "This is the Question",
        body:
          "This is the Question This is the Question This is the Question This is the Question",
        date: "6 hours ago",
        comments: [
          {
            name: "Tester",
            title: "This is the an Answer",
            date: "6 hours ago"
          },
          {
            name: "Tester",
            title: "This is the an Answer",
            date: "6 hours ago"
          }
        ],
        answers: [
          {
            name: "Tester",
            id: 5,
            title: "This is the an Answer",
            date: "6 hours ago",
            comments: [
              {
                name: "Tester",
                title: "This is the an Answer",
                date: "6 hours ago"
              },
              {
                name: "Tester",
                title: "This is the an Answer",
                date: "6 hours ago"
              }
            ]
          },
          {
            name: "Tester",
            title: "This is the an Answer",
            id: 10,
            date: "6 hours ago",
            comments: [
              {
                name: "Tester",
                title: "This is the an Answer",
                date: "6 hours ago"
              },
              {
                name: "Tester",
                title: "This is the an Answer",
                date: "6 hours ago"
              }
            ]
          }
        ]
      }
    };
  },
  computed: {
    UserImage() {
      return api.getImageSource(this.$store.state.currentUser.id, "user");
    },
    language() {
      return this.$store.state.language.courseForum;
    }
  },
  methods: {
    toggleCommentAnswer(id) {
      if (this.showAnswersComment[id] === undefined)
        this.$set(this.showAnswersComment, id, true);
      else this.showAnswersComment[id] = !this.showAnswersComment[id];
    }
  },
  async created() {
    if (this.$store.state.currentUser === null) {
      this.$router.push("/");
      return;
    }
    if (this.$store.state.currentUser.type === "student") {
      //Check if there the user has registered this course
      let userStaterResponse = await api.getCourseUserState(
        this.$route.params.courseId,
        JSON.parse(localStorage.getItem("userToken"))
      );

      if (userStaterResponse.status !== 200) {
        this.$router.push(`/course/${this.$route.params.courseId}`);
        return;
      }
    }

    this.waitRequest = false;
  }
};
</script>

<style scoped>
.forum-container {
  background-color: #eceff1;
}
.divider {
  height: 5px !important;
}
.center-horizontal {
  display: flex;
  justify-content: center;
}
.border-card {
  border-top: 5px solid #1976d2 !important;
  color: #1976d2;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
