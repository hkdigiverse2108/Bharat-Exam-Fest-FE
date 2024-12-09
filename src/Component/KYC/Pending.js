import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import {
  fetchKycData,
  updateAndFetchKycStatus,
} from "../../ApiHandler/useKycApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Pending({ pendingData }) {
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userStatuses, setUserStatuses] = useState({});
  const [pendingList, setPendingList] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setPendingList(pendingData);
    setDataToDisplay(pendingData.slice(0, itemsPerPage));
  }, [pendingData]);

  const totalPages = Math.ceil(pendingList.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  useEffect(() => {
    setDataToDisplay(pendingList.slice(start, end));
  }, [currentPage, start, end, pendingList]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleStatusChange = (userId, newStatus) => {
    setPendingList((prev) =>
      prev.map((user) =>
        user._id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  function transformKycData(originalData) {
    return {
      kycId: originalData._id,
      idProof: originalData.idProof,
      frontSideImage: originalData.frontSideImage,
      backSideImage: originalData.backSideImage,
      status: originalData.status,
      userId: originalData.userId,
    };
  }

  const handleSubmit = async () => {
    // Filter users with status "verified" or "unverified"
    const updatedUsers = pendingList.filter(
      (user) => user.status === "verified" || user.status === "unverified"
    );

    // Check if there are users to update
    if (updatedUsers.length === 0) {
      console.log("No users to update.");
      toast.info("No users to update."); // Inform the user
      return;
    }

    // Transform the first user for the update
    const formData = transformKycData(updatedUsers[0]);
    console.log("Form Data to be submitted:", formData);

    setLoading(true); // Start loading state
    setError(null); // Reset any previous error

    try {
      const updatedEntries = await updateAndFetchKycStatus(
        accessToken,
        formData
      );

      if (updatedEntries.success) {
        console.log("KYC entries updated successfully:", updatedEntries.data);
      } else {
        console.error("Failed to update KYC entries:", updatedEntries.message);
      }
    } catch (error) {
      console.error("Error updating KYC status:", error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <>
      <section className="shadow-md">
        <div className="bg-white rounded-xl px-0">
          <p className="px-4 py-2 text-2xl text-left font-medium text-gray-700 uppercase">
            pending
          </p>
          <div class="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="border-b border-neutral-200  font-medium dark:border-white/10">
                <tr>
                  {[
                    "S/N",
                    "Name",
                    "DOB",
                    "Gmail",
                    "Contact",
                    "Proof Type",
                    "Proof Number",
                    "Front Image",
                    "Back Image",
                    "Status",
                    "Save",
                  ].map((header, index) => (
                    <th
                      key={`${header}-${index}`}
                      scope="col"
                      className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors"
                    >
                      <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                        {header}
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataToDisplay.map((user, index) => {
                  const {
                    _id,
                    idNumber,
                    user: userInfo,
                    frontSideImage,
                    backSideImage,
                    status,
                  } = user;

                  const fullName = `${userInfo.firstName} ${userInfo.lastName}`;
                  const dob = new Date(userInfo.dob).toLocaleDateString();
                  const mobile = `${userInfo.contact.countryCode} ${userInfo.contact.mobile}`;

                  return (
                    <>
                      <tr
                        key={_id}
                        className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-600"
                      >
                        <td className="p-3 whitespace-nowrap">{idNumber}</td>
                        <td className="p-3 whitespace-nowrap">{fullName}</td>
                        <td className="p-3 whitespace-nowrap">{dob}</td>
                        <td className="p-3 whitespace-nowrap">
                          {userInfo.email}
                        </td>
                        <td className="p-3 whitespace-nowrap">{mobile}</td>
                        <td className="p-3 whitespace-nowrap">
                          {user.idProof}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {userInfo.uniqueId}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <img
                            src={frontSideImage}
                            alt="Front ID"
                            className="w-42 h-10"
                          />
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <img
                            src={backSideImage}
                            alt="Back ID"
                            className="w-42 h-10"
                          />
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <select
                            name="status"
                            value={status}
                            onChange={(e) =>
                              handleStatusChange(_id, e.target.value)
                            }
                            className={`${
                              status === "verified"
                                ? "bg-green-100 text-green-600"
                                : status === "pending"
                                ? "bg-yellow-100 text-yellow-600"
                                : status === "unverified"
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-900"
                            } text-md text-center rounded-full cursor-pointer appearance-none focus:outline-none block max-w-md px-2`}
                          >
                            <option
                              value="verified"
                              className="bg-green-100 text-green-600"
                            >
                              Verified
                            </option>
                            <option
                              value="pending"
                              className="bg-yellow-100 text-yellow-600"
                            >
                              Pending
                            </option>
                            <option
                              value="unverified"
                              className="bg-red-100 text-red-600"
                            >
                              Unverified
                            </option>
                          </select>
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          <button
                            onClick={handleSubmit}
                            className="px-4 py-1 font-medium text-white bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out"
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </section>
    </>
  );
}
