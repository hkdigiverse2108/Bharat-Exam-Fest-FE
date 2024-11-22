// hooks/useFetchContestData.js
import { useEffect, useState } from "react";
import axios from "axios";

export async function fetchContestData(accessToken) {
  try {
    const response = await axios.get(
      "https://api-bef.hkdigiverse.com/contest/all?page=1&limit=10",
      {
        headers: {
          Authorization: accessToken,
          Accept: "application/json",
        },
      }
    );
    console.log("contest_data", response.data.data.contest_data);
    if (response.status === 200) {
      // Access the question_data array correctly
      return response.data.data.contest_data; // Return the actual questions array
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
