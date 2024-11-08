import React, { useEffect, useState } from "react";
import { FiBarChart2 } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { MdBlock } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import ClassesCredential from "./ClassesCredential";

const UserList = () => {
  const navigate = useNavigate();
  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const Totalpage = Math.ceil(users.length / ITEMS_PER_PAGE);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [error, setError] = useState(null);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );

  // const deleteSubject = async (value) => {
  //   try {
  //     let config = {
  //       method: "delete",
  //       maxBodyLength: Infinity,
  //       url: `https://api-bef.hkdigiverse.com/subject/delete/${value}`,
  //       headers: {
  //         Authorization: accessToken,
  //         "Content-Type": "application/json",
  //       },
  //     };

  //     axios
  //       .request(config)
  //       .then((response) => {
  //         console.log(JSON.stringify(response.data));
  //         navigate("/subject");
  //         toast.success("Subject delete");
  //         fetchSubjects();
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "https://api-bef.hkdigiverse.com/user/all?page=1&limit=10",
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data.data.subject_data);

      setUsers(response.data.data.subject_data);
      setDataToDisplay(
        response.data.data.subject_data.slice(0, ITEMS_PER_PAGE)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const SimpleDate = ({ dateString }) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();

    return (
      <p className="block antialiased font-sans text-sm leading-normal font-normal">
        {formattedDate}
      </p>
    );
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  
  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setDataToDisplay(users.slice(start, end));
  }, [currentPage]);

  return (
    <>

      <section className=" space-y-6 pb-4">
        <div className="shadow-md">
          <div className="relative rounded-t-xl px-4 py-2 overflow-hidden text-slate-700 bg-white  bg-clip-border">
            <div className="flex items-center justify-between ">
              <p className="text-2xl font-medium text-slate-800">Mobile User</p>

              <button className="flex space-x-2 bg-orange-500 hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded items-center">
                <svg
                  className="w-8 h-8 p-1 bg-white rounded-full text-orange-500"
                  viewBox="0 0 16 16"
                >
                  <FiBarChart2 />
                </svg>
                <div className="text-left flex flex-col">
                  <span className="font-semibold  text-sm capitalize text-gray-100">
                    total users application
                  </span>
                  <p className="text-xl text-gray-100 font-medium ">70</p>
                </div>
              </button>
            </div>
          </div>
          <div className="bg-white overflow-auto px-0">
            <table className=" w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
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
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Full Name
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
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Gmail
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Address
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
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      DOB
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Profile Picture
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      City
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
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Referral Code
                    </p>
                  </th>

                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Actions
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataToDisplay.map((user, index) => (
                  <tr key={index}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.firstName}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.email}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        India
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <SimpleDate dateString={user.dob} />
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                      <img
                        src="i1.png"
                        alt="Foo eating a sandwich."
                        className="w-42 mx-auto h-30"
                      />
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {user.city}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        ABCWF01684JHF43
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 text-center w-[50px]">
                      <button
                        className="relative h-10 w-10 select-none rounded-lg  align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                        type="button"
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            viewBox="0 0 16 16"
                            className="w-6 h-6 text-gray-800"
                          >
                            <MdBlock />
                          </svg>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            total={Totalpage}
            page={setCurrentPage}
            current={currentPage}
          />
        </div>

        <ClassesCredential/>
      </section>
    </>
  );
};

export default UserList;
