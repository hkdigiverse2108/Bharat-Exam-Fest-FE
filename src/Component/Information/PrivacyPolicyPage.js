import React, { Suspense, useEffect, useState } from "react";
import { FaPlus, FaRegImage } from "react-icons/fa6";
import TextEditor from "../Ui/TextEditor";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Loading from "../Loader/Loading";
import { VscSaveAs } from "react-icons/vsc";


export default function PrivacyPolicyPage() {
  const [privacyPolicy, setPrivacyPolicyResponse] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [formattedText, setFormattedText] = useState("");
  const [editorContent, setEditorContent] = useState(null);

  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );

  function handleGetPlainText(value) {
    setFormattedText(value);
  }
  // useEffect(() => {
  //   console.log("editor", formattedText);
  // }, [formattedText]);

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
        if (parsedData.status === 200) {
          setPrivacyPolicyResponse(parsedData.data);
          setEditorContent(parsedData.data.privacyPolicy);

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
  // const addOrEditPrivacyPolicy = async () => {
  //   try {
  //     if (!name) {
  //       toast.warning("Fill up empty space");
  //     } else {
  //       let data = JSON.stringify(input);

  //       let config = {
  //         method: "post",
  //         url: `https://api-bef.hkdigiverse.com/auth/login`,
  //         maxBodyLength: Infinity,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         data: data,
  //       };
  //       const response = await axios.request(config);

  //       axios
  //         .request(config)
  //         .then((response) => {
  //           console.log(response.data);
  //           toast.success("Subtopic add");
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //         });
  //       if (response.status === 200) {
  //         // console.log("Backend response", response);
  //         // dispatch(loginSuccess(data));
  //         toast.success(response.data.message);
  //         // navigate("/");
  //         // handleNavigate();
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
    fetchPrivacyPolicyAPI();
  }, []);
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
                // onClick={EditQuestion}
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
          <TextEditor
            content={editorContent}
            onTextChange={handleGetPlainText}
          />
        </Suspense>
        <div className="container mx-auto p-4">
          <h2 className="text-2xl mb-4">Displayed Text</h2>
          <div
            className="border p-4 rounded text-black"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          ></div>
        </div>
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