import React from "react";
import { FaPlus, FaRegImage } from "react-icons/fa6";

export default function TermAndcondition() {
  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-2xl border">
        <div className="space-y-4 p-4">
          <h3 className="text-3xl capitalize text-left leading-10 font-bold text-gray-900">
            terms and condition
          </h3>
          <div className="relative p-4 overflow-hidden text-slate-700 bg-white rounded-t-xl bg-clip-border">
            <div className="flex flex-row items-center justify-between">
              <button
                //   onClick={() => handleNavigate()}
                className="inline-flex items-center justify-end space-x-2 rounded-full px-3 py-2 text-md text-center capitalize border border-slate-200 text-sky-500 bg-sky-100 hover:bg-opacity-90"
              >
                <svg className="font-bold w-4 h-4" viewBox="0 0 16 16">
                  <FaRegImage />
                </svg>
                <p className=" font-normal "> Add Media</p>
              </button>
              <div className="flex items-center text-center space-x-4 text-md font-medium text-gray-900">
                <h3 className="">Visual</h3>
                <p className="">Text</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
