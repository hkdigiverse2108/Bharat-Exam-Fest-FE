import React, { Suspense, useEffect, useState } from "react";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import TextEditor from "../Ui/TextEditor";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Loading from "../Loader/Loading";

export default function PrivacyPolicyPage() {
  const [privacyPolicy, setPrivacyPolicyResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  const fetchPrivacyPolicyAPI = async () => {
    const url = `https://api-bef.hkdigiverse.com/privacy-policy`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: accessToken,
        },
      });

      const decodedData = await response.json();
      // console.log(response);

      if (response.status === 200) {
        const parsedData = decodedData;
        // console.log(parsedData.data);
        if (parsedData.status === 200) {
          setPrivacyPolicyResponse(parsedData.data);
          // toast.success(parsedData.message);
        } else {
          console.error(parsedData.message);
        }
      } else if (response.status === 404) {
        const errorMsg = decodedData.message || "Data not found";
        setErrorMessage(errorMsg);
        console.error(errorMsg);
      } else {
        const errorMsg = `Failed to load data. Status code: ${response.status}`;
        setErrorMessage(errorMsg);
        console.error(errorMsg);
      }
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
      setErrorMessage("An error occurred while fetching data.");
      console.error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchPrivacyPolicyAPI();
  }, []);
  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-2xl border">
        <div className="space-y-4 p-4">
          <h3 className="text-3xl capitalize text-left leading-10 font-semibold text-slate-800">
            Privacy Policy
          </h3>
          <div className="relative p-4 overflow-hidden text-slate-700 bg-white rounded-t-xl bg-clip-border">
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
          </div>
        </div>
        <Suspense fallback={<Loading />}>
          <TextEditor/>
        </Suspense>
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
