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
          <v-btn icon :to="`/course/${$route.params.courseId}/forum`"
            ><v-icon> mdi-arrow-left </v-icon></v-btn
          >
          {{ Question.tags.split(",")[0] }}
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
              ><v-badge
                bottom
                overlap
                icon="mdi-teach"
                dark
                color="blue darken-1"
                ><v-avatar size="70" color="white">
                  <v-img :src="UserImage(Question.User.id)"></v-img>
                </v-avatar>
              </v-badge>
              <div class="text-caption mt-5" v-if="Question.isFeatured">
                <v-card outlined color="blue px-2 white--text">
                  {{ $store.state.language.courseForum.featured }}
                </v-card>
              </div>
              <div class="text-caption mt-5">
                <v-btn
                  outlined
                  x-small
                  color="error"
                  @click="deleteContent('Q', Question.id)"
                  v-if="
                    $store.state.currentUser.type === 'teacher' ||
                      $store.state.currentUser.type === 'admin' ||
                      $store.state.currentUser.id === Question.User.id
                  "
                  >{{ $store.state.language.courseForum.delete }}</v-btn
                >
              </div>
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
                <span class="font-weight-medium"
                  >{{ Question.User.firstName }}
                  {{ Question.User.lastName }}</span
                >
              </div>
              <div class="text-caption font-weight-light">
                {{ timeSince(new Date(Question.createdAt)) }}
              </div>
              <div class="text-h4 font-weight-bold">
                {{ Question.title }}
              </div>
              <div class="text-body-1 font-weight-light mt-7 mb-5">
                {{ Question.text }}
              </div>
              <v-card
                flat
                elevation="0"
                color="grey lighten-4"
                class="pa-8 mt-10 rounded-xl"
                v-if="Question.comments"
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
                        ><v-badge bottom overlap dot dark color="blue darken-1"
                          ><v-avatar size="30" color="white">
                            <v-img :src="UserImage(comment.User.id)"></v-img>
                          </v-avatar>
                        </v-badge>

                        <div class="text-caption mt-5">
                          <v-btn
                            outlined
                            x-small
                            color="error"
                            v-if="
                              $store.state.currentUser.type === 'teacher' ||
                                $store.state.currentUser.type === 'admin' ||
                                $store.state.currentUser.id === comment.User.id
                            "
                            @click="deleteContent('CQ', comment.id)"
                            >{{
                              $store.state.language.courseForum.delete
                            }}</v-btn
                          >
                        </div>
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
                          <span class="font-weight-medium text-subtitle-2"
                            >{{ comment.User.firstName }}
                            {{ comment.User.lastName }}</span
                          >
                        </div>
                        <div class="text-caption font-weight-light">
                          {{ timeSince(new Date(comment.createdAt)) }}
                        </div>
                        <div class="text-body-2 font-weight-light mt-2 mb-5">
                          {{ comment.text }}
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
                >{{ language.addComment
                }}<v-icon color="grey" size="20" class="mx-3"
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
                      ><v-badge bottom overlap dot dark color="blue darken-1"
                        ><v-avatar size="30" color="white">
                          <v-img
                            :src="UserImage($store.state.currentUser.id)"
                          ></v-img>
                        </v-avatar>
                      </v-badge>
                      <div class="mt-4 text-caption">
                        {{ language.postedBy }}
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
                        :placeholder="language.addComment"
                        hide-details
                        v-model="newQuestionComment"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="text-center mb-5">
                      <v-btn
                        outlined
                        class="mx-5 text-none"
                        color="blue darken-4"
                        @click="addQuestionComment"
                        :disabled="newQuestionComment === ''"
                      >
                        {{ language.addComment }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-expand-transition>
            </v-col>
          </v-row>
          <v-row no-gutters class="mt-10">
            <v-col cols="12" class="mx-10 text-h6">
              {{ answers.length }} {{ language.answers }}
            </v-col>
            <v-col cols="12" class="px-0 mt-5">
              <v-divider
                class="grey--text text-center divider"
              ></v-divider></v-col
          ></v-row>
          <!--Answers and Their Comments-->
          <v-row dense v-for="(answer, i) in answers" :key="i" class="mt-10">
            <v-col
              :class="{
                'text-center': $vuetify.breakpoint.xs,
                'col-auto': $vuetify.breakpoint.smAndUp,
                'col-12': $vuetify.breakpoint.xs
              }"
              class="text-center font-weight-light px-5"
              ><v-badge
                bottom
                overlap
                icon="mdi-teach"
                dark
                color="blue darken-1"
                ><v-avatar size="70" color="white">
                  <v-img :src="UserImage(answer.User.id)"></v-img>
                </v-avatar>
              </v-badge>
              <div
                class="mt-10"
                v-if="$store.state.currentUser.id === Question.User.id"
              >
                <v-btn
                  :class="{
                    blue: answer.isAnswer,
                    'lighten-2': answer.isAnswer,
                    'white--text': answer.isAnswer
                  }"
                  rounded
                  outlined
                  @click="chooseAnswer(answer.id, !answer.isAnswer)"
                  ><v-icon>mdi-check</v-icon></v-btn
                >
              </div>

              <div class="text-caption mt-5">
                <v-btn
                  outlined
                  x-small
                  color="error"
                  @click="deleteContent('A', answer.id)"
                  v-if="
                    $store.state.currentUser.type === 'teacher' ||
                      $store.state.currentUser.type === 'admin' ||
                      $store.state.currentUser.id === answer.User.id
                  "
                  >{{ $store.state.language.courseForum.delete }}</v-btn
                >
              </div>
            </v-col>
            <v-col
              :class="{
                'col-10': $vuetify.breakpoint.smAndUp,
                'col-12': $vuetify.breakpoint.xs
              }"
              class="px-5"
            >
              <v-row
                :class="{
                  'border-small': answer.isAnswer
                }"
              >
                <v-col
                  :class="{
                    'text-center': $vuetify.breakpoint.xs,
                    'col-10': $vuetify.breakpoint.smAndUp,
                    'col-12': $vuetify.breakpoint.xs
                  }"
                >
                  <div class="text-caption font-weight-light">
                    {{ language.postedBy }}
                    <span class="font-weight-medium text-body-1"
                      >{{ answer.User.firstName }}
                      {{ answer.User.lastName }}</span
                    >
                  </div>
                  <div class="text-caption font-weight-light">
                    {{ timeSince(new Date(answer.createdAt)) }}
                  </div>
                  <div class="text-body-1 font-weight-light mt-7 mb-5">
                    {{ answer.text }}
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
                    outlined
                    flat
                    tile
                    class="rounded-xl pa-0"
                    :class="{
                      'text-center': $vuetify.breakpoint.xs,
                      'mx-auto': $vuetify.breakpoint.xs,
                      blue: answer.userVote === 1 || answer.userVote === -1,
                      grey: answer.userVote !== 1 && answer.userVote !== -1,
                      'lighten-4':
                        answer.userVote !== 1 && answer.userVote !== -1,
                      'white--text':
                        answer.userVote === 1 || answer.userVote === -1
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
                            blue: answer.userVote === 1,
                            'white--text': answer.userVote === 1,
                            grey: answer.userVote !== 1,
                            'lighten-4': answer.userVote !== 1
                          }"
                          @click="addVote(answer, 1)"
                          :disabled="waitVote[answer.id] === true"
                          ><v-icon>mdi-chevron-up</v-icon></v-btn
                        ></v-col
                      >
                      <v-col cols="12" class="text-center mt-2 mb-2">
                        {{ answer.votes }}
                      </v-col>
                      <v-col cols="12" class="text-center">
                        <v-btn
                          :class="{
                            blue: answer.userVote === -1,
                            'white--text': answer.userVote === -1,
                            grey: answer.userVote !== -1,
                            'lighten-4': answer.userVote !== -1
                          }"
                          icon
                          @click="addVote(answer, -1)"
                          :disabled="waitVote[answer.id] === true"
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
                v-if="answer.comments"
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
                        ><v-badge bottom overlap dot dark color="blue darken-1"
                          ><v-avatar size="30" color="white">
                            <v-img :src="UserImage(comment.User.id)"></v-img>
                          </v-avatar>
                        </v-badge>
                        <div class="text-caption mt-5">
                          <v-btn
                            outlined
                            x-small
                            color="error"
                            @click="deleteContent('CA', comment.id)"
                            v-if="
                              $store.state.currentUser.type === 'teacher' ||
                                $store.state.currentUser.type === 'admin' ||
                                $store.state.currentUser.id === comment.User.id
                            "
                            >{{
                              $store.state.language.courseForum.delete
                            }}</v-btn
                          >
                        </div>
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
                          <span class="font-weight-medium text-subtitle-2"
                            >{{ comment.User.firstName
                            }}{{ comment.User.lastName }}</span
                          >
                        </div>
                        <div class="text-caption font-weight-light">
                          {{ timeSince(new Date(answer.createdAt)) }}
                        </div>
                        <div class="text-body-2 font-weight-light mt-2 mb-5">
                          {{ comment.text }}
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
                >{{ language.addComment
                }}<v-icon color="grey" size="20" class="mx-3"
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
                      ><v-badge bottom overlap dot dark color="blue darken-1"
                        ><v-avatar size="30" color="white">
                          <v-img
                            :src="UserImage($store.state.currentUser.id)"
                          ></v-img>
                        </v-avatar>
                      </v-badge>
                      <div class="mt-4 text-caption">
                        {{ language.postedBy }}
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
                        :placeholder="language.addComment"
                        hide-details
                        v-model="newAnswerComment[answer.id]"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="text-center mb-5">
                      <v-btn
                        outlined
                        class="mx-5 text-none"
                        color="blue darken-4"
                        @click="addAnswerComment(answer.id)"
                        :disabled="
                          newAnswerComment[answer.id] === '' ||
                            newAnswerComment[answer.id] == undefined
                        "
                      >
                        {{ language.addComment }}
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-expand-transition>
            </v-col>

            <v-col cols="12" v-if="i !== answers.length - 1">
              <v-responsive max-width="80%" class="mx-auto">
                <v-divider
                  class="grey--text text-center"
                ></v-divider></v-responsive
            ></v-col>
          </v-row>

          <v-row
            justify="center"
            v-if="!(getNewCourses === true || answers.length % 20 != 0)"
            class="mt-5 mb-5"
          >
            <v-col cols="auto">
              <v-btn @click="loadMore()" outlined color="blue darken-3" small>{{
                language.loadMore
              }}</v-btn>
            </v-col>
          </v-row>

          <!--Add an Answer-->
          <v-row no-gutters class="mt-10">
            <v-col cols="12" class="mx-10 text-h6">
              {{ language.addAnAnswer }}
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
                ><v-badge
                  bottom
                  overlap
                  icon="mdi-teach"
                  dark
                  color="blue darken-1"
                  ><v-avatar size="70" color="white">
                    <v-img
                      :src="UserImage($store.state.currentUser.id)"
                    ></v-img>
                  </v-avatar>
                </v-badge>
                <div class="mt-4">
                  {{ language.postedBy }}
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
                  :placeholder="language.addAnAnswer"
                  v-model="newAnswer"
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="text-center">
                <v-btn
                  outlined
                  class="mx-5 text-none"
                  color="blue darken-4"
                  @click="addAnswer"
                  :disabled="newAnswer === ''"
                >
                  {{ language.addAnswer }}
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
      getNewCourses: false,
      waitVote: {},
      rules: {
        Required: value => !!value || "Required."
      },
      showMainComment: false,
      showAnswersComment: {},
      Question: null,
      answers: null,
      newAnswer: "",
      newQuestionComment: "",
      newAnswerComment: {}
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
    toggleCommentAnswer(id) {
      if (this.showAnswersComment[id] === undefined)
        this.$set(this.showAnswersComment, id, true);
      else this.showAnswersComment[id] = !this.showAnswersComment[id];
    },
    async addVote(reply, vote) {
      // disable the buttons
      this.$set(this.waitVote, reply.id, true);
      // if no votes before send the request once
      // check if user wants to delete vote
      if (reply.userVote === 0 || reply.userVote === vote) {
        const tempvote = reply.userVote !== vote ? vote : vote === 1 ? -1 : 1;
        const response = await api.voteInForum(
          JSON.parse(localStorage.getItem("userToken")),
          "forum_reply",
          reply.id,
          tempvote
        );
        if (response.status === 200) {
          reply.userVote = reply.userVote === vote ? 0 : vote;
          reply.votes = response.data.upvotes - response.data.downvotes;
        }
      }
      // Else if there was a vote before send it twice
      else {
        let response = await api.voteInForum(
          JSON.parse(localStorage.getItem("userToken")),
          "forum_reply",
          reply.id,
          vote
        );
        // Else if there was a vote before send it twice
        if (response.status === 200) {
          response = await api.voteInForum(
            JSON.parse(localStorage.getItem("userToken")),
            "forum_reply",
            reply.id,
            vote
          );
          if (response.status === 200) {
            reply.userVote = vote;
            reply.votes = response.data.upvotes - response.data.downvotes;
          }
        }
      }
      // reEnable button
      this.waitVote[reply.id] = false;
    },
    getComments(id, offset, limit, start, end) {
      api.getSingleQuestionComments(offset, limit, id).then(response => {
        if (response.data.length > 0)
          this.$set(this.Question, "comments", response.data);
        else this.$set(this.Question, "comments", null);
      });
      for (let i = start; i < end; i++) {
        api
          .getSingleQuestionAnswersComments(
            JSON.parse(localStorage.getItem("userToken")),
            offset,
            limit,
            this.answers[i].id
          )
          .then(response => {
            if (response.data.length > 0)
              this.$set(this.answers[i], "comments", response.data);
            else this.$set(this.answers[i], "comments", null);
          });
      }
    },
    async loadMore() {
      if (this.getNewCourses === true || this.answers.length % 20 != 0) return;

      // Send the Request
      this.getNewCourses = true;
      const response = api.getSingleQuestionAnswers(
        JSON.parse(localStorage.getItem("userToken")),
        this.answers.length,
        20,
        this.$route.params.question
      );
      if (response.status === 200) {
        this.answers.push(...response.data);
        if (response.data.length !== 0) this.getNewCourses = false;
      }
    },
    async addAnswer() {
      const response = await api.addAnswerToQuestion(
        JSON.parse(localStorage.getItem("userToken")),
        this.$route.params.question,
        this.newAnswer
      );
      if (response.status === 200) {
        // Display a Success Notification
        this.$store.state.newNotification.Message = this.language.addedSuccess;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "success";
        // send the get answers request
        api
          .getSingleQuestionAnswers(
            JSON.parse(localStorage.getItem("userToken")),
            0,
            20,
            this.$route.params.question
          )
          .then(response => {
            if (response.status === 200) {
              this.answers = response.data;
            }
            this.getComments(this.Question.id, 0, 200, 0, this.answers.length);
          });
      }
    },
    async addQuestionComment() {
      const response = await api.addCommentToQuestion(
        JSON.parse(localStorage.getItem("userToken")),
        this.$route.params.question,
        this.newQuestionComment
      );
      if (response.status === 200) {
        // Display a Success Notification
        this.$store.state.newNotification.Message = this.language.addedSuccess;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "success";
        // get comments
        this.getComments(this.Question.id, 0, 200, 0, this.answers.length);
      }
    },
    async addAnswerComment(answerId) {
      const response = await api.addCommentToAnswer(
        JSON.parse(localStorage.getItem("userToken")),
        answerId,
        this.newAnswerComment[answerId]
      );
      if (response.status === 200) {
        // Display a Success Notification
        this.$store.state.newNotification.Message = this.language.addedSuccess;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "success";
        // get comments
        this.getComments(this.Question.id, 0, 200, 0, this.answers.length);
      }
    },
    async chooseAnswer(answerId, setCorrect) {
      const response = await api.setAnswerAsCorrect(
        JSON.parse(localStorage.getItem("userToken")),
        this.Question.id,
        answerId,
        setCorrect
      );
      if (response.status === 200) {
        this.$router.go();
      } else {
        // Display a Notification
        this.$store.state.newNotification.Message = this.language.alreadyChose;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
      }
    },
    timeSince(date) {
      let seconds = Math.floor((new Date() - date) / 1000);

      let interval = seconds / 31536000;

      if (interval > 1) {
        if (this.$vuetify.rtl)
          return "  منذ " + Math.floor(interval) + " سنوات";
        return Math.floor(interval) + " years ago";
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        if (this.$vuetify.rtl) return "  منذ " + Math.floor(interval) + " شهور";
        return Math.floor(interval) + " months ago";
      }
      interval = seconds / 86400;
      if (interval > 1) {
        if (this.$vuetify.rtl) return "  منذ " + Math.floor(interval) + " ايام";
        return Math.floor(interval) + " days ago";
      }
      interval = seconds / 3600;
      if (interval > 1) {
        if (this.$vuetify.rtl)
          return "  منذ " + Math.floor(interval) + " ساعات";
        return Math.floor(interval) + " hours ago";
      }
      interval = seconds / 60;
      if (interval > 1) {
        if (this.$vuetify.rtl)
          return "  منذ " + Math.floor(interval) + " دقائق";
        return Math.floor(interval) + " minutes ago";
      }
      if (this.$vuetify.rtl) return " منذ  " + Math.floor(interval) + " ثوانى";
      return Math.floor(seconds) + " seconds ago";
    },
    async deleteContent(type, id) {
      // Delete Comment on Answer, Answer, Comment on Question and Question
      const response = await api.deleteFromForum(
        JSON.parse(localStorage.getItem("userToken")),
        type,
        id
      );
      if (response.status === 200) {
        // Display a Success Notification
        this.$store.state.newNotification.Message = this.language.deleteSuccess;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "success";
        // if type is Comment reload comments
        if (type === "CA" || type === "CQ") {
          this.getComments(this.Question.id, 0, 200, 0, this.answers.length);
        }
        // If type is Answer reload Answers
        else if (type === "A") {
          // send the get answers request
          api
            .getSingleQuestionAnswers(
              JSON.parse(localStorage.getItem("userToken")),
              0,
              20,
              this.$route.params.question
            )
            .then(response => {
              if (response.status === 200) {
                this.answers = response.data;
              }
              this.getComments(
                this.Question.id,
                0,
                200,
                0,
                this.answers.length
              );
            });
        }
        // If is the Question Reroute to Forum
        else {
          this.$router.push(`/course/${this.$route.params.courseId}/forum`);
          return;
        }
      } else {
        this.$store.state.newNotification.Message = this.language.donotOwn;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
      }
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
    // Set the getNewCourses to true
    this.getNewCourses = true;
    // Send the requests to get the questions and Answers
    let [questionResponse, answerResponse] = await Promise.all([
      api.getSingleQuestion(
        JSON.parse(localStorage.getItem("userToken")),
        this.$route.params.question
      ),
      api.getSingleQuestionAnswers(
        JSON.parse(localStorage.getItem("userToken")),
        0,
        20,
        this.$route.params.question
      )
    ]);

    if (questionResponse.status === 200 && answerResponse.status === 200) {
      if (questionResponse.data.length === 0) {
        this.$router.push(`/course/${this.$route.params.courseId}/forum`);
        return;
      }
      // Take the Data from the Server and Show it
      this.Question = questionResponse.data[0];
      this.answers = answerResponse.data;
      if (answerResponse.data.length !== 0) this.getNewCourses = false;
    } else {
      this.$router.push(`/course/${this.$route.params.courseId}/forum`);
      return;
    }

    this.getComments(this.Question.id, 0, 200, 0, this.answers.length);

    this.waitRequest = false;
  }
};
</script>

<style scoped>
.forum-container {
  background-color: #eceff1;
}
.border-small {
  border-left: 8px solid #64b5f6;
}
.divider {
  height: 5px !important;
}
.center-horizontal {
  display: flex;
  justify-content: center;
}
.border-card {
  border-top: 5px solid #64b5f6 !important;
  color: #64b5f6;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
