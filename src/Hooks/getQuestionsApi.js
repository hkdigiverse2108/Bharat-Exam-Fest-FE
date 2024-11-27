// api.js
import axios from "axios";

export const fetchQuestionsBySubject = async (accessToken, subjectId) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    };
    const response1 = await axios.get(
      `https://api-bef.hkdigiverse.com/question/all?page=1&limit=10&subjectFilter=${subjectId}`,
      config
    );

    const response2 = await axios.get(
      `https://api-bef.hkdigiverse.com/sub-topic/all?page=1&limit=10`,
      config
    );

    if (response1 && response2) {
      const Questions = response1.data.data.question_data;
      const subTopics = response2.data.data.sub_topic_data;
      return {
        Questions,
        subTopics,
      };
    } else {
      throw new Error("Failed to fetch data from the first API");
    }
  } catch (err) {
    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "An error occurred while fetching subjects"
    );
  }
};

export const getQuestionData = async (accessToken, questionId, config) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      headers: {
        Authorization: accessToken,
      },
    };
    const response = await axios.get(
      `https://api-bef.hkdigiverse.com/question/${questionId}`,
      config
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch data from the first API");
    }
  } catch (error) {
    console.error("Error fetching question data:", error);
    throw error; // Propagate the error for handling
  }
};
