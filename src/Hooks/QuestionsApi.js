import axios from "axios";
import { convertUtcToIst } from "../Utils/timeUtils"; // Import the time conversion function
import { toast } from "react-toastify";
import { keyframes } from "@emotion/react";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchQuestionsBySubject = async (token, subjectId, classesId) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response1 = await axios.get(
      `${BASE_URL}/question/all?page=1&limit=10&subjectFilter=${subjectId}&classesFilter=${classesId}`,
      config
    );

    const response2 = await axios.get(
      `${BASE_URL}/sub-topic/all?page=1&limit=10`,
      config
    );

    const Questions = response1?.data?.data?.question_data || [];
    const subTopics = response2?.data?.data?.sub_topic_data || [];

    return {
      Questions,
      subTopics,
    };
  } catch (err) {
    toast.error("Error fetching data:", err);
    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "An error occurred while fetching data"
    );
  }
};

export const getQuestionData = async (token, questionId) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      headers: {
        Authorization: ` ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(
      `${BASE_URL}/question/${questionId}`,
      config
    );

    if (response.status === 200) {
      return response.data.data;
    } else {
      throw new Error("Failed to fetch question data");
    }
  } catch (error) {
    console.error("Error fetching question data:", error);
    throw error;
  }
};

export const deleteQuestion = async (token, itemToDelete) => {
  try {
    const config = {
      method: "delete",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.delete(
      `${BASE_URL}/question/delete/${itemToDelete}`,
      config
    );

    if (response.data && response.data.updatedAt) {
      const utcTime = new Date(response.data.updatedAt);
      const indiaTime = new Date(utcTime.getTime() + 5.5 * 60 * 60 * 1000);

      console.log("Converted IST time:", indiaTime.toISOString());
      response.data.updatedAt = indiaTime.toISOString();
    }

    return response;
  } catch (err) {
    console.error("Error deleting question:", err);
    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "An error occurred while deleting the question"
    );
  }
};

export const addNewQuestion = async (addQuestion, token) => {
  try {
    const data = JSON.stringify(addQuestion);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/question/add`,
      headers: {
        Authorization: `${token}`,
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log(response);

    if (response.status === 200) {
      if (response.data.createdAt) {
        const indiaTime = convertUtcToIst(response.data.createdAt); // Convert UTC to IST
        console.log("Converted IST time:", indiaTime); // Log the converted time
        response.data.createdAt = indiaTime;
      }

      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.error("Error adding question:", error); // Log the error for debugging
  }
};

export const editQuestionAPI = async (editQuestion, token) => {
  try {
    const data = JSON.stringify(editQuestion);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/question/edit`,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      if (response.data.createdAt) {
        const indiaTime = convertUtcToIst(response.data.createdAt);
        console.log("Converted IST time:", indiaTime);
        response.data.createdAt = indiaTime;
      }

      return response;
    } else {
      throw new Error("Failed to edit question");
    }
  } catch (error) {
    console.error("Error editing question:", error);
    throw error; // Re-throw error for handling in the calling function
  }
};
