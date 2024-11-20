import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function OtpVerify({ confirm, setConfirm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.authConfig.userInfo);

  // Check if userInfo is not null and has at least one element
  const { userType, token, email } =
    userInfo && userInfo.length > 0
      ? userInfo[0]
      : { userType: null, token: null, email: null };

  const [otpValue, setOtpValue] = useState({
    otp: "",
    userType: userType,
  });
  const isEmpty = () => {
    return otpValue.otp === "" && !otpValue.userType;
  };
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = otpValue.otp.split("");
      newOtp[index] = value;
      setOtpValue({
        ...otpValue,
        otp: newOtp.join(""),
      });
    }
  };
  useEffect(() => {
    console.log(otpValue);
  }, [otpValue]);
  const Verify = async () => {
    try {
      if (isEmpty()) {
        toast.warning("Fill up empty space");
      } else {
        let data = JSON.stringify(otpValue);
        console.log(otpValue);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/auth/otp/verify",
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            setConfirm();
            toast.success("Login successfully");
            setTimeout(() => navigate("/"), 1000);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (err) {
      console.error(err.message);
    }
    // try {
    //   if (!otp) {
    //     toast.warn("fill up empty field !");
    //   } else {
    //     try {
    //       const url = "";
    //       console.log(otpValue);
    //       await axios
    //         .post(url, JSON.stringify(otpValue), {
    //           headers: {
    //             Authorization: token,
    //             "Content-Type": "application/json; charset=UTF-8",
    //           },
    //         })
    //         .then((response) => {
    //           if (response.status === 200 && response.data.success === true) {
    //             console.log("otpconfirm response", response);
    //             // setToggle(!toggle);
    //             // dispatch(loginUser(response.data));
    //             // dispatch(loginSuccess(response.data));
    //             toast.success(response.data.message, {
    //               autoClose: 2000,
    //               position: "bottom-center",
    //             });
    //             setConfirm();
    //             toast.success("Login successfully");
    //             setTimeout(() => navigate("/"), 1000);
    //           } else {
    //             console.warn("not Successfully");
    //             toast.warn("Request body could not be read properly");
    //           }
    //         });
    //     } catch (error) {
    //       console.warn(error);
    //       // toast.warn("Request body could not be read properly");
    //     }
    //   }
    // } catch (error) {
    //   console.warn(error);
    // }
  };

  return (
    <>
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out ">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={setConfirm}
            ></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className=" dark:bg-gray-800 dark:border-gray-700 p-4 inline-block mx-auto w-full  bg-white rounded-lg space-y-6 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-3xl md:max-w-md">
            <div className="space-y-2 text-center">
              <h1 className="block text-2xl font-medium text-gray-800 dark:text-white">
                OTP Verification
              </h1>
              <p className="text-md text-ellipsis">Enter OTP send to {email}</p>
            </div>

            <div className="grid grid-cols-6 gap-x-2 ">
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  name="otp"
                  className="w-12 h-12 text-center border border-gray-400 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  maxLength="1"
                  onChange={(e) => handleChange(e, index)}
                />
              ))}
            </div>
            <div className="w-full">
              <button
                title="OTP confirmation"
                onClick={Verify}
                className="w-full px-4 py-3 rounded-lg font-medium  bg-orange-500 text-white"
              >
                Confirm
              </button>
            </div>
            <div className="text-sm text-slate-500">
              Didn't receive code?{" "}
              <u className="font-medium cursor-pointer text-indigo-500 hover:text-indigo-600">
                Resend
              </u>
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
export default OtpVerify;
