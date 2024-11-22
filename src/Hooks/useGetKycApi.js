import axios from "axios";
import { useSelector } from "react-redux";

export const fetchKycData = async (accessToken) => {
  try {
    const response = await axios.get(
      "https://api-bef.hkdigiverse.com/kyc/all?page=1&limit=10",
      {
        headers: {
          Authorization: accessToken,
          Accept: "application/json",
        },
      }
    );

    return response.data.data.kyc_data;
  } catch (err) {
    console.error("Error fetching KYC data:", err.message);
    throw err; // Rethrow the error for handling in the component
  }
};

export const filterData = (kycData) => {
  const pending = kycData.filter((user) => user.status === "pending");
  const unverified = kycData.filter((user) => user.status === "unverified");
  const verified = kycData.filter((user) => user.status === "verified");

  return { pending, unverified, verified };
};

export const updateKycStatus = async (accessToken, updateData) => {
  try {
    const data = JSON.stringify(updateData);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://api-bef.hkdigiverse.com/kyc/edit`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axios.request(config);
    console.log("response", response);
    return response.data.data.kyc_data;
  } catch (err) {
    console.error("Error fetching KYC data:", err.message);
    throw err;
  }
};

export async function handleUpdateKyc(accessToken, updateData) {
  try {
    // Call updateKycStatus
    const updateSuccess = await updateKycStatus(accessToken, updateData);

    if (updateSuccess) {
      const kycData = await fetchKycData(accessToken);
      console.log("Fetched KYC Data after update:", kycData);
      return kycData; // Return the fetched KYC data if needed
    }
  } catch (error) {
    console.error("Failed to update KYC:", error);
  }
}
