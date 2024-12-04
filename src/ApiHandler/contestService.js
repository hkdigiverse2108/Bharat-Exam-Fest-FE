import axios from "axios";
import { convertIscToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchContestData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest-type/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    // Status handling: checking the response status
    if (response.status === 200) {
      console.log("Successfully fetched contest data");

      // Access the contest_type_data array
      const contestTypeData = response.data.data.contest_type_data;

      // Check if there is contest type data
      if (contestTypeData && Array.isArray(contestTypeData)) {
        // Convert UTC dates to IST for each contest type data item
        const updatedContestTypeData = contestTypeData.map((contestType) => {
          // Convert any date field to IST (e.g., 'created_at', 'updated_at', etc.)
          if (contestType.created_at) {
            contestType.created_at_ist = convertUtcToIst(
              contestType.created_at
            ); // Add IST formatted date field
          }
          if (contestType.updated_at) {
            contestType.updated_at_ist = convertUtcToIst(
              contestType.updated_at
            ); // Add IST formatted date field
          }

          // You can add more date fields if needed

          return contestType;
        });

        console.log(
          "Updated contest type data with IST:",
          updatedContestTypeData
        );

        return updatedContestTypeData; // Return updated contest type data with IST dates
      } else {
        console.warn("No contest type data available");
        return [];
      }
    } else {
      console.error(`Failed to fetch contest data, status: ${response.status}`);
      throw new Error(
        `Failed to fetch contest data with status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching contest data:", error.message);
    throw new Error(error.message);
  }
};

// Fetch class data
export const fetchClassData = async (accessToken) => {
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

    // Status handling: checking the response status
    if (response.status === 200) {
      console.log("Successfully fetched class data");

      // Access the classes_data array
      const classesData = response.data.data.classes_data;

      // Check if there is classes data
      if (classesData && Array.isArray(classesData)) {
        // Convert UTC dates to IST for each class data item
        const updatedClassesData = classesData.map((classItem) => {
          // Convert any date field to IST (e.g., 'created_at', 'updated_at', etc.)
          if (classItem.created_at) {
            classItem.created_at_ist = convertUtcToIst(classItem.created_at); // Add IST formatted date field
          }
          if (classItem.updated_at) {
            classItem.updated_at_ist = convertUtcToIst(classItem.updated_at); // Add IST formatted date field
          }

          // You can add more date fields if needed

          return classItem;
        });

        console.log("Updated class data with IST:", updatedClassesData);

        return updatedClassesData; // Return updated class data with IST dates
      } else {
        console.warn("No class data available");
        return [];
      }
    } else {
      console.error(`Failed to fetch class data, status: ${response.status}`);
      throw new Error(
        `Failed to fetch class data with status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching class data:", error.message);
    throw new Error(error.message);
  }
};

// Add new contest
export const addNewContest = async (contestData, accessToken) => {
  try {
    // Convert any ISC date fields to UTC (e.g., 'start_date', 'end_date', etc.)
    if (contestData.start_date) {
      contestData.start_date = convertIscToUtc(contestData.start_date);
    }
    if (contestData.end_date) {
      contestData.end_date = convertIscToUtc(contestData.end_date);
    }

    const requestData = JSON.stringify(contestData);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest/add`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      data: requestData,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      console.log("Contest added successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to add contest, status:", response.status);
      throw new Error(`Failed to add contest with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error adding contest:", error.message);
    throw new Error(
      `An error occurred while adding the contest: ${error.message}`
    );
  }
};

// Edit contest
export const editContest = async (contestData, accessToken) => {
  try {
    // Convert any ISC date fields to UTC (e.g., 'start_date', 'end_date', etc.)
    if (contestData.start_date) {
      contestData.start_date = convertIscToUtc(contestData.start_date);
    }
    if (contestData.end_date) {
      contestData.end_date = convertIscToUtc(contestData.end_date);
    }

    const requestData = JSON.stringify(contestData);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest/edit`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
      data: requestData,
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      console.log("Contest edited successfully:", response.data);
      return response.data;
    } else {
      console.error("Failed to edit contest, status:", response.status);
      throw new Error(`Failed to edit contest with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error editing contest:", error.message);
    throw new Error(
      `An error occurred while editing the contest: ${error.message}`
    );
  }
};

// Delete contest data
export const deleteContestData = async (id, accessToken) => {
  try {
    const config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest/delete/${id}`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      console.log("Contest deleted successfully");

      // Fetch the latest data after deletion (optional)
      await fetchClassData(accessToken); // Assuming this function also accepts accessToken
      await fetchContestData(accessToken); // Assuming this function also accepts accessToken

      return response.data;
    } else {
      console.error("Failed to delete contest, status:", response.status);
      throw new Error(
        `Failed to delete contest with status: ${response.status}`
      );
    }
  } catch (err) {
    console.error("Error deleting contest data:", err.message);
    throw new Error(
      `An error occurred while deleting the contest: ${err.message}`
    );
  }
};
