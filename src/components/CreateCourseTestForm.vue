<template>
  <div>
    <!--Test Form-->
    <v-form ref="TestForm">
      <v-card shaped color="white" class="pa-8">
        <v-row justify="center" class="mb-5">
          <v-col cols="12">
            <h2 class="text-center text-h4 font-weight-light">
              New Test
            </h2></v-col
          >
        </v-row>
        <v-row justify="center">
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Test Title :</div>
            <v-text-field
              v-model="NewTest.Title"
              :rules="[rules.Required]"
              dense
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Questions :</div>
          </v-col>
          <v-col cols="12" v-if="NewTest.Questions.length === 0">
            <p class="text-center text-subtitle-1 font-weight-light mb-0">
              Added Questions will Appear here
            </p>
            <p class="text-center text-subtitle-1 font-weight-bold mt-0">
              At Least 1 Required
            </p>
          </v-col>
          <!--Questions That are already Added-->
          <template v-else>
            <v-col
              :class="{
                'col-10': $vuetify.breakpoint.smAndUp,
                'col-12': $vuetify.breakpoint.xs
              }"
            >
              <v-row
                class="mb-3 mt-3 text-center single-question pt-5 pb-3"
                v-for="(Item, i) in NewTest.Questions"
                :key="i"
              >
                <v-col cols="12" class="pa-1"
                  ><span class="font-weight-bold">Question {{ i + 1 }} : </span>
                  {{ Item.Q }}
                </v-col>
                <v-col cols="12" class="pa-1" v-if="Item.correctAnswer">
                  <span class="font-weight-bold">Correct Answer :</span>
                  {{ Item.correctAnswer }}
                </v-col>
                <v-col cols="12" class="pa-1" v-if="Item.A.length > 0">
                  <v-row class="text-center" justify="center">
                    <v-col cols="auto" class="font-weight-bold"
                      >Answers :</v-col
                    >
                    <v-col cols="auto" v-for="(Answer, j) in Item.A" :key="j">
                      {{ Answer }}
                      <span v-if="j != Item.A.length - 1">,</span>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    small
                    color="red darken-3"
                    outlined
                    class="text-none text-subtitle-1"
                    @click="RemoveQuestion(i)"
                    >Remove</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </template>
        </v-row>
      </v-card>
    </v-form>

    <!-- Add a Question Form-->
    <v-form ref="QuestionForm">
      <v-card shaped color="white" class="pa-8 mt-10">
        <v-row justify="center">
          <v-col cols="12">
            <h2 class="text-center text-h4 font-weight-light">
              Add a Question
            </h2></v-col
          >
        </v-row>
        <v-row>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Type :</div>
            <v-radio-group
              mandatory
              :rules="[rules.Required]"
              row
              v-model="NewQuestion.type"
              @change="ResetQuestion"
            >
              <v-radio label="True or False" value="TorF"></v-radio>
              <v-radio label="MCQ" value="MCQ"></v-radio>
              <v-radio label="Essay" value="Essay"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">Question :</div>
            <v-text-field
              v-model="NewQuestion.Q"
              :rules="[rules.Required]"
              dense
            ></v-text-field>
          </v-col>
          <template v-if="NewQuestion.type === 'MCQ'">
            <v-col
              cols="12"
              :class="{
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            >
              <div class="mr-5 font-weight-bold">Correct Answer :</div>
              <v-text-field
                v-model="NewQuestion.correctAnswer"
                :rules="[rules.Required]"
                dense
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              v-for="i in 3"
              :key="i"
              :class="{
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            >
              <div class="mr-5 font-weight-bold">Answer {{ i + 1 }} :</div>
              <v-text-field
                v-model="NewQuestion.A[i - 1]"
                :rules="[rules.Required]"
                dense
              ></v-text-field>
            </v-col>
          </template>
          <template v-else-if="NewQuestion.type === 'TorF'">
            <v-col
              cols="12"
              :class="{
                'text-h6': $vuetify.breakpoint.smAndUp,
                'text-subtitle-1': $vuetify.breakpoint.xs
              }"
            >
              <div class="mr-5 font-weight-bold">Correct Answer :</div>
              <v-radio-group
                mandatory
                :rules="[rules.Required]"
                row
                v-model="NewQuestion.correctAnswer"
              >
                <v-radio label="True" value="True"></v-radio>
                <v-radio label="False" value="False"></v-radio>
              </v-radio-group>
            </v-col>
          </template>
        </v-row>
        <!--Add Question Button-->
        <v-row>
          <v-col cols="12" class="text-center">
            <v-btn
              large
              color="blue darken-3"
              outlined
              class="white--text text-none text-h6 mr-5"
              @click="AddQuestion"
              >Add Question</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-form>
    <!-- Add Course Button-->
    <v-row class="mb-10 mt-10" justify="center" align="center">
      <v-btn
        x-large
        color="red darken-3"
        outlined
        class="white--text text-none text-h6 mr-5"
        @click="ResetTest"
        >Reset</v-btn
      >
      <v-btn
        x-large
        color="blue darken-2"
        outlined
        class="white--text text-none text-h6"
        @click="AddTest"
        >Add Test</v-btn
      >
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rules: {
        Required: value => !!value || "Required."
      },
      NewQuestion: {
        type: "TorF",
        Q: "",
        correctAnswer: "",
        A: []
      },
      NewTest: {
        Title: "",
        Questions: []
      }
    };
  },
  methods: {
    ResetQuestion() {
      this.NewQuestion.A = [];
      this.NewQuestion.Q = "";
      this.NewQuestion.correctAnswer = "";
    },
    AddQuestion() {
      //check the Validation
      if (!this.$refs.QuestionForm.validate()) return;
      // If True or false Add Answers
      if (this.NewQuestion.type === "TorF")
        this.NewQuestion.A = ["True", "False"];
      // Else if MCQ add correct Answer to Answers
      else if (this.NewQuestion.type === "MCQ") {
        this.NewQuestion.A.push(this.NewQuestion.correctAnswer);
      }

      // Add the New Question to Array
      this.NewTest.Questions.push({
        ...this.NewQuestion
      });
    },
    RemoveQuestion(QNumber) {
      //Remove the Selected Question
      this.NewTest.Questions.splice(QNumber, 1);
    },
    ResetTest() {
      //Reset the Test Form
      this.NewTest = {
        Title: "",
        Questions: []
      };
    },
    AddTest() {
      // Check if the form is valid
      if (!this.$refs.TestForm.validate() || this.NewTest.Questions.length == 0)
        return;
      //Add the Test to the Components
      this.$root.$emit("NewComponent", this.NewTest);
      this.$store.state.CourseInfo.components.push({
        ...this.NewTest,
        type: "Test"
      });
      //Call Reset
      this.ResetTest();
    }
  }
};
</script>

<style scoped>
.single-question {
  border-radius: 10px;
  background-color: #f5f5f5;
}
</style>
