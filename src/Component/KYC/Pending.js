import React, { useEffect, useState } from "react";
import Pagination from "../Pagination/Pagination";

export default function Pending({ pendingData }) {

  const [userStatuses, setUserStatuses] = useState({});
  const [pendingList, setPendingList] = useState({
    kycId: "",
    idNumber: "",
    idProof: "",
    frontSideImage: "",
    backSideImage: "",
    status: "",
    userId: "",
  });

  useEffect(() => {
    const initialUserStatuses = pendingData.reduce((acc, user) => {
      acc[user._id] = user.status;
      return acc;
    }, {});
    setUserStatuses(initialUserStatuses);
    const formattedData = pendingData.map((item) => ({
      kycId: item._id,
      idNumber: item.idNumber,
      idProof: item.idProof,
      frontSideImage: item.frontSideImage,
      backSideImage: item.backSideImage,
      status: item.status,
      userId: item.userId,
    }));
    console.log(formattedData);

    setPendingList(formattedData);
  }, [pendingData]);

  const handleStatusChange = (userId, newStatus) => {
    setUserStatuses((prevStatuses) => ({
      ...prevStatuses,
      [userId]: newStatus,
    }));
  };

  return (
    <>
      <section className="shadow-md">
        <div className="bg-white  rounded-xl overflow-auto px-0">
          <p className="px-4 py-2 text-2xl text-left font-medium text-slate-800 uppercase">
            pending
          </p>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    S/N
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>

                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    Name
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    DOB
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    Gmail
                  </p>
                </th>

                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    Contect
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    Proof Type
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    Proof Number
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    Front Image
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    Back Image
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    Status
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-x-2 font-normal">
                    Save
                  </p>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingData.map((user, index) => {
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
                    <tr key={index} className="border-y border-slate-200">
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
                          value={userStatuses[_id]}
                          onChange={(e) =>
                            handleStatusChange(_id, e.target.value)
                          }
                          className={`${
                            userStatuses[_id] === "verified"
                              ? "bg-green-100 text-green-600"
                              : userStatuses[_id] === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : userStatuses[_id] === "unverified"
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-900"
                          } text-md text-center rounded-full cursor-pointer appearance-none focus:outline-none block max-w-md px-2`}
                        >
                          <option
                            value="verified"
                            className="px-2 text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-500"
                          >
                            Verified
                          </option>
                          <option
                            value="pending"
                            className="px-2 text-sm leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-500"
                          >
                            Pending
                          </option>
                          <option
                            value="unverified"
                            className="px-2 text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-500"
                          >
                            Unverified
                          </option>
                        </select>
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <button className="px-4 py-1 font-medium text-white bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out">
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
        <Pagination />
      </section>
    </>
  );
}
