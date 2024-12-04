import axios from "axios";
import { convertUtcToIst } from "../Utils/timeUtils";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getContestTypes = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/contest-types`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const contestTypes = response.data.contest_types || [];
      const updatedContestTypes = contestTypes.map((contest) => {
        if (contest.start_date) {
          contest.start_date = convertUtcToIst(contest.start_date);
        }
        if (contest.end_date) {
          contest.end_date = convertUtcToIst(contest.end_date);
        }
        return contest;
      });

      return updatedContestTypes;
    } else {
      throw new Error(
        `Failed to fetch contest types. Status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error fetching contest types:", error);
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
};
