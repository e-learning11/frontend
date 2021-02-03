<template>
  <v-card flat outlined class="card-main">
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="(section, i) in sections" :key="i">
        <v-expansion-panel-header
          class="font-weight-medium text-subtitle-1"
          color="#fbfbf8"
          >{{ section.name }}</v-expansion-panel-header
        >
        <v-expansion-panel-content>
          <v-row dense class="mt-3">
            <v-col
              cols="12"
              v-for="(component, j) in section.components"
              :key="j"
              class="text-body-2 font-weight-light mt-1 mb-1"
            >
              <v-row align="center">
                <v-col cols="auto">
                  <v-icon
                    size="16"
                    color="grey darken-2"
                    v-if="component.type === 'Video'"
                  >
                    mdi-play-circle-outline
                  </v-icon>
                  <v-icon
                    size="16"
                    color="grey darken-2"
                    v-if="component.type === 'Assignment'"
                  >
                    mdi-notebook-edit-outline
                  </v-icon>
                  <v-icon
                    size="16"
                    color="grey darken-2"
                    v-if="component.type === 'Test'"
                  >
                    mdi-fountain-pen-tip
                  </v-icon>
                </v-col>
                <v-col cols="auto"> {{ component.name }}</v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
export default {
  props: {
    sections: Array
  }
};
</script>

<style scoped>
.card-main {
  background-color: #fbfbf8;
}
</style>
