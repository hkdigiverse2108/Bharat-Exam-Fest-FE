import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import Pagination from "../Pagination/Pagination";
import FilterdropDown from "./FilterdropDown";

export default function ContestwiseEarn() {
  const [toggle, setToggle] = useState(false);
  function handleShow() {
    setToggle(!toggle);
  }

  return (
    <>
      <section className="shadow-md">
        <div className="relative w-full inline-flex items-center justify-between rounded-t-xl px-4 py-2 overflow-hidden text-slate-700 bg-white  bg-clip-border">
          <p className="text-2xl text-left font-semibold text-slate-800 uppercase">
            Contest wise earning & counting
          </p>
          <div className="flex  items-center justify-end">
            <button
              onClick={() => setToggle(!toggle)}
              className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
            >
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <FiFilter />
              </svg>
              <p className=" font-semibold">Filter</p>
            </button>
          </div>
        </div>
        <div className={`${toggle === true ? "block" : "hidden"}`}>
          <FilterdropDown toggle={toggle} setToggle={() => handleShow()} />
        </div>
        <div className="bg-white overflow-auto px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Contest Name
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
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Count
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
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Earning
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    dear
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    30
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    ₹33,900
                  </p>
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
