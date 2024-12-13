import React from "react";
import { MdBlockFlipped } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ConfirmationPage({ confirm, setConfirm }) {
  return (
    <>
      <div className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
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

          <div
            className="inline-block w-full bg-white rounded-lg space-y-4 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-auto sm:align-middle sm:max-w-sm sm:w-full sm: sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="sm:flex sm:items-start space-x-4">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" viewBox="0 0 16 16">
                  <MdBlockFlipped />
                </svg>
              </div>
              <div className="space-y-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <p
                  className="text-2xl text-left w-full font-semibold text-slate-800"
                  id="modal-headline"
                >
                  Blocks
                </p>
                <p className="text-md text-left font-normal text-slate-600">
                  Are you sure you want to blocks ? This action cannot be
                  undone.
                </p>
              </div>
            </div>
            <div className="w-full flex items-center space-x-4">
              <button
                type="button"
                onClick={setConfirm}
                data-behavior="cancel"
                className=" w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-600 focus:outline-none focus:ring-0 sm:text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={setConfirm}
                data-behavior="commit"
                className="w-full  rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-blue-500  sm:text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        draggable={false}
        autoClose={1000}
        position={"top-right"}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        theme="dark"
      />
    </>
  );
}
