import React from "react";
import { HiOutlineLockClosed } from "react-icons/hi";
import Pagination from "../Pagination/Pagination";

export default function UserReport() {
  return (
    <>
      <section>
        <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="relative p-4 overflow-hidden text-slate-700 bg-white rounded-t-xl bg-clip-border">
            <h3 className="text-2xl text-left font-semibold text-slate-800">
              User Report
            </h3>
          </div>
          <div className="overflow-y-auto">
            <table className="w-full text-left  min-w-max whitespace-nowrap table-fixed">
              <thead>
                <tr className="text-center">
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
                      Name
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
                      Refrral Code
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
                      Contact
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
                    <p className="font-sans text-sm font-medium leading-none text-slate-800">
                      Gmail
                    </p>
                  </th>
                  <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className="font-sans text-sm font-medium leading-none text-slate-800">
                      DOB
                    </p>
                  </th>
                  <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className="font-sans text-sm font-medium leading-none text-slate-800">
                      KYC
                    </p>
                  </th>

                  <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className=" font-sans text-sm font-medium leading-none text-slate-800">
                      Unlock
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">001</p>
                  </td>
                  <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">dear</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">PNSJVST6467SDN</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">+91 78945610230</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">d@gmail.com</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">20/10/2024</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <div class="flex items-center justify-start w-24 px-2  bg-red-100 rounded-full">
                      <li className="text-sm text-red-700">Unverifed</li>
                    </div>
                  </td>
                  <td className="p-2 text-center border-b border-slate-200">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg  align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                        <svg viewBox="0 0 16 16" className="w-6 h-6">
                          <HiOutlineLockClosed />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">001</p>
                  </td>
                  <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">dear</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">PNSJVST6467SDN</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">+91 78945610230</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">d@gmail.com</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">20/10/2024</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <div class="flex items-center w-24 px-2 bg-yellow-100 rounded-full">
                      <li className="text-sm text-yellow-700">Pending</li>
                    </div>
                  </td>
                  <td className="p-2 text-center border-b border-slate-200">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg  align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                        <svg viewBox="0 0 16 16" className="w-6 h-6">
                          <HiOutlineLockClosed />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">001</p>
                  </td>
                  <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">dear</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">PNSJVST6467SDN</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">+91 78945610230</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">d@gmail.com</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">20/10/2024</p>
                  </td>
                  <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                    <div class="flex items-center w-24 px-2 bg-green-100 rounded-full">
                      <li className="text-sm text-green-700  text-center">
                        Verified
                      </li>
                    </div>
                  </td>
                  <td className="p-2 text-center border-b border-slate-200">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg  align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                        <svg viewBox="0 0 16 16" className="w-6 h-6">
                          <HiOutlineLockClosed />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <Pagination />
        </div>
      </section>
    </>
  );
}
