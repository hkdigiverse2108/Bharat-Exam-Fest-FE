import React, { useState } from "react";
import Pagination from "../Pagination/Pagination";

export default function Pending() {
  const [status, setStatus] = useState("Pending");

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
              <tr className="border-y border-slate-200">
                <td className="p-2 text-sm text-slate-500 overflow-hidden text-ellipsis">
                  001
                </td>
                <td className="p-3 whitespace-nowrap">dear</td>
                <td className="p-3 whitespace-nowrap">20/10/2024</td>
                <td className="p-3 whitespace-nowrap">d@gmail.com</td>
                <td className="p-3 whitespace-nowrap">+91 7894561230</td>
                <td className="p-3 whitespace-nowrap">proof</td>
                <td className="p-3 whitespace-nowrap">dear#2024</td>
                <td className="p-3 whitespace-nowrap">
                  <img src="i1.png" alt="img" className="w-42  h-10" />
                </td>
                <td className="p-3 whitespace-nowrap">
                  <img src="i1.png" alt="img" className="w-42  h-10" />
                </td>
                <td className="p-3 whitespace-nowrap">
                  <select
                    name="status"
                    value={status}
                    className={`${
                      status === "Verified"
                        ? "bg-green-100  text-green-600"
                        : status === "Pending"
                        ? "bg-yellow-100  text-yellow-600"
                        : status === "Unverified"
                        ? "bg-red-100  text-red-600"
                        : "bg-gray-100  text-gray-900"
                    } text-md text-center rounded-full cursor-pointer appearance-none focus:outline-none block max-w-md px-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white `}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option
                      value="Verified"
                      className="px-2 text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-500"
                    >
                      Verified
                    </option>
                    <option
                      className="px-2 text-sm leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-500"
                      value="Pending"
                    >
                      Pending
                    </option>
                    <option
                      className="px-2 text-sm leading-5 font-semibold rounded-full bg-red-100 text-red-500"
                      value="Unverified"
                    >
                      Unverified
                    </option>
                  </select>
                </td>
                <td className="p-3 whitespace-nowrap">
                  <button className="px-4 py-1 font-medium text-white bg-orange-600 rounded-md hover:bg-orange-500 focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out">
                    save
                  </button>
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
