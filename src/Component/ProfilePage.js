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
    title: "",
    email: "",
    country: "",
    referralCode: "",
    image: "",
    password: "",
    contact: {
      countryCode: "",
      mobile: "",
    },
    account: {
      accountNumber: "",
      ifscCode: "",
      bankName: "",
      upiId: "",
      swiftCode: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNestedChange = (e, field) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const isEmpty = () => {
    const requiredFields = [
      "classesId",
      "name",
      "email",
      "referralCode",
      "image",
      "contact.mobile",
    ];

    for (const field of requiredFields) {
      const value = field.includes(".")
        ? field.split(".").reduce((o, key) => (o || {})[key], formData)
        : formData[field];

      if (value === "" || value === undefined) {
        return true;
      }
    }

    return false;
  };

  const updateProfile = async () => {
    try {
      if (isEmpty(formData)) {
        toast.warning("Fill up empty space");
      } else {
        let data = JSON.stringify(formData);
        console.log(formData);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/classes/edit",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            if (response.status === 200) {
              console.log("success", response.data);
              toast.success(response.message);
            } else {
              console.log("failed", response);
              toast.error(response.message);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (userData) {
      setFormData({
        classesId: userData.classesId || "",
        name: userData.name || "",
        title: userData.title || "",
        email: userData.email || "",
        country: userData.country || "",
        referralCode: userData.referralCode || "",
        image: userData.image || "",
        password: "",
        contact: {
          countryCode: userData.contact?.countryCode || "",
          mobile: userData.contact?.mobile || "",
        },
        account: {
          accountNumber: userData.account?.accountNumber || "",
          ifscCode: userData.account?.ifscCode || "",
          bankName: userData.account?.bankName || "",
          upiId: userData.account?.upiId || "",
          swiftCode: userData.account?.swiftCode || "",
        },
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
        <div className="p-6 w-full h-fit border border-slate-300 bg-white rounded-xl space-y-10">
          <div className="h-20 w-20 border">
            <img
              src={formData.image}
              alt={formData.name}
              className="w-full h-full  rounded-full object-cover"
            />
          </div>
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
                htmlFor="name"
              >
                owner name
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
                htmlFor="mobile"
              >
                Contact Mobile
              </label>
              <input
                type="text"
                id="mobile"
                placeholder="Enter mobile number"
                name="mobile"
                value={formData.contact.mobile}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^0-9]/g, "");
                  handleNestedChange(
                    { target: { name: "mobile", value } },
                    "contact"
                  );
                }}
                className="text-black text-md px-4 py-6 border-2 border-gray-200 h-10 w-full rounded-lg focus:outline-none focus:ring-purple-600 focus:border-purple-600"
              />
            </div>
          </div>
        </div>

        {/* UploadData */}
        <div className="w-full flex items-end justify-center">
          <button
            onClick={updateProfile}
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
