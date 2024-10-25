import React from "react";
import { VscSaveAs } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddClasses({ confirm, setConfirm }) {
  return (
    <>
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
        <div className="flex items-center justify-center min-h-screen text-center sm:block">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block mx-auto w-full bg-white rounded-lg space-y-4 p-4  text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-xl md:max-w-3xl">
            <p className="text-3xl text-left font-medium text-gray-900">
              Add Classes
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid grid-cols-1 w-full">
                <label
                  htmlFor="class"
                  className="text-gray-700 font-semibold dark:text-gray-200"
                >
                  Classes Name
                </label>
                <input
                  className="w-full block px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 text-base p-2 border-[#808836] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                  type="text"
                  id="class"
                  placeholder="Enter classes name"
                />
              </div>
              <div className="grid grid-cols-1 w-full">
                <label
                  htmlFor="code"
                  className="text-gray-700 font-semibold dark:text-gray-200 "
                >
                  Referral Code
                </label>
                <input
                  className="w-full block px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 text-base p-2 border-[#808836] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                  type="text"
                  id="code"
                  placeholder="Enter referral code"
                />
              </div>
            </div>
            <div className="p-3 w-full h-fit border border-[#808836] shadow-sm rounded-xl">
              <div className=" space-y-2">
                <p className="text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                  Upload Class Logo
                </p>
                <input type="file" name="file" id="file" className="sr-only" />
                <label
                  htmlFor="file"
                  className="relative flex items-center justify-start  gap-x-4 text-center cursor-pointer"
                >
                  <span className="rounded-md border border-[#318973] py-2 px-8 text-base capitalize text-slate-700">
                    choose file
                  </span>

                  <span className="text-md capitalize text-[#318973]">
                    no file chosen
                  </span>
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="p-3 w-full h-fit border border-[#808836] bg-white shadow-sm rounded-xl">
                <div className="space-y-2">
                  <p
                    className="text-gray-800 font-semibold dark:text-gray-200 text-start"
                    htmlFor="file_input"
                  >
                    Upload Tearm & Condition PDF
                  </p>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="sr-only"
                  />
                  <label
                    htmlFor="file"
                    className="relative flex items-center justify-start gap-x-4 text-center cursor-pointer"
                  >
                    <span className=" rounded-md border border-[#318973] py-2 px-8 text-base capitalize text-slate-700">
                      choose file
                    </span>

                    <span className="text-md capitalize text-[#318973]">
                      no file chosen
                    </span>
                  </label>
                </div>
              </div>
              <div className="p-3 w-full h-fit border border-[#808836] bg-white shadow-sm rounded-xl">
                <div className="space-y-2">
                  <p
                    className="text-gray-800 font-semibold dark:text-gray-200 text-start"
                    htmlFor="file_input"
                  >
                    Upload Privacy Policy PDF
                  </p>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="sr-only"
                  />
                  <label
                    htmlFor="file"
                    className="relative flex items-center justify-start gap-x-4 text-center cursor-pointer"
                  >
                    <span className=" rounded-md border border-[#318973] py-2 px-8 text-base capitalize text-slate-700">
                      choose file
                    </span>

                    <span className="text-md capitalize text-[#318973]">
                      no file chosen
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-600 hover:bg-opacity-90"
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
