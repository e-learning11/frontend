<template>
  <div class="admin-container">
    <template>
      <!--Admin Panel-->
      <v-navigation-drawer
        class="component-nav pa-0"
        app
        clipped
        left
        color="#000"
        width="20%"
        v-if="$vuetify.breakpoint.lgAndUp"
        bottom
      >
        <v-row justify="center" class="mt-10">
          <v-col cols="auto" class="white--text text-h4">
            {{ language.adminPanel }}
          </v-col>
        </v-row>
        <v-row dense class="mt-10">
          <v-col cols="12">
            <v-btn
              width="100%"
              height="50"
              tile
              text
              color="grey lighten-2"
              @click="currentTab = 'Requests'"
              :class="{
                'btn-active': currentTab === 'Requests'
              }"
            >
              {{ language.requests }}</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn
              width="100%"
              height="50"
              tile
              text
              color="grey lighten-2"
              @click="currentTab = 'AddNews'"
              :class="{
                'btn-active': currentTab === 'AddNews'
              }"
              >{{ language.addNews }}</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn
              width="100%"
              height="50"
              tile
              text
              color="grey lighten-2"
              @click="currentTab = 'Certificates'"
              :class="{
                'btn-active': currentTab === 'Certificates'
              }"
              >{{ language.certificates }}</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn
              width="100%"
              height="50"
              tile
              text
              color="grey lighten-2"
              @click="currentTab = 'Users'"
              :class="{
                'btn-active': currentTab === 'Users'
              }"
              >{{ language.users }}</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn
              width="100%"
              height="50"
              tile
              text
              color="grey lighten-2"
              @click="currentTab = 'Categories'"
              :class="{
                'btn-active': currentTab === 'Categories'
              }"
              >{{ language.categories }}</v-btn
            >
          </v-col>
        </v-row>
      </v-navigation-drawer>
      <div v-else class="admin-panel-mob">
        <v-row justify="center">
          <v-col cols="auto" class="white--text text-h4">
            {{ language.adminPanel }}
          </v-col>
        </v-row>
        <v-row dense class="mt-10">
          <v-col cols="12">
            <v-btn
              width="100%"
              height="50"
              tile
              text
              color="grey lighten-2"
              @click="currentTab = 'Requests'"
              :class="{
                'btn-active': currentTab === 'Requests'
              }"
            >
              {{ language.requests }}</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn
              width="100%"
              height="50"
              tile
              text
              color="grey lighten-2"
              @click="currentTab = 'AddNews'"
              :class="{
                'btn-active': currentTab === 'AddNews'
              }"
              >{{ language.addNews }}</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn
              width="100%"
              height="50"
              tile
              text
              color="grey lighten-2"
              @click="currentTab = 'Certificates'"
              :class="{
                'btn-active': currentTab === 'Certificates'
              }"
              >{{ language.certificates }}</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn
              width="100%"
              height="50"
              tile
              text
              color="grey lighten-2"
              @click="currentTab = 'Users'"
              :class="{
                'btn-active': currentTab === 'Users'
              }"
              >{{ language.users }}</v-btn
            >
          </v-col>
          <v-col cols="12">
            <v-btn
              width="100%"
              height="50"
              tile
              text
              color="grey lighten-2"
              @click="currentTab = 'Categories'"
              :class="{
                'btn-active': currentTab === 'Categories'
              }"
              >{{ language.categories }}</v-btn
            >
          </v-col>
        </v-row>
      </div>
      <!--Main Pages for Admin-->
      <v-container class="new-container">
        <template v-if="currentTab === 'Requests'">
          <v-row justify="center" align="center" class="mt-10">
            <v-col cols="12" class="center-horizontal"
              ><h2 class="text-h4 text-center font-weight-light">
                {{ language.adminRequests }}
              </h2></v-col
            ><v-col
              :class="{
                'col-8': $vuetify.breakpoint.smAndUp,
                'col-12': $vuetify.breakpoint.xs
              }"
            >
              <v-combobox
                v-model="requestType"
                :items="typesOfRequest"
                @change="getRequests(0)"
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row class="mb-10 mt-5" justify="center">
            <v-col cols="12">
              <v-card color="white" elevation="2" class="px-10">
                <Loading v-if="waitRequest"></Loading>
                <v-row justify="center" v-else-if="Entries.length === 0">
                  <v-col cols="auto" class="text-overline">
                    {{ language.noRequests }}
                  </v-col>
                </v-row>
                <template v-else>
                  <v-row
                    justify="center"
                    align="center"
                    v-for="(entry, i) in Entries"
                    :key="i"
                    no-gutters
                  >
                    <template
                      v-if="
                        requestType.value === 'New Courses' ||
                          requestType.value === 'Delete Courses'
                      "
                    >
                      <v-col cols="12" class="text-subtitle-1 mt-5">
                        <span class="font-weight-bold">{{
                          language.courseName
                        }}</span>
                        {{ entry.name }}
                      </v-col>
                      <v-col cols="12" class="text-body-2 mb-5">
                        <span class="font-weight-bold">{{
                          language.courseSummary
                        }}</span>
                        {{ entry.summary }}
                      </v-col>
                      <v-col cols="auto" class="mb-5">
                        <v-btn
                          outlined
                          small
                          color="blue"
                          class="mx-5"
                          :to="`/course/${entry.id}`"
                          >{{ language.goToCourse }}</v-btn
                        >
                        <v-btn
                          outlined
                          small
                          color="green"
                          class="mx-5"
                          @click="approveRequest(entry.id)"
                          >{{ language.approve }}</v-btn
                        >
                        <v-btn
                          outlined
                          small
                          color="red"
                          class="mx-5"
                          @click="rejectRequest(entry.id)"
                          >{{ language.reject }}</v-btn
                        >
                      </v-col>
                      <v-col cols="12"><v-divider></v-divider></v-col>
                    </template>
                    <template v-else>
                      <v-col cols="auto" class="text-body-2 mt-5 mx-5">
                        <span class="font-weight-bold"
                          >{{ language.name }}
                        </span>
                        {{ entry.firstName }} {{ entry.lastName }}
                      </v-col>
                      <v-col cols="auto" class="text-body-2 mt-5 mx-5">
                        <span class="font-weight-bold"
                          >{{ language.email }}
                        </span>
                        {{ entry.email }}
                      </v-col>
                      <v-col cols="auto" class="text-body-2 mt-5 mx-5">
                        <span class="font-weight-bold"
                          >{{ language.age }}
                        </span>
                        {{ entry.age }}
                      </v-col>
                      <v-col cols="auto" class="text-body-2 mt-5 mx-5">
                        <span class="font-weight-bold"
                          >{{ language.gender }}
                        </span>
                        <span v-if="entry.gender === 1">{{
                          language.male
                        }}</span>
                        <span v-if="entry.gender === 2">{{
                          language.female
                        }}</span>
                      </v-col>
                      <v-col cols="12" class="mb-5 mt-5 text-center">
                        <v-btn
                          outlined
                          small
                          color="green"
                          class="mx-5"
                          @click="approveRequest(entry.id)"
                          >{{ language.approve }}</v-btn
                        >
                        <v-btn
                          outlined
                          small
                          color="red"
                          class="mx-5"
                          @click="rejectRequest(entry.id)"
                          >{{ language.reject }}</v-btn
                        >
                      </v-col>
                      <v-col cols="12"><v-divider></v-divider></v-col>
                    </template>
                  </v-row>
                </template>
              </v-card>
            </v-col>
            <v-col cols="auto">
              <v-btn
                outlined
                v-if="canGetMoreRequests"
                @click="getRequests(Entries.length)"
              >
                {{ language.loadMore }}
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-else-if="currentTab === 'AddNews'">
          <v-row justify="center" align="center" class="mt-10">
            <v-col cols="12" class="center-horizontal"
              ><h2 class="text-h4 text-center font-weight-light">
                {{ language.addNews }}
              </h2></v-col
            >
          </v-row>
          <v-form ref="NewsForm" @submit="addNews">
            <v-row justify="center" align="center" class="mt-10">
              <v-col
                :class="{
                  'col-7': $vuetify.breakpoint.mdAndUp,
                  'col-12': $vuetify.breakpoint.smAndDown,
                  'text-h6': $vuetify.breakpoint.smAndUp,
                  'text-subtitle-1': $vuetify.breakpoint.xs
                }"
              >
                <v-row justify="center" align="center" class="mb-5">
                  <v-col cols="12">
                    <v-file-input
                      accept="image/*"
                      prepend-icon="mdi-camera"
                      v-model="newNews.image"
                      :placeholder="language.addImage"
                    ></v-file-input>
                  </v-col>
                </v-row>
              </v-col>
              <v-col
                :class="{
                  'col-7': $vuetify.breakpoint.mdAndUp,
                  'col-12': $vuetify.breakpoint.smAndDown,
                  'text-h6': $vuetify.breakpoint.smAndUp,
                  'text-subtitle-1': $vuetify.breakpoint.xs
                }"
              >
                <div class=" font-weight-bold">{{ language.title }}</div>
                <v-text-field
                  dense
                  v-model="newNews.title"
                  :rules="[rules.Required]"
                ></v-text-field>
              </v-col>
              <v-col
                :class="{
                  'col-7': $vuetify.breakpoint.mdAndUp,
                  'col-12': $vuetify.breakpoint.smAndDown,
                  'text-h6': $vuetify.breakpoint.smAndUp,
                  'text-subtitle-1': $vuetify.breakpoint.xs
                }"
              >
                <div class="font-weight-bold">
                  {{ language.text }}
                </div>
                <v-textarea
                  filled
                  full-width
                  class="mt-5 mb-0"
                  auto-grow
                  v-model="newNews.text"
                  :rules="[rules.Required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="text-center mb-5">
                <v-btn
                  color="blue darken-2"
                  outlined
                  x-large
                  type="submit"
                  :disabled="sendrequest"
                >
                  {{ language.addNews }}
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </template>
        <template v-else-if="currentTab === 'Certificates'">
          <v-row justify="center" align="center" class="mt-10">
            <v-col cols="12" class="center-horizontal"
              ><h2 class="text-h4 text-center font-weight-light">
                {{ language.certificates }}
              </h2></v-col
            >
          </v-row>
          <v-row justify="center" align="center" class="mt-5">
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="certSearch"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="certHeaders"
                :items="certificates"
                :loading="certificates.length === 0"
                :items-per-page="10"
                class="elevation-1"
                :search="certSearch"
              ></v-data-table>
            </v-card>
          </v-row>
        </template>
        <template v-else-if="currentTab === 'Users'">
          <v-row justify="center" align="center" class="mt-10">
            <v-col cols="12" class="center-horizontal"
              ><h2 class="text-h4 text-center font-weight-light">
                {{ language.users }}
              </h2></v-col
            >
          </v-row>
          <v-row justify="center" align="center" class="mt-5">
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="AllUsersSearch"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="AllUsersHeaders"
                :items="AllUsers"
                :loading="AllUsers.length === 0"
                :items-per-page="10"
                class="elevation-1"
                :search="AllUsersSearch"
              >
                <template v-slot:top>
                  <v-dialog v-model="UserDialogDelete" max-width="500px">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        User?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeDeleteUser"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="red darken-1"
                          text
                          @click="deleteUserConfirm"
                          >Delete</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon color="red darken-2" small @click="deleteUser(item)">
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-row>
        </template>
        <template v-else-if="currentTab === 'Categories'">
          <v-row justify="center" align="center" class="mt-10">
            <v-col cols="12" class="center-horizontal"
              ><h2 class="text-h4 text-center font-weight-light">
                {{ language.categories }}
              </h2></v-col
            >
          </v-row>
          <v-row justify="center" align="center" class="mt-5">
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="CategoriesSearch"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                :headers="CategoriesHeaders"
                :items="Categories"
                :loading="!CategoriesRequestDone"
                :items-per-page="10"
                class="elevation-1"
                :search="CategoriesSearch"
              >
                <template v-slot:top>
                  <v-form ref="categoryForm" @submit="addCategory">
                    <v-row justify="center" align="center">
                      <v-col cols="5">
                        <v-text-field
                          :rules="[rules.Required]"
                          v-model="newCategory"
                          :disabled="sendCreateCatRequest"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-btn color="primary" rounded type="submit">{{
                          language.addCategory
                        }}</v-btn>
                      </v-col>
                    </v-row>
                  </v-form>
                  <v-dialog v-model="CategoryDialogDelete" max-width="550px">
                    <v-card>
                      <v-card-title class="text-h5"
                        >Are you sure you want to delete this
                        Category?</v-card-title
                      >
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="closeDeleteCategory"
                          >Cancel</v-btn
                        >
                        <v-btn
                          color="red darken-1"
                          text
                          @click="deleteCategoryConfirm"
                          >Delete</v-btn
                        >
                        <v-spacer></v-spacer>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon
                    color="red darken-2"
                    small
                    @click="deleteCategory(item)"
                  >
                    mdi-delete
                  </v-icon>
                </template>
              </v-data-table>
            </v-card>
          </v-row>
        </template>
      </v-container>
    </template>
    <!--footer-->
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import api from "api-client";

export default {
  data() {
    return {
      waitRequest: false,
      Entries: [{}, {}],
      currentTab: "Requests",
      rules: {
        Required: value => !!value || "Required."
      },
      newNews: {
        title: "",
        image: null,
        text: ""
      },
      sendrequest: false,
      canGetMoreRequests: false,
      requestType: {
        value: "New Teachers",
        text: this.$store.state.language.admin.newTeachers
      },
      typesOfRequest: [
        {
          value: "New Teachers",
          text: this.$store.state.language.admin.newTeachers
        },
        {
          value: "New Courses",
          text: this.$store.state.language.admin.newCourses
        },
        {
          value: "Delete Courses",
          text: this.$store.state.language.admin.deleteCourses
        }
      ],
      typesOfRequestValues: ["New Teachers", "New Courses", "Delete Courses"],
      certificates: [],
      certHeaders: [
        { text: "Email", value: "Email" },
        { text: "User Name", value: "User Name" },
        { text: "Course Name", value: "Course Name" },
        { text: "Serial", value: "Serial" }
      ],
      certSearch: "",

      // Users data
      AllUsers: [],
      AllUsersHeaders: [
        { text: "Email", value: "email" },
        { text: "First Name", value: "firstName" },
        { text: "Last Name", value: "lastName" },
        { text: "Age", value: "age" },
        // { text: "Gender", value: "gender" },
        { text: "Type", value: "type" },
        { text: "Phone", value: "phone" },
        { text: "Activated", value: "activated" },
        { text: "Delete", value: "actions", sortable: false }
      ],
      AllUsersSearch: "",
      // Dialog and User delete
      UserDialogDelete: false,
      selectedUserToDeleteIndex: -1,

      // Categories Data
      Categories: [],
      CategoriesHeaders: [
        { text: "ID", value: "id" },
        { text: "Name", value: "name" },
        { text: "Delete", value: "actions", sortable: false }
      ],
      CategoriesSearch: "",
      CategoriesRequestDone: false,
      CategoryDialogDelete: false,
      selectedCategoryToDeleteIndex: -1,
      newCategory: "",
      sendCreateCatRequest: false
    };
  },
  components: { Loading },
  computed: {
    UserImage() {
      return api.getImageSource(this.$store.state.currentUser.id, "user");
    },
    language() {
      return this.$store.state.language.admin;
    }
  },
  methods: {
    async addCategory(event) {
      event.preventDefault();
      if (!this.$refs.categoryForm.validate()) return;
      this.sendCreateCatRequest = true;

      // Send the Request
      const response = await api.AddCategory(
        JSON.parse(localStorage.getItem("userToken")),
        { name: this.newCategory }
      );
      if (response.status === 200) {
        this.$store.state.newNotification.Message = "Category Created";
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "success";

        // Add to categories
        this.Categories.push(response.data);
      } else {
        this.$store.state.newNotification.Message = response.data;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
      }

      this.sendCreateCatRequest = false;
      // Reset the form
      this.$refs.categoryForm.reset();
    },
    deleteUser(user) {
      this.selectedUserToDeleteIndex = this.AllUsers.indexOf(user);
      this.UserDialogDelete = true;
    },
    deleteCategory(category) {
      this.selectedCategoryToDeleteIndex = this.Categories.indexOf(category);
      this.CategoryDialogDelete = true;
    },
    deleteUserConfirm() {
      const deleteIndex = this.selectedUserToDeleteIndex;
      api
        .deleteUser(
          JSON.parse(localStorage.getItem("userToken")),
          this.AllUsers[this.selectedUserToDeleteIndex].id
        )
        .then(response => {
          if (response.status === 200) {
            this.$store.state.newNotification.Message = response.data;
            this.$store.state.newNotification.state = true;
            this.$store.state.newNotification.color = "success";
            this.AllUsers.splice(deleteIndex, 1);
          } else {
            this.$store.state.newNotification.Message = response.data;
            this.$store.state.newNotification.state = true;
            this.$store.state.newNotification.color = "error";
          }
        })
        .catch(e => {
          this.$store.state.newNotification.Message = e;
          this.$store.state.newNotification.state = true;
          this.$store.state.newNotification.color = "error";
        });
      this.closeDeleteUser();
    },
    deleteCategoryConfirm() {
      const deleteIndex = this.selectedCategoryToDeleteIndex;
      api
        .deleteCategory(
          JSON.parse(localStorage.getItem("userToken")),
          this.Categories[this.selectedCategoryToDeleteIndex].id
        )
        .then(response => {
          if (response.status === 200) {
            this.$store.state.newNotification.Message = response.data;
            this.$store.state.newNotification.state = true;
            this.$store.state.newNotification.color = "success";
            this.Categories.splice(deleteIndex, 1);
          } else {
            this.$store.state.newNotification.Message = response.data;
            this.$store.state.newNotification.state = true;
            this.$store.state.newNotification.color = "error";
          }
        })
        .catch(e => {
          this.$store.state.newNotification.Message = e;
          this.$store.state.newNotification.state = true;
          this.$store.state.newNotification.color = "error";
        });
      this.closeDeleteCategory();
    },
    closeDeleteUser() {
      this.UserDialogDelete = false;
      this.selectedUserToDeleteIndex = -1;
    },
    closeDeleteCategory() {
      this.CategoryDialogDelete = false;
      this.selectedCategoryToDeleteIndex = -1;
    },
    async addNews(event) {
      event.preventDefault();
      if (!this.$refs.NewsForm.validate()) return;
      this.sendrequest = true;

      // Send the Request
      const response = await api.AddNews(
        JSON.parse(localStorage.getItem("userToken")),
        { ...this.newNews }
      );
      if (response.status === 200) {
        this.$store.state.newNotification.Message = this.$store.state.language.admin.newsAdded;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "success";
      } else {
        this.$store.state.newNotification.Message = response.data;
        this.$store.state.newNotification.state = true;
        this.$store.state.newNotification.color = "error";
      }

      this.sendrequest = false;
      // Reset the form
      this.$refs.NewsForm.reset();
    },
    async getRequests(offset) {
      if (this.typesOfRequestValues.indexOf(this.requestType.value) === -1)
        return;
      if (offset === 0) this.waitRequest = true;
      // Send the Request
      const response = await api.getRequests(
        JSON.parse(localStorage.getItem("userToken")),
        this.requestType.value,
        offset,
        20
      );
      if (response.status === 200) {
        if (response.data.length != 20) this.canGetMoreRequests = false;
        else this.canGetMoreRequests = true;
        if (offset === 0) this.Entries = response.data;
        else this.Entries.push(...response.data);
      } else if (response.status === 401) this.$router.push("/");
      this.waitRequest = false;
    },
    async rejectRequest(id) {
      if (this.typesOfRequestValues.indexOf(this.requestType.value) === -1)
        return;
      const response = await api.rejectRequests(
        JSON.parse(localStorage.getItem("userToken")),
        this.requestType.value,
        id
      );
      if (response.status === 200) {
        this.getRequests(0);
      }
    },
    async approveRequest(id) {
      if (this.typesOfRequestValues.indexOf(this.requestType.value) === -1)
        return;
      const response = await api.approveRequests(
        JSON.parse(localStorage.getItem("userToken")),
        this.requestType.value,
        id
      );
      if (response.status === 200) {
        this.getRequests(0);
      }
    },
    remodelCertificates(certs) {
      const data = [];
      certs.forEach(cert => {
        data.push({
          Email: cert.User.email,
          "User Name": cert.User.firstName + " " + cert.User.lastName,
          "Course Name": cert.Course.name,
          Serial:
            String(cert.CourseId).padStart(4, "0") +
            "-" +
            String(cert.UserId).padStart(5, "0")
        });
      });
      return data;
    }
  },
  async created() {
    //Check that this is the admin
    if (
      JSON.parse(localStorage.getItem("currentUser")) == null ||
      JSON.parse(localStorage.getItem("currentUser")).type !== "admin"
    )
      this.$router.push("/");
    await this.getRequests(0);
    api
      .getCertificates(JSON.parse(localStorage.getItem("userToken")))
      .then(response => {
        if (response.status === 200) {
          this.certificates = this.remodelCertificates(
            response.data.certificates
          );
        }
      });
    api
      .getAllUsers(JSON.parse(localStorage.getItem("userToken")))
      .then(response => {
        if (response.status === 200) {
          this.AllUsers = response.data;
        }
      });
    api
      .getAllCategories(JSON.parse(localStorage.getItem("userToken")))
      .then(response => {
        if (response.status === 200) {
          this.CategoriesRequestDone = true;
          this.Categories = response.data;
        }
      });
  }
};
</script>

<style scoped>
.admin-container {
  background-color: #f5f5f5;
}
.admin-panel-mob {
  background-color: black;
}
.center-horizontal {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.new-container {
  min-height: calc(100vh - 80px);
}
.btn-active {
  background-color: #333;
}
@media (min-width: 1904px) {
  .new-container {
    max-width: 1440px;
  }
}
</style>
