import React, { useEffect, useState } from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { fetchResultreport } from "../../ApiHandler/reportApi";

export default function UserReport() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // const [confirm, setConfirm] = useState(false);
  // const [data, setData] = useState([]);
  // const [dataToDisplay, setDataToDisplay] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const itemsPerPage = 5; // Display 5 items per page
  // const [currentPage, setCurrentPage] = useState(1);
  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const start = (currentPage - 1) * itemsPerPage;
  // const end = start + itemsPerPage;

  // const accessToken = useSelector(
  //   (state) =>
  //     state.authConfig.userInfo[0]?.data?.token ||
  //     state.authConfig.userInfo[0]?.token
  // );
  // useEffect(() => {
  //   const loadResultReport = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);
  //       const result = await fetchResultreport(accessToken);
  //       if (result.success) {
  //         setData(result.data);
  //         setDataToDisplay(result.data.slice(0, end));
  //         toast.success(result.message);
  //       } else {
  //         toast.error(result.message);
  //         console.log(result.message);
  //       }
  //     } catch (error) {
  //       console.error("Error updating KYC status:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadResultReport();
  // }, [accessToken]);

  // useEffect(() => {
  //   setDataToDisplay(data.slice(start, end));
  // }, [currentPage, data, end, start]);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  // const accessToken = useSelector(
  //   (state) =>
  //     state.authConfig.userInfo[0]?.data?.token ||
  //     state.authConfig.userInfo[0]?.token
  // );
  // const [faqData, setFaqData] = useState([]);
  // const [dataDisplay, setDataDisplay] = useState([]);

  // // console.log(dataDisplay[0]);

  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // const itemsPerPage = 5; // Display 5 items per page
  // const [currentPage, setCurrentPage] = useState(1);

  // const totalPages =
  //   faqData[0]?.reportData && Array.isArray(faqData[0]?.reportData)
  //     ? Math.ceil(faqData[0].reportData.length / itemsPerPage)
  //     : 0;
  // const start = (currentPage - 1) * itemsPerPage;
  // const end = start + itemsPerPage;

  // useEffect(() => {
  //   const getFAQ = async () => {
  //     try {
  //       setLoading(true);
  //       const result = await fetchQuestionFAQ(accessToken);
  //       if (result.success) {
  //         // console.log("question-report", result.data);
  //         console.log("userData", result.userData);
  //         const combinedData = [
  //           {
  //             reportData: result.data,
  //             userData: result.userData,
  //           },
  //         ];

  //         const combined = combinedData.map((item) => ({
  //           reportData: item.reportData,
  //           userData: item.userData,
  //         }));

  //         setFaqData(combinedData);
  //         setDataDisplay(combined.slice(0, end));
  //       } else {
  //         console.error(result.message);
  //       }
  //     } catch (err) {
  //       setError("Error fetching FAQ data.");
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getFAQ();
  // }, [accessToken]);

  // useEffect(() => {
  //   if (
  //     faqData &&
  //     faqData.length > 0 &&
  //     Array.isArray(faqData[0]?.reportData)
  //   ) {
  //     setDataDisplay(faqData[0].reportData.slice(start, end));
  //   } else {
  //     setDataDisplay([]);
  //   }
  // }, [currentPage, faqData]);

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // if (loading) return <Loading />;

  return (
    <>
      <section className="border border-slate-300 bg-white rounded-lg overflow-hidden">
        <div className="overflow-auto px-0">
          <p className="px-4 py-2 text-2xl text-left font-medium text-slate-800 uppercase">
            User Report
          </p>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {[
                  "S/N",
                  "Name",
                  "Referral Code",
                  "Contact",
                  "Gmail",
                  "DOB",
                  "KYC",
                  "Unlock",
                  "Actions",
                ].map((header) => (
                  <th
                    key={header}
                    className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors"
                  >
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      {header}
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
                ))}
              </tr>
            </thead>
            <tbody>
               {/* {userData.length > 0 ? (
                userData.map((user, index) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap max-w-xs">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.name}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.referralCode}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.contact}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.email}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.dob}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <li
                        className={`text-sm text-center rounded-full ${
                          user.kyc
                            ? "text-green-800 bg-green-100"
                            : "text-red-800 bg-red-100"
                        }`}
                      >
                        {user.kyc ? "Verified" : "Not Verified"}
                      </li>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg align-middle font-sans font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <AiOutlineDelete className="w-6 h-6" />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : ()}  */}
                <tr>
                  <td colSpan="8" className="p-4 text-center">
                    No data available.
                  </td>
                </tr>
              
            </tbody>
          </table>
        </div>
        <Pagination />
     
      </section>
    </>
  );
}
