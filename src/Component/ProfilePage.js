import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Axios from "axios";
import { VscSaveAs } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { updateData } from "../../Context/Action/index";
import PasswordUpdate from "./NewPassword/PasswordUpdate";
import { VscEyeClosed } from "react-icons/vsc";
import { RxEyeOpen } from "react-icons/rx";
import MultipleSelection from "./Ui/MultiSelection";

export default function ProfilePage() {
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
  // const imgs = [
  //   "https://th.bing.com/th?id=OIP.FTgrJyVFtgBnlReUwwkLSgHaHS&w=252&h=247&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  //   "https://th.bing.com/th?id=OIP.audMX4ZGbvT2_GJTx2c4GgHaHw&w=244&h=255&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  //   "https://th.bing.com/th?id=OIP.inXSw5jbycIIlXC1dIXdiwHaIL&w=237&h=262&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2",
  //   "https://th.bing.com/th/id/OIP.53tpipDfpRLX8XWq8Z-egQHaHZ?w=200&h=199&c=7&r=0&o=5&pid=1.7",
  //   "https://th.bing.com/th/id/OIP.BAdrtOmCjHMDXWlyWKB3YAHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7",
  //   "https://th.bing.com/th/id/OIP.B42mmL001bNfILjXjuoAyQHaHx?w=190&h=199&c=7&r=0&o=5&pid=1.7",
  //   "https://th.bing.com/th/id/OIP.mrfb_atnkblnmsDiAbLNKwHaHa?w=198&h=199&c=7&r=0&o=5&pid=1.7",
  //   "https://th.bing.com/th/id/OIP.ez7RzHW97bgoNBngoVliLgHaHX?w=206&h=205&c=7&r=0&o=5&pid=1.7",
  //   "https://th.bing.com/th/id/OIP.t0A5oxtEOEuCVNzO5XDiXgHaHa?w=212&h=212&c=7&r=0&o=5&pid=1.7",
  // ];
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
  //   const [demo, setDemo] = useState();
  // console.log(demo);

  // function handleChange(e) {
  //   const { name, value, src } = e.target;

  //   if (name === "photoURL") {
  //     setCurrentUser({ ...currentUser, [name]: src });
  //   } else {
  //     setCurrentUser({ ...currentUser, [name]: value });
  //   }
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
      <section className=" p-6 space-y-6 border border-slate-300 bg-white rounded-xl h-full">
        <div className="space-y-3">
          <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white">
            Add User Page
          </p>
          <p className="text-lg tracking-tight font-medium text-left text-gray-500 dark:text-white">
            Fill in the data for profile. It will take a couple of minutes.
          </p>
        </div>
        <div className="p-6 w-full h-fit border border-slate-300 bg-white rounded-xl space-y-10">
          <div className="space-y-3">
            <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white ">
              Personal data
            </p>
            <p className="text-lg tracking-tight font-medium text-left text-gray-500 dark:text-white">
              Specify exactly as in your passport
            </p>
          </div>
          <div className=" space-y-2">
            <div className=" space-y-4 text-gray-700">
              {/* name */}
              <div>
                <label
                  className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                  htmlFor="name"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Full Name"
                  name="username"
                  defaultValue=""
                  // value={username || ""}
                  // onChange={(e) => handleChange(e)}
                  className="mt-1 block w-full px-3 py-2 bg-white border-b border-slate-300 text-sm placeholder-slate-500
                            focus:outline-none focus:border-b focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                />
              </div>
              {/* gmail */}
              <div>
                <label
                  className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
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
                  className="mt-1 block w-full px-3 py-2 bg-white border-b border-slate-300 text-sm placeholder-slate-500
                            focus:outline-none focus:border-b focus:border-sky-500 focus:ring-b-1 focus:ring-sky-500"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3 text-sm">
                {/* password */}
                <div className="relative w-full ">
                  <input
                    className="text-black text-md px-4 py-4 border-2 border-gray-200 h-10 w-full rounded-lg"
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
