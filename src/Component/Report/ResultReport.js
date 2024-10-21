import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../Pagination/Pagination";

export default function ResultReport() {
  return (
    <>
      <section>
        <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="relative p-4 overflow-hidden text-slate-700 bg-white rounded-t-xl bg-clip-border">
            <h3 className="text-2xl text-left font-semibold text-slate-800">
              Result Report
            </h3>
          </div>
          <div className="overflow-y-auto">
            <table className="w-full text-left min-w-max whitespace-nowrap table-fixed">
              <thead>
                <tr className="text-center">
                  <th className="px-2 py-4 w-20 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
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
                  <th className="px-2 py-4 max-w-2xl transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                      Question
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
                      Category
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
                    <p className="font-sans text-sm font-medium leading-none text-slate-800">
                      Gmail
                    </p>
                  </th>
                  <th className="px-2 py-4  w-20 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                      User Id
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
                      User Name
                    </p>
                  </th>
                  <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                      User Email
                    </p>
                  </th>
                  <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className="font-sans text-sm font-medium leading-none text-slate-800">
                      Refrral Code
                    </p>
                  </th>
                  <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className=" font-sans text-sm font-medium leading-none text-slate-800">
                      Report Number
                    </p>
                  </th>

                  <th className="px-2 py-4  w-20 transition-colors cursor-pointer border-y border-slate-200 bg-slate-50 hover:bg-slate-100">
                    <p className=" font-sans text-sm font-medium leading-none text-slate-800">
                      Action
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="max-h-sm">
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">001</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 align-top overflow-hidden text-wrap">
                    <p className="text-sm text-slate-500 ">
                      What are the major causes of air pollution, and how can
                      they be reduced?
                    </p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500 ">Air Polution</p>
                  </td>
                  <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">dear</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">d@gmail.com</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">001</p>
                  </td>
                  <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">dear</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">d@gmail.com</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">PNSJVST6467SDN</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">+91 78945610230</p>
                  </td>
                  <td className="p-2 text-center border-b border-slate-200">
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
                <tr className="max-h-sm">
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">001</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-wrap">
                    <p className="text-sm text-slate-500">
                      What are the major causes of air pollution, and how can
                      they be reduced?
                    </p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500 ">Air Polution</p>
                  </td>
                  <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">dear</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">d@gmail.com</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">001</p>
                  </td>
                  <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">dear</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">d@gmail.com</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">PNSJVST6467SDN</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">+91 78945610230</p>
                  </td>
                  <td className="p-2 text-center border-b border-slate-200">
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
        <Pagination/>
        </div>
      </section>
    </>
  );
}
