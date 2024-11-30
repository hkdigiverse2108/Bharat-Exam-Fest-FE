import axios from "axios";
import { convertUtcToIst } from "../Utils/timeUtils";
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchSubjects = async (token, classesId, signal) => {
  try {
    let config = {
      method: "get",
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: signal,
    };

    const response1 = await axios.request(
      `${BASE_URL}/question/subject-wise-question-count`,
      config
    );
    const response2 = await axios.request(
      `${BASE_URL}/subject/all?page=1&limit=10&classesFilter=${classesId}`,
      config
    );

    if (response1 && response2) {
      const totalQuestions = response1?.data?.data || [];
      const subjects = response2?.data?.data?.subject_data || [];

      return {
        totalQuestions,
        subjects,
      };
    } else {
      throw new Error("Failed to fetch data from the APIs");
    }
  } catch (err) {
    console.error("Error fetching subjects:", err);
    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "An error occurred while fetching subjects"
    );
  }
};

// fetch data for selected subject
export const fetchData = async (token, subject, signal) => {
  try {
    let config = {
      method: "get",
      headers: {
        Authorization: `${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      signal: signal,
    };

    const response1 = await axios.request(
      `${BASE_URL}/sub-topic/all?page=1&limit=10`,
      config
    );
    const response2 = await axios.request(
      `${BASE_URL}/subject/${subject}`,
      config
    );
    if (response1.status === 200 && response2.status === 200) {
      const subTopic = response1?.data?.data?.sub_topic_data || [];
      const subjects = response2?.data?.data || [];

      return {
        subTopic,
        subjects,
      };
    } else {
      if (response1.status !== 200) {
        console.error("Failed to fetch subtopics.");
      }
      if (response2.status !== 200) {
        console.error("Failed to fetch subjects.");
      }
    }
  } catch (error) {
    console.error("Failed to fetch data.");
    console.error("Error fetching data:", error);
  }
};
