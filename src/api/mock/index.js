import mockuser from "./data/users.json";
import mockCourses from "./data/Courses.json";

const fetch = (mockData, time = 0) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(mockData);
    }, time);
  });

export default {
  async loginUser(user) {
    // Get all users
    const mockUser = await fetch(mockuser, 500);
    let found = false;

    if (user.email === mockUser.email && user.password === mockUser.password) {
      found = true;
    } else {
      found = false;
    }

    return {
      status: found ? 200 : 400,
      data: found
        ? { data: mockUser.data }
        : { message: "Error. Wrong UserName or Password" }
    };
  },

  async logoutUser() {
    // Remove the current user
    await fetch(true, 400);
    return { status: 200 };
  },

  async RegisterUser(NewUser) {
    await fetch(true, 800);
    if (NewUser !== null) {
      return { status: 200, data: NewUser };
    } else {
      return { status: 400 };
    }
  },

  async getCourseByid(CourseID, componentNumber) {
    const Courses = await fetch(mockCourses, 1000);
    console.log(CourseID);
    console.log(componentNumber);
    if (
      componentNumber <= Courses[0].components.length &&
      CourseID == Courses[0].id
    ) {
      return { status: 200, data: Courses[0] };
    }

    return { status: 404 };
  }
};
