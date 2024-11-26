import React, { useEffect, useMemo, useState } from "react";
import MultiSelection from "../Ui/MultiSelection";
import { MdStar } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleSelect from "../Ui/SingleSelect";
import RadioButtons from "../Ui/RadioButtons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HindiQuestionPairForm from "./QuestionType/HindiQuestionBase/HindiQuestionPairForm";
import EnglishQuestionPairForm from "./QuestionType/EnglishQuestionBase/EnglishQuestionPairForm";
import EnglishQueStatementBaseform from "./QuestionType/EnglishQuestionBase/EnglishQueStatmentBaseform";
import NormalquestionBaseForm from "./QuestionType/EnglishQuestionBase/NormalQuestionBaseForm";
import NormalHindQueBaseForm from "./QuestionType/HindiQuestionBase/NormalHindQueBaseForm";
import HindiQueStatementBaseform from "./QuestionType/HindiQuestionBase/HindiQueStatementBaseform";

function AddQuestion() {
  const navigate = useNavigate();
  const classId = useSelector((state) => state.authConfig.userInfo[0].data._id);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );
  const subject = useSelector((state) => state.userConfig.CurrentSubject);

  const [type, setType] = useState("concept");
  const [questionType, setQuestionType] = useState("normal");
  const [subtopics, setSubtopics] = useState([]);
  const [subjectname, setSubjectname] = useState([subject.name]);

  const [selectedSubject, setSelectedSubject] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState([]);
  const [addQuestion, setAddQuestion] = useState({
    subjectId: "",
    classesId: classId,
    subtopicIds: selectedSubtopic,
    type: "concept",
    questionType: "",
    englishQuestion: {
      question: "",
      lastQuestion: "",
      statementQuestion: [],
      pairQuestion: [],
      options: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
      answer: "",
      solution: "",
    },
    hindiQuestion: {
      question: "",
      lastQuestion: "",
      statementQuestion: [],
      pairQuestion: [],
      options: {
        A: "",
        B: "",
        C: "",
        D: "",
      },
      answer: "",
      solution: "",
    },
  });

  const [options, setOptions] = useState({
    englishQuestion: { A: false, B: false, C: false, D: false },
    hindiQuestion: { A: false, B: false, C: false, D: false },
  });
  const optionsArray1 = Object.keys(options.englishQuestion).map((key) => ({
    label: `Option ${key}`,
    value: key,
    checked: options.englishQuestion[key],
  }));
  const optionsArray2 = Object.keys(options.hindiQuestion).map((key) => ({
    label: `Option ${key}`,
    value: key,
    checked: options.hindiQuestion[key],
  }));

  const handleCheck = (language, event) => {
    const selectedValue = event.target.value;
    setOptions((prev) => {
      const newOptions = { ...prev };
      Object.keys(newOptions[language]).forEach((key) => {
        newOptions[language][key] = key === selectedValue;
      });
      return newOptions;
    });

    setAddQuestion((prev) => ({
      ...prev,
      [language]: {
        ...prev[language],
        answer: selectedValue,
      },
    }));
  };

  const handleTypeChange = (event) => {
    const { value } = event.target;
    setAddQuestion((prev) => ({
      ...prev,
      type: value,
    }));
  };
  // Handle subject change
  const handleSubjectChange = (event) => {
    const { value } = event.target;
    console.log(value);
    setAddQuestion((prev) => ({
      ...prev,
      subjectId: value._id,
    }));
    setSelectedSubject(value);
  };

  // Handle subtopic change
  const handleSubtopicChange = (event) => {
    const { value } = event.target;

    const dataId = value.map((res) => res?._id);
    setSelectedSubtopic(value);
    setAddQuestion((prev) => ({
      ...prev,
      subtopicIds: dataId,
    }));
  };

  const [currentEngStatement, setCurrentEngStatement] = useState("");
  const [currentHindiStatement, setCurrentHindiStatement] = useState("");
  const [currentEngPair, setCurrentEngPair] = useState("");
  const [currentHindiPair, setCurrentHindiPair] = useState("");

  const addStatementQuestion = (language) => {
    let currentStatement;
    if (language === "english") {
      currentStatement = currentEngStatement;
    } else if (language === "hindi") {
      currentStatement = currentHindiStatement;
    }

    if (currentStatement.trim() === "") {
      toast.error("Please enter a statement.");
      return; // Prevent adding empty statements
    }

    setAddQuestion((prev) => ({
      ...prev,
      [language + "Question"]: {
        ...prev[language + "Question"],
        statementQuestion: [
          ...prev[language + "Question"].statementQuestion,
          currentStatement,
        ],
      },
    }));

    // Reset the current statement field
    if (language === "english") {
      setCurrentEngStatement("");
    } else {
      setCurrentHindiStatement("");
    }

    toast.success("Statement added!");
  };
  const handleStatementQuestionChange = (language, index, field, value) => {
    const updatedStatements = [...addQuestion[language].statements];
    updatedStatements[index] = {
      ...updatedStatements[index],
      [field]: value,
    };
    setAddQuestion({
      ...addQuestion,
      [language]: {
        ...addQuestion[language],
        statements: updatedStatements,
      },
    });
  };

  const addPairQuestion = (language) => {
    const { question, answer } = addQuestion[language + "Question"];

    if (question.trim() === "" || answer.trim() === "") {
      toast.error("Please enter both question and answer.");
      return;
    }

    const newPair = {
      question,
      options,
    };
    setAddQuestion((prev) => ({
      ...prev,
      [language + "Question"]: {
        ...prev[language + "Question"],
        pairQuestion: [...prev[language + "Question"].pairQuestion, newPair],
      },
    }));

    toast.success("Question and answer pair added!");
  };

  const handlePairQuestionChange = (language, index, field, value) => {
    const updatedPairQuestion = [...addQuestion[language].pairQuestion];
    updatedPairQuestion[index] = {
      ...updatedPairQuestion[index],
      [field]: value,
    };
    setAddQuestion({
      ...addQuestion,
      [language]: {
        ...addQuestion[language],
        pairQuestion: updatedPairQuestion,
      },
    });
  };

  const handleAddPair = (language) => {
    setAddQuestion({
      ...addQuestion,
      [language]: {
        ...addQuestion[language],
        pairQuestion: [
          ...addQuestion[language].pairQuestion,
          { question: "", answer: "" },
        ],
      },
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const [lang, field, option] = name.split(".");

    if (lang === "englishQuestion" || lang === "hindiQuestion") {
      if (field === "options" && option) {
        setAddQuestion((prev) => ({
          ...prev,
          [lang]: {
            ...prev[lang],
            options: {
              ...prev[lang].options,
              [option]: value,
            },
          },
        }));
      } else {
        setAddQuestion((prev) => ({
          ...prev,
          [lang]: {
            ...prev[lang],
            [field]: value,
          },
        }));
      }
    } else {
      setAddQuestion((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    console.log("QUESTION", addQuestion);
  }, [addQuestion]);
  // const handleChange = (language, field, value) => {
  //   setAddQuestion((prev) => {
  //     return {
  //       ...prev,
  //       [language + "Question"]: {
  //         ...prev[language + "Question"],
  //         [field]: value,
  //       },
  //     };
  //   });
  // };

  const isEmpty = () => {
    const { englishQuestion, hindiQuestion } = addQuestion;
    return (
      !addQuestion.subjectId ||
      !addQuestion.classesId ||
      addQuestion.subtopicIds.length === 0 ||
      !addQuestion.type ||
      !addQuestion.questionType ||
      !englishQuestion.question ||
      !englishQuestion.answer ||
      !englishQuestion.solution ||
      !hindiQuestion.question ||
      !hindiQuestion.answer ||
      !hindiQuestion.solution ||
      Object.values(englishQuestion.options).some((opt) => !opt) ||
      Object.values(hindiQuestion.options).some((opt) => !opt)
    );
  };

  const addNewQuestion = async () => {
    try {
      if (isEmpty()) {
        toast.warning("Please fill up empty fields.");
        return; // Prevent submission if fields are empty
      }

      const data = JSON.stringify(addQuestion);
      console.log(addQuestion);

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "https://api-bef.hkdigiverse.com/question/add",
        headers: {
          Authorization: accessToken, // Ensure you have accessToken defined
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);

      if (response.status === 200) {
        toast.success(response.data);
        navigate("/subjectDetails");
      } else {
        console.error(response.message);

        toast.error("Failed to add question");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while adding the question.");
    }
  };

  const fetchData = async () => {
    try {
      const urlSubtopics = `https://api-bef.hkdigiverse.com/sub-topic/all?page=1&limit=10`;
      const urlSubjectName = `https://api-bef.hkdigiverse.com/subject/${subject._id}`;
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      };
      const [response1, response2] = await Promise.all([
        axios.get(urlSubtopics, config),
        axios.get(urlSubjectName, config),
      ]);

      if (response1.status === 200 && response2.status === 200) {
        // console.log("Data from subtopic:", response1.data.data.sub_topic_data);
        setSubtopics(response1.data.data.sub_topic_data);
        // console.log(
        //   "Data from subject:",
        //   response2.data.data.question_data
        // );
        setSubjectname(response2.data.data);
        // toast.success("Data fetched successfully!");
      } else {
        toast.error("Failed to fetch data from one or both endpoints.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("An error occurred while fetching data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className=" bg-white dark:bg-gray-900 overflow-y-auto rounded-lg border-2 border-slate-300 font-sans">
        <div className="py-8 px-4 space-y-2 lg:px-6">
          <div className="space-y-4">
            <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              add question
            </p>
            <p className="text-xl tracking-tight font-medium text-left text-slate-600 dark:text-white ">
              Fill in the details below to create a new question.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
            <div className="space-y-2" key="subject">
              <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
                Subject
              </label>
              <SingleSelect
                label="Subject"
                value={selectedSubject}
                onChange={handleSubjectChange}
                options={subjectname}
              />
            </div>

            <div className="space-y-2" key="subtopics">
              <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
                Subtopics
              </label>
              <MultiSelection
                label="Subtopics"
                value={selectedSubtopic}
                onChange={handleSubtopicChange}
                options={subtopics}
              />
            </div>

            <div className="space-y-2" key="question-bank">
              <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
                Question bank
              </label>
              <MultiSelection
                label="Question bank"
                value={selectedSubtopic}
                onChange={handleSubtopicChange}
                options={subtopics}
              />
            </div>

            <div className="space-y-3" key="type">
              <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
                Type
              </label>
              <RadioButtons checkedValue={type} onChange={handleTypeChange} />
            </div>
          </div>

          {/* question_type */}
          <div className="p-4 md:flex sm:flex text-sm font-medium text-gray-900 space-x-6  text-start dark:text-white">
            <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
              Question Type :
            </p>
            {["normal", "statement", "pair"].map((option, index) => (
              <div className="flex  items-center justify-start space-x-2">
                <input
                  type="radio"
                  key={index}
                  id={`type ${option}`}
                  value={option}
                  name={option}
                  checked={questionType === option}
                  onChange={(e) => {
                    setAddQuestion((prev) => ({
                      ...prev,
                      questionType: e.target.value,
                    }));
                    setQuestionType(e.target.value);
                  }}
                  className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600  dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={`type ${option}`}
                  className="w-full py-3 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="px-4 py-2 space-y-6">
          <div className="space-y-4">
            {/* english */}
            <div className="space-y-4">
              <p className="text-2xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
                english question section
              </p>
              <div className="space-y-2">
                <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                  write question
                </p>
                {questionType === "pair" ? (
                  <EnglishQuestionPairForm
                    addQuestion={addQuestion}
                    setAddQuestion={setAddQuestion}
                    currentEngPair={currentEngPair}
                    setCurrentEngPair={setCurrentEngPair}
                    addPairQuestion={addPairQuestion}
                    handleChange={handleChange}
                    handleCheck={handleCheck}
                    optionsArray1={optionsArray1}
                    handlePairQuestionChange={handlePairQuestionChange}
                    handleAddPair={handleAddPair}
                  />
                ) : questionType === "statement" ? (
                  <EnglishQueStatementBaseform
                    addQuestion={addQuestion}
                    setAddQuestion={setAddQuestion}
                    currentStatement={currentEngStatement}
                    setCurrentStatement={setCurrentEngStatement}
                    handleChange={handleChange}
                    handleCheck={handleCheck}
                    optionsArray1={optionsArray1}
                    handlePairQuestionChange={handleStatementQuestionChange}
                    handleAddPair={addStatementQuestion}
                  />
                ) : (
                  <NormalquestionBaseForm
                    addQuestion={addQuestion}
                    setAddQuestion={setAddQuestion}
                    handleChange={handleAddPair}
                    handleCheck={handleCheck}
                    optionsArray1={optionsArray1}
                  />
                )}
              </div>
            </div>
            {/* hindi */}
            <div className="space-y-4">
              <p className="text-2xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
                hindi question section
              </p>
              <div className="space-y-2">
                <div className="space-y-2">
                  <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                    write question
                  </p>
                  {questionType === "pair" ? (
                    // <div className="duration-300 space-y-2">
                    //   {/* Add Pair Button */}
                    //   <div className="flex items-center justify-end w-full">
                    //     <button
                    //       onClick={() => addPairQuestion("hindi")}
                    //       className="inline-flex items-center space-x-2 rounded-lg p-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90"
                    //     >
                    //       <FaPlus className="font-bold text-white w-4 h-4" />
                    //       <p className="font-semibold">Add Pair</p>
                    //     </button>
                    //   </div>

                    //   {/* Input for Pair Question */}
                    //   <input
                    //     className="border-2 pl- border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                    //     id="pairQuestion"
                    //     type="text"
                    //     placeholder="Add Pair Question"
                    //     value={currentHindiPair}
                    //     onChange={(e) => setCurrentHindiPair(e.target.value)}
                    //     name="hindiQuestion.pairQuestion"
                    //   />

                    //   {/* Display Added Pair Questions */}
                    //   <div className="space-y-2">
                    //     {addQuestion.hindiQuestion.pairQuestion &&
                    //       addQuestion.hindiQuestion.pairQuestion.length > 0 && (
                    //         <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                    //           {addQuestion.hindiQuestion.pairQuestion}
                    //         </div>
                    //       )}
                    //   </div>

                    //   {/* Options Section */}
                    //   <div className="p-4 space-y-4">
                    //     <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                    //       Options
                    //     </p>
                    //     <div className="flex flex-row items-center space-x-3">
                    //       {["A", "B", "C", "D"].map((option) => (
                    //         <div key={option} className="w-1/4">
                    //           <label
                    //             htmlFor={`hindiQuestion.options.${option}`}
                    //             className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                    //           >
                    //             Option - {option}
                    //             <MdStar className="text-orange-400 h-3 w-3" />
                    //           </label>
                    //           <input
                    //             type="text"
                    //             name={`hindiQuestion.options.${option}`}
                    //             value={
                    //               addQuestion.hindiQuestion.options[option]
                    //             }
                    //             onChange={handleChange}
                    //             className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    //             placeholder={`Option ${option}`}
                    //           />
                    //         </div>
                    //       ))}
                    //     </div>
                    //   </div>

                    //   {/* Answer Section */}
                    //   <div className="p-4 space-y-4">
                    //     <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                    //       Answer
                    //     </p>
                    //     <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6 text-start dark:text-white">
                    //       <ul className="flex items-center justify-start gap-x-6 w-full text-sm font-medium text-gray-900">
                    //         {optionsArray1.map((option) => (
                    //           <li
                    //             key={option.value}
                    //             className="border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                    //           >
                    //             <div className="flex items-center ps-3">
                    //               <input
                    //                 id={` radio${option.value}`}
                    //                 type="radio"
                    //                 value={option.value}
                    //                 checked={
                    //                   options.hindiQuestion[option.value]
                    //                 }
                    //                 onChange={(e) =>
                    //                   handleCheck("hindiQuestion", e)
                    //                 }
                    //                 className="w-4 h-4 text-blue-600 border-gray-300 checked:bg-blue-600 checked:outline-none"
                    //               />
                    //               <label
                    //                 htmlFor={`radio${option.value}`}
                    //                 className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    //               >
                    //                 {option.label}
                    //               </label>
                    //             </div>
                    //           </li>
                    //         ))}
                    //       </ul>
                    //     </div>
                    //   </div>

                    //   {/* Solution Section */}
                    //   <div className="space-y-2">
                    //     <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                    //       Solution
                    //     </p>
                    //     <textarea
                    //       className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full min-h-[100px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                    //       placeholder="Enter solution"
                    //       onChange={handleChange}
                    //       name="englishQuestion.solution"
                    //     />
                    //   </div>
                    // </div>
                    <HindiQuestionPairForm
                      addQuestion={addQuestion}
                      setAddQuestion={setAddQuestion}
                      currentHindiPair={currentHindiPair}
                      setCurrentHindiPair={setCurrentHindiPair}
                      addPairQuestion={addPairQuestion}
                      handleChange={handleChange}
                      handleCheck={handleCheck}
                      optionsArray1={optionsArray1}
                      handlePairQuestionChange={handlePairQuestionChange}
                      handleAddPair={handleAddPair}
                      // handleRemovePair={handleRemovePair}
                    />
                  ) : questionType === "statement" ? (
                    // <div className="duration-300 space-y-2">
                    //   <input
                    //     className="border-2 pl-2 text-lg  border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                    //     id="username"
                    //     type="text"
                    //     placeholder="Enter question"
                    //     onChange={handleChange}
                    //     name="hindiQuestion.question"
                    //   />
                    //   <div className="flex items-center justify-end w-full">
                    //     <button
                    //       onClick={() => addStatementQuestion("hindi")}
                    //       className="inline-flex items-center space-x-2 rounded-lg p-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90"
                    //     >
                    //       <FaPlus className="font-bold text-white w-4 h-4" />
                    //       <p className="font-semibold">Add Statement</p>
                    //     </button>
                    //   </div>
                    //   <div className="space-y-2">
                    //     <input
                    //       className="border-2 pl-2 text-lg  border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                    //       id="username"
                    //       type="text"
                    //       placeholder="Enter Statement"
                    //       value={currentHindiStatement}
                    //       onChange={(e) =>
                    //         setCurrentHindiStatement(e.target.value)
                    //       }
                    //       name="hindiQuestion.statementQuestion"
                    //     />
                    //     <div className="space-y-2">
                    //       {addQuestion.hindiQuestion.statementQuestion.map(
                    //         (value, index) => (
                    //           <div
                    //             key={index}
                    //             className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner"
                    //           >
                    //             {value}
                    //           </div>
                    //         )
                    //       )}
                    //     </div>
                    //   </div>
                    //   <input
                    //     className="border-2 pl-2 text-lg  border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                    //     id="username"
                    //     type="text"
                    //     placeholder="Enter suggestion"
                    //     onChange={handleChange}
                    //     name="hindiQuestion.lastQuestion"
                    //   />

                    //   {/* options */}
                    //   <div className="p-4 space-y-4">
                    //     <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                    //       options
                    //     </p>

                    //     <div className="flex flex-row items-center space-x-3">
                    //       {["A", "B", "C", "D"].map((option) => (
                    //         <div key={option} className="w-1/4">
                    //           <label
                    //             htmlFor={`hindiQuestion.options.${option}`}
                    //             className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                    //           >
                    //             Option - {option}
                    //             <MdStar className="text-orange-400 h-3 w-3" />
                    //           </label>
                    //           <input
                    //             type="text"
                    //             name={`hindiQuestion.options.${option}`}
                    //             value={
                    //               addQuestion.hindiQuestion.options[option]
                    //             }
                    //             onChange={handleChange}
                    //             className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    //             placeholder={`Option ${option}`}
                    //           />
                    //         </div>
                    //       ))}
                    //     </div>
                    //   </div>
                    //   {/* answer */}
                    //   <div className="p-4 space-y-4">
                    //     <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                    //       answer
                    //     </p>
                    //     <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6 text-start dark:text-white">
                    //       <ul className="flex items-center justify-start gap-x-6 w-full text-sm font-medium text-gray-900">
                    //         {optionsArray1.map((option, index) => (
                    //           <li
                    //             className="border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                    //             key={index}
                    //           >
                    //             <div className="flex items-center ps-3">
                    //               <input
                    //                 id={`radio${option.label}`}
                    //                 type="radio"
                    //                 value={option.value}
                    //                 checked={options.hindiQuestion[option]}
                    //                 onChange={(e) =>
                    //                   handleCheck("hindiQuestion", e)
                    //                 }
                    //                 className="w-4 h-4 text-blue-600 border-gray-300 checked:bg -blue-600 checked:outline-none"
                    //               />
                    //               <label
                    //                 htmlFor={`radio${option.label}`}
                    //                 className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    //               >
                    //                 Option {option.value}
                    //               </label>
                    //             </div>
                    //           </li>
                    //         ))}
                    //       </ul>
                    //     </div>
                    //   </div>
                    //   {/* solution */}
                    //   <div className="space-y-2">
                    //     <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                    //       solution
                    //     </p>
                    //     <textarea
                    //       id="message"
                    //       rows="4"
                    //       name={addQuestion.hindiQuestion.solution}
                    //       className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full min-h-[100px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                    //       onChange={(e) =>
                    //         setAddQuestion((prev) => ({
                    //           ...prev,
                    //           hindiQuestion: {
                    //             ...prev.hindiQuestion,
                    //             solution: e.target.value,
                    //           },
                    //         }))
                    //       }
                    //     />
                    //   </div>
                    // </div>
                    <HindiQueStatementBaseform
                      addQuestion={addQuestion}
                      setAddQuestion={setAddQuestion}
                      currentStatement={currentHindiStatement}
                      setCurrentStatement={setCurrentHindiStatement}
                      handleChange={handleChange}
                      handleCheck={handleCheck}
                      optionsArray1={optionsArray1}
                      handlePairQuestionChange={handleStatementQuestionChange}
                      handleAddPair={addStatementQuestion}
                    />
                  ) : (
                    <NormalHindQueBaseForm
                      addQuestion={addQuestion}
                      setAddQuestion={setAddQuestion}
                      handleChange={handleAddPair}
                      handleCheck={handleCheck}
                      optionsArray1={optionsArray1}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={addNewQuestion}
              className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90  "
            >
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <VscSaveAs />
              </svg>
              <p className=" font-medium">save question</p>
            </button>
          </div>
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

export default AddQuestion;
