// api.js
import axios from 'axios';

export const fetchSubjects = async (accessToken) => {
  try {
    const response1 = await axios.get(
      `https://api-bef.hkdigiverse.com/question/subject-wise-question-count`,
      {
        headers: {
          Authorization: accessToken,
          Accept: "application/json",
        },
      }
    );

    const response2 = await axios.get(
      `https://api-bef.hkdigiverse.com/subject/all?page=1&limit=10`,
      {
        headers: {
          Authorization: accessToken,
          Accept: "application/json",
        },
      }
    );

    if (response1 && response2) {
      return {
        subjects: response2.data.data.subject_data,
        totalQuestions: response1.data.data,
      };

    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    throw new Error(err.message);
  }
};