import React, { useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import HowToPlay from "../ContestType/HowToPlay";
import Pagination from "../Pagination/Pagination";

export default function SubjectData() {
  // const [confirm, setConfirm] = useState(false);
  // function handleShow() {
  //   setConfirm(!confirm);
  // }
  const navigate = useNavigate();
  function handleAddSubject() {
    navigate("/addSubject");
  }
  function handleEditSubject() {
    navigate("/editSubject");
  }

  return (
    <>
      <section className="mx-auto space-y-6">
        {/* tabel1 */}
        <div className="">
          <div className="relative space-y-2 p-4 flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
            <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              Subjects
            </p>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-2 items-start  justify-between overflow-hidden rounded-t-xl text-slate-700 bg-white bg-clip-border">
              <p className="text-lg tracking-tight font-medium text-left text-slate-600 dark:text-white ">
                Enter ther subject name to create a new subject for the class
                curriculum.
              </p>
              <button
                onClick={() => handleAddSubject()}
                className=" inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90 "
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <FaPlus />
                </svg>
                <p className="font-semibold">Add New Subject</p>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        No
                        <svg viewBox="0 0 24 24" className="w-4 h-4">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          ></path>
                        </svg>
                      </p>
                    </th>
                    <th className="px-2 py-4 max-w-[300px] transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Subject Name
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          ></path>
                        </svg>
                      </p>
                    </th>
                    <th className="px-2 py-4  transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Subtopics
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          aria-hidden="true"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                          ></path>
                        </svg>
                      </p>
                    </th>
                    <th className="px-2 py-4  transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Edit
                      </p>
                    </th>
                    <th className="px-2 py-4  transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Remove
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">1</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500 border border-gray-500 p-2 rounded-md max-w-[300px]">
                        Ancient Mediaeval History
                      </p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-wrap w-auto ">
                      <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-2 2xl:grid-cols-5 2xl:gap-3">
                        <p className="w-auto p-1 text-sm rounded-sm text-yellow-700 text-center bg-yellow-100">
                          Roman Empire
                        </p>
                        <p className="w-auto p-1 text-sm rounded-sm text-green-700 text-center bg-green-100">
                          The Crusades
                        </p>
                        <p className="w-auto p-1 text-sm rounded-sm text-purple-700 text-center bg-purple-100">
                          Feudalism
                        </p>
                        <p className="w-auto p-1 text-sm rounded-sm text-sky-700 text-center bg-sky-100">
                          Technology
                        </p>
                        <p className="w-auto p-1 text-sm rounded-sm text-sky-700 text-center bg-sky-100">
                          Technology
                        </p>
                        <p className="w-auto p-1 text-sm rounded-sm text-green-700 text-center bg-green-100">
                          Feudalism
                        </p>
                      </div>
                    </td>

                    <td className="p-2 border-b border-slate-200 text-center  overflow-hidden text-ellipsis">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => handleEditSubject()}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            className="w-5 h-5"
                          >
                            <LuPencilLine />
                          </svg>
                        </span>
                      </button>
                    </td>
                    <td className="p-2 border-b border-slate-200 text-center  overflow-hidden text-ellipsis">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg  text-md align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
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
            {/* pagination */}
            <Pagination />
          </div>
        </div>
      </section>
    </>
  );
}
