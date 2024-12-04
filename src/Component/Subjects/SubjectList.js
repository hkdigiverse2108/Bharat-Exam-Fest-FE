import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { LuPencilLine } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import { toast } from "react-toastify";
import AddSubTopic from "./AddSubTopic";
import {
  editSubjectData,
  subjectList,
  subtopicList,
} from "../../Context/Action";

function SubjectList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subjects, setSubjects] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const itemsPerPage = 5;
  const [currentPageTable1, setCurrentPageTable1] = useState(1);
  const [currentPageTable2, setCurrentPageTable2] = useState(1);
  const PageStart1 = (currentPageTable1 - 1) * itemsPerPage;
  const PageEnd1 = PageStart1 + itemsPerPage;
  const PageStart2 = (currentPageTable2 - 1) * itemsPerPage;
  const PageEnd2 = PageStart2 + itemsPerPage;

  const TotalSubject = Math.ceil(subjects.length / itemsPerPage);
  const TotalSubtopic = Math.ceil(subtopics.length / itemsPerPage);
  const [subjectShow, setSubjectShow] = useState([]);
  const [subtopicShow, setSubtopicShow] = useState([]);
  const [error, setError] = useState(null);
  const accessToken = useSelector(
    (state) =>
      state.authConfig.userInfo[0]?.data?.token ||
      state.authConfig.userInfo[0]?.token
  );
  // const existData = useSelector((state) => state.userConfig.editSubjectData);

  const [confirm, setConfirm] = useState(false);
  function handleNavigate() {
    setConfirm(!confirm);
  }

  function handleAddSubject() {
    navigate("/addSubject");
  }

  function handleEditSubject(value) {
    navigate("/editSubject");
    dispatch(editSubjectData(value));
  }

  const deleteSubject = async (value) => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://api-bef.hkdigiverse.com/subject/delete/${value}`,
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
          navigate("/subject");
          toast.success("Subject delete");
          fetchSubjects();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "https://api-bef.hkdigiverse.com/subject/all?page=1&limit=10",
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );

      const subjects = response.data.data.subject_data;
      if (subjects) {
        // console.log(response.data.data.subject_data);
        setSubjects(response.data.data.subject_data);
        setSubjectShow(response.data.data.subject_data.slice(0, PageEnd1));
        dispatch(subjectList(subjects));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteSubtopic = async (value) => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://api-bef.hkdigiverse.com/sub-topic/delete/${value}`,
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
        // console.log(response.data.data.subject_data);
          navigate("/subject");
          toast.success("Subject delete");
          fetchSubtopics();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchSubtopics = async () => {
    try {
      const response = await axios.get(
        "https://api-bef.hkdigiverse.com/sub-topic/all?page=1&limit=10",
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      const subTopic = response.data.data.sub_topic_data;
      if (subTopic) {
        // console.log(response.data.data.sub_topic_data);
        setSubtopics(response.data.data.sub_topic_data);
        setSubtopicShow(response.data.data.sub_topic_data.slice(0, PageEnd2));
        dispatch(subtopicList(subTopic));
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    setSubjectShow(subjects.slice(PageStart1, PageEnd1));
    setSubtopicShow(subtopicShow.slice(PageStart2, PageEnd2));
  }, [currentPageTable1, currentPageTable2]);

  useEffect(() => {
    fetchSubjects();
    fetchSubtopics();
  }, []);

  return (
    <>
      <section className=" space-y-6">
        {/* Subjects */}
        <div className="shadow-md">
          <div className="relative w-full flex flex-col items-center rounded-t-xl px-4 py-2 overflow-hidden text-slate-700 bg-white  bg-clip-border">
            <p className="text-2xl text-left w-full font-semibold text-slate-800 uppercase">
              Subjects
            </p>
            <div className="flex  items-center justify-between gap-2 w-full">
              <p className="text-lg text-left font-normal text-slate-600 ">
                Enter ther subject name to create a new subject for the class
                curriculum.
              </p>
              <button
                onClick={handleAddSubject}
                className="h-10 inline-flex items-center space-x-2  text-nowrap rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90 "
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <FaPlus />
                </svg>
                <p className="font-semibold">Add New Subject</p>
              </button>
            </div>
          </div>
          <div className="bg-white overflow-auto px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      No
                      <svg viewBox="0 0 24 24" className="h-4 w-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      Subject Name
                      <svg viewBox="0 0 24 24" className="h-4 w-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      Subtopics
                    </p>
                  </th>

                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      Edit
                    </p>
                  </th>
                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      Remove
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {subjectShow.map((subject, index) => (
                  <tr key={subject._id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {index + 1}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                      <p className="text-sm antialiased font-sans leading-normal font-normal text-slate-500 border border-gray-500 p-2 rounded-md max-w-[300px]">
                        {subject.name}
                      </p>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden">
                      <div className=" grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-2 2xl:grid-cols-5 2xl:gap-3">
                        {subject.subTopics.map((val, index) => (
                          <p
                            key={index}
                            className="w-auto p-1 text-sm rounded-md text-yellow-700 text-center bg-yellow-100"
                          >
                            {val.name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 w-[20px] text-center">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => handleEditSubject(subject)}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            className="w-5 h-5"
                          >
                            <LuPencilLine />
                          </svg>
                        </span>
                      </button>
                    </td>
                    <td className="p-4 border-b border-blue-gray-50 w-[20px] text-center">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-md align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                        type="button"
                        onClick={() => deleteSubject(subject._id)}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg viewBox="0 0 16 16" className="w-6 h-6">
                            <AiOutlineDelete />
                          </svg>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            total={TotalSubject}
            page={setCurrentPageTable1}
            current={currentPageTable1}
          />
        </div>
        {/* Subtopics */}
        <div className="shadow-md">
          <div className="relative w-full flex flex-col items-center rounded-t-xl px-4 py-2 overflow-hidden text-slate-700 bg-white  bg-clip-border">
            <div className="flex  items-center justify-between gap-2 w-full">
              <p className="text-2xl text-left w-full font-semibold text-slate-800 uppercase">
                Sub-Topics
              </p>

              <button
                onClick={handleNavigate}
                className="h-10 inline-flex items-center space-x-2  text-nowrap rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90 "
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <FaPlus />
                </svg>
                <p className="font-semibold">Add Sub-Topic</p>
              </button>
            </div>
          </div>
          <div className="bg-white overflow-auto px-0">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="max-w-4 cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                    <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                      No
                      <svg viewBox="0 0 24 24" className="h-4 w-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </p>
                  </th>

                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      Subtopics
                    </p>
                  </th>

                  <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      Remove
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {subtopicShow.map((subtopic, index) => (
                  <tr key={subtopic._id}>
                    <td className="p-4 border-b border-blue-gray-50">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {index + 1}
                      </p>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50 overflow-hidden">
                      <p className="block antialiased font-sans text-sm leading-normal font-normal">
                        {subtopic.name}
                      </p>
                    </td>

                    <td className="p-4 border-b border-blue-gray-50 w-[20px] text-center">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-md align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                        type="button"
                        onClick={() => deleteSubtopic(subtopic._id)}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg viewBox="0 0 16 16" className="w-6 h-6">
                            <AiOutlineDelete />
                          </svg>
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            total={TotalSubtopic}
            page={setCurrentPageTable2}
            current={currentPageTable2}
          />
        </div>
      </section>
      <div className={`${confirm === true ? "block" : "hidden"}`}>
        <AddSubTopic confirm={confirm} onClose={handleNavigate} />
      </div>
    </>
  );
}

export default SubjectList;
