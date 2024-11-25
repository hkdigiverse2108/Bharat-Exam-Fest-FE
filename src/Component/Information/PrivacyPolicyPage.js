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
import { fetchPrivacyPolicyAPI } from "../../Hooks/InformationApi";

export default function PrivacyPolicyPage() {
  const dispatch = useDispatch();
  const { privacyPolicy } = useSelector(
    (state) => state.userConfig.privacyPolicy
  );
  // const [privacyPolicy, setPrivacyPolicy] = useState(null);
  // const [errorMessage, setErrorMessage] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );

  const handleEditorChange = (newContent) => {
    // Handle editor content change here, for example, saving it or updating a parent state
    console.log("Editor content changed:", newContent);
  
    setEditorContent(newContent);
  };

  // const fetchPrivacyPolicyAPI = async () => {
  //   const url = `https://api-bef.hkdigiverse.com/privacy-policy`;

  //   try {
  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: accessToken,
  //         Accept: "*/*",
  //       },
  //     });

  //     // console.log(response.data.data);

  //     if (response.status === 200) {
  //       setPrivacyPolicyResponse(response.data.data);
  //       setEditorContent(response.data.data.privacyPolicy);
  //     } else if (response.status === 404) {
  //       const errorMsg = response.data.message || "Data not found";
  //       setErrorMessage(errorMsg);
  //       console.error(errorMsg);
  //     } else {
  //       const errorMsg = `Failed to load data. Status code: ${response.status}`;
  //       setErrorMessage(errorMsg);
  //       console.error(errorMsg);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching terms and conditions:", error);
  //     setErrorMessage("An error occurred while fetching data.");
  //     console.error("An error occurred while fetching data.");
  //   }
  // };

  const addOrEditPrivacyPolicyAPI = async () => {
    try {
      if (!editorContent) {
        toast.warning("Fill up empty space");
      } else {
        // Ensure editorContent is a proper object or string
        let data = editorContent;

        // If editorContent is not a string, make sure it's a valid object
        if (typeof data !== "string") {
          data = JSON.stringify(data);
        }

        console.log("Sending data:", data); // Log the data to see what you're sending

        let config = {
          method: "post",
          url: `https://api-bef.hkdigiverse.com/privacy-policy/add/edit`,
          maxBodyLength: Infinity,
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          data: data, // This will send the data as JSON
        };

        const response = await axios.request(config);

        if (response.status === 200) {
          toast.success(response.data.message);
        } else if (response.status === 400) {
          console.log(response.data.message);
        } else {
          console.log("Request failed: " + response.data.message);
        }
      }
    } catch (err) {
      console.error("Error during API request:", err);
      toast.error("An error occurred while saving the privacy policy.");
    }
  };

  const getPrivacyPolicy = async () => {
    try {
      const data = await fetchPrivacyPolicyAPI(accessToken);
      // Assuming data.privacyPolicy contains the content you want to pass to the editor
      setEditorContent(data.privacyPolicy);
    } catch (error) {
      console.error("An error occurred while fetching data.");
    }
  };
  // useEffect(() => {
  //   const getPrivacyPolicy = async () => {
  //     try {
  //       const data = await fetchPrivacyPolicyAPI(accessToken);
  //       // dispatch(setPrivacyPolicyData(data.privacyPolicy));
  //       setEditorContent(data.privacyPolicy);
  //     } catch (error) {
  //       console.error("An error occurred while fetching data.");
  //     }
  //   };

  //   getPrivacyPolicy();
  // }, [accessToken, dispatch, privacyPolicy]);

  useEffect(() => {
    getPrivacyPolicy();
  }, [accessToken]);

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
                onClick={addOrEditPrivacyPolicyAPI}
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

          {/* <div className="relative p-4 overflow-hidden text-slate-700 bg-white rounded-t-xl bg-clip-border">
            <div className="flex flex-row items-center justify-between">
              <button
                //   onClick={() => handleNavigate()}
                className="inline-flex items-center justify-end space-x-2 rounded-full px-3 py-2 text-md text-center capitalize border border-slate-200 text-sky-500 bg-sky-100 hover:bg-opacity-90"
              >
                <svg className="font-bold w-4 h-4" viewBox="0 0 16 16">
                  <FaRegImage />
                </svg>
                <p className=" font-normal "> Add Media</p>
              </button>
              <div className="flex items-center text-center space-x-4 text-md font-medium text-gray-900">
                <h3 className="">Visual</h3>
                <p className="">Text</p>
              </div>
            </div>
          </div> */}
        </div>
        <RichTextExample content={editorContent} onTextChange={handleEditorChange} />
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
