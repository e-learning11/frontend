<template>
  <div>
    <!-- Hero Container -->
    <v-container fluid class="hero-container white--text">
      <v-container class="new-container">
        <v-row dense align="center">
          <v-col cols="12" class="text-center">
            <h1
              class="font-weight-bold mb-5"
              :class="{
                'text-h4': $vuetify.breakpoint.xs,
                'text-h3': $vuetify.breakpoint.sm,
                'text-h1': $vuetify.breakpoint.mdAndUp
              }"
            >
              {{ language.courses }}
            </h1>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!--Search query section-->
    <v-container fluid class="search-section">
      <v-container class="new-container">
        <v-row dense align="center" justify="center" class="mt-5 mb-5">
          <v-col cols="12" class="text-center text-h5 font-weight-light">
            {{ language.showing }} {{ Courses.length }}
            {{ language.totalResults }}
          </v-col>
          <v-col
            cols="12"
            class="text-center font-weight-medium text-subtitle-1"
          >
            {{ language.filter }}
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col
            :class="{
              'col-3': $vuetify.breakpoint.mdAndUp,
              'col-auto': $vuetify.breakpoint.smAndDown
            }"
            class="center-horizontal"
            v-for="(filter, i) in filters"
            :key="i"
          >
            <v-select
              :items="filter.values"
              :label="filter.name"
              color="blue"
              dense
              outlined
              :menu-props="{ offsetY: true }"
              v-model="searchData[filter.model]"
              @change="getCourses(0, 20, true)"
            ></v-select>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <!--Courses Searched section-->
    <v-container fluid class="courses-section">
      <v-container class="new-container">
        <Loading type="content" v-if="loading"> </Loading>
        <v-row dense align="center" justify="center" id="infinite-list">
          <v-col cols="12" v-for="i in Courses.length" :key="i" md="4" sm="12">
            <CourseCard
              class="pa-10"
              :height="CardHeight"
              :CardData="Courses[i - 1]"
            ></CourseCard>
          </v-col>
        </v-row>
      </v-container>
    </v-container>

    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "@/components/footer.vue";
import Loading from "@/components/Loading.vue";
import CourseCard from "@/components/CoursesCard.vue";
import api from "api-client";

export default {
  components: { Footer, CourseCard, Loading },
  data() {
    return {
      loading: true,
      Courses: [],
      CardHeight: 250,
      searchData: {
        language: null,
        gender: null,
        sortOrder: "ASC",
        sortType: "date"
      },
      getNewCourses: false,
      filters: [
        {
          name: this.$store.state.language.courses.language,
          model: "language",
          values: [
            {
              text: this.$store.state.language.courses.english,
              value: "English"
            },
            {
              text: this.$store.state.language.courses.arabic,
              value: "Arabic"
            },
            {
              text: this.$store.state.language.courses.all,
              value: null
            }
          ]
        },
        {
          name: this.$store.state.language.courses.gender,
          model: "gender",
          values: [
            {
              text: this.$store.state.language.courses.male,
              value: 1
            },
            {
              text: this.$store.state.language.courses.female,
              value: 2
            },
            {
              text: this.$store.state.language.courses.both,
              value: 3
            },
            {
              text: this.$store.state.language.courses.all,
              value: null
            }
          ]
        },
        {
          name: this.$store.state.language.courses.sortType,
          model: "sortOrder",
          values: [
            {
              text: this.$store.state.language.courses.ascend,
              value: "ASC"
            },
            {
              text: this.$store.state.language.courses.descend,
              value: "DESC"
            }
          ]
        },
        {
          name: this.$store.state.language.courses.sortBy,
          model: "sortType",
          values: [
            {
              text: this.$store.state.language.courses.date,
              value: "date"
            },
            {
              text: this.$store.state.language.courses.createdAt,
              value: "createdAt"
            }
          ]
        }
      ]
    };
  },
  methods: {
    async getCourses(offset, limit, newSearch) {
      this.loading = true;
      //Send request to get all the courses for allCourses
      const response = await api.getAllCourses(offset, limit, this.searchData);
      if (response.status === 200) {
        if (newSearch) this.Courses = response.data;
        else this.Courses.push(...response.data);

        if (response.data.length !== 0) this.getNewCourses = false;
        this.loading = false;
      }
    },
    async loadMore() {
      if (this.getNewCourses === true || this.Courses.length % 20 != 0) return;
      const listElm = document.querySelector("#infinite-list");
      if (listElm == null) return;
      let rect = listElm.getBoundingClientRect();
      let elemBottom = rect.bottom;
      if (elemBottom <= window.innerHeight) {
        this.getNewCourses = true;
        await this.getCourses(this.Courses.length, 20, false);
      }
    }
  },
  computed: {
    language() {
      return this.$store.state.language.courses;
    }
  },
  async created() {
    //Send request to get all the courses for allCourses
    const response = await api.getAllCourses(0, 20, this.searchData);
    if (response.status === 200) {
      this.Courses = response.data;
      this.loading = false;
      document.addEventListener("scroll", this.loadMore, true);
    }
  }
};
</script>

<style scoped>
.hero-container {
  background: url(../assets/courses-image.png) center center/cover no-repeat;
  width: 100%;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.4);
  object-fit: contain;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 80px);
}

.search-section {
  background-color: rgb(245, 245, 245);
}
.list-item {
  list-style: none;
  padding: 5px;
}
.list-item:hover {
  color: #2196f3;
  cursor: pointer;
  border: 2px solid #2196f3;
}

.center-horizontal {
  display: flex;
  justify-content: center;
}

@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
