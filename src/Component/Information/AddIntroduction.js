import React from "react";
import { VscSaveAs } from "react-icons/vsc";

export default function AddIntroduction({ setConfirm }) {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 overflow-y-auto rounded-lg border-2 border-slate-300 font-sans">
        <div className="py-8 px-4 space-y-2  sm:py-16 lg:px-6">
          <div className="space-y-6">
            <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              add introduction
            </p>
            <p className="text-lg tracking-tight font-medium text-left text-slate-600 dark:text-white ">
              Enter the introduction to create a new section for the class
              curriculum.
            </p>
          </div>

          <div className="space-y-3 p-4">
            <div className="grid grid-cols-1 space-y-2 max-w-xs text-start">
              <label
                htmlFor="title"
                className="text-lg font-medium text-gray-700 tracking-wide"
              >
                Title
              </label>
              <input
                className="text-base p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
                type="text"
                id="title"
                placeholder="Title"
              />
            </div>
            <div className="grid grid-cols-1 space-y-2 max-w-xs text-start">
              <label
                htmlFor="link"
                className="text-lg font-medium text-gray-700 tracking-wide"
              >
                Youtube Link
              </label>
              <input
                className="text-base p-2 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500"
                type="text"
                id="link"
                placeholder="Youtube Link"
              />
            </div>
            <div className="p-4 w-full h-fit border border-slate-300 bg-white shadow-sm rounded-xl">
              <div className=" space-y-4">
                <div className="space-y-2">
                  <p
                    className="flex  text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                    htmlFor="file_input"
                  >
                    Image Upload
                  </p>
                  <p className="text-sm font-medium text-left text-slate-600 dark:text-white ">
                    Type: jpg/jpeg/png
                  </p>
                </div>

                <input
                  type="text"
                  name="image"
                  id="image"
                  className="sr-only"
                />

                <input type="file" name="file" id="file" className="sr-only" />
                <label
                  for="file"
                  class="relative flex items-center justify-start  gap-x-4 text-center cursor-pointer"
                >
                  <span class="rounded-md border border-[#318973] py-2 px-8 text-base capitalize text-slate-700">
                    choose file
                  </span>
                  <span class="text-md capitalize text-[#318973]">
                    no file chosen
                  </span>
                </label>
              </div>
            </div>
          </div>
          {/* <div className="inline-block mx-auto w-full bg-white rounded-lg space-y-6 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-2xl">
            <div className="space-y-3 border border-slate-300 rounded-lg p-4">
              <div className="grid grid-cols-1 space-y-2">
                <label
                  htmlFor="editimg"
                  className="text-xl font-bold text-gray-600 tracking-wide"
                >
                  Edit Image
                </label>
                <input
                  className="text-base p-2 border-b border-gray-400 focus:outline-none focus:border-indigo-500"
                  type=""
                  id="editimg"
                  placeholder="Image"
                />
              </div>
              <div className="p-4 w-full h-fit border border-slate-300 bg-white shadow-sm rounded-xl">
                <div className=" space-y-4">
                  <p
                    className="flex  text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                    htmlFor="file_input"
                  >
                    Banner Image
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
                    <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-8 text-base capitalize font-medium text-[#07074D]">
                      choose file
                    </span>

                    <span className="mb-2 block text-md  capitalize font-semibold text-[#07074D]">
                      no file chosen
                    </span>
                  </label>
                </div>
              </div>

              <p className="text-base text-gray-500">
                <span>File type: images</span>
              </p>
            </div>
            <div>
              <button
                type="submit"
                onClick={setConfirm}
                className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4  rounded-full tracking-wide
                                    font-semibold  focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300"
              >
                Upload
              </button>
            </div>
          </div> */}
          <div className="flex  items-center justify-center">
            <button className="inline-flex items-center space-x-2 rounded-lg px-10 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90  ">
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <VscSaveAs />
              </svg>
              <p className="font-semibold">save </p>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
