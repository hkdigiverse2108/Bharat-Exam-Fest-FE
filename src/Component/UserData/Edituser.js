import React, { useEffect, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import MultipleSelection from "../Ui/MultiSelection";
import MultipleSelect from "../Ui/MultiSelection";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

export default function EditUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const data = location.state;

  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name } = input;
  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  const editUser = async () => {
    try {
      if (!name) {
        toast.warning("Fill up empty space");
      } else {
        let data = JSON.stringify(input);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/user/edit",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            navigate("/subject");
            toast.success("Subject Edited");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <section className=" p-6  border border-slate-300 bg-white rounded-xl h-full">
        <div className="space-y-6">
          <div className="text-left space-y-2">
            <p className=" text-3xl font-semibold text-gray-900">Edit User</p>
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
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
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
                        {toggle ? (
                          <VscEyeClosed title="Show Password" />
                        ) : (
                          <VscEye title="Hide Password" />
                        )}
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
          <div className="w-full flex items-center justify-center">
            <button
              onClick={editUser}
              className="inline-flex items-center space-x-2 rounded-lg px-10 py-3 text-md text-center capitalize text-white bg-orange-500 hover:bg-opacity-90  "
            >
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <VscSaveAs />
              </svg>
              <p className=" font-semibold">update profile</p>
            </button>
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
