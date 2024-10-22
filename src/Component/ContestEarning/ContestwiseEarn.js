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
      <section className="mx-auto  space-y-6">
        <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="flex flex-row items-center  justify-between p-4 overflow-hidden rounded-t-xl text-slate-700 bg-white bg-clip-border">
            <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              Contest wise eaarning & counting
            </p>

            <div className="flex  items-center justify-end">
              <button
                onClick={() => setToggle(!toggle)}
                className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <FiFilter />
                </svg>
                <p className=" font-semibold">Filter</p>
              </button>
              <FilterdropDown toggle={toggle} setToggle={() => handleShow()} />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full  text-center table-auto min-w-max">
              <thead>
                <tr>
                  <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200">
                    <div className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                      Contest Name
                      <svg viewBox="0 0 24 24" className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </div>
                  </th>
                  <th className="px-2 py-4 text-center font-sans text-sm font-medium leading-none text-slate-800 transition-colors cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200">
                    <div className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                      Count
                      <svg viewBox="0 0 24 24" className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </div>
                  </th>
                  <th className="px-2 py-4 text-center font-sans text-sm font-medium leading-none text-slate-800 transition-colors cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200">
                    <div className="flex items-center justify-between gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                      Earning
                      <svg viewBox="0 0 24 24" className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">dear</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">1000</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden uppercase text-ellipsis">
                    <p className="text-sm text-slate-500">₹28,900</p>
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">dear</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">1000</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden uppercase text-ellipsis">
                    <p className="text-sm text-slate-500">₹28,900</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* pagination */}
          <Pagination />
        </div>
      </section>
      {/* <FilterdropDown toggle={toggle} setToggle={() => handleShow()} /> */}

    </>
  );
}
