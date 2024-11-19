import axios from "axios";
import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { editBanner, updateImageData } from "../../Context/Action";

function AddImagePage({ confirm, onClose }) {
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  const [imgEdit, setImgEdit] = useState({
    image: "",
    type: "result",
    link: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setImgEdit((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    // console.log(URL.createObjectURL(files[0]));

    if (files) {
      setImgEdit((prev) => ({
        ...prev,
        image:
          "https://images.pexels.com/photos/757889/pexels-photo-757889.jpeg?auto=compress&cs=tinysrgb&w=600",
      }));
    }
  };
  const isEmpty = () => {
    if (imgEdit.bannerId === "" || imgEdit.image === "") {
      return true;
    }
    return false;
  };
  // const AddBanner = async () => {
  //   try {
  //     if (isEmpty()) {
  //       toast.warning("Please fill up empty fields.");
  //     }
  //     let data = JSON.stringify(imgEdit);
  //     console.log(imgEdit);

  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: `https://api-bef.hkdigiverse.com/banner/add`,
  //       headers: {
  //         Authorization: accessToken,
  //         "Content-Type": "application/json",
  //       },
  //       data: data,
  //     };

  //     const response = await axios.request(config);
  //     console.log(response.data);

  //     if (response.status === 200) {
  //       toast.success(response.data.data.message);
  //       dispatch(editBanner(imgEdit), updateImageData(null));
  //       onClose();
  //     } else if (response.status === 500) {
  //       toast.error(response.data.data.message);
  //     } else {
  //       toast.error(response.message);
  //     }
  //   } catch (err) {
  //     console.error(err.message);
  //     console.error("An error occurred while adding the question.");
  //   }
  // };

  const handleNavigate = (e) => {
    onClose();
    // dispatch(updateImageData());
  };

  return (
    <>
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={handleNavigate}
            ></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block mx-auto w-full bg-white rounded-lg space-y-6 px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all  sm:align-middle max-w-2xl">
            <h3 className="mt-5 text-left text-3xl font-semibold text-gray-900">
              Add Image
            </h3>
            <div className="space-y-3 border border-slate-300 rounded-lg p-4">
              <div className="grid grid-cols-1 space-y-2">
                <label
                  htmlFor="editimg"
                  className="text-xl font-medium text-gray-700 tracking-wide"
                >
                  Add Image
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
              <div className="grid grid-cols-1 space-y-2">
                <label
                  htmlFor="editimg"
                  className="text-xl font-medium text-gray-700 tracking-wide"
                >
                  Navigational Link
                </label>
                <input
                  className="text-base p-2 border-b border-gray-400 focus:outline-none focus:border-indigo-500"
                  type=""
                  id="editimg"
                  placeholder="Image"
                />
              </div>
            </div>
            <div className="flex  items-center justify-center">
              <button
                type="submit"
                // onClick={AddBanner}
                className=" bg-orange-500 text-gray-100 px-20 py-2  rounded-full tracking-wide
                font-semibold  focus:outline-none focus:shadow-outline hover:bg-orange-600 cursor-pointer transition ease-in duration-300"
              >
                Save
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

export default AddImagePage;
