// hooks/useFetchContestData.js
import { useEffect, useState } from "react";
import axios from "axios";
import { convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function fetchContestData(accessToken) {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    // Status handling: checking the response status
    if (response.status === 200) {
      console.log("Successfully fetched contest data");

      // Access the contest_data array
      const contestData = response.data.data.contest_data;

      // Check if there is contest data
      if (contestData && Array.isArray(contestData)) {
        // Convert UTC dates to IST for each contest data item
        const updatedContestData = contestData.map((contest) => {
          if (contest.created_at) {
            contest.created_at_ist = convertUtcToIst(contest.created_at); // Add IST formatted date field
          }
          if (contest.updated_at) {
            contest.updated_at_ist = convertUtcToIst(contest.updated_at); // Add IST formatted date field
          }

          // You can add more date fields if needed

          return contest;
        });

        console.log("Updated contest data with IST:", updatedContestData);

        return updatedContestData; // Return updated contest data with IST dates
      } else {
        console.warn("No contest data available");
        return [];
      }
    } else {
      console.error(`Failed to fetch contest data, status: ${response.status}`);
      throw new Error(
        `Failed to fetch contest data with status: ${response.status}`
      );
    }
  } catch (err) {
    console.error("Error fetching contest data:", err.message);
    throw new Error(err.message);
  }
}
