import React from "react";
import { VscSaveAs } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscEyeClosed } from "react-icons/vsc";
import MultipleSelection from "../Ui/MultiSelection";

export default function Adduser() {
  return (
    <>
      <section className=" p-6 space-y-6 border border-slate-300 bg-white rounded-xl h-full">
        <div className="text-left space-y-2">
          <p className=" text-3xl font-semibold text-gray-900">Add User</p>
          <p className=" text-md text-gray-600">
            Fill in the data for profile. It will take a couple of minutes.
          </p>
        </div>

        <div className="p-6 w-full h-fit border-2 border-[#216123] bg-white rounded-xl space-y-10">
          <div className="text-left space-y-2">
            <p className=" text-xl font-semibold text-gray-900">
              Personal data
            </p>
            <p className=" text-md text-gray-600">
              Specify exactly as in your passport
            </p>
          </div>

          <div className=" space-y-2">
            <div className=" space-y-4 text-gray-700">
              {/* name */}
              <div className="text-left">
                <label
                  className="text-gray-700 font-medium dark:text-gray-200"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Full Name"
                  name="username"
                  defaultValue=""
                  // value={username || ""}
                  // onChange={(e) => handleChange(e)}
                  className="mt-1 block w-full px-3 py-2 bg-white border-b border-black text-sm placeholder-slate-500
                            focus:outline-none focus:border-b focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                />
              </div>
              {/* gmail */}
              <div className="text-left">
                <label
                  className="text-gray-700 font-medium dark:text-gray-200"
                  htmlFor="gmail"
                >
                  Gmail
                </label>
                <input
                  type="text"
                  id="gmail"
                  placeholder="Enter your full address"
                  name="gmail"
                  defaultValue=""
                  // value={address || ""}
                  // onChange={(e) => handleChange(e)}
                  className="mt-1 block w-full px-3 py-2 bg-white border-b border-black text-sm placeholder-slate-500
                            focus:outline-none focus:border-b focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {/* password */}
                <div className="relative w-full ">
                  <input
                    className="text-black text-md px-4 py-4 border border-gray-600 h-10 w-full rounded-lg focus:outline-none focus:border focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                    type="password"
                    name="password"
                    defaultValue=""
                    // value=""
                    placeholder="Enter Your Password"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 bottom-[25px] end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 invalid:border-pink-500 invalid:text-pink-600 peer
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 16 16">
                      <VscEyeClosed title="Show Password" />
                      {/* {show ? (
                  ) : (
                    <RxEyeOpen title="Hide Password" />
                  )} */}
                    </svg>
                  </button>
                  <p className="mt-1 invisible peer-invalid:visible text-red-600 text-sm">
                    Enter a strong password.
                  </p>
                </div>
                <div className="h-full">
                  <MultipleSelection />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* UploadData */}
        <div className="w-full flex items-end justify-center">
          <button className="inline-flex items-center space-x-2 rounded-lg px-10 py-3 text-md text-center capitalize text-white bg-orange-500 hover:bg-opacity-90  ">
            <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
              <VscSaveAs />
            </svg>
            <p className=" font-semibold">update profile</p>
          </button>
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
