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

  //   const dispatch = useDispatch();
  //   const userInfo = useSelector((state) => state.userConfig);
  //   const loginInfo = useSelector((state) => state.authConfig);

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
            <p className="text-3xl text-left font-medium text-gray-900">
              Edit Image
            </p>
            <div className="space-y-3 border border-[#808836] rounded-lg p-4">
            
              <div className="grid grid-cols-1 space-y-2">
                <label
                  htmlFor="editimg"
                  className="text-xl font-medium text-gray-700 tracking-wide"
                >
                  Edit Image
                </label>
                <input
                  className="border-b w-full block px-5 py-2 shadow-sm bg-white placeholder-gray-400 text-gray-700 text-base p-2 border-[#34bfb1] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                  type=""
                  id="editimg"
                  placeholder="Image"
                />
              </div>
              <div className="p-4 w-full h-fit border border-[#65B741] bg-white shadow-sm rounded-xl">
              <div className=" space-y-2">
                <p className="text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                  Banner Image
                </p>
                <input type="file" name="file" id="file" className="sr-only" />
                <label
                  htmlFor="file"
                  className="relative flex items-center justify-start  gap-x-4 text-center cursor-pointer"
                >
                  <span className=" rounded-md border border-[#5F8670] py-2 px-8 text-base capitalize text-slate-700">
                    choose file
                  </span>

                  <span className="text-md capitalize text-[#5F8670 ]">
                    no file chosen
                  </span>
                </label>
              </div>
              </div>

              <p className="text-base text-gray-500">
                <span>File type: jpg/jpeg/png</span>
              </p>
            </div>
            <div className="flex  items-center justify-center">
              <button
                type="submit"
                onClick={setConfirm}
                className=" bg-orange-500 text-gray-100 px-20 py-2  rounded-full tracking-wide
                font-semibold  focus:outline-none focus:shadow-outline hover:bg-orange-600 cursor-pointer transition ease-in duration-300"
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
