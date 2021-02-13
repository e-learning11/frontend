<template>
  <div class="forum-container">
    <Loading v-if="waitRequest"></Loading>
    <v-container fluid v-else>
      <v-container class="new-container">
        <v-card
          outlined
          color="#FAFAFA"
          class="pa-5 rounded-t-xl border-card"
          tile
          flat
        >
          Hello
        </v-card>
        <v-card outlined tile flat class="rounded-b-lg pt-10 pb-12 px-5">
          <v-row>
            <v-col>Hey</v-col>
          </v-row>
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
    }

    this.waitRequest = false;
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
.border-card {
  border-top: 5px solid skyblue;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
