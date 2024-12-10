import axios from "axios";
import { toast } from "react-toastify";
import { convertIstToUtc, convertUtcToIst } from "../Utils/timeUtils";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// export const fetchKycData = async (accessToken) => {
//   try {
//     const config = {
//       method: "get",
//       maxBodyLength: Infinity,
//       url: `${BASE_URL}/kyc/all?page=1&limit=10`,
//       headers: {
//         Authorization: `${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     };

//     const response = await axios.request(config);

//     if (response.status === 200) {
//       const kycData = response.data.data.kyc_data;

//       // Assuming kyc_data contains date fields such as createdAt and updatedAt
//       const updatedKycData = kycData.map((item) => {
//         if (item.createdAt) {
//           item.createdAt =  convertUtcToIst(item.createdAt);
//         }
//         if (item.updatedAt) {
//           item.updatedAt =  convertUtcToIst(item.updatedAt);
//         }
//         return item;
//       });

//       return updatedKycData;
//     } else {
//       // Handle cases where the status is not 200 (success)
//       console.log("Failed to fetch KYC data:", response.data.message);
//       throw new Error("Failed to fetch KYC data");
//     }
//   } catch (err) {
//     console.error("Error fetching KYC data:", err.message);
//     throw err;
//   }
// };

// export const filterData = (kycData) => {
//   const pending = kycData.filter((user) => user.status === "pending");
//   const unverified = kycData.filter((user) => user.status === "unverified");
//   const verified = kycData.filter((user) => user.status === "verified");

//   return { pending, unverified, verified };
// };

// export const updateKycStatus = async (accessToken, updateData) => {
//   try {
//     // Check if any date fields (e.g., `createdAt`, `updatedAt`) need to be converted from ISC to UTC
//     if (updateData.createdAt) {
//       updateData.createdAt = convertIstToUtc(updateData.createdAt); // Convert if date field is present
//     }
//     if (updateData.updatedAt) {
//       updateData.updatedAt = convertIstToUtc(updateData.updatedAt);
//     }

//     // Prepare request data
//     const data = JSON.stringify(updateData);
//     const config = {
//       method: "post",
//       maxBodyLength: Infinity,
//       url: `${BASE_URL}/kyc/edit`,
//       headers: {
//         Authorization: accessToken,
//         "Content-Type": "application/json",
//       },
//       data: data,
//     };

//     const response = await axios.request(config);

//     if (response.status === 200) {
//       console.success("KYC Status updated successfully.");
//       return response.data.data.kyc_data;
//     } else {

//       console.error("Request failed:", response.data.message);
//       console.error(response.data.message || "Failed to update KYC Status.");
//       throw new Error(response.data.message || "Failed to update KYC Status.");
//     }
//   } catch (err) {
//     console.error("Error updating KYC status:", err.message);
//     throw err;
//   }
// };

// export async function handleUpdateKyc(accessToken, updateData) {
//   try {
//     const updateSuccess = await updateKycStatus(accessToken, updateData);

//     if (updateSuccess) {
//       const kycData = await fetchKycData(accessToken);
//       console.log("Fetched KYC Data after update:", kycData);
//       return kycData;
//     }
//   } catch (error) {
//     console.error("Failed to update KYC:", error);
//   }
// }

export const fetchKycData = async (accessToken) => {
  try {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/kyc/all?page=1&limit=10`,
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);

    if (response.status === 200) {
      const kycData = response.data.data.kyc_data;

      const fieldsToConvert = [
        "createdAt",
        "updatedAt",
        "startDate",
        "endDate",
      ];

      const updatedKycData = kycData.map((item) => {
        const hasDateField = fieldsToConvert.some((field) => item[field]);

        if (hasDateField) {
          fieldsToConvert.forEach((field) => {
            if (item[field]) {
              item[field] = convertUtcToIst(item[field]);
            }
          });
        }

        return item;
      });
      // console.log(`Converted to ISC:`, updatedKycData);

      return { success: true, data: updatedKycData };
    } else {
      console.error("Failed to fetch KYC data:", response.data.message);
      toast.error("Failed to fetch KYC data: " + response.data.message);
      return { success: false, message: response.data.message };
    }
  } catch (err) {
    console.error("Error fetching KYC data:", err.message);
    toast.error("Error fetching KYC data: " + err.message);
    return { success: false, message: err.message };
  }
};

export const filterData = (kycData) => {
  const pending = kycData.filter((user) => user.status === "pending");
  const unverified = kycData.filter((user) => user.status === "unverified");
  const verified = kycData.filter((user) => user.status === "verified");

  return { pending, unverified, verified };
};

export const updateAndFetchKycStatus = async (accessToken, updateData) => {
  try {
    const fieldsToConvert = [
      "createdAt",
      "updatedAt",
      "start_date",
      "end_date",
      "updatedAt",
      "createdAt",
    ];
    fieldsToConvert.forEach((field) => {
      if (updateData[field]) {
        updateData[field] = convertIstToUtc(updateData[field]);
        console.log(`Converted ${field} to UTC:`, updateData[field]);
      }
    });

    // Prepare request data
    const data = JSON.stringify(updateData);
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${BASE_URL}/kyc/edit`,
      headers: {
        Authorization: accessToken,
        "Content-Type": "application/json",
      },
      data: data,
    };

    // Fetch updated KYC data
    const updateResponse = await axios.request(config);

    if (updateResponse.status === 200) {
      toast.success("KYC Status updated successfully.");

      const fetchResponse = await fetchKycData(accessToken);
      if (fetchResponse.success) {
        console.log("Fetched KYC Data after update:", fetchResponse.data);
        return { success: true, data: fetchResponse.data };
      } else {
        console.error(
          "Failed to fetch KYC data after update:",
          fetchResponse.message
        );
        return { success: false, message: fetchResponse.message };
      }
    } else {
      console.error("Request failed:", updateResponse.data.message);
      console.error(
        "Failed to update KYC Status: " + updateResponse.data.message
      );
      return { success: false, message: updateResponse.data.message };
    }
  } catch (err) {
    console.error("Error updating KYC status:", err.message);
    toast.error("Error updating KYC status: " + err.message);
    return { success: false, message: err.message };
  }
};
