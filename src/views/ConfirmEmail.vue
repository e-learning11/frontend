<template>
  <Loading />
</template>

<script>
import Loading from "@/components/Loading.vue";
import api from "api-client";

export default {
  components: { Loading },
  computed: {
    language() {
      return this.$store.state.language.confirmEmail;
    }
  },
  async created() {
    try {
      const resp = await api.confirmEmail(this.$route.params.confirmationCode);
      if (resp.status === 200) {
        // Display welcome Message
        this.$store.state.newNotification.Message = this.language.emailConfirmed;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "success";
        this.$router.push("/login");
      } else {
        // Display Error Message
        this.$store.state.newNotification.Message = this.language.userIncorrect;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
        this.$router.push("/");
      }
    } catch (error) {
      // Display Error Message
      this.$store.state.newNotification.Message = this.language.userIncorrect;
      this.$store.state.newNotification.state = true;
      this.$store.state.newNotification.color = "error";
      this.$router.push("/");
    }
  }
};
</script>

<style scoped></style>
