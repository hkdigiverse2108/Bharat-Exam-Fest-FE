import React, { useEffect, useState } from "react";
// import { LuPencilLine } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import AddClasses from "./AddClasses";
import Pagination from "../Pagination/Pagination";
import { FaFilePdf } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";


export default function ClassesHomePage() {
  const [confirm, setConfirm] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  const [input, setInput] = useState({
    classname: "",
    referralcode: "",
  });
  const { classname, referralcode } = input;
  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }
  function handleNavigate() {
    setConfirm(!confirm);
  }

  const addClass = async () => {
    try {
      if (!classname || !referralcode) {
        toast.warning("Fill up empty space");
      } else {
        const response = await axios.post(
          "https://api-bef.hkdigiverse.com/classes/add",
          {
            // Your request body here
            name: "New Class",
            description: "Class Description",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(response.data);
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        // Handle 401 Unauthorized error
        setError("Unauthorized access. Please check your token.");
        // Optionally, refresh token logic can be added here
      } else {
        setError(err.message);
      }
    }
  };

  

  // const navigate = useNavigate();


  return (
    <>
      <section className="shadow-md">
        <div className="bg-white  px-4 py-2 flex  items-center justify-between rounded-xl">
          <p className="text-2xl text-left font-semibold text-slate-800 uppercase">
            classes
          </p>
          <button
            onClick={() => handleNavigate()}
            className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
          >
            <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
              <FaPlus />
            </svg>
            <p className=" font-semibold">Add Class</p>
          </button>
        </div>
        <div className="bg-white overflow-auto px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    S/N
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Classes Name
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Referral Code
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Uploaded PDF
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Tearms & Condition
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Privacy Policy
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    01
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    Classes name
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    ABC123AWRII3469
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                  <button
                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-md align-middle font-sansfont-medium uppercase transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                      <svg viewBox="0 0 16 16" className="w-6 h-6 text-red-600">
                        <FaFilePdf />
                      </svg>
                    </span>
                  </button>
                </td>
                <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    ABC123AWRII3469
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    ABC123AWRII3469
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <button
                    className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg  align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                    type="button"
                  >
                    <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                      <svg viewBox="0 0 16 16" className="w-6 h-6">
                        <AiOutlineDelete />
                      </svg>
                    </span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Pagination />
      </section>
      <div className={`${confirm === true ? "block" : "hidden"}`}>
        <AddClasses
          confirm={confirm}
          setConfirm={() => addClass()}
          inputValue={input}
          value={(e) => handleChange(e)}
        />
      </div>
    </>
  );
}
