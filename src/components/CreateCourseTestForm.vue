<template>
  <div>
    <!--New section Card Either a Quiz or A video-->
    <v-card shaped color="white" class="pa-8">
      <v-row justify="center" class="mb-5">
        <v-col cols="6">
          <h2 class="text-center text-h4 font-weight-light">
            New Test
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
          <div class="mr-5 font-weight-bold">Test Title :</div>
          <v-text-field dense></v-text-field>
        </v-col>
      </v-row>
    </v-card>

    <!-- Add Course Button-->
    <v-row class="mb-10 mt-10" justify="center" align="center">
      <v-btn
        x-large
        color="red darken-3"
        outlined
        class="white--text text-none text-h6 mr-5"
        >Reset</v-btn
      >
      <v-btn
        x-large
        color="blue darken-2"
        outlined
        class="white--text text-none text-h6"
        >Add Test</v-btn
      >
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
