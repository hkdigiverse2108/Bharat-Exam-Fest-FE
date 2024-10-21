import React from "react";
import { FiBarChart2 } from "react-icons/fi";
import { LuPencilLine } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import OtpVerify from "../OtpVerify/OtpVerify";
import Pagination from "../Pagination/Pagination";

export default function UserDetails() {
  const navigate = useNavigate();
  function handleAddUser() {
    navigate("/addUser");
  }
  function handleEditUser() {
    navigate("/editUser");
  }
  return (
    <>
      <section className="mx-auto space-y-6">
        {/* tabel1 */}
        <div className="">
          <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="relative p-4 overflow-hidden rounded-t-xl text-slate-700 bg-white bg-clip-border">
              <div className="flex items-center justify-between ">
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Mobile User
                  </h3>
                </div>
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

            <div className="overflow-x-auto">
              <table className="w-full text-left table-auto min-w-max">
                <thead>
                  <tr>
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        S/N
                        <svg viewBox="0 0 24 24" className="w-4 h-4">
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
                        Full Name
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
                        Gmail
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
                        Address
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
                        DOB
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
                        Profile Picture
                      </p>
                    </th>
                    <th className="px-2 py-4  transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        City
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
                        Refral Code
                        <svg viewBox="0 0 24 24" className="w-4 h-4">
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
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">001</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">d@gmail.com</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Surat</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">19/10/2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Jan 4,2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">123</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center text-md align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
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
                  <tr>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">001</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">d@gmail.com</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Surat</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">19/10/2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Jan 4,2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">123</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center text-md align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
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
                  <tr>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">003</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">d@gmail.com</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Surat</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">19/10/2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Jan 4,2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">123</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans font-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
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

        {/* table2 */}
        <div className="">
          <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
            <div className="relative p-4 overflow-hidden text-slate-700 bg-white rounded-t-xl bg-clip-border">
              <div className="flex items-center justify-between ">
                <h3 className="text-lg font-semibold text-slate-800">
                  Classes Panel
                </h3>

                <button
                  onClick={() => handleAddUser()}
                  className="inline-flex items-center justify-endspace-x-2 rounded-lg px-2 py-2 text-md text-center capitalize text-white bg-orange-500 hover:bg-opacity-90"
                >
                  <svg
                    className="font-bold text-white w-6 h-6"
                    viewBox="0 0 16 16"
                  >
                    <FaPlus />
                  </svg>
                  <p className=" font-semibold "> Add Classes Credential</p>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto">
              <table className="w-full text-left  min-w-max whitespace-nowrap table-fixed">
                <thead>
                  <tr>
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        S/N
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
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Full Name
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
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Gmail
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
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Address
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
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        DOB
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
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Profile Picture
                      </p>
                    </th>
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Password
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
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Phone Number
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
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Class Name
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
                    <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                      <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                        Action
                      </p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">001</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">d@gmail.com</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500 ">Surat</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">19/10/2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Jan 4,2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">+91 78945610230</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Class Name</p>
                    </td>
                    <td className="p-2 border-b border-slate-200">
                      <div className="flex items-center justify-evenly  gap-2 font-sans text-md font-medium leading-none text-slate-800">
                        <button
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => handleEditUser()}
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
                        <button
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                          type="button"
                        >
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                            <svg viewBox="0 0 16 16" className="w-6 h-6">
                              <AiOutlineDelete />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">002</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">d@gmail.com</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500 ">Surat</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">19/10/2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Jan 4,2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">+91 78945610230</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Class Name</p>
                    </td>
                    <td className="p-2 border-b border-slate-200">
                      <div className="flex items-center justify-evenly  gap-2 font-sans text-md font-medium leading-none text-slate-800">
                        <button
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => handleEditUser()}
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
                        <button
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                          type="button"
                        >
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                            <svg viewBox="0 0 16 16" className="w-6 h-6">
                              <AiOutlineDelete />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">003</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">d@gmail.com</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500 ">Surat</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">19/10/2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Jan 4,2024</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">divyang</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">+91 78945610230</p>
                    </td>
                    <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                      <p className="text-sm text-slate-500">Class Name</p>
                    </td>
                    <td className="p-2 border-b border-slate-200">
                      <div className="flex items-center justify-evenly  gap-2 font-sans text-md font-medium leading-none text-slate-800">
                        <button
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() => handleEditUser()}
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
                        <button
                          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                          type="button"
                        >
                          <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                            <svg viewBox="0 0 16 16" className="w-6 h-6">
                              <AiOutlineDelete />
                            </svg>
                          </span>
                        </button>
                      </div>
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
      <OtpVerify />
    </>
  );
}
