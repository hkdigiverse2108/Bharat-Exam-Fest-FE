import React from "react";
import { VscSaveAs } from "react-icons/vsc";
import MultipleSelect from "../MultiselectUi/MultiSelection";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddClasses({ confirm, setConfirm }) {
  return (
    <>
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block mx-auto w-full  bg-white rounded-lg space-y-6 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-5xl">
            <h3 className="mt-5 text-3xl text-left font-semibold text-gray-900">
              Add Classes
            </h3>

            <div className="grid grid-cols-1 space-y-2 w-full">
              <label
                htmlFor="class"
                className="text-lg font-medium text-gray-800 "
              >
                Classes Name
              </label>
              <input
                className="w-full text-base p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
                type="text"
                id="class"
                placeholder="Enter classes name"
              />
            </div>
            <div className="grid grid-cols-1 space-y-2 w-full">
              <label
                htmlFor="code"
                className="text-lg font-medium text-gray-800 "
              >
                Referral Code
              </label>
              <input
                className="w-full text-base p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
                type="text"
                id="code"
                placeholder="Enter referral code"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90"
                onClick={setConfirm}
              >
                <svg
                  className="font-bold text-white w-5 h-5"
                  viewBox="0 0 16 16"
                >
                  <VscSaveAs />
                </svg>
                <p className="font-semibold">save details</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer
        draggable={false}
        autoClose={2000}
        position={"top-center"}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        theme="dark"
      />
    </>
  );
}
