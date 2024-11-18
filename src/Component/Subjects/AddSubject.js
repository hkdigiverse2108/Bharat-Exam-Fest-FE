import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { VscSaveAs } from "react-icons/vsc";
import MultipleSelect from "../Ui/MultiSelection";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function AddSubject() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );

  const [selectedNames, setSelectedNames] = useState([]);
  const handleSelectionChange = (newValues) => {
    setSelectedNames(newValues);
    setInput({ ...input, subTopicIds: newValues });
  };
  const [input, setInput] = useState({
    name: "",
    image: "",
    subTopicIds: null,
  });

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "image") {
      setInput({ ...input, [name]: files[0].name });
    } else {
      setInput({ ...input, [name]: value });
    }
  }

  const addNewSubject = async () => {
    try {
      if (!input.name || !input.image || !input.subTopicIds) {
        toast.warning("Fill up empty space");
      } else {
        let data = JSON.stringify(input);
        console.log(input);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/subject/add",
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
              console.log("success",response.data);
              navigate("/subject");
              toast.success("Subject add");
            } else {
              console.log("failed",response);
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

  // useEffect(() => {
  //   console.log(input);
  // }, [input]);

  return (
    <>
      <section className="inline-block mx-auto w-full h-full bg-white rounded-lg space-y-4 px-4 p-5 text-left overflow-hidden shadow-xl transform transition-all ">
        <div className="text-left">
          <p className="text-3xl font-semibold text-slate-800">Add Subject</p>
          <p className="text-lg text-left font-normal text-slate-600 ">
            Enter ther subject name to create a new subject for the class
            curriculum.
          </p>
        </div>
        <div className="grid grid-cols-1 space-y-2 max-w-xs">
          <label
            htmlFor="subject"
            className="capitalize text-base font-medium text-gray-700 dark:text-white"
          >
            Subject name
          </label>
          <input
            className="text-base p-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 border-[#808836] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
            type="text"
            id="subject"
            name="name"
            placeholder="Enter class name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="space-y-3 ">
          <div className="p-4 w-full h-fit border border-[#808836] bg-white shadow-sm rounded-xl space-y-4">
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
              onChange={(e) => handleChange(e)}
              name="image"
              id="file-input"
              className="block w-full border border-gray-200 shadow-sm rounded-lg text-md focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 file:bg-gray-300  file:border-0 file:me-4 file:py-3 file:px-4 dark:file:bg-neutral-700 dark:file:text-neutral-400"
            />
          </div>
        </div>
        <div className="space-y-3 border border-[#808836] rounded-lg p-4">
          <h3 className="text-xl text-left capitalize font-medium text-gray-700 dark:text-white">
            Add multiple subtopic
          </h3>
          <div className="max-w-lg">
            <MultipleSelect onChange={handleSelectionChange} selectedValue={selectedNames}/>
          </div>
        </div>
        <div className="flex  items-center justify-center">
          <button
            onClick={() => addNewSubject()}
            className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90  "
          >
            <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
              <VscSaveAs />
            </svg>
            <p className="font-semibold">save details</p>
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
