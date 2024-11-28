import axios from "axios";
import { convertUtcToIst } from "../Utils/timeUtils"; // Import the time conversion function
import { toast } from "react-toastify";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchSubjects = async (accessToken, classesId) => {
  try {
    let config = {
      method: "get",
      headers: {
        Authorization: `${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response1 = await axios.request(
      `${BASE_URL}/question/subject-wise-question-count`,
      config
    );
    const response2 = await axios.request(
      `${BASE_URL}/subject/all?page=1&limit=10&classesFilter=${classesId}`,
      config
    );

    // Check if both responses are valid and return the data
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

export const fetchData = async (
  accessToken,
  subject,
  setSubtopics,
  setSubjectname
) => {
  try {
    let config = {
      method: "get",
      headers: {
        Authorization: `${accessToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response1 = await axios.request(
      `${BASE_URL}/sub-topic/all?page=1&limit=10`,
      config
    );
    const response2 = await axios.request(
      `${BASE_URL}/subject/${subject._id}`,
      config
    );
    if (response1.status === 200 && response2.status === 200) {
      // If both responses are successful, process the data
      const subTopic = response1?.data?.data?.sub_topic_data || [];
      const subjects = response2?.data?.data?.subject_data || [];

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
    toast.error("Failed to fetch data.");
    console.error("Error fetching data:", error);
  }
};
