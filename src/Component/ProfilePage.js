import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Axios from "axios";
import { VscSaveAs } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { updateData } from "../../Context/Action/index";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import MultipleSelection from "./Ui/MultiSelection";
import { useSelector } from "react-redux";
import axios from "axios";
import { updateProfile } from "../Hooks/updateProfileApi";

export default function ProfilePage() {
  const [toggle, setToggle] = useState(false);
  const userData = useSelector((state) => state.userConfig.classesData[0]);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );
  console.log(userData);

  const [formData, setFormData] = useState({
    classesId: "",
    name: "",
    ownerName: "",
    email: "",
    referralCode: "",
    image: "",
    contact: {
      mobile: "",
    },
  });

  const imgUpload = async (file) => {
    try {
      if (!file) {
        toast.warning("No file selected");
        return;
      }

      const formData = new FormData();
      formData.append("image", file); // Append the file to FormData

      const config = {
        method: "post",
        url: "https://api-bef.hkdigiverse.com/upload",
        headers: {
          Authorization: accessToken,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      };

      const response = await axios.request(config);
      console.log("Upload response:", response.data);
      setFormData((prevData) => ({
        ...prevData,
        image: response.data.data,
      }));
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to upload image.");
    }
  };
  const handleUpload = (value) => {
    imgUpload(value);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      handleUpload(files[0]);
    } else if (name.startsWith("contact.")) {
      const contactField = name.split(".")[1];

      setFormData((prevData) => ({
        ...prevData,
        contact: {
          ...prevData.contact,
          [contactField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const isEmpty = (value) => {
    const { classesId, name, ownerName, email, referralCode, image, contact } =
      value;
    return (
      !classesId ||
      !name ||
      !ownerName ||
      !email ||
      !referralCode ||
      !image ||
      !contact.mobile
    );
  };

  const handleSubmit = async (e) => {
    if (isEmpty()) {
      toast.warn("Fill up empty field");
    } else {
      await updateProfile(accessToken, formData);
       
    }
  };
  useEffect(() => {
    if (userData) {
      setFormData({
        classesId: userData._id || "",
        ownerName: userData.ownerName || "",
        contact: {
          mobile: userData.mobile || "",
        },
        name: userData.name || "",
        email: userData.email || "",
        referralCode: userData.referralCode || "",
        image: userData.image || "",
      });
    }
  }, [userData]);

  return (
    <>
      <section className=" p-6 space-y-6 border border-slate-300 bg-white rounded-xl h-full">
        <div className="space-y-3">
          <p className="text-3xl capitalize tracking-tight font-semibold text-left text-gray-900 dark:text-white">
            profile data update
          </p>
          <p className="text-lg tracking-tight font-medium text-left text-gray-500 dark:text-white">
            Fill in the data for profile. It will take a couple of minutes.
          </p>
        </div>

        <div className="p-4 w-full h-fit border border-[#808836] bg-white shadow-sm rounded-xl space-y-4">
          <div className="flex h-20 w-20">
            <img
              src={formData.image}
              alt={formData.name}
              className="w-full h-full  rounded-md object-cover"
            />
          </div>
          <div className="">
            <p className=" text-start capitalize text-lg font-medium text-gray-700 dark:text-white">
              Image Upload
            </p>
            <p className="text-sm text-slate-600">
              <span>Type: jpg/jpeg/png</span>
            </p>
          </div>

          <input
            type="file"
            onChange={handleChange}
            accept="image/*"
            name="image"
            id="file-input"
            className="block border w-full shadow-sm rounded-lg text-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-300  file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
          />
        </div>
        <div className="space-y-2">
          <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
            {/* Name */}
            <div>
              <label
                className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                htmlFor="name"
              >
                className
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="text-black text-md px-4 py-6 border-2 border-gray-200 h-10 w-full rounded-lg focus:outline-none focus:ring-purple-600 focus:border-purple-600"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="text-black text-md px-4 py-6 border-2 border-gray-200 h-10 w-full rounded-lg focus:outline-none focus:ring-purple-600 focus:border-purple-600"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
            {/* owner name */}
            <div>
              <label
                className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                htmlFor="ownername"
              >
                owner name
              </label>
              <input
                type="text"
                id="ownername"
                placeholder="Enter Ownername"
                name="ownername"
                value={formData.ownerName}
                onChange={handleChange}
                className="text-black text-md px-4 py-6 border-2 border-gray-200 h-10 w-full rounded-lg focus:outline-none focus:ring-purple-600 focus:border-purple-600"
              />
            </div>
            {/* Referral Code */}
            <div>
              <label
                className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                htmlFor="referralCode"
              >
                Referral Code
              </label>
              <input
                type="text"
                id="referralCode"
                placeholder="Enter referral code"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                className="text-black text-md px-4 py-6 border-2 border-gray-200 h-10 w-full rounded-lg focus:outline-none focus:ring-purple-600 focus:border-purple-600"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-700">
            {/* Contact Mobile */}
            <div>
              <label
                className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                htmlFor="contact"
              >
                Contact
              </label>
              <input
                type="text"
                id="contact"
                placeholder="Enter mobile number"
                name="contact.mobile"
                value={formData.contact.mobile}
                onChange={handleChange}
                className="text-black text-md px-4 py-6 border-2 border-gray-200 h-10 w-full rounded-lg focus:outline-none focus:ring-purple-600 focus:border-purple-600"
              />
            </div>
          </div>
        </div>

        {/* UploadData */}
        <div className="w-full flex items-end justify-center">
          <button
            onClick={handleSubmit}
            className="inline-flex items-center space-x-2 rounded-lg px-10 py-3 text-md text-center capitalize text-white bg-orange-500 hover:bg-opacity-90  "
          >
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
