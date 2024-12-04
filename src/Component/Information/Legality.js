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
import { addOrEditLegality, fetchLegality } from "../../ApiHandler/InformationApi";

function Legality() {
  const [editorContent, setEditorContent] = useState("");
  const [existingLegality, setExistingLegality] = useState(null);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );

  const handleEditorChange = (newContent) => {
    setEditorContent(newContent);
  };

  // const fetchLegalityAPI = async () => {
  //   const url = `https://api-bef.hkdigiverse.com/illegality`;

  //   try {
  //     const response = await axios.get(url, {
  //       headers: {
  //         Authorization: accessToken,
  //         Accept: "*/*",
  //       },
  //     });

  //     // console.log(response.data.data);

  //     if (response.status === 200) {
  //       setLegalityResponse(response.data.data);
  //       setEditorContent(response.data.data.illegality);
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
  //     // console.error("An error occurred while fetching data.");
  //   }
  // };
  // const addOrEditLegality = async () => {
  //   try {
  //     if (!editorText.illegality) {
  //       toast.warning("Fill up empty space");
  //     } else {
  //       let data = JSON.stringify(editorText);
  //       console.log(editorText);

  //       let config = {
  //         method: "post",
  //         url: `https://api-bef.hkdigiverse.com/illegality/add/edit`,
  //         maxBodyLength: Infinity,
  //         headers: {
  //           Authorization: accessToken,
  //           "Content-Type": "application/json",
  //         },
  //         data: data,
  //       };
  //       const response = await axios.request(config);

  //       if (response.status === 200) {
  //         // console.log("Backend response", response);
  //         // dispatch(loginSuccess(data));
  //         toast.success(response.data.message);
  //         fetchLegalityAPI();
  //       } else if (response.status === 400) {
  //         console.log(response.data.message);
  //       } else {
  //         // console.warn("Login failed:", error);
  //         console.log("Login failed: " + response.data.message);
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  useEffect(() => {
    const getLegality = async () => {
      try {
        const data = await fetchLegality(accessToken);
        setExistingLegality(data);
        setEditorContent(data.illegality || "");
      } catch (err) {
        console.error("Error fetching existing policy:", err);
      }
    };

    getLegality();
  }, [accessToken]);

  const handleSaveLegality = async () => {
    await addOrEditLegality(editorContent, accessToken);
  };

  return (
    <>
      <div className="bg-white overflow-hidden shadow rounded-2xl border">
        <div className="space-y-4 p-4">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-3xl capitalize text-left leading-10 font-semibold text-slate-800">
              legality
            </h3>

            <div className="flex items-center justify-center">
              <button
                onClick={handleSaveLegality}
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
        <Suspense fallback={<Loading />}>
          <RichTextExample
            content={editorContent}
            onTextChange={handleEditorChange}
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

export default Legality;
