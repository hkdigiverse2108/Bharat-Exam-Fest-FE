import React, { Suspense, useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import TextEditor from "../Ui/TextEditor";
import Loading from "../Loader/Loading";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  setPrivacyPolicyData,
  setTearmAndConditionData,
} from "../../Context/Action/index";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { VscSaveAs } from "react-icons/vsc";
import RichTextExample from "../Ui/RichTextExample";
import {
  addOrEditPrivacyPolicy,
  fetchPrivacyPolicy,
  fetchPrivacyPolicyAPI,
} from "../../Hooks/InformationApi";

export default function PrivacyPolicyPage() {
  const dispatch = useDispatch();
  // const { privacyPolicy } = useSelector(
  //   (state) => state.userConfig.privacyPolicy
  // );
  const [editorContent, setEditorContent] = useState("");
  const [existingPolicy, setExistingPolicy] = useState(null);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
  };

  // const addOrEditPrivacyPolicyAPI = async () => {
  //   try {
  //     if (!editorContent) {
  //       toast.warning("Fill up empty space");
  //     } else {
  //       // Ensure editorContent is a proper object or string
  //       let data = JSON.stringify(editorContent);

  //       console.log(data); // Log the data to see what you're sending

  //       let config = {
  //         method: "post",
  //         url: `https://api-bef.hkdigiverse.com/privacy-policy/add/edit`,
  //         maxBodyLength: Infinity,
  //         headers: {
  //           Authorization: accessToken,
  //           "Content-Type": "application/json",
  //         },
  //         data: data, // This will send the data as JSON
  //       };

  //       const response = await axios.request(config);

  //       if (response.status === 200) {
  //         toast.success(response.data.message);
  //       } else if (response.status === 400) {
  //         console.log(response.data.message);
  //       } else {
  //         console.log("Request failed: " + response.data.message);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error during API request:", err);
  //     toast.error("An error occurred while saving the privacy policy.");
  //   }
  // };

  // const addOrEditPrivacyPolicyAPI = async () => {
  //   try {
  //     if (!editorContent) {
  //       toast.warning("Fill up empty space");
  //     } else {
  //       const fetchPrivacyPolicy = async () => {
  //         try {
  //           const response = await axios.get(
  //             "https://api-bef.hkdigiverse.com/privacy-policy"
  //           );
  //           return response.data; // Assuming the data returned contains the policy
  //         } catch (error) {
  //           console.error("Error fetching Privacy Policy:", error);
  //           toast.error("Failed to fetch Privacy Policy.");
  //         }
  //       };

  //       const existingPolicy = await fetchPrivacyPolicy();

  //       // Step 2: If editorContent exists, proceed with saving or updating
  //       if (!editorContent) {
  //         toast.warning("Fill up empty space");
  //         return;
  //       }

  //       let data;
  //       if (typeof editorContent === "string") {
  //         data = { privacyPolicy: editorContent }; // Wrap the string content in an object if needed
  //       } else {
  //         data = { privacyPolicy: JSON.stringify(editorContent) }; // Stringify object content if needed
  //       }

  //       console.log(data); // Log the data to check the format

  //       let config = {
  //         method: "post",
  //         url: `https://api-bef.hkdigiverse.com/privacy-policy/add/edit`,
  //         maxBodyLength: Infinity,
  //         headers: {
  //           Authorization: accessToken,
  //           "Content-Type": "application/json",
  //         },
  //         data: data, // Send the data as JSON
  //       };

  //       const response = await axios.request(config);

  //       if (response.status === 200) {
  //         toast.success(response.data.message);
  //       } else if (response.status === 400) {
  //         console.log(response.data.message);
  //       } else {
  //         console.log("Request failed: " + response.data.message);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("Error during API request:", err);
  //     toast.error("An error occurred while saving the privacy policy.");
  //   }
  // };


  useEffect(() => {
    const getPrivacyPolicy = async () => {
      try {
        const data = await fetchPrivacyPolicy(accessToken);
        setExistingPolicy(data);
        setEditorContent(data.privacyPolicy || ""); 
        
      } catch (err) {
        console.error("Error fetching existing policy:", err);
      }
    };

    getPrivacyPolicy();
  }, [accessToken]);

  const handleSavePrivacyPolicy = async () => {
    await addOrEditPrivacyPolicy(editorContent, accessToken);
  };
  

  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-2xl border">
        <div className="space-y-4 p-4">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-3xl capitalize text-left leading-10 font-semibold text-slate-800">
              Privacy Policy
            </h3>

            <div className="flex items-center justify-center">
              <button
                onClick={handleSavePrivacyPolicy}
                className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90  "
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <VscSaveAs />
                </svg>
                <p className=" font-medium">save</p>
              </button>
            </div>
          </div>
        </div>
        <RichTextExample
          content={editorContent}
          onTextChange={handleEditorChange}
        />
      </div>
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
