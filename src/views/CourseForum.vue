<template>
  <div class="forum-container">
    <Loading v-if="waitRequest"></Loading>
    <v-container fluid v-else>
      <v-container class="new-container">
        <v-card outlined color="#FAFAFA" class="pa-5 rounded-t-xl" tile flat>
          <v-row no-gutters justify="center">
            <v-col cols="auto">Search</v-col>
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
            <v-row v-show="viewNewQuestion">
              <v-col cols="12">
                This is alot of text and I am going to con
              </v-col>
            </v-row>
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
                  <v-col
                    cols="auto"
                    class="px-10 text-center"
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
      waitRequest: false,
      Questions: [1, 2, 3, 4]
    };
  },
  computed: {
    UserImage() {
      return api.getImageSource(this.$store.state.currentUser.id, "user");
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
.question-link {
  color: black;
  text-decoration: none;
}
.question-link:hover {
  text-decoration: underline;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
