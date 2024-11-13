import React, { useEffect, useState } from "react";
import { TfiPlus, TfiFilter, TfiPencil } from "react-icons/tfi";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmationPage from "./ConfirmationPage";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterSide from "../Filterpage/FilterSide";
import MultiSelection from "../Ui/MultiSelection";
import { useSelector } from "react-redux";
import axios from "axios";

function SubjectDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const [confirm, setConfirm] = useState(false);
  const [filter, setFilter] = useState(false);
  const [classNames, setClassNames] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [subjectData, setSubjectData] = useState(state);
  const { subject } = subjectData;
  const [itemToDelete, setItemToDelete] = useState(null);
  const [questions, setQustions] = useState([]);
  const [error, setError] = useState(null);

  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );

  function handleFilter() {
    setFilter(!filter);
  }
  function handleCreateque() {
    navigate("/addQuestion", { state: subjectData });
  }
  function handleEditque(value) {
    navigate("/editQuestion", { state: value });
  }

  const [selectedNames, setSelectedNames] = useState([]);
  const handleSelectionChange = (e) => {
    const { value } = e.target;
    const selectedClass = classNames.find(
      (classItem) => classItem.name === value
    );
    setSelectedClass(value);
    // setAddQuestion((prev) => ({
    //   ...prev,
    //   classesId: selectedClass?._id,
    // }));
  };

  function handleDelete(value) {
    setItemToDelete(value);
    setConfirm(!confirm);
  }

  const deleteQuestion = async () => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://api-bef.hkdigiverse.com/contest/delete/${itemToDelete}`,
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          toast.success(response.data.message);
          handleDelete();
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
        `https://api-bef.hkdigiverse.com/question/all?page=1&limit=10&subjectFilter=${state?._id}`,
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );

      console.log("res", response.data.data);

      setQustions(response.data.data.question_data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (questions.length !== 0) {
      console.log("Questions", questions);
    }
  }, [questions]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 p-4 overflow-y-auto rounded-lg border border-slate-300 font-sans">
        <div className="space-y-10 ">
          <div className=" space-y-4">
            <div className="flex items-center 2xl:justify-end xl:justify-end  lg:justify-end md:justify-end sm:justify-center space-x-4">
              <button
                onClick={() => handleFilter()}
                className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-orange-400 border border-orange-500 hover:bg-opacity-90  "
              >
                <svg
                  className="font-bold text-orange-400 w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <TfiFilter />
                </svg>
                <p className=" font-semibold">filter</p>
              </button>
              <button
                onClick={() => handleCreateque()}
                className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90  "
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <TfiPlus />
                </svg>
                <p className=" font-semibold">create new question</p>
              </button>
            </div>
            <div className=" space-y-2 flex flex-col items-start w-full">
              <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white uppercase">
                {state?.subjectName}
              </p>
              <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-2 2xl:grid-cols-4 2xl:gap-6">
                <MultiSelection
                  label="Class"
                  value={selectedClass}
                  onChange={handleSelectionChange}
                  options={classNames}
                />
              </div>
            </div>
          </div>
          <div className="w-full space-y-6 text-left  md:gap-16 dark:border-gray-700 font-sans">
            <ul className="space-y-4">
              {questions.map((value, index) => (
                <li key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-lg font-medium text-gray-900 dark:text-white">
                    <div className="flex items-center justify-between gap-x-4">
                      <p className="block font-sans text-lg font-medium text-blue-gray-900 capitalize antialiased">
                        {index + 1}
                      </p>
                      <p className="block font-sans text-lg font-medium text-blue-gray-900 capitalize antialiased">
                        {value.englishQuestion.question}
                      </p>
                    </div>
                    <div className="flex items-center justify-end space-x-4 pr-2">
                      <span
                        value="Verified"
                        className={`${
                          value.type === "easy"
                            ? "bg-green-100  text-green-600"
                            : value.type === "medium"
                            ? "bg-yellow-100  text-yellow-600"
                            : value.type === "hard"
                            ? "bg-red-100  text-red-600"
                            : "bg-gray-100  text-gray-900"
                        } px-4 text-sm leading-5 font-medium rounded-full capitalize `}
                      >
                        {value.type}
                      </span>
                      <button
                        onClick={() => handleDelete(value._id)}
                        className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase bg-red-100 border  hover:bg-opacity-90  "
                      >
                        <svg className="font-bold  w-5 h-5" viewBox="0 0 16 16">
                          <AiOutlineDelete />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleEditque(value)}
                        className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase bg-green-100 border  hover:bg-opacity-90  "
                      >
                        <svg className="font-bold  w-5 h-5" viewBox="0 0 17 17">
                          <TfiPencil />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="rounded-md border border-gray-300 px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                    {value.englishQuestion.solution}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`${confirm === true ? "block" : "hidden"}`}>
          <ConfirmationPage
            confirm={confirm}
            onDelete={deleteQuestion}
            onCancel={handleDelete}
          />
        </div>
        <div className={`${filter === true ? "block" : "hidden"}`}>
          <FilterSide filter={filter} setFilter={() => handleFilter()} />
        </div>
      </section>
    </>
  );
}
export default SubjectDetails;
