import React, { useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
// import { RxEyeOpen } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { updateData } from "../../Context/Action/index";

export default function PasswordUpdate() {
  // const staticObj = {
  //     id: "",
  //     username: "",
  //     address: "",
  //     email: "",
  //     phone: "",
  //     password: "",
  //     age: "",
  //     country: "india",
  //     hobbies: "",
  //     photoURL:
  //       "https://th.bing.com/th?id=OIP.FTgrJyVFtgBnlReUwwkLSgHaHS&w=252&h=247&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  //   };

  //   const dispatch = useDispatch();
  //   const userInfo = useSelector((state) => state.userConfig);
  //   const loginInfo = useSelector((state) => state.authConfig);
  //   const [currentUser, setCurrentUser] = useState(staticObj);
  //   const {
  //     _id,
  //     username,
  //     address,
  //     email,
  //     phone,
  //     country,
  //     hobbies,
  //     language,
  //     photoURL,
  //     age,
  //   } = currentUser;
  // const [toggle, setToggle] = useState(false);
  // const [trainer, setTrainer] = useState(false);

  // function handleChange(e) {
  //   const { name, value } = e.target;
  // }

  //   async function UploadData() {
  //     try {
  //       const uploadurl = "http://localhost:5000/uploadImg";
  //       // console.log(demo);
  //       const formdata = new FormData();
  //       formdata.append("_id", _id);
  //       formdata.append("file", demo);

  //       await Axios.post(uploadurl, formdata, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }).then((response) => {
  //         if (response.status === 200) {
  //           console.log("Backend response", JSON.parse(response.config.data));
  //           // dispatch(updateData(JSON.parse(response.config.data)));
  //           toast.success("Data update Successfully...");
  //         } else {
  //           console.warn("Not update", response.config);
  //           toast.warn("Data not update Successfully...");
  //         }
  //       });

  //       const url = "http://localhost:5000/profileData";
  //       await Axios.post(url, currentUser, {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }).then((response) => {
  //         if (response.status === 200) {
  //           console.log("Backend response", JSON.parse(response.config.data));
  //           dispatch(updateData(JSON.parse(response.config.data)));
  //           toast.success("Data update Successfully...");
  //         } else {
  //           console.warn("Not update", response.config);
  //           toast.warn("Data not update Successfully...");
  //         }
  //       });
  //     } catch (error) {
  //       console.warn(error);
  //     }
  //   }

  //   useEffect(() => {
  //     try {
  //       if (loginInfo.isLoggedIn === true) {
  //         setCurrentUser(userInfo.User[0]);
  //       } else {
  //         console.log(loginInfo);
  //       }
  //     } catch (error) {
  //       console.warn(error.message);
  //     }
  //   }, [loginInfo, userInfo]);

  return (
    <>
      <section className=" p-3 space-y-6">
        <div className="p-6 w-full h-fit border border-slate-300 bg-white rounded-xl space-y-10">
          <div class="space-y-1 w-full px-4 py-2 overflow-hidden text-slate-700 bg-white bg-clip-border">
            <p class="text-2xl text-left w-full font-semibold text-slate-800 ">
              Change Password
            </p>
            <p class="text-lg text-left font-normal text-slate-600">
              Change password and make secure your website
            </p>
          </div>
          <div className="max-w-xl text-sm mx-auto">
            {/* new password */}
            <div className="px-4 space-y-4">
              <div className="flex items-center justify-between space-y-1">
                <label
                  className="flex  text-start capitalize text-xl font-medium text-gray-700 dark:text-white"
                  htmlFor="phone"
                >
                  new password
                </label>
                <button
                  type="button"
                  className="py-2.5 px-6 text-md bg-indigo-50 text-slate-500 rounded-xl cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100"
                >
                  Required
                </button>
              </div>
              <div className="relative w-full">
                <input
                  className="text-black text-md px-4 py-6 border-2 border-gray-200  w-full h-12 rounded-lg"
                  // type={show ? "text" : "password"}
                  type="password"
                  name="password"
                  // value={password || ""}
                  // onChange={(e) => handleChange(e)}
                  placeholder="Enter new assword"
                  autoComplete="off"
                />
                <button
                  type="button"
                  // onClick={() => setShow(!show)}
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
            </div>

            {/* confirm password */}
            <div className="px-4  space-y-4">
              <div className="flex items-center justify-between space-y-1">
                <label
                  className="flex  text-start capitalize text-xl font-medium text-gray-700 dark:text-white"
                  htmlFor="phone"
                >
                  confirm new password
                </label>
                <button
                  type="button"
                  className="py-2.5 px-6 text-md bg-indigo-50 text-slate-500 rounded-xl cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100"
                >
                  Required
                </button>
              </div>
              <div className="relative w-full">
                <input
                  className="text-black text-md px-4 py-6 border-2 border-gray-200  w-full h-12 rounded-lg"
                  // type={show ? "text" : "password"}
                  type="password"
                  name="password"
                  // value={password || ""}
                  // onChange={(e) => handleChange(e)}
                  placeholder="Enter new assword"
                  autoComplete="off"
                />
                <button
                  type="button"
                  // onClick={() => setShow(!show)}
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
            </div>
          </div>

          <div className="flex flex-col items-center  w-full justify-center space-y-2">
            <h2 className=" text-lg font-semibold text-gray-600 dark:text-white">
              Password requirements:
            </h2>
            <ul className="text-left space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
              <li>At least 10 characters</li>
              <li>At least one uppercase character</li>
              <li>
                Inclusion of at least one special character, e.g., ! @ # ?
              </li>
            </ul>
          </div>
        </div>
        {/* UploadData */}
        <div className="w-full flex items-end justify-center">
          <button className="inline-flex items-center space-x-2 rounded-full px-10 py-3 text-md text-center capitalize text-white bg-orange-500 hover:bg-opacity-90  ">
            <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
              <VscSaveAs />
            </svg>
            <p className=" font-semibold">Reset password</p>
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
