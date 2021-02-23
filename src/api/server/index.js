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

  async editUserProfile(UserToken, DataObject) {
    let data = new FormData();
    for (let key in DataObject) {
      data.append(key, DataObject[key]);
    }
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
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

  getFileSource(id) {
    return `${Base_URL}/api/course/component/file?componentId=${id}`;
  },

  async CreateCourse(DataObject, UserToken) {
    // Create the form Data
    let data = new FormData();

    // Process the DataObject
    // Add date
    DataObject.date = Date.now();

    // Process the files to be added to the Request
    let videoFlag,
      assignFlag = true;
    DataObject.sections.forEach(section => {
      for (let i = 0; i < section.components.length; i++) {
        if (
          section.components[i].type === "Video" &&
          section.components[i].File != null
        ) {
          // append the file
          videoFlag = false;
          data.append("vidoeFile", section.components[i].File);
          section.components[i].File = true;
        } else if (
          section.components[i].type === "Assignment" &&
          section.components[i].File != null
        ) {
          // append the file
          assignFlag = false;
          data.append("assignmentFile", section.components[i].File);
          section.components[i].File = true;
        }
      }
    });

    // If no files found
    if (videoFlag) data.append("vidoeFile", null);
    if (assignFlag) data.append("assignmentFile", null);

    //Remove components
    delete DataObject.components;

    //copy Image from Object and delete it
    const tempImage = DataObject.photo;
    delete DataObject.photo;

    // Append the Json and Image
    data.append("json", `${JSON.stringify(DataObject)}`);
    data.append("image", tempImage);

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

  async EditCourse(DataObject, UserToken) {
    // Create the form Data
    let data = new FormData();

    // Process the DataObject
    // Add date
    DataObject.date = Date.now();

    // Process the files to be added to the Request
    //let videoFlag, assignFlag = true;
    DataObject.sections.forEach(section => {
      for (let i = 0; i < section.components.length; i++) {
        if (
          section.components[i].type === "Video" &&
          section.components[i].File != null
        ) {
          // append the file
          //videoFlag = false;
          data.append("vidoeFile", section.components[i].File);
          section.components[i].File = true;
        } else if (
          section.components[i].type === "Assignment" &&
          section.components[i].File != null
        ) {
          // append the file
          //assignFlag = false;
          data.append("assignmentFile", section.components[i].File);
          section.components[i].File = true;
        }
      }
    });

    // If no files found
    //if (videoFlag)
    data.append("vidoeFile", null);
    //if (assignFlag) data.append("assignmentFile", null);

    //Remove components
    delete DataObject.components;

    //copy Image from Object and delete it
    //const tempImage = DataObject.photo;
    delete DataObject.photo;

    // Append the Json and Image
    data.append("json", `${JSON.stringify(DataObject)}`);
    //data.append("image", tempImage);

    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .put(`${Base_URL}/api/course/full-edit`, data, config)
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
    let request;

    if (data != null) {
      request = {
        method: "GET",
        url: `${Base_URL}/api/courses?limit=${limit}&offset=${offset}&language=${data.language}&gender=${data.gender}&sortOrder=${data.sortOrder}&sort=${data.sortType}`
      };
    } else {
      request = {
        method: "GET",
        url: `${Base_URL}/api/courses?limit=${limit}&offset=${offset}`
      };
    }
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getSingleCourse(courseId) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/courses?limit=1&offset=0&courseId=${courseId}`
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

  async MarkAsDone(UserToken, courseId, componentId) {
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(
        `${Base_URL}/api/course/mark-as-done?courseId=${courseId}&componentId=${componentId}`,
        null,
        config
      )
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async MarkAsComplete(UserToken, courseId) {
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/course/finish?courseId=${courseId}`, null, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getAllCourseQuestions(UserToken, offset, limit, data) {
    const config = {
      params: {
        offset,
        limit,
        courseId: data.courseId,
        sortOrder: data.sortOrder
      },
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    // Add correct sort type parameters
    if (data.sortType === "featured") {
      config.params.isFeatured = true;
    } else if (data.sortType === "votes") {
      config.params.sort = "votes";
    } else if (data.sortType === "answered") {
      config.params.isAnswered = true;
    } else if (data.sortType === "createdAt") {
      config.params.sort = "createdAt";
    }

    // Add tag if exist
    if (data.tag != null) {
      config.params.tag = data.tag;
    }

    // Add title if exist
    if (data.title != "") {
      config.params.title = data.title;
    }

    // Send Request
    const response = await axios
      .get(`${Base_URL}/api/forum/questions`, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getSingleQuestion(UserToken, questionId) {
    const config = {
      params: {
        offset: 0,
        limit: 1,
        questionId
      },
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };

    // Send Request
    const response = await axios
      .get(`${Base_URL}/api/forum/questions`, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getSingleQuestionAnswers(UserToken, offset, limit, questionId) {
    const config = {
      params: {
        limit,
        offset,
        questionId
      },
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };

    // Send Request
    const response = await axios
      .get(`${Base_URL}/api/forum/questions/replies`, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getSingleQuestionAnswersComments(UserToken, offset, limit, replyId) {
    const config = {
      params: {
        limit,
        offset,
        replyId
      },
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };

    // Send Request
    const response = await axios
      .get(`${Base_URL}/api/forum/questions/replies/comments`, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getSingleQuestionComments(offset, limit, questionId) {
    const config = {
      params: {
        limit,
        offset,
        questionId
      }
    };

    // Send Request
    const response = await axios
      .get(`${Base_URL}/api/forum/question/comments`, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async addQuestionToForum(UserToken, data) {
    // Process the tags
    let tempString = "";
    for (let i = 0; i < data.tags.length; i++) {
      tempString += data.tags[i];
      if (i !== data.tags.length - 1) tempString += ",";
    }
    data.tags = tempString;
    // Send the request
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/forum/question`, data, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async addAnswerToQuestion(UserToken, questionId, text) {
    const data = {
      questionId,
      text
    };
    // Send the request
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/forum/question/reply`, data, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async addCommentToQuestion(UserToken, questionId, text) {
    const data = {
      questionId,
      text
    };
    // Send the request
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/forum/question/comment`, data, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async addCommentToAnswer(UserToken, replyId, text) {
    const data = {
      replyId,
      text
    };
    // Send the request
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/forum/question/reply/comment`, data, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async setQuestionAsFeatured(UserToken, questionId, courseId) {
    const data = {
      questionId,
      courseId,
      isFeatured: true
    };
    // Send the request
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/forum/question/set-question`, data, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async setAnswerAsCorrect(UserToken, questionId, answerId, setCorrect) {
    if (setCorrect) {
      const data = {
        questionId,
        replyId: answerId
      };
      // Send the request
      const config = {
        headers: {
          "x-auth-token": `${UserToken}`
        }
      };
      const response = await axios
        .post(`${Base_URL}/api/forum/question/reply/set-answer`, data, config)
        .then(res => res)
        .catch(err => err.response);

      return response;
    } else {
      const data = {
        questionId,
        replyId: answerId
      };
      // Send the request
      const config = {
        headers: {
          "x-auth-token": `${UserToken}`
        },
        data
      };
      const response = await axios
        .delete(`${Base_URL}/api/forum/question/reply/unset-answer`, config)
        .then(res => res)
        .catch(err => err.response);

      return response;
    }
  },

  async voteInForum(UserToken, type, id, vote) {
    const data = {
      type,
      typeId: id,
      vote: vote === 1 ? "upvote" : "downvote"
    };
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/forum/vote`, data, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async changeFeaturedStatus(UserToken, courseId, questionId, type) {
    const data = {
      questionId,
      courseId,
      isFeatured: type
    };
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/forum/question/set-question`, data, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getCourseTestsAndAssignments(
    UserToken,
    limit,
    offset,
    courseId,
    componentId,
    type
  ) {
    let request;
    if (type === "Test") {
      request = {
        method: "GET",
        url: `${Base_URL}/api/course/essays/submits?limit=${limit}&offset=${offset}&courseId=${courseId}&testId=${componentId}`,
        headers: {
          "x-auth-token": `${UserToken}`
        }
      };
    } else {
      request = {
        method: "GET",
        url: `${Base_URL}/api/course/assignments/submits?limit=${limit}&offset=${offset}&courseId=${courseId}&testId=${componentId}`,
        headers: {
          "x-auth-token": `${UserToken}`
        }
      };
    }
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async gradeCourseTestsAndAssignments(
    UserToken,
    courseId,
    submissionId,
    grade,
    type
  ) {
    if (type === "Test") {
      const config = {
        headers: {
          "x-auth-token": `${UserToken}`
        }
      };
      const response = await axios
        .post(
          `${Base_URL}/api/course/essay/grade`,
          {
            essaySubmissionId: submissionId,
            grade,
            courseId
          },
          config
        )
        .then(res => res)
        .catch(err => err.response);
      return response;
    } else {
      const config = {
        headers: {
          "x-auth-token": `${UserToken}`
        }
      };
      const response = await axios
        .post(
          `${Base_URL}/api/course/assignment/grade`,
          {
            assignmentSubmissionId: submissionId,
            grade,
            courseId
          },
          config
        )
        .then(res => res)
        .catch(err => err.response);
      return response;
    }
  },

  async gradeTest(UserToken, courseId, testId, answers, Questions) {
    // process the test and add the Correct data
    let data = [];
    for (let i = 0; i < answers.length; i++) {
      data.push({
        answer: answers[i],
        questionId: Questions[i].id
      });
    }
    // Send the request
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(
        `${Base_URL}/api/course/test/grade?testId=${testId}&courseId=${courseId}`,
        {
          answers: data
        },
        config
      )
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async gradeAssignment(UserToken, courseId, assignmentId, assignmentFile) {
    let data = new FormData();

    data.append("courseId", courseId);
    data.append("assignmentId", assignmentId);
    data.append("file", assignmentFile);
    data.append("text", null);
    // Send the request
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .post(`${Base_URL}/api/course/assignment/submit`, data, config)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getTestState(UserToken, courseId, testId) {
    // Send the request
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .get(
        `${Base_URL}/api/course/test/state?testId=${testId}&courseId=${courseId}`,
        config
      )
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getAssignmentState(UserToken, courseId, assignmentId) {
    // Send the request
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios
      .get(
        `${Base_URL}/api/course/assignment/state?assignmentId=${assignmentId}&courseId=${courseId}`,
        config
      )
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getTestScore(UserToken, courseId, testId) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/course/test/grade?testId=${testId}&courseId=${courseId}`,
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async getCourseOverview(UserToken, courseId) {
    const request = {
      method: "GET",
      url: `${Base_URL}/api/course/overview?courseId=${courseId}`,
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    const response = await axios(request)
      .then(res => res)
      .catch(err => err.response);

    return response;
  },

  async deleteFromForum(UserToken, type, id) {
    const config = {
      headers: {
        "x-auth-token": `${UserToken}`
      }
    };
    // Question
    if (type === "Q") {
      const response = await axios
        .delete(`${Base_URL}/api/forum/question?questionId=${id}`, config)
        .then(res => res)
        .catch(err => err.response);

      return response;
    }
    // Answer
    else if (type === "A") {
      const response = await axios
        .delete(`${Base_URL}/api/forum/question/reply?replyId=${id}`, config)
        .then(res => res)
        .catch(err => err.response);

      return response;
    }
    // Comment on Question
    else if (type === "CQ") {
      const response = await axios
        .delete(
          `${Base_URL}/api/forum/question/comment?commentId=${id}`,
          config
        )
        .then(res => res)
        .catch(err => err.response);

      return response;
    }
    // Comment on Answer
    else {
      const response = await axios
        .delete(
          `${Base_URL}/api/forum/question/reply/comment?commentId=${id}`,
          config
        )
        .then(res => res)
        .catch(err => err.response);

      return response;
    }
  }
};
