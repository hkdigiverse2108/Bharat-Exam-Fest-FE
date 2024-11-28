import axios from "axios";
import moment from "moment-timezone";
import { convertUtcToIst } from "../Utils/timeUtils"; // Import the time conversion function

const BASE_URL = "https://api-bef.hkdigiverse.com";

export const resetPasswordApiCall = async (currentUser, userAccess) => {
  try {
    const data = JSON.stringify(currentUser);

    const config = {
      method: "post",
      url: `${BASE_URL}/auth/reset-password`,
      headers: {
        Authorization: `${userAccess.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);

    if (response.data && response.data.updatedAt) {
      // const indiaTime = convertUtcToIst(response.data.createdAt); // Convert UTC to IST
      // console.log("Converted IST time:", indiaTime); // Log the converted time
      // response.data.createdAt = indiaTime;
      const indiaTime = moment
        .utc(response.data.updatedAt)
        .tz("Asia/Kolkata")
        .format();
      console.log("Converted IST time:", indiaTime);

      response.data.updatedAt = indiaTime;
    }

    return response;
  } catch (err) {
    console.error("Error resetting password:", err);
    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "An error occurred while resetting the password"
    );
  }
};
