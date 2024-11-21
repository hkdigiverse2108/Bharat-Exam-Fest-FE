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
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );
  const existData = useSelector((state) => state.userConfig.editSubjectData);
  const existSubtopicList = useSelector(
    (state) => state.userConfig.subtopicList
  );
  const [subtopics, setSubtopics] = useState(existSubtopicList);
  const [subTopicId, setSubTopicId] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);

  const [selectedNames, setSelectedNames] = useState([]);
  const [input, setInput] = useState({
    subjectId: "",
    name: "",
    image: "",
    subTopicIds: subTopicId,
  });

  const isEmpty = () => {
    if (
      input.subjectId.trim() === "" ||
      input.name.trim() === "" ||
      input.image.trim() === "" ||
      input.subTopicIds.length === 0
    ) {
      return true;
    }
    return false;
  };
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
          // 'Content-Type': 'multipart/form-data', // Do not set Content-Type; axios will set it automatically
        },
        data: formData, // Use FormData as the data
      };

      const response = await axios.request(config); // Use await to wait for the response
      console.log("Upload response:", response.data);
      setInput({ ...input, image: response.data.data });
      toast.success("Image uploaded successfully!");
    } catch (err) {
      console.error(err.message);
      toast.error("Failed to upload image.");
    }
  };
  const handleUpload = (value) => {
    imgUpload(value);
  };
  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image") {
      handleUpload(files[0]);
    } else {
      setInput({ ...input, [name]: value });
    }
  }

  const handleSubtopicChange = (event) => {
    const { value } = event.target;
    const uniqueValues = Array.from(new Set(value.map((item) => item._id)));
    setSubTopicId(uniqueValues);
    setSelectedSubtopic(value);
    setInput((prev) => ({
      ...prev,
      subTopicIds: uniqueValues,
    }));
  };

  useEffect(() => {
    console.log("EDIT", input);
  }, [input]);

  const editSubject = async () => {
    try {
      if (isEmpty()) {
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

        const response = await axios.request(config);

        if (response.status === 200) {
          console.log("success", response.data);
          toast.success(response.message);
          navigate("/subject");
        } else {
          console.log("failed", response);
          console.log("msg", response.message);
        }
        // axios
        //   .request(config)
        //   .then((response) => {
        //     console.log("response", response.data);
        //     navigate("/subject");
        //     toast.success("Subject Edited");
        //   })
        //   .catch((error) => {
        //     console.error(error);
        //   });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    if (existData) {
      console.log("existSubject", existData);
      setInput({
        subjectId: existData._id,
        name: existData.name,
        image: existData.image,
        subTopicIds: existData.subTopicIds,
      });
      // setSubtopics(existSubtopicList);
      const filteredSubtopics = subtopics.filter((value) =>
        existData.subTopicIds.includes(value._id)
      );
      setSelectedSubtopic(filteredSubtopics);
    }
  }, [existData]);

  // useEffect(() => {
  // }, [state]);

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
            value={input.name}
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
          <h3 className="text-xl text-left font-semibold text-gray-800">
            Add multiple subtopic
          </h3>
          <div className="max-w-lg">
            <MultipleSelect
              label="Subtopics"
              value={selectedSubtopic}
              onChange={handleSubtopicChange}
              options={subtopics}
            />
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
