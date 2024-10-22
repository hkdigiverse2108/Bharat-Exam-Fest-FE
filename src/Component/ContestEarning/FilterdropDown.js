import React from "react";

export default function FilterdropDown({ toggle, setToggle }) {
  return (
    <>
      <div
        className={`${
          toggle === true
            ? " absolute z-30 overflow-hidden max-w-xl transition duration-300 ease-in-out origin-top-right top-14 right-2 dark:bg-gray-800 bg-white rounded-lg shadow border border-gray-300 dark:border-transparent"
            : "hidden"
        } `}
      >
        <div className="flex flex-row w-96  space-x-2 bg-white shadow-md rounded-xl bg-clip-border p-2">
          <div className="flex-0 space-y-4">
            <div className="space-y-2 flex flex-col text-md">
              <button className="rounded-lg px-2 py-2 text-normal text-start text-gray-700 hover:text-orange-500 hover:bg-orange-100 hover:bg-opacity-90">
                Day Wise
              </button>
              <button className="rounded-lg px-2 py-2 text-normal text-start text-gray-700 hover:text-orange-500 hover:bg-orange-100 hover:bg-opacity-90">
                Week Wise
              </button>
              <button className="rounded-lg px-2 py-2 text-normal text-start text-gray-700 hover:text-orange-500 hover:bg-orange-100 hover:bg-opacity-90">
                Month Wise
              </button>
            </div>
            <button
              onClick={setToggle}
              className="rounded-lg px-6 py-1 text-semibold text-center text-lg text-white bg-orange-500   hover:bg-opacity-90"
            >
              Done
            </button>
          </div>
          <div className="flex-1">
            <p className="text-start text-lg font-medium text-gray-800">
              Today
            </p>
            <div className="space-y-2  w-full">
              <p className="rounded-lg px-2 py-2 text-md text-normal text-start text-slate-600 bg-orange-100 hover:bg-orange-300  hover:bg-opacity-90">
                22th November 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
