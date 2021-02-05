<template>
  <v-card flat outlined class="card-main">
    <!--For Main Course Page-->
    <v-expansion-panels accordion v-if="PageType === 'Main'">
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
    <!--For Course COntent Page-->
    <v-expansion-panels accordion v-if="PageType === 'Content'">
      <v-expansion-panel v-for="(section, i) in sections" :key="i">
        <v-expansion-panel-header
          class="font-weight-medium text-subtitle-1"
          color="#fbfbf8"
          >Section {{ i + 1 }}: {{ section.name }}</v-expansion-panel-header
        >
        <v-expansion-panel-content class="innerExPan pa-0">
          <v-row no-gutters class="pt-4">
            <v-col
              cols="12"
              v-for="(component, j) in section.components"
              :key="j"
              class="text-body-2 font-weight-light link-wrapper mb-2 rounded-lg"
              :class="{
                'disabled-link': component.number > currentComponent,
                'active-link':
                  component.number === Number($route.params.componentNumber)
              }"
            >
              <router-link
                width="100%"
                color="white"
                tile
                text
                class="blue-grey--text text-body-2 font-weight-light text-none mb-0 course-link"
                :to="`/course/${CourseNumber}/${component.number}`"
              >
                <v-row align="center">
                  <v-col cols="1" v-if="component.number > currentComponent">
                    <v-icon size="16" color="grey darken-2">
                      mdi-lock
                    </v-icon>
                  </v-col>
                  <v-col cols="1" v-else>
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
                  <v-col cols="11" class="black--text btn-overflow">
                    {{ component.number }}. {{ component.name }}
                  </v-col>
                </v-row>
              </router-link>
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
    sections: Array,
    PageType: String,
    CourseNumber: Number,
    currentComponent: Number
  }
};
</script>

<style scoped>
.card-main {
  background-color: #fbfbf8;
}
.course-link {
  text-decoration: none;
}
.link-wrapper {
  padding: 10px 5px;
  transition: all 0.3s linear;
}
.link-wrapper:hover {
  background-color: rgb(240, 240, 240);
}
.active-link {
  background-color: rgb(240, 240, 240);
}
.disabled-link {
  opacity: 0.4;
  pointer-events: none;
}
</style>
