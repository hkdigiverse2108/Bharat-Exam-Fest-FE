import React from "react";
import { VscSaveAs } from "react-icons/vsc";
import MultipleSelect from "../Ui/MultiSelection";

export default function EditSubjectSection({ comfirm, setConfirm }) {
  return (
    <>
      <section className="inline-block mx-auto w-full h-full bg-white rounded-lg space-y-4 px-4 p-5 text-left overflow-hidden shadow-xl transform transition-all ">
        <div className="text-left">
          <p className="text-3xl font-medium text-gray-900">Edit Subject</p>
          <p className="text-lg font-normal text-slate-600 ">
            Enter ther subject name to create a new subject for the class
            curriculum.
          </p>
        </div>
        <div className="grid grid-cols-1 space-y-2 max-w-xs">
          <label
            htmlFor="subject"
            className="text-gray-700 font-semibold dark:text-gray-200"
          >
            Class name
          </label>
          <input
            className="text-base p-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 border-[#808836] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
            type="text"
            id="subject"
            placeholder="Enter class name"
          />
        </div>

        <div className="space-y-3 border border-[#808836] rounded-lg p-4">
          <h3 className="text-2xl text-left font-semibold text-gray-900">
            Add multiple subtopic
          </h3>
          <div className="max-w-lg">
            <MultipleSelect />
          </div>
        </div>
        <div className="flex  items-center justify-center">
          <button className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90  ">
            <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
              <VscSaveAs />
            </svg>
            <p className="font-semibold">save details</p>
          </button>
        </div>
      </section>
    </>
  );
}
