<template>
  <div class="forum-container">
    <Loading v-if="waitRequest"></Loading>
    <v-container fluid v-else>
      <v-container class="new-container">
        <v-card outlined color="#FAFAFA" class="pa-5 rounded-t-xl" tile flat>
          <v-row no-gutters justify="center" align="center" class="px-5">
            <v-col cols="6">
              <v-responsive max-width="500px">
                <v-text-field
                  full-width
                  background-color="white"
                  class="rounded-pill pa-2"
                  color="blue darken-3"
                  hide-details
                  dense
                  outlined
                  placeholder="Search..."
                  append-icon="mdi-magnify"
                ></v-text-field>
              </v-responsive>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="auto" class="mx-5">
              <v-btn
                large
                color="blue darken-3"
                class="text-none white--text"
                @click="viewNewQuestion = !viewNewQuestion"
                >Ask</v-btn
              >
            </v-col>
          </v-row>
          <v-expand-transition>
            <v-form v-show="viewNewQuestion" class="mt-10">
              <v-row justify="center">
                <v-col cols="12">
                  <v-divider></v-divider>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    :rules="[rules.Required]"
                    dense
                    v-model="newQuestionData.title"
                    placeholder="Question Title"
                  ></v-text-field
                ></v-col>
                <v-col cols="8">
                  <v-textarea
                    filled
                    full-width
                    :rules="[rules.Required]"
                    auto-grow
                    v-model="newQuestionData.text"
                    placeholder="Add your Question"
                  ></v-textarea>
                </v-col>
                <v-col cols="8">
                  <v-combobox
                    v-model="newQuestionData.tags"
                    :rules="[rules.Required]"
                    :items="Tags"
                    label="Add Tags"
                  ></v-combobox>
                </v-col>
                <v-col cols="8" class="text-center">
                  <v-btn outlined class="mx-auto">
                    Ask Question
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-expand-transition>
        </v-card>
        <v-card min-height="90vh" outlined tile flat class="rounded-b-lg">
          <v-row v-if="Questions.length === 0">
            <v-col cols="12" class="text-center font-weight-light mt-10 mb-10">
              <h3 class="text-overline">
                It seems that there are no Questions yet
              </h3>
            </v-col>
          </v-row>
          <template v-else>
            <v-row no-gutters v-for="(Question, i) in Questions" :key="i">
              <v-col cols="12" class="px-5 mt-5 mb-5">
                <v-row no-gutters>
                  <v-col cols="auto" class="text-center font-weight-light px-5"
                    ><v-avatar size="50" color="white">
                      <v-img :src="UserImage"></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="8" class="px-5">
                    <div>
                      <router-link
                        class="text-body-1 question-link"
                        append
                        :to="String(i)"
                      >
                        Why am I stuck with this question?
                      </router-link>
                    </div>
                    <div class="text-caption font-weight-light">
                      Posted by <span class="font-weight-medium">Name</span>
                    </div>
                    <div class="mt-5">
                      <v-chip
                        v-for="(chip, j) in Questions"
                        :key="j"
                        filter
                        link
                        outlined
                        pill
                        class="mr-3"
                        :class="{
                          'blue--text': j === 0,
                          'text--darken-4': j === 0,
                          ' blue ': j === 0,
                          'darken-4': j === 0
                        }"
                        >Javascript</v-chip
                      >
                    </div>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="auto">
                    <v-card
                      max-width="40"
                      color="grey lighten-4"
                      outlined
                      flat
                      tile
                      class="rounded-xl"
                    >
                      <v-row no-gutters justify="center" align="center">
                        <v-col cols="12" class="text-center">
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
                  <v-col
                    cols="auto"
                    class="px-10 text-center center-vertical"
                    :class="{
                      'green--text': i === 1
                    }"
                  >
                    <div class="text-h6 font-weight-bold">
                      <v-icon v-if="i === 1" color="green" class="mr-1"
                        >mdi-check</v-icon
                      >{{ i + 1 }}
                    </div>
                    <div class="text-caption">
                      Answer<span v-if="i === 1">s</span>
                    </div>
                  </v-col>
                </v-row>
              </v-col>

              <v-col cols="12">
                <v-divider class="grey--text"></v-divider
              ></v-col>
            </v-row>
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
      newQuestionData: {},
      Questions: [1, 2, 3, 4],
      Tags: [],
      rules: {
        Required: value => !!value || "Required."
      }
    };
  },
  computed: {
    UserImage() {
      return api.getImageSource(this.$store.state.currentUser.id, "user");
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
