import React from "react";
import { FaFilePdf } from "react-icons/fa6";

export default function Privacy() {
  return (
    <>
      <div className="p-4 ">
        <div className="flex items-center justify-start gap-x-4 w-full">
          <div className="max-w-xl flex h-full border p-8 flex-col bg-white rounded-lg space-y-4 border-stroke py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-2 py-2 text-md text-center text-red-500 hover:bg-opacity-90  ">
              <svg className="font-bold w-12 h-12" viewBox="0 0 16 16">
                <FaFilePdf />
              </svg>
            </div>
            <p className="text-left font-medium text-2xl text-gray-900 dark:text-gray-300">
              Tearm & Condition
            </p>
          </div>
          <div className="max-w-xl flex h-full border p-8 flex-col bg-white rounded-lg space-y-4 border-stroke py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="px-2 py-2 text-md text-center text-red-500 hover:bg-opacity-90  ">
              <svg className="font-bold w-12 h-12" viewBox="0 0 16 16">
                <FaFilePdf />
              </svg>
            </div>
            <p className="text-left w-full font-medium text-2xl text-gray-900 dark:text-gray-300">
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
