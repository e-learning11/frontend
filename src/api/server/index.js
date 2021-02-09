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
    console.log(DataObject);
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

  async getAllCourses(offset, limit) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/courses?limit=${limit}&offset=${offset}`
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getEnrolledCourses(UserToken) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/courses/enrolled`,
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getCreatedCourses(UserToken) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/courses/created`,
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getFinishedCourses(UserToken) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/courses/finished`,
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getCourseByid() {},

  async getCourseTests() {},

  async getTestScore() {}
};
