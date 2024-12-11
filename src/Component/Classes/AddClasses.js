import axios from "axios";
import React, { useEffect, useState } from "react";
import { VscSaveAs, VscEye, VscEyeClosed } from "react-icons/vsc";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchClassData,
  handleAddClassData,
} from "../../ApiHandler/getAllClassApi";
import { imgUpload, uploadFile } from "../../ApiHandler/updateImage";
import Loading from "../Loader/Loading";

export default function AddClasses({ confirm, setConfirm, onClose }) {
  const [toggle, setToggle] = useState(false);
  const [show, setShow] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );

  const [input, setInput] = useState({
    name: "",
    referralCode: "",
    image: "",
    termsAndConditions: "",
    privacyPolicy: "",
    email: "",
    password: "",
    ownerName: "",
    contact: {
      mobile: "",
    },
  });

  const isEmpty = (obj) => {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] === "object" && obj[key] !== null) {
          if (isEmpty(obj[key])) return true;
        } else if (!obj[key]) {
          return true;
        }
      }
    }
    return false;
  };

  const handleImageUpload = async (file, field) => {
    setIsLoading(true); // Start loading
    setError(null); // Reset any previous errors

    try {
      if (!file) {
        toast.warning("Please select a file to upload.");
        return;
      }
      console.log("file", file);

      const fileType = file.type;
      const formData = new FormData();
      let pdfType;

      // File type handling
      if (fileType === "application/pdf") {
        if (field === "privacyPolicy") {
          pdfType = "privacy-policy";
        } else if (field === "termsAndConditions") {
          pdfType = "terms-condition";
        } else {
          toast.warning("Unsupported field type for PDF");
          return;
        }
      }
      // console.log("formdata",formData);

      // Call the generic upload function with the file and field name
      const result = await imgUpload(file, accessToken, pdfType);
      console.log(result);

      if (result.success) {
        // If upload is successful, update the form state with the uploaded file data
        setInput((prevData) => ({
          ...prevData,
          [field]: result.data,
        }));
        toast.success(result.message || `${field} uploaded successfully!`);
      } else {
        // Handle failure: Show error message
        toast.error(result.message || `Error uploading ${field}`);
      }
    } catch (error) {
      // Handle unexpected errors
      setError("Network error while uploading file. Please try again.");
      toast.error("Failed to upload file. Please check your network.");
      console.error(error);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleUpload = (value, field) => {
    handleImageUpload(value, field);
  };

  function handleChange(e) {
    const { name, value, files } = e.target;

    const validNames = ["image", "termsAndConditions", "privacyPolicy"];
    if (validNames.includes(name) && files) {
      handleUpload(files[0], name);
    } else if (name.startsWith("contact.")) {
      const contactField = name.split(".")[1];
      setInput((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [contactField]: value,
        },
      }));
    } else {
      setInput({ ...input, [name]: value });
    }
  }

  useEffect(() => {
    console.log(input);
  }, [input]);

  const getClassData = async () => {
    setIsLoading(true); // Set loading state before fetching data
    try {
      const classesData = await fetchClassData(accessToken);
      // console.log("classesData", classesData);
      return classesData; // Save classes data in state
    } catch (err) {
      setError(err.message); // Handle error if occurs during fetch
      toast.error("Failed to fetch classes data");
    } finally {
      setIsLoading(false); // Turn off loader once data fetching is complete
    }
  };

  // Handle Add Class
  const handleAdd = async ({ onClose }) => {
    setIsLoading(true); // Show loader when adding class
    try {
      if (isEmpty(input)) {
        toast.warning("Please fill up the empty space");
      } else {
        const result = await handleAddClassData(input, accessToken);
        if (result.success) {
          onClose();
          getClassData(); // Refresh the class data
          console.log("success", result);
          toast.success("Class added successfully");
        } else {
          toast.error(result.message || "Failed to add class");
        }
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message || "An error occurred while adding class");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getClassData();
  }, [accessToken]);

  if (isLoading) return <Loading />;

  return (
    <>
      <section className="fixed z-50 inset-0 overflow-hidden duration-300 ease-in-out">
        <div className="flex items-center justify-center min-h-screen text-center sm:block">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div
              className="absolute inset-0 bg-gray-500 opacity-75"
              onClick={onClose}
            ></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block mx-auto w-full bg-white rounded-lg space-y-4 p-4  text-left overflow-hidden shadow-xl transform transition-all sm:align-middle max-w-xl md:max-w-3xl">
            <p className="text-3xl text-center font-medium text-gray-900">
              Add Classes
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="grid grid-cols-1 w-full">
                <label
                  htmlFor="ownerName"
                  className="text-gray-700 font-semibold dark:text-gray-200"
                >
                  Owner Name
                </label>
                <input
                  className="w-full block px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 text-base p-2 border-[#808836] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                  type="text"
                  name="ownerName"
                  id="ownerName"
                  onChange={handleChange}
                  placeholder="Enter Owner Name"
                  autoComplete="off"
                />
              </div>
              <div className="grid grid-cols-1 w-full">
                <label
                  htmlFor="contact"
                  className="text-gray-700 font-semibold dark:text-gray-200"
                >
                  Contact
                </label>
                <input
                  className="w-full block px-5 py-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 text-base p-2 border-[#808836] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                  type="text"
                  id="contact"
                  onChange={handleChange}
                  name="contact.mobile"
                  placeholder="Enter Contact"
                />
              </div>
            </div>
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
                  onChange={handleChange}
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
                    onChange={handleChange}
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
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                  accept="image/*"
                  name="image"
                  onChange={handleChange}
                  className="block w-full border border-gray-400 shadow-sm rounded-lg text-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-300  file:border-0  file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="p-3 w-full h-fit border border-[#808836] bg-white shadow-sm rounded-xl">
                <div className="space-y-2">
                  <p className="text-gray-800 font-semibold dark:text-gray-200 text-start">
                    Upload Tearm & Condition PDF
                  </p>
                  <input
                    type="file"
                    className="sr-only"
                    onChange={handleChange}
                    accept="application/pdf"
                    name="termsAndConditions"
                    id="termsAndConditions"
                  />
                  <label
                    htmlFor="termsAndConditions"
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
                  <p className="text-gray-800 font-semibold dark:text-gray-200 text-start">
                    Upload Privacy Policy PDF
                  </p>
                  <input
                    type="file"
                    id="privacyPolicy"
                    className="sr-only"
                    accept="application/pdf"
                    onChange={handleChange}
                    name="privacyPolicy"
                  />
                  <label
                    htmlFor="privacyPolicy"
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
                onClick={handleAdd}
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
