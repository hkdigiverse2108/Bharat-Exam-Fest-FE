// bannerService.js
import axios from "axios";

const fetchData = async (accessToken) => {
  try {
    const urlBanner = `https://api-bef.hkdigiverse.com/banner/all`;
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: urlBanner,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
    };
    const response = await axios.request(config);
    const { status, data, message, error } = response.data;

    if (status === 200) {
      console.log(data.banner_data);

      return data.banner_data; // Return the banner data
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
