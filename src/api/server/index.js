import axios from "axios";
const Base_URL = `${process.env.VUE_APP_API_HOST}`;

export default {
  async loginUser(user) {
    const request = {
      method: "POST",
      url: `${Base_URL}/api/login`,
      data: user,
      headers: {
        "Content-Type": "application/json"
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async RegisterUser(DataObject) {
    let data = new FormData();
    for (let key in DataObject) {
      data.append(key, DataObject[key]);
    }

    const response = await axios
      .post(`${Base_URL}/api/signup`, data)
      .then(res => res)
      .catch(err => err.response);
    return response;
  },

  async getUserProfile(UserToken) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/user/profile`,
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async editUserProfile(UserToken, data) {
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`,
        "Content-Type": "application/json"
      }
    };
    const response = await axios
      .put(`${Base_URL}/api/user/profile/edit`, data, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  getImageSource(id, type) {
    return `${Base_URL}/api/image?id=${id}&owner=${type}`;
  },

  async CreateCourse(DataObject, UserToken) {
    // Process the DataObject
    // Add date
    const date = new Date();
    DataObject.date =
      date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    // Add private
    DataObject.private = false;
    // Add Language
    DataObject.language = "English";

    //Remove components
    delete DataObject.components;

    //copy Image from Object and delete it
    const tempImage = DataObject.photo;
    delete DataObject.photo;

    // @TODO Process the files to be added to the Request
    // Create the form Data
    let data = new FormData();
    data.append("json", `${JSON.stringify(DataObject)}`);
    data.append("image", tempImage);
    data.append("vidoeFile", null);
    data.append("assignmentFile", null);

    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/course/create`, data, config)
      .then(res => res)
      .catch(err => err.response);
    return response;
  },

  async getRandomCourses(count) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/courses/random?count=${count}`
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getAllCourses(offset, limit, data) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/courses?limit=${limit}&offset=${offset}&language=${data.language}&gender=${data.gender}&sortOrder=${data.sortOrder}&sort=${data.sortType}`
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getEnrolledCourses(UserToken, limits) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/courses/enrolled?limit=${limits.limit}&offset=${limits.offset}`,
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getCreatedCourses(UserToken, limits) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/courses/created?limit=${limits.limit}&offset=${limits.offset}`,
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getFinishedCourses(UserToken, limits) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/courses/finished?limit=${limits.limit}&offset=${limits.offset}`,
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getCourseUserState(CourseId, UserToken) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/course/user-state?courseId=${CourseId}`,
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async enrollUserCourse(CourseId, UserToken) {
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/course/enroll?courseId=${CourseId}`, null, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getCourseByid(typeid) {
    //check the type of url
    let typeofCourse = "course_by_id";
    if (isNaN(typeid)) typeofCourse = "course_by_url";
    const request = {
      method: "GET",
      url: `${Base_URL}/api/course/get?type=${typeofCourse}&typeId=${typeid}`
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getCourseTests() {},

  async getTestScore() {}
};
