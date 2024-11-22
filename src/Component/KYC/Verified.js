import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import {
  fetchKycData,
  handleUpdateKyc,
  updateKycStatus,
} from "../../Hooks/useGetKycApi";

export default function Verified({ verifiedData }) {
  const [userStatuses, setUserStatuses] = useState({});
  const [verifiedList, setVerifiedList] = useState([]);

  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );

  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setVerifiedList(verifiedData);
    setDataToDisplay(verifiedData.slice(0, itemsPerPage));
  }, [verifiedData]);

  useEffect(() => {
    setDataToDisplay(
      verifiedList.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [currentPage, verifiedList]);

  const handleStatusChange = (userId, newStatus) => {
    setVerifiedList((prev) =>
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
    const updatedUsers = verifiedList.filter(
      (user) => user.status === "unverified" || user.status === "pending"
    );
    const formData = transformKycData(updatedUsers[0]);
    console.log(formData);

    try {
      const updatedEntries = await handleUpdateKyc(accessToken, formData);

      console.log("KYC entries updated successfully:", updatedEntries);
    } catch (error) {
      console.error("Error updating KYC status:", error);
    }
  };

  return (
    <>
      <section className="shadow-md">
        <div className="bg-white rounded-xl overflow-auto px-0">
          <p className="px-4 py-2 text-2xl text-left font-medium text-slate-800 uppercase">
            Unverified
          </p>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
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
                    key={index}
                    className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors "
                  >
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                      {header}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
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
                    <tr key={_id} className="border-y border-slate-200">
                      <td className="p-2 text-sm text-slate-500 overflow-hidden text-ellipsis">
                        {idNumber}
                      </td>
                      <td className="p-3 whitespace-nowrap">{fullName}</td>
                      <td className="p-3 whitespace-nowrap">{dob}</td>
                      <td className="p-3 whitespace-nowrap">
                        {userInfo.email}
                      </td>
                      <td className="p-3 whitespace-nowrap">{mobile}</td>
                      <td className="p-3 whitespace-nowrap">{user.idProof}</td>
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
        <Pagination
          total={Math.ceil(verifiedData.length / itemsPerPage)}
          page={setCurrentPage}
          current={currentPage}
        />
      </section>
    </>
  );
}
