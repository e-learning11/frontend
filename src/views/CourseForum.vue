<template>
  <div class="forum-container">
    <Loading v-if="waitRequest"></Loading>
    <v-container fluid v-else>
      <v-container class="new-container">
        <v-card
          outlined
          color="#FAFAFA"
          class="rounded-t-xl"
          tile
          flat
          :class="{
            'pa-5': $vuetify.breakpoint.smAndUp,
            'pa-2': $vuetify.breakpoint.xs
          }"
        >
          <v-row dense justify="center" align="center" class="px-2">
            <v-col
              :class="{
                'col-5': $vuetify.breakpoint.mdAndUp,
                'col-8': $vuetify.breakpoint.sm,
                'col-12': $vuetify.breakpoint.xs
              }"
            >
              <v-responsive max-width="500px">
                <v-text-field
                  full-width
                  background-color="white"
                  class="rounded-pill pa-2"
                  color="blue darken-3"
                  hide-details
                  dense
                  outlined
                  @keyup="searchQuestions"
                  :placeholder="language.search"
                  append-icon="mdi-magnify"
                  v-model="searchData.title"
                ></v-text-field>
              </v-responsive>
            </v-col>
            <v-col cols="auto" v-if="searchData.tag">
              <v-chip
                close
                @click:close="
                  searchData.tag = null;
                  searchQuestions();
                "
              >
                {{ searchData.tag }}
              </v-chip>
            </v-col>
            <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
            <v-col
              :class="{
                'col-2': $vuetify.breakpoint.mdAndUp,
                'col-8': $vuetify.breakpoint.sm,
                'col-12': $vuetify.breakpoint.xs
              }"
              class="center-horizontal mx-1"
              v-for="(filter, i) in filters"
              :key="i"
            >
              <v-select
                :items="filter.values"
                :label="filter.name"
                color="blue"
                dense
                outlined
                hide-details
                @change="searchQuestions"
                :menu-props="{ offsetY: true }"
                v-model="searchData[filter.model]"
              ></v-select>
            </v-col>
            <v-col
              :class="{
                'col-auto': $vuetify.breakpoint.mdAndUp,
                'col-12': $vuetify.breakpoint.smAndDown
              }"
              class="mx-5 text-center"
            >
              <v-btn
                large
                color="blue darken-3"
                class="text-none white--text"
                @click="viewNewQuestion = !viewNewQuestion"
                >{{ language.ask }}</v-btn
              >
            </v-col>
          </v-row>
          <v-expand-transition>
            <v-form
              ref="newQuestionForm"
              v-show="viewNewQuestion"
              class="mt-10"
            >
              <v-row justify="center" align="center">
                <v-col cols="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col
                  :class="{
                    'col-8': $vuetify.breakpoint.smAndUp,
                    'col-12': $vuetify.breakpoint.xs
                  }"
                >
                  <v-text-field
                    :rules="[rules.Required]"
                    dense
                    v-model="newQuestionData.title"
                    :placeholder="language.questionTitle"
                  ></v-text-field
                ></v-col>
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
                    v-model="newQuestionData.text"
                    :placeholder="language.addQuestion"
                  ></v-textarea>
                </v-col>
                <v-col
                  :class="{
                    'col-8': $vuetify.breakpoint.smAndUp,
                    'col-12': $vuetify.breakpoint.xs
                  }"
                >
                  <v-combobox
                    v-model="newQuestionData.tags"
                    :rules="[rules.Required]"
                    :items="Tags"
                    :label="language.addTags"
                    multiple
                    chips
                    clearable
                    deletable-chips
                  ></v-combobox>
                </v-col>
                <v-col
                  :class="{
                    'col-8': $vuetify.breakpoint.smAndUp,
                    'col-12': $vuetify.breakpoint.xs
                  }"
                  class="text-center"
                >
                  <v-btn outlined class="mx-auto" @click="addQuestion">
                    {{ language.askQuestion }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-expand-transition>
        </v-card>

        <v-card min-height="90vh" outlined tile flat class="rounded-b-lg">
          <!--Loading Screen until request comes-->
          <Loading type="content" v-if="loading"></Loading>

          <template v-else>
            <v-row v-if="Questions.length === 0">
              <v-col
                cols="12"
                class="text-center font-weight-light mt-10 mb-10"
              >
                <h3 class="text-overline">
                  {{ language.noQuestions }}
                </h3>
              </v-col>
            </v-row>
            <template v-else>
              <v-row dense v-for="(Question, i) in Questions" :key="i">
                <v-col cols="12" class="px-5 mt-5 mb-5">
                  <v-row dense justify="center">
                    <v-col
                      :class="{
                        'text-center': $vuetify.breakpoint.xs,
                        'col-auto': $vuetify.breakpoint.smAndUp,
                        'col-12': $vuetify.breakpoint.xs
                      }"
                      class="text-center font-weight-light px-5"
                      ><v-avatar size="50" color="white">
                        <v-img :src="UserImage(Question.UserId)"></v-img>
                      </v-avatar>
                    </v-col>
                    <v-col
                      :class="{
                        'text-center': $vuetify.breakpoint.xs,
                        'col-8': $vuetify.breakpoint.smAndUp,
                        'col-12': $vuetify.breakpoint.xs
                      }"
                      class="px-5"
                    >
                      <div>
                        <router-link
                          class="text-h6 question-link"
                          append
                          :to="String(Question.id)"
                        >
                          {{ Question.title }}
                        </router-link>
                      </div>
                      <div class="text-caption font-weight-light">
                        {{ language.postedBy }}
                        <span class="font-weight-medium">
                          {{ Question.User.firstName }}
                          {{ Question.User.lastName }}
                        </span>
                      </div>
                      <div class="mt-5">
                        <v-chip
                          v-for="(chip, j) in Question.tags.split(',')"
                          :key="j"
                          filter
                          link
                          outlined
                          pill
                          class="mr-3"
                          @click="
                            searchData.tag = chip;
                            searchQuestions();
                          "
                          :class="{
                            'blue--text': j === 0,
                            'text--darken-4': j === 0,
                            ' blue ': j === 0,
                            'darken-4': j === 0
                          }"
                          >{{ chip }}</v-chip
                        >
                      </div>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col
                      :class="{
                        'text-center': $vuetify.breakpoint.xs,
                        'col-auto': $vuetify.breakpoint.smAndUp,
                        'col-auto': $vuetify.breakpoint.xs
                      }"
                    >
                      <v-card
                        max-width="40"
                        outlined
                        flat
                        tile
                        class="rounded-xl pa-0"
                        :class="{
                          'text-center': $vuetify.breakpoint.xs,
                          'mx-auto': $vuetify.breakpoint.xs,
                          blue:
                            Question.userVote === 1 || Question.userVote === -1,
                          grey:
                            Question.userVote !== 1 && Question.userVote !== -1,
                          'lighten-4':
                            Question.userVote !== 1 && Question.userVote !== -1,
                          'white--text':
                            Question.userVote === 1 || Question.userVote === -1
                        }"
                      >
                        <v-row no-gutters justify="center" align="center">
                          <v-col
                            cols="12"
                            :class="{ 'text-center': $vuetify.breakpoint.xs }"
                            class="text-center"
                          >
                            <v-btn
                              icon
                              :class="{
                                blue: Question.userVote === 1,
                                'white--text': Question.userVote === 1,
                                grey: Question.userVote !== 1,
                                'lighten-4': Question.userVote !== 1
                              }"
                              @click="addVote(Question, 1)"
                              :disabled="waitVote[Question.id] === true"
                              ><v-icon>mdi-chevron-up</v-icon></v-btn
                            ></v-col
                          >
                          <v-col cols="12" class="text-center mt-2 mb-2">
                            {{ Question.votes }}
                          </v-col>
                          <v-col cols="12" class="text-center">
                            <v-btn
                              :class="{
                                blue: Question.userVote === -1,
                                'white--text': Question.userVote === -1,
                                grey: Question.userVote !== -1,
                                'lighten-4': Question.userVote !== -1
                              }"
                              icon
                              @click="addVote(Question, -1)"
                              :disabled="waitVote[Question.id] === true"
                              ><v-icon>mdi-chevron-down</v-icon></v-btn
                            ></v-col
                          >
                        </v-row>
                      </v-card>
                    </v-col>
                    <v-col
                      :class="{
                        'col-auto': $vuetify.breakpoint.smAndUp,
                        'col-auto': $vuetify.breakpoint.xs,
                        'green--text': Question.isAcceptedAnswer
                      }"
                      class="px-10 text-center center-vertical"
                    >
                      <div class="text-h6 font-weight-bold">
                        <v-icon
                          v-if="Question.isAcceptedAnswer"
                          color="green"
                          class="mr-1"
                          >mdi-check</v-icon
                        >{{ Question.noOfAnswers }}
                      </div>
                      <div class="text-caption">
                        {{ language.answer }}
                      </div>
                    </v-col>
                  </v-row>
                </v-col>

                <v-col cols="12">
                  <v-divider class="grey--text"></v-divider
                ></v-col>
              </v-row>
            </template>
          </template>
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
      viewNewQuestion: false,
      waitRequest: true,
      newQuestionData: {
        text: "",
        tags: null,
        courseId: this.$route.params.courseId,
        title: ""
      },
      Questions: [],
      Tags: [],
      loading: true,
      waitVote: {},
      rules: {
        Required: value => !!value || "Required."
      },
      searchData: {
        sortOrder: "ASC",
        sortType: "votes",
        title: "",
        tag: null
      },
      filters: [
        {
          name: this.$store.state.language.courseForum.order,
          model: "sortOrder",
          values: [
            {
              text: this.$store.state.language.courseForum.ascend,
              value: "ASC"
            },
            {
              text: this.$store.state.language.courseForum.descend,
              value: "DESC"
            }
          ]
        },
        {
          name: this.$store.state.language.courseForum.type,
          model: "sortType",
          values: [
            {
              text: this.$store.state.language.courseForum.featured,
              value: "featured"
            },
            {
              text: this.$store.state.language.courseForum.votes,
              value: "votes"
            },
            {
              text: this.$store.state.language.courseForum.answered,
              value: "answered"
            },
            {
              text: this.$store.state.language.courseForum.createdAt,
              value: "createdAt"
            }
          ]
        }
      ]
    };
  },
  computed: {
    language() {
      return this.$store.state.language.courseForum;
    }
  },
  methods: {
    UserImage(id) {
      return api.getImageSource(id, "user");
    },
    async searchQuestions() {
      // Send the Request
      const data = {
        courseId: this.$route.params.courseId,
        ...this.searchData,
        title: this.searchData.title
      };
      this.loading = true;
      const response = await api.getAllCourseQuestions(
        JSON.parse(localStorage.getItem("userToken")),
        0,
        20,
        data
      );
      if (response.status === 200) {
        this.Questions = response.data;
        this.loading = false;
      }
    },
    async addQuestion() {
      // Validate the form
      if (!this.$refs.newQuestionForm.validate()) return;
      // Send the Request to post question
      const response = await api.addQuestionToForum(
        JSON.parse(localStorage.getItem("userToken")),
        { ...this.newQuestionData }
      );

      if (response.status === 200) {
        this.viewNewQuestion = false;
        this.searchQuestions();
      }
    },
    async addVote(Question, vote) {
      // disable the buttons
      this.$set(this.waitVote, Question.id, true);
      // if no votes before send the request once
      // check if user wants to delete vote
      if (Question.userVote === 0 || Question.userVote === vote) {
        const tempvote =
          Question.userVote !== vote ? vote : vote === 1 ? -1 : 1;
        const response = await api.voteInForum(
          JSON.parse(localStorage.getItem("userToken")),
          "forum_question",
          Question.id,
          tempvote
        );
        if (response.status === 200) {
          Question.userVote = Question.userVote === vote ? 0 : vote;
          Question.votes = response.data.upvotes - response.data.downvotes;
        }
      }
      // Else if there was a vote before send it twice
      else {
        let response = await api.voteInForum(
          JSON.parse(localStorage.getItem("userToken")),
          "forum_question",
          Question.id,
          vote
        );
        // Else if there was a vote before send it twice
        if (response.status === 200) {
          response = await api.voteInForum(
            JSON.parse(localStorage.getItem("userToken")),
            "forum_question",
            Question.id,
            vote
          );
          if (response.status === 200) {
            Question.userVote = vote;
            Question.votes = response.data.upvotes - response.data.downvotes;
          }
        }
      }

      // reEnable button
      this.waitVote[Question.id] = false;
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
      this.waitRequest = false;
      this.searchQuestions();
    }
  }
};
</script>

<style scoped>
.forum-container {
  background-color: #eceff1;
}
.center-horizontal {
  display: flex;
  justify-content: center;
}
.center-vertical {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 130px;
}
.question-link {
  color: black;
  text-decoration: none;
}
.question-link:hover {
  text-decoration: underline;
  cursor: pointer;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
