import axios from "axios";
import { convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchUserList = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/user/all`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      let subjectData = response.data.data.subject_data;
      const totalData = response.data.data.totalData;

      // Convert any necessary UTC dates in the data to IST
      if (subjectData && Array.isArray(subjectData)) {
        subjectData = subjectData.map((item) => {
          if (item.created_at) {
            item.created_at = convertUtcToIst(item.created_at);
          }
          // You can apply the conversion to other date fields as well if needed
          if (item.updated_at) {
            item.updated_at = convertUtcToIst(item.updated_at);
          }

          return item;
        });
      }

      return {
        subjectData,
        totalData,
      };
    } else {
      throw new Error(`Error fetching user list: ${response.data.message}`);
    }
  } catch (err) {
    console.error("Error fetching user list:", err.message);
    throw new Error(err.message);
  }
};


export const fetchData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/classes/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      let classesData = response.data.data.classes_data;
      const totalData = response.data.data.totalData;

      // Convert any necessary UTC dates in the data to IST
      if (classesData && Array.isArray(classesData)) {
        classesData = classesData.map((item) => {
          if (item.created_at) {
            item.created_at = convertUtcToIst(item.created_at);
          }
          if (item.updated_at) {
            item.updated_at = convertUtcToIst(item.updated_at);
          }

          return item;
        });
      }

      return {
        classesData,
        totalData,
      };
    } else {
      throw new Error(`Error fetching classes: ${response.data.message}`);
    }
  } catch (err) {
    console.error("Error fetching classes data:", err.message);
    throw new Error(err.message);
  }
};
