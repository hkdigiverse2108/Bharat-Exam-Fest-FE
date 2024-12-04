// bannerService.js
import axios from "axios";
import { convertUtcToIst } from "../Utils/timeUtils";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const fetchData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/banner/all`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
    const { status, data, message, error } = response.data;

    if (response.status === 200) {
      console.log("Raw banner data:", data.banner_data);

      const updatedBannerData = data.banner_data.map((banner) => {
        if (banner.created_at) {
          banner.created_at_ist = convertUtcToIst(banner.created_at);
        }

        return banner;
      });

      console.log("Updated banner data with IST:", updatedBannerData);
      return updatedBannerData;
    } else {
      console.warn("Failed:", error);
      throw new Error("Failed to fetch data from the API.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("An error occurred while fetching data.");
  }
};

export default fetchData;
