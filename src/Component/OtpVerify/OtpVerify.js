import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function OtpVerify() {
  const navigate = useNavigate();
  const initvarable = {
    otp: "",
  };
  const location = useLocation();
  const [state, setState] = useState(initvarable);
  const { otp } = state;
  function handleChange(e) {
    const { name, value } = e.target;
    setState({ ...state, [name]: Number(value) });
    console.log(otp);
  }

  // const Verify = async () => {
  //   try {
  //     if (!otp) {
  //       toast.warn("fill up empty field !");
  //     } else {
  //       try {
  //         const url = "http://localhost:5000/otpConfirm";
  //         console.log(state);
  //         await axios
  //           .post(url, JSON.stringify(state), {
  //             headers: {
  //               "Content-Type": "application/json; charset=UTF-8",
  //             },
  //           })
  //           .then((response) => {
  //             if (response.status === 200 && response.data.success === true) {
  //               console.log("otpconfirm response", response);
  //               // setToggle(!toggle);
  //               // dispatch(loginUser(response.data));
  //               // dispatch(loginSuccess(response.data));
  //               toast.success(response.data.message, {
  //                 autoClose: 2000,
  //                 position: "bottom-center",
  //               });
  //               navigate("/PasswordReset");
  //             } else {
  //               console.warn("not Successfully");
  //               toast.warn("Request body could not be read properly");
  //             }
  //           });
  //       } catch (error) {
  //         console.warn(error);
  //         // toast.warn("Request body could not be read properly");
  //       }
  //     }
  //   } catch (error) {
  //     console.warn(error);
  //   }
  // };

  return (
    <>
      <section className="w-full max-w-md mx-auto p-6">
        <div className=" bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700 border-2 border-indigo-300 p-4 space-y-4">
          <div className="space-y-2 text-center">
            <h1 className="block text-2xl font-medium text-gray-800 dark:text-white">
              OTP Verification
            </h1>
            <p className="text-md">Enter the OTP to d@gmail.com.</p>
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <input
              type="text"
              className="w-12 h-12 text-center border border-gray-400 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              maxLength="1"
              onInput={(e) => {
                e.target.value.replace(/[^0-9]/g, "");
              }}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              className="w-12 h-12 text-center border border-gray-400 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              maxLength="1"
              onInput={(e) => {
                e.target.value.replace(/[^0-9]/g, "");
              }}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              className="w-12 h-12 text-center border border-gray-400 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              maxLength="1"
              onInput={(e) => {
                e.target.value.replace(/[^0-9]/g, "");
              }}
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              className="w-12 h-12 text-center border border-gray-400 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
              maxLength="1"
              onInput={(e) => {
                e.target.value.replace(/[^0-9]/g, "");
              }}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="w-full space-y-5">
            <button
              title="OTP confirmation"
              // onClick={() => Verify()}
              className="w-full px-4 py-3 rounded-lg font-medium  bg-orange-500 text-white"
            >
              Confirm
            </button>
          </div>
          <div className="text-sm text-slate-500 mt-4">
            Didn't receive code?{" "}
            <u className="font-medium text-indigo-500 hover:text-indigo-600">
              Resend
            </u>
          </div>
        </div>
      </section>
    </>
  );
}
export default OtpVerify;
