<template>
  <div>
    <!--Test Form-->
    <v-form ref="TestForm">
      <v-card shaped color="white" class="pa-8">
        <v-row justify="center" class="mb-5">
          <v-col cols="12">
            <h2 class="text-center text-h4 font-weight-light">
              {{ language.newTest }}
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
            <div class="mr-5 font-weight-bold">{{ language.testTitle }}</div>
            <v-text-field
              v-model="NewTest.name"
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
            <div class="mr-5 font-weight-bold">{{ language.passingGrade }}</div>
            <v-text-field
              v-model="NewTest.passingGrade"
              :rules="[
                rules.Required,
                rules.grade(NewTest.passingGrade, NewTest.test.length)
              ]"
              type="Number"
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
            <div class="mr-5 font-weight-bold">{{ language.questions }}</div>
          </v-col>
          <v-col cols="12" v-if="NewTest.test.length === 0">
            <p class="text-center text-subtitle-1 font-weight-light mb-0">
              {{ language.addedQuestions }}
            </p>
            <p class="text-center text-subtitle-1 font-weight-bold mt-0">
              {{ language.leastRequired }}
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
                v-for="(Item, i) in NewTest.test"
                :key="i"
              >
                <v-col cols="12" class="pa-1"
                  ><span class="font-weight-bold"
                    >{{ language.question }} {{ i + 1 }} :
                  </span>
                  {{ Item.Q }}
                </v-col>
                <v-col cols="12" class="pa-1" v-if="Item.correctAnswer">
                  <span class="font-weight-bold">{{
                    language.correctAnswer
                  }}</span>
                  {{ Item.A[Item.correctAnswer] }}
                </v-col>
                <v-col cols="12" class="pa-1" v-if="Item.A.length > 0">
                  <v-row class="text-center" justify="center">
                    <v-col cols="auto" class="font-weight-bold">
                      {{ language.answers }}
                    </v-col>
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
                  >
                    {{ language.remove }}
                  </v-btn>
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
              {{ language.addAQuestion }}
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
            <div class="mr-5 font-weight-bold">{{ language.type }}</div>
            <v-radio-group
              mandatory
              :rules="[rules.Required]"
              row
              v-model="NewQuestion.type"
              @change="ResetQuestion"
            >
              <v-radio :label="language.torf" value="TorF"></v-radio>
              <v-radio :label="language.mcq" value="MCQ"></v-radio>
              <v-radio :label="language.essay" value="Essay"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            cols="12"
            :class="{
              'text-h6': $vuetify.breakpoint.smAndUp,
              'text-subtitle-1': $vuetify.breakpoint.xs
            }"
          >
            <div class="mr-5 font-weight-bold">{{ language.question }}</div>
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
              <div class="mr-5 font-weight-bold">
                {{ language.correctAnswer }}
              </div>
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
              <div class="mr-5 font-weight-bold">
                {{ language.answer }} {{ i + 1 }} :
              </div>
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
              <div class="mr-5 font-weight-bold">
                {{ language.correctAnswer }}
              </div>
              <v-radio-group
                mandatory
                :rules="[rules.Required]"
                row
                v-model="NewQuestion.correctAnswer"
              >
                <v-radio :label="language.true" value="True"></v-radio>
                <v-radio :label="language.false" value="False"></v-radio>
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
            >
              {{ language.addAQuestion }}</v-btn
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
        class="white--text text-none text-h6 mx-3"
        @click="ResetTest"
        >{{ language.reset }}</v-btn
      >
      <v-btn
        x-large
        color="blue darken-2"
        outlined
        class="white--text text-none text-h6 mx-3"
        @click="AddTest"
        v-if="ComponentToEdit === -1"
      >
        {{ language.addTest }}
      </v-btn>
      <v-btn
        x-large
        color="blue darken-2"
        outlined
        class="white--text text-none text-h6"
        @click="AddTest"
        v-else
      >
        {{ language.finishEdit }}
      </v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    ComponentToEdit: Number
  },
  data() {
    return {
      rules: {
        Required: value =>
          !!value || this.$store.state.language.createCourseForms.required,
        grade: (currentGrade, maxGrade) =>
          (currentGrade >= 0 && currentGrade <= maxGrade) ||
          this.$store.state.language.createCourseForms.correctGrade
      },
      NewQuestion: {
        type: "TorF",
        Q: "",
        correctAnswer: 0,
        A: []
      },
      NewTest: {
        name: "",
        test: []
      }
    };
  },
  computed: {
    language() {
      return this.$store.state.language.createCourseForms;
    }
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
      if (this.NewQuestion.type === "TorF") {
        if (this.NewQuestion.correctAnswer === "False")
          this.NewQuestion.A = ["True", "False"];
        else this.NewQuestion.A = ["False", "True"];
      }
      // Else if MCQ add correct Answer to Answers
      else if (this.NewQuestion.type === "MCQ") {
        this.NewQuestion.A.push(this.NewQuestion.correctAnswer);
      }
      this.NewQuestion.correctAnswer = this.NewQuestion.A.length - 1;
      // Add the New Question to Array
      this.NewTest.test.push({
        ...this.NewQuestion
      });
      // Reset the Question
      this.ResetQuestion();
      this.$refs.QuestionForm.reset();
    },
    RemoveQuestion(QNumber) {
      if (this.NewTest.test[QNumber].id) {
        this.$store.state.CourseInfo.deleted.push({
          id: this.NewTest.test[QNumber].id,
          type: "question"
        });
      }
      //Remove the Selected Question
      this.NewTest.test.splice(QNumber, 1);
    },
    ResetTest() {
      //Reset the Test Form
      this.NewTest = {
        name: "",
        test: []
      };
    },
    AddTest() {
      // Check if the form is valid
      if (!this.$refs.TestForm.validate() || this.NewTest.test.length == 0)
        return;
      //Add the Test to the Components
      this.$root.$emit("NewComponent", this.NewTest);
      // If not an Edit push the value
      if (this.ComponentToEdit === -1) {
        this.$store.state.CourseInfo.components.push({
          ...this.NewTest,
          type: "Test"
        });
      }
      // Else change it
      else {
        this.$store.state.CourseInfo.components[this.ComponentToEdit] = {
          ...this.NewTest,
          type: "Test"
        };
      }

      //Call Reset
      this.ResetTest();
      this.$refs.TestForm.reset();
    }
  },
  created() {
    // check if prop is not -1 then set the value to the component
    if (this.ComponentToEdit !== -1) {
      this.NewTest = this.$store.state.CourseInfo.components[
        this.ComponentToEdit
      ];
      if (this.NewTest.id != null) {
        this.$set(this.NewTest, "test", this.NewTest.Questions);
        this.NewTest.test.forEach(question => {
          this.$set(question, "correctAnswer", question.Answers.length - 1);
          this.$set(question, "A", []);
          question.Answers.forEach(answer => {
            question.A.push(answer.A);
          });
        });
      }
    }
  },
  destroyed() {
    this.$root.$emit("FinishEdit");
  }
};
</script>

<style scoped>
.single-question {
  border-radius: 10px;
  background-color: #f5f5f5;
}
</style>
