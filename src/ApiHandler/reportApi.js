import axios from "axios";
import { toast } from "react-toastify";
import { convertIscToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchQuestionFAQ = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/question-report/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const data = response.data;

      if (data && Array.isArray(data)) {
        data.forEach((item) => {
          if (item.created_at) {
            item.created_at = convertUtcToIst(item.created_at); 
          }
        });
      }
    //   console.log("QuestionFAQ", response.data.data.question_report_data);

      return response.data.data.question_report_data;
    } else {
      throw new Error("Failed to fetch FAQ data.");
    }
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    throw error; // Rethrow error for further handling
  }
};

export const fetchResultreport = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/result-report/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const data = response.data.data;

      if (data && Array.isArray(data)) {
        data.forEach((item) => {
          if (item.created_at) {
            item.created_at = convertUtcToIst(item.created_at); // Convert UTC to IST
          }
        });
      }
      console.log("Resultreport", response.data.data);


      return data;
    } else {
      throw new Error("Failed to fetch FAQ data.");
    }
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    throw error; // Rethrow error for further handling
  }
};
