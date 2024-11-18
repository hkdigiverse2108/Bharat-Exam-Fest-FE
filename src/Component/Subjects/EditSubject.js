import React, { useEffect, useState } from "react";
import { VscSaveAs } from "react-icons/vsc";
import MultipleSelect from "../Ui/MultiSelection";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditSubject() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );

  const [selectedNames, setSelectedNames] = useState(state.subTopicIds);
  const [input, setInput] = useState({
    subjectId: state._id,
    name: state.name,
    image: state.image,
    subTopicIds: selectedNames,
  });

  const { name } = input;
  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  const handleSelectionChange = (newValues) => {
    setSelectedNames(newValues);
    const newArray = selectedNames.concat(newValues);
    setInput((prevInput) => ({
      ...prevInput,
      subTopicIds: newArray,
    }));
  };

  const editSubject = async () => {
    try {
      if (!name) {
        toast.warning("Fill up empty space");
      } else {
        let data = JSON.stringify(input);
        console.log(input);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/subject/edit",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            console.log("response",response.data);
            navigate("/subject");
            toast.success("Subject Edited");
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
    setSelectedNames(state.subTopicIds);
    console.log(state);
    
  }, [state]);

  return (
    <>
      <section className="inline-block mx-auto w-full h-full bg-white rounded-lg space-y-4 px-4 p-5 text-left overflow-hidden shadow-xl transform transition-all ">
        <div className="text-left">
          <p className="text-3xl font-semibold text-slate-800">Edit Subject</p>
          <p className="text-lg text-left font-normal text-slate-600 ">
            Enter ther subject name to create a new subject for the class
            curriculum.
          </p>
        </div>
        <div className="grid grid-cols-1 space-y-2 max-w-xs">
          <label
            htmlFor="subject"
            className="text-gray-700 font-semibold dark:text-gray-200"
          >
            Class name
          </label>
          <input
            className="text-base p-2 border rounded-lg shadow-sm bg-white placeholder-gray-400 text-gray-700 border-[#808836] focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
            type="text"
            id="subject"
            placeholder="Enter class name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-3 border border-[#808836] rounded-lg p-4">
          <h3 className="text-xl text-left font-semibold text-gray-800">
            Add multiple subtopic
          </h3>
          <div className="max-w-lg">
            <MultipleSelect onChange={handleSelectionChange} />
          </div>
        </div>
        <div className="flex  items-center justify-center">
          <button
            onClick={editSubject}
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
