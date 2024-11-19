import axios from "axios";
import React, { useState } from "react";
import { VscSaveAs, VscEye, VscEyeClosed } from "react-icons/vsc";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddClasses({ confirm, setConfirm ,onClose}) {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );

  const [input, setInput] = useState({
    name: "",
    referralCode: "",
    image: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      setInput({ ...input, [name]: files[0].name });
    } else {
      setInput({ ...input, [name]: value });
    }
  }

  const addNewClass = async ({ onClose }) => {
    try {
      if (!input.name || !input.email || !input.password || !input.referralCode) {
        toast.warning("Fill up empty space");
      } else {
        let data = JSON.stringify(input);
        console.log(input);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/classes/add",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            if (response.status === 200) {
              console.log("success", response.data);
              navigate("/classes");
              toast.success(response.message);

              onClose(response.data.message);
            } else {
              console.log("failed", response);
              toast.error(response.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // useEffect(() => {
  //   console.log(input);
  // }, [input]);

  return (
    <>
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
        <div className="flex items-center justify-center min-h-screen text-center sm:block">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
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
                  htmlFor="email"
                  className="text-gray-700 font-semibold dark:text-gray-200"
                >
                  Gmail
                </label>
                <input
                  className="w-full block px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 text-base p-2 border-[#808836] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                  type="text"
                  id="email"
                  onChange={(e) => handleChange(e)}
                  name="email"
                  placeholder="Enter classes name"
                />
              </div>
              <div className="grid grid-cols-1 w-full">
                <label
                  htmlFor="password"
                  className="text-gray-700 font-semibold dark:text-gray-200"
                >
                  Password
                </label>
                <div className="relative w-full ">
                  <input
                    className="w-full block px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 text-base p-2 border-[#808836] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                    type={show ? "text" : "password"}
                    id="password"
                    onChange={(e) => handleChange(e)}
                    name="password"
                    placeholder="Enter classes name"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute inset-y-0 bottom-[25px] top-5 end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none invalid:border-pink-500 invalid:text-pink-600 peer
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                  >
                    <svg className="w-5 h-5 text-blue-600 " viewBox="0 0 16 16">
                      {show ? (
                        <VscEyeClosed title="Show Password" />
                      ) : (
                        <VscEye title="Hide Password" />
                      )}
                    </svg>
                  </button>
                </div>
              </div>
            </div>
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
                  onChange={(e) => handleChange(e)}
                  name="name"
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
                  onChange={(e) => handleChange(e)}
                  name="referralCode"
                  placeholder="Enter referral code"
                />
              </div>
            </div>
            <div className="p-3 w-full h-fit border border-[#808836] shadow-sm rounded-xl">
              <div className=" space-y-2">
                <p className="text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                  Upload Class Logo
                </p>
                <input
                  type="file"
                  id="file"
                  className="sr-only"
                  onChange={(e) => handleChange(e)}
                  name="image"
                />
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
                    id="file"
                    className="sr-only"
                    onChange={(e) => handleChange(e)}
                    name="tearm"
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
                    id="file"
                    className="sr-only"
                    onChange={(e) => handleChange(e)}
                    name="privacy"
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
                onClick={addNewClass}
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
