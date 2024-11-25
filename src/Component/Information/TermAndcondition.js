import React, { Suspense, useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import TextEditor from "../Ui/TextEditor";
import Loading from "../Loader/Loading";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setTearmAndConditionData } from "../../Context/Action/index";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { VscSaveAs } from "react-icons/vsc";
import RichTextExample from "../Ui/RichTextExample";

export default function TermAndcondition() {
  const dispatch = useDispatch();
  const [termsConditionResponse, setTermsConditionResponse] = useState(null);
  const [editorContent, setEditorContent] = useState(null);
  const [editorText, setEditorText] = useState({
    termsCondition: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );
  // const Data = useSelector((state) => state.userConfig.tearmAndCondition);
  // console.log(Data);
  const fetchTermsConditionAPI = async () => {
    const url = `https://api-bef.hkdigiverse.com/terms-condition`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: accessToken,
          Accept: "*/*",
        },
      });

      // const decodedData = await response.json();
      // console.log(response.data.data);

      if (response.status === 200) {
        setTermsConditionResponse(response.data.data);
        setEditorContent(response.data.data.termsCondition);
        dispatch(setTearmAndConditionData(response.data.data));
      } else if (response.status === 404) {
        const errorMsg = response.data.message || "Data not found";
        setErrorMessage(errorMsg);
        console.error(errorMsg);
      } else {
        const errorMsg = `Failed to load data. Status code: ${response.status}`;
        setErrorMessage(errorMsg);
        console.error(errorMsg);
      }
    } catch (error) {
      console.error("Error fetching terms and conditions:", error);
      // setErrorMessage("An error occurred while fetching data.");
      // console.error("An error occurred while fetching data.");
    }
  };

  const addOrEditTearmAndCondition = async () => {
    try {
      if (!editorText.termsCondition) {
        toast.warning("Fill up empty space");
      } else {
        let data = JSON.stringify(editorText);
        console.log(editorText);

        let config = {
          method: "post",
          url: `https://api-bef.hkdigiverse.com/terms-condition/add/edit`,
          maxBodyLength: Infinity,
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          data: data,
        };
        const response = await axios.request(config);

        if (response.status === 200) {
          // console.log("Backend response", response);
          // dispatch(loginSuccess(data));
          toast.success(response.data.message);
          fetchTermsConditionAPI();
        } else if (response.status === 400) {
          console.log(response.data.message);
        } else {
          // console.warn("Login failed:", error);
          console.log("Login failed: " + response.data.message);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const [formattedText, setFormattedText] = useState("");

  function handleGetPlainText(value) {
    setFormattedText(value);
    setEditorText({
      termsCondition: value,
    });
  }
  // useEffect(() => {
  //   console.log("editor", formattedText);
  // }, [formattedText]);

  useEffect(() => {
    fetchTermsConditionAPI();
  }, []);
  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-2xl border">
        <div className="space-y-4 p-4">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-3xl capitalize text-left leading-10 font-semibold text-slate-800">
              terms and condition
            </h3>
            <div className="flex items-center justify-center">
              <button
                onClick={addOrEditTearmAndCondition}
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

        <Suspense fallback={<Loading />}>
          {/* <TextEditor
            content={editorContent}
            onTextChange={handleGetPlainText}
          /> */}
          <RichTextExample
            content={editorContent}
            onTextChange={handleGetPlainText}
          />
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
