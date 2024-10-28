import React from "react";
import { FaFilePdf } from "react-icons/fa6";

export default function Privacy() {
  return (
    <>
      <div class="p-4 ">
        <div className="flex items-center justify-start gap-x-4 w-full">
          <div class="max-w-xl flex rounded-lg h-full dark:bg-gray-800 bg-white shadow-xl border p-8 flex-col">
            <div className="px-2 py-2 text-md text-center text-red-500 hover:bg-opacity-90  ">
              <svg className="font-bold w-12 h-12" viewBox="0 0 16 16">
                <FaFilePdf />
              </svg>
            </div>
            <p class="text-left font-medium text-2xl text-gray-900 dark:text-gray-300">
              Tearm & Condition
            </p>
          </div>
          <div class="max-w-xl flex rounded-lg h-full dark:bg-gray-800 bg-white shadow-xl border p-8 flex-col">
            <div className="px-2 py-2 text-md text-center text-red-500 hover:bg-opacity-90  ">
              <svg className="font-bold w-12 h-12" viewBox="0 0 16 16">
                <FaFilePdf />
              </svg>
            </div>
            <p class="text-left w-full font-medium text-2xl text-gray-900 dark:text-gray-300">
              Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
