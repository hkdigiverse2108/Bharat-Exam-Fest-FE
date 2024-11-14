import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { VscEyeClosed } from "react-icons/vsc";
import { RxEyeOpen } from "react-icons/rx";
import { loginSuccess } from "../../Context/Action/Auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OtpVerify from "../OtpVerify/OtpVerify";
import axios from "axios";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // patterns
  const emailpatton = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const lowerCaseLetters = /[a-z]/g;
  const upperCaseLetters = /[A-Z]/g;
  const numbers = /[0-9]/g;
  const spcl = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

  const [confirm, setConfirm] = useState(false);
  const [input, setInput] = useState({
    uniqueId: "",
    password: "",
    userType: "admin",
  });
  const { uniqueId, password } = input;
  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  async function handleLogin() {
    await axios
      .post(
        `https://api-bef.hkdigiverse.com/auth/login`,
        JSON.stringify(input),
        {
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: function (status) {
            return status >= 200 && status < 400;
          },
        }
      )
      .then((response) => {
        console.log("Backend response", response.message);
        if (response.status === 200) {
          console.log("Backend response", response.data);
          dispatch(loginSuccess(response.data.data));
          setTimeout(() => {
            toast.success(response.message);
            navigate("/");
          }, [1000]);
        } else {
          console.log("Backend response", response.error);
          console.warn("Not Successfully");
        }
      });
  }

  const [show, setShow] = useState(false);

  function Signup() {
    try {
      if (!uniqueId || !password) {
        toast.warn("Fill up empty field!");
      } else {
        if (!uniqueId.match(emailpatton)) {
          toast.warn("Email dosen't match!");
        } else {
          if (!password.match(spcl)) {
            toast.warn("Must Include Symbol in Password!");
          } else {
            if (!password.match(numbers)) {
              toast.warn("Must Include digit in Password!");
            } else {
              if (!password.match(upperCaseLetters)) {
                toast.warn("Must Include upperCase Letters in Password!");
              } else {
                if (!password.match(lowerCaseLetters)) {
                  toast.warn("Must Include lowerCase Letters in Password!");
                } else {
                  handleLogin();
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <section className="bg-white  mx-auto 3xl:w-[386px] 2xl:w-[386px] xl:w-[386px] md:w-[386px] sm:w-[340px] h-[450px] py-6 px-4 space-y-10 border-2 border-gray-300 rounded-xl  overflow-none">
        <div className="flex flex-col items-center justify-center space-y-4 h-full">
          <span className="text-black text-3xl py-4 capitalize select-none">
            welcome Question panel
          </span>
          <div className="flex flex-col space-y-2 w-full h-full">
            <div>
              <input
                className="text-black text-md px-4 py-6  border-2 border-gray-200 h-10 w-full rounded-lg invalid:border-pink-500 invalid:text-pink-600 peer
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                type="uniqueId"
                name="uniqueId"
                value={uniqueId || ""}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Your Email Address"
                autoComplete="off"
              />
              <p className="mt-1 invisible peer-invalid:visible text-red-600 text-sm">
                Enter a valid email address.
              </p>
            </div>

            <div className="relative w-full ">
              <input
                className="text-black text-md px-4 py-6 border-2 border-gray-200 h-10 w-full rounded-lg"
                type={show ? "text" : "password"}
                name="password"
                value={password || ""}
                onChange={(e) => handleChange(e)}
                placeholder="Enter Your Password"
                autoComplete="off"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute inset-y-0 bottom-[25px] end-0 flex items-center z-20 px-3 cursor-pointer text-gray-400 rounded-e-md focus:outline-none focus:text-blue-600 invalid:border-pink-500 invalid:text-pink-600 peer
                  focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
              >
                <svg className="w-5 h-5" viewBox="0 0 16 16">
                  {show ? (
                    <VscEyeClosed title="Show Password" />
                  ) : (
                    <RxEyeOpen title="Hide Password" />
                  )}
                </svg>
              </button>
              <p className="mt-1 invisible peer-invalid:visible text-red-600 text-sm">
                Enter a strong password.
              </p>
            </div>
            <div className="flex items-start justify-start ms-2">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="cursor-pointer w-4 h-4 text-blue-600 capitalize bg-gray-100 border-gray-300 rounded-sm   dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="default-checkbox"
                className="ms-2 select-none text-sm capitalize text-gray-600 dark:text-gray-300"
              >
                remenber me
              </label>
            </div>
          </div>
          <button
            type="button"
            onClick={() => Signup()}
            className="end-0 bg-orange-400 hover:bg-orange-500 text-white text-center text-xl capitalize w-full h-20 rounded-lg"
          >
            log in
          </button>
        </div>
        {/* <div className={`${confirm === true ? "block" : "hidden"}`}>
          <OtpVerify confirm={confirm} setConfirm={handleLogin} />
        </div> */}
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

export default LoginPage;
