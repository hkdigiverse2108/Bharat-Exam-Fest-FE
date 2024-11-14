import React, { useEffect, useState } from "react";
import { TfiPlus, TfiFilter, TfiPencil } from "react-icons/tfi";
import { AiOutlineDelete } from "react-icons/ai";
import ConfirmationPage from "./ConfirmationPage";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterSide from "../Filterpage/FilterSide";
import MultiSelection from "../Ui/MultiSelection";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CurrentQuestion, QuestionList } from "../../Context/Action";
import SingleSelect from "../Ui/SingleSelect";
import FilterQuestion from "../Ui/FilterQuestion";

function SubjectDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  const subject = useSelector((state) => state.userConfig.CurrentSubject[0]);
  const questionList = useSelector((state) => state.userConfig.Questions[0]);
  const [confirm, setConfirm] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [classNames, setClassNames] = useState([]);
  const [selectedClass, setSelectedClass] = useState([]);
  const [subjectData, setSubjectData] = useState();
  const [itemToDelete, setItemToDelete] = useState(null);
  const [questions, setQustions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState([]);

  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    easy: false,
    medium: false,
    hard: false,
    newestFirst: false,
    olderFirst: false,
    lastModified: false,
    question1: false,
    question2: false,
    question3: false,
  });

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setFilters((prev) => ({
      ...prev,
      [id]: checked,
    }));
  };

  function handleFilterData() {
    setToggle(!toggle);
  }

  const applyFilters = () => {
    const checkedValues = Object.entries(filters)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    const filteredQuestions = questions.filter(
      (question) =>
        checkedValues.length === 0 || checkedValues.includes(question.type)
    );
    setFilteredQuestions(filteredQuestions);
    handleFilterData();
    console.log("Checked Filters:", filteredQuestions);
  };

  useEffect(() => {
    const checkedValues = Object.entries(filters)
      .filter(([key, value]) => value)
      .map(([key]) => key);
    // Function to sort questions based on the selected sort order
    const sortQuestions = () => {
      const subtopicIds = subtopics.map((subtopic) => subtopic._id);
      let sorted = [...questions]; // Create a copy of the questions array

      if (filters.newestFirst) {
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (filters.olderFirst) {
        sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (filters.lastModified) {
        sorted.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      }

      setFilteredQuestions(sorted);
    };

    sortQuestions();
  }, [filters, questions]);

  const handleSelectionChange = (e) => {
    const { value } = e.target;

    // const dataId = value.map((res) => res._id);
    // const selected = subtopics.find((classItem) => classItem.name === value);
    setSelectedSubtopic(value._id);
    // console.log(dataId);
  };

  // useEffect(() => {
  //   if (selectedSubtopic) {
  //     const filtered = questions
  //       .filter((question) => question)
  //       .map((value, i) => value.subtopicIds[i] === selectedSubtopic);

  //     setFilteredQuestions(filtered);
  //   } else {
  //     setFilteredQuestions(questions);
  //   }
  // }, [selectedSubtopic]);

  useEffect(() => {
    const initialFilters = {};
    questions.forEach((question) => {
      if (question.type) {
        initialFilters[question.type] = true;
      }
    });
    setFilters((prev) => ({
      ...prev,
      ...initialFilters,
    }));
  }, [questions]);

  function handleCreateque() {
    navigate("/addQuestion");
  }

  function handleEditque(value) {
    dispatch(CurrentQuestion(value));
    navigate("/editQuestion");
  }

  const [selectedNames, setSelectedNames] = useState([]);

  function handleDelete(value) {
    setItemToDelete(value);
    setConfirm(!confirm);
  }
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
      console.log(response.data.data.sub_topic_data);

      setSubtopics(response.data.data.sub_topic_data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const fetchQuestions = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `https://api-bef.hkdigiverse.com/question/all?page=1&limit=10&subjectFilter=${subject._id}`,
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      };

      axios.request(config).then((response) => {
        if (response.status === 200) {
          console.log("Question List", response.data.data.question_data);
          dispatch(QuestionList(response.data.data.question_data));
          setQustions(response.data.data.question_data);
        } else {
          console.log("no data ", response.message);
        }
      });
    } catch (err) {
      setError(err.message);
    }
  };
  const deleteQuestion = async () => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://api-bef.hkdigiverse.com/question/delete/${itemToDelete}`,
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
          fetchQuestions();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    console.log("current ", subject);
  }, [subject]);

  useEffect(() => {
    fetchQuestions();
    fetchSubtopics();
    setSubjectData(subject);
    // setFilteredQuestions(questionList);
    console.log("questionList", subtopics);
  }, []);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 p-4 overflow-y-auto rounded-lg border border-slate-300 font-sans">
        <div className="space-y-10 ">
          <div className=" space-y-4">
            <div className="flex items-center 2xl:justify-end xl:justify-end  lg:justify-end md:justify-end sm:justify-center space-x-4">
              <button
                onClick={() => handleFilterData()}
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
                {subject.subjectName}
              </p>
              <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-2 2xl:grid-cols-4 2xl:gap-6">
                {/* <FilterQuestion
                  label="Subject"
                  value={selectedSubtopic}
                  onChange={handleSelectionChange}
                  options={subtopics}
                /> */}
              </div>
            </div>
          </div>
          <div className="w-full space-y-6 text-left  md:gap-16 dark:border-gray-700 font-sans">
            <ul className="space-y-4">
              {filteredQuestions.map((value, index) => (
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
        <div className={`${toggle === true ? "block" : "hidden"}`}>
          <FilterSide
            filterData={filters}
            onChange={handleCheckboxChange}
            apply={applyFilters}
            onClose={handleFilterData}
          />
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
export default SubjectDetails;
