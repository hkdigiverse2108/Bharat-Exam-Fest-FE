import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Axios from "axios";
import { VscSaveAs } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { updateData } from "../../Context/Action/index";

export default function ImgUpdatePage({ confirm, setConfirm }) {
  // const navigate = useNavigate();
  // function handleNavigate() {
  //   navigate("/banner");
  // }
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
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block mx-auto w-full bg-white rounded-lg space-y-6 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-2xl">
            <h3 className="mt-5 text-left text-3xl font-semibold text-gray-900">
              Edit Image
            </h3>
            <div className="space-y-3 border border-slate-300 rounded-lg p-4">
              <div className="grid grid-cols-1 space-y-2">
                <label
                  htmlFor="editimg"
                  className="text-xl font-medium text-gray-700 tracking-wide"
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
                <span>File type: jpg/jpeg/png</span>
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
