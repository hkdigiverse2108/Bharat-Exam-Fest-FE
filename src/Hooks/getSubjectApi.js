import axios from "axios";

const API_URL = "https://api-bef.hkdigiverse.com";

export const fetchSubjects = async (accessToken,classesId) => {
  try {
    // First API Call
    const response1 = await axios.get(
      `${API_URL}/question/subject-wise-question-count`,
      {
        headers: {
          Accept: "application/json",
          Authorization:
           accessToken
        },
      }
    );

    // Second API Call
    const response2 = await axios.get(
      `https://api-bef.hkdigiverse.com/subject/all?page=1&limit=10&classesFilter=${classesId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization:
           accessToken
        },
      }
    );

    // Check if the first response is valid and extract data
    if (response1 && response2) {
      const totalQuestions = response1.data.data;
      const subjects = response2.data.data.subject_data;

      return {
        totalQuestions,
        subjects,
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
