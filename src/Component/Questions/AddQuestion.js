// import React, { useEffect, useMemo, useState } from "react";
// import MultiSelection from "../Ui/MultiSelection";
// import { MdStar } from "react-icons/md";
// import { VscSaveAs } from "react-icons/vsc";
// import { FaPlus } from "react-icons/fa6";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import SingleSelect from "../Ui/SingleSelect";
// import RadioButtons from "../Ui/RadioButtons";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import HindiQuestionPairForm from "./QuestionType/HindiQuestionBase/HindiQuestionPairForm";
// import EnglishQuestionPairForm from "./QuestionType/EnglishQuestionBase/EnglishQuestionPairForm";
// import EnglishQueStatementBaseform from "./QuestionType/EnglishQuestionBase/EnglishQueStatmentBaseform";
// import NormalquestionBaseForm from "./QuestionType/EnglishQuestionBase/NormalQuestionBaseForm";
// import NormalHindQueBaseForm from "./QuestionType/HindiQuestionBase/NormalHindQueBaseForm";
// import HindiQueStatementBaseform from "./QuestionType/HindiQuestionBase/HindiQueStatementBaseform";

// function AddQuestion() {
//   const navigate = useNavigate();
//   const classId = useSelector((state) => state.authConfig.userInfo[0].data._id);
//   const accessToken = useSelector(
//     (state) => state.authConfig.userInfo[0].data.token
//   );
//   const subject = useSelector((state) => state.userConfig.CurrentSubject);

//   const [type, setType] = useState("concept");
//   const [questionType, setQuestionType] = useState("normal");
//   const [subtopics, setSubtopics] = useState([]);
//   const [subjectname, setSubjectname] = useState([subject.name]);

//   const [selectedSubject, setSelectedSubject] = useState([]);
//   const [selectedSubtopic, setSelectedSubtopic] = useState([]);
//   const [addQuestion, setAddQuestion] = useState({
//     subjectId: "",
//     classesId: classId,
//     subtopicIds: selectedSubtopic,
//     type: "concept",
//     questionType: "",
//     englishQuestion: {
//       question: "",
//       lastQuestion: "",
//       statementQuestion: [],
//       pairQuestion: [],
//       options: {
//         A: "",
//         B: "",
//         C: "",
//         D: "",
//       },
//       answer: "",
//       solution: "",
//     },
//     hindiQuestion: {
//       question: "",
//       lastQuestion: "",
//       statementQuestion: [],
//       pairQuestion: [],
//       options: {
//         A: "",
//         B: "",
//         C: "",
//         D: "",
//       },
//       answer: "",
//       solution: "",
//     },
//   });

//   const [options, setOptions] = useState({
//     englishQuestion: { A: false, B: false, C: false, D: false },
//     hindiQuestion: { A: false, B: false, C: false, D: false },
//   });
//   const optionsArray1 = Object.keys(options.englishQuestion).map((key) => ({
//     label: `Option ${key}`,
//     value: key,
//     checked: options.englishQuestion[key],
//   }));
//   const optionsArray2 = Object.keys(options.hindiQuestion).map((key) => ({
//     label: `Option ${key}`,
//     value: key,
//     checked: options.hindiQuestion[key],
//   }));

//   const handleCheck = (language, event) => {
//     const selectedValue = event.target.value;
//     setOptions((prev) => {
//       const newOptions = { ...prev };
//       Object.keys(newOptions[language]).forEach((key) => {
//         newOptions[language][key] = key === selectedValue;
//       });
//       return newOptions;
//     });

//     setAddQuestion((prev) => ({
//       ...prev,
//       [language]: {
//         ...prev[language],
//         answer: selectedValue,
//       },
//     }));
//   };

//   const handleTypeChange = (event) => {
//     const { value } = event.target;
//     setAddQuestion((prev) => ({
//       ...prev,
//       type: value,
//     }));
//   };
//   // Handle subject change
//   const handleSubjectChange = (event) => {
//     const { value } = event.target;
//     console.log(value);
//     setAddQuestion((prev) => ({
//       ...prev,
//       subjectId: value._id,
//     }));
//     setSelectedSubject(value);
//   };

//   // Handle subtopic change
//   const handleSubtopicChange = (event) => {
//     const { value } = event.target;

//     const dataId = value.map((res) => res?._id);
//     setSelectedSubtopic(value);
//     setAddQuestion((prev) => ({
//       ...prev,
//       subtopicIds: dataId,
//     }));
//   };

//   const [currentEngStatement, setCurrentEngStatement] = useState("");
//   const [currentHindiStatement, setCurrentHindiStatement] = useState("");
//   const [currentEngPair, setCurrentEngPair] = useState("");
//   const [currentHindiPair, setCurrentHindiPair] = useState("");

//   const addStatementQuestion = (language) => {
//     let currentStatement;
//     if (language === "english") {
//       currentStatement = currentEngStatement;
//     } else if (language === "hindi") {
//       currentStatement = currentHindiStatement;
//     }

//     if (currentStatement.trim() === "") {
//       toast.error("Please enter a statement.");
//       return; // Prevent adding empty statements
//     }

//     setAddQuestion((prev) => ({
//       ...prev,
//       [language + "Question"]: {
//         ...prev[language + "Question"],
//         statementQuestion: [
//           ...prev[language + "Question"].statementQuestion,
//           currentStatement,
//         ],
//       },
//     }));

//     // Reset the current statement field
//     if (language === "english") {
//       setCurrentEngStatement("");
//     } else {
//       setCurrentHindiStatement("");
//     }

//     toast.success("Statement added!");
//   };
//   const handleStatementQuestionChange = (language, index, field, value) => {
//     const updatedStatements = [...addQuestion[language].statements];
//     updatedStatements[index] = {
//       ...updatedStatements[index],
//       [field]: value,
//     };
//     setAddQuestion({
//       ...addQuestion,
//       [language]: {
//         ...addQuestion[language],
//         statements: updatedStatements,
//       },
//     });
//   };

//   const addPairQuestion = (language) => {
//     const { question, answer } = addQuestion[language + "Question"];

//     if (question.trim() === "" || answer.trim() === "") {
//       toast.error("Please enter both question and answer.");
//       return;
//     }

//     const newPair = {
//       question,
//       options,
//     };
//     setAddQuestion((prev) => ({
//       ...prev,
//       [language + "Question"]: {
//         ...prev[language + "Question"],
//         pairQuestion: [...prev[language + "Question"].pairQuestion, newPair],
//       },
//     }));

//     toast.success("Question and answer pair added!");
//   };

//   const handlePairQuestionChange = (language, index, field, value) => {
//     const updatedPairQuestion = [...addQuestion[language].pairQuestion];
//     updatedPairQuestion[index] = {
//       ...updatedPairQuestion[index],
//       [field]: value,
//     };
//     setAddQuestion({
//       ...addQuestion,
//       [language]: {
//         ...addQuestion[language],
//         pairQuestion: updatedPairQuestion,
//       },
//     });
//   };

//   const handleAddPair = (language) => {
//     setAddQuestion({
//       ...addQuestion,
//       [language]: {
//         ...addQuestion[language],
//         pairQuestion: [
//           ...addQuestion[language].pairQuestion,
//           { question: "", answer: "" },
//         ],
//       },
//     });
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     const [lang, field, option] = name.split(".");

//     if (lang === "englishQuestion" || lang === "hindiQuestion") {
//       if (field === "options" && option) {
//         setAddQuestion((prev) => ({
//           ...prev,
//           [lang]: {
//             ...prev[lang],
//             options: {
//               ...prev[lang].options,
//               [option]: value,
//             },
//           },
//         }));
//       } else {
//         setAddQuestion((prev) => ({
//           ...prev,
//           [lang]: {
//             ...prev[lang],
//             [field]: value,
//           },
//         }));
//       }
//     } else {
//       setAddQuestion((prev) => ({
//         ...prev,
//         [name]: value,
//       }));
//     }
//   };

//   useEffect(() => {
//     console.log("QUESTION", addQuestion);
//   }, [addQuestion]);
//   // const handleChange = (language, field, value) => {
//   //   setAddQuestion((prev) => {
//   //     return {
//   //       ...prev,
//   //       [language + "Question"]: {
//   //         ...prev[language + "Question"],
//   //         [field]: value,
//   //       },
//   //     };
//   //   });
//   // };

//   const isEmpty = () => {
//     const { englishQuestion, hindiQuestion } = addQuestion;
//     return (
//       !addQuestion.subjectId ||
//       !addQuestion.classesId ||
//       addQuestion.subtopicIds.length === 0 ||
//       !addQuestion.type ||
//       !addQuestion.questionType ||
//       !englishQuestion.question ||
//       !englishQuestion.answer ||
//       !englishQuestion.solution ||
//       !hindiQuestion.question ||
//       !hindiQuestion.answer ||
//       !hindiQuestion.solution ||
//       Object.values(englishQuestion.options).some((opt) => !opt) ||
//       Object.values(hindiQuestion.options).some((opt) => !opt)
//     );
//   };

//   const addNewQuestion = async () => {
//     try {
//       if (isEmpty()) {
//         toast.warning("Please fill up empty fields.");
//         return; // Prevent submission if fields are empty
//       }

//       const data = JSON.stringify(addQuestion);
//       console.log(addQuestion);

//       const config = {
//         method: "post",
//         maxBodyLength: Infinity,
//         url: "https://api-bef.hkdigiverse.com/question/add",
//         headers: {
//           Authorization: accessToken, // Ensure you have accessToken defined
//           "Content-Type": "application/json",
//         },
//         data: data,
//       };

//       const response = await axios.request(config);

//       if (response.status === 200) {
//         toast.success(response.data);
//         navigate("/subjectDetails");
//       } else {
//         console.error(response.message);

//         toast.error("Failed to add question");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("An error occurred while adding the question.");
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const urlSubtopics = `https://api-bef.hkdigiverse.com/sub-topic/all?page=1&limit=10`;
//       const urlSubjectName = `https://api-bef.hkdigiverse.com/subject/${subject._id}`;
//       let config = {
//         method: "get",
//         maxBodyLength: Infinity,
//         headers: {
//           Authorization: accessToken,
//           "Content-Type": "application/json",
//         },
//       };
//       const [response1, response2] = await Promise.all([
//         axios.get(urlSubtopics, config),
//         axios.get(urlSubjectName, config),
//       ]);

//       if (response1.status === 200 && response2.status === 200) {
//  console.log("Data from subtopic:", response1.data.data.sub_topic_data);
//         setSubtopics(response1.data.data.sub_topic_data);
//         // console.log(
//         //   "Data from subject:",
//         //   response2.data.data.question_data
//         // );
//         setSubjectname(response2.data.data);
//         // toast.success("Data fetched successfully!");
//       } else {
//         toast.error("Failed to fetch data from one or both endpoints.");
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       toast.error("An error occurred while fetching data.");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <section className=" bg-white dark:bg-gray-900 overflow-y-auto rounded-lg border-2 border-slate-300 font-sans">
//         <div className="py-8 px-4 space-y-2 lg:px-6">
//           <div className="space-y-4">
//             <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
//               add question
//             </p>
//             <p className="text-xl tracking-tight font-medium text-left text-slate-600 dark:text-white ">
//               Fill in the details below to create a new question.
//             </p>
//           </div>
//           <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
//             <div className="space-y-2" key="subject">
//               <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
//                 Subject
//               </label>
//               <SingleSelect
//                 label="Subject"
//                 value={selectedSubject}
//                 onChange={handleSubjectChange}
//                 options={subjectname}
//               />
//             </div>

//             <div className="space-y-2" key="subtopics">
//               <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
//                 Subtopics
//               </label>
//               <MultiSelection
//                 label="Subtopics"
//                 value={selectedSubtopic}
//                 onChange={handleSubtopicChange}
//                 options={subtopics}
//               />
//             </div>

//             <div className="space-y-2" key="question-bank">
//               <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
//                 Question bank
//               </label>
//               <MultiSelection
//                 label="Question bank"
//                 value={selectedSubtopic}
//                 onChange={handleSubtopicChange}
//                 options={subtopics}
//               />
//             </div>

//             <div className="space-y-3" key="type">
//               <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
//                 Type
//               </label>
//               <RadioButtons checkedValue={type} onChange={handleTypeChange} />
//             </div>
//           </div>

//           {/* question_type */}
//           <div className="p-4 md:flex sm:flex text-sm font-medium text-gray-900 space-x-6  text-start dark:text-white">
//             <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
//               Question Type :
//             </p>
//             {["normal", "statement", "pair"].map((option, index) => (
//               <div className="flex  items-center justify-start space-x-2">
//                 <input
//                   type="radio"
//                   key={index}
//                   id={`type ${option}`}
//                   value={option}
//                   name={option}
//                   checked={questionType === option}
//                   onChange={(e) => {
//                     setAddQuestion((prev) => ({
//                       ...prev,
//                       questionType: e.target.value,
//                     }));
//                     setQuestionType(e.target.value);
//                   }}
//                   className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600  dark:bg-gray-600 dark:border-gray-500"
//                 />
//                 <label
//                   htmlFor={`type ${option}`}
//                   className="w-full py-3 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
//                 >
//                   {option}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="px-4 py-2 space-y-6">
//           <div className="space-y-4">
//             {/* english */}
//             <div className="space-y-4">
//               <p className="text-2xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
//                 english question section
//               </p>
//               <div className="space-y-2">
//                 <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
//                   write question
//                 </p>
//                 {questionType === "pair" ? (
//                   <EnglishQuestionPairForm
//                     addQuestion={addQuestion}
//                     setAddQuestion={setAddQuestion}
//                     currentEngPair={currentEngPair}
//                     setCurrentEngPair={setCurrentEngPair}
//                     addPairQuestion={addPairQuestion}
//                     handleChange={handleChange}
//                     handleCheck={handleCheck}
//                     optionsArray1={optionsArray1}
//                     handlePairQuestionChange={handlePairQuestionChange}
//                     handleAddPair={handleAddPair}
//                   />
//                 ) : questionType === "statement" ? (
//                   <EnglishQueStatementBaseform
//                     addQuestion={addQuestion}
//                     setAddQuestion={setAddQuestion}
//                     currentStatement={currentEngStatement}
//                     setCurrentStatement={setCurrentEngStatement}
//                     handleChange={handleChange}
//                     handleCheck={handleCheck}
//                     optionsArray1={optionsArray1}
//                     handlePairQuestionChange={handleStatementQuestionChange}
//                     handleAddPair={addStatementQuestion}
//                   />
//                 ) : (
//                   <NormalquestionBaseForm
//                     addQuestion={addQuestion}
//                     setAddQuestion={setAddQuestion}
//                     handleChange={handleAddPair}
//                     handleCheck={handleCheck}
//                     optionsArray1={optionsArray1}
//                   />
//                 )}
//               </div>
//             </div>
//             {/* hindi */}
//             <div className="space-y-4">
//               <p className="text-2xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
//                 hindi question section
//               </p>
//               <div className="space-y-2">
//                 <div className="space-y-2">
//                   <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
//                     write question
//                   </p>
//                   {questionType === "pair" ? (
//                     <HindiQuestionPairForm
//                       addQuestion={addQuestion}
//                       setAddQuestion={setAddQuestion}
//                       currentHindiPair={currentHindiPair}
//                       setCurrentHindiPair={setCurrentHindiPair}
//                       addPairQuestion={addPairQuestion}
//                       handleChange={handleChange}
//                       handleCheck={handleCheck}
//                       optionsArray1={optionsArray1}
//                       handlePairQuestionChange={handlePairQuestionChange}
//                       handleAddPair={handleAddPair}
//                       // handleRemovePair={handleRemovePair}
//                     />
//                   ) : questionType === "statement" ? (
//                     <HindiQueStatementBaseform
//                       addQuestion={addQuestion}
//                       setAddQuestion={setAddQuestion}
//                       currentStatement={currentHindiStatement}
//                       setCurrentStatement={setCurrentHindiStatement}
//                       handleChange={handleChange}
//                       handleCheck={handleCheck}
//                       optionsArray1={optionsArray1}
//                       handlePairQuestionChange={handleStatementQuestionChange}
//                       handleAddPair={addStatementQuestion}
//                     />
//                   ) : (
//                     <NormalHindQueBaseForm
//                       addQuestion={addQuestion}
//                       setAddQuestion={setAddQuestion}
//                       handleChange={handleAddPair}
//                       handleCheck={handleCheck}
//                       optionsArray1={optionsArray1}
//                     />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center justify-center">
//             <button
//               onClick={addNewQuestion}
//               className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90  "
//             >
//               <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
//                 <VscSaveAs />
//               </svg>
//               <p className=" font-medium">save question</p>
//             </button>
//           </div>
//         </div>
//       </section>
//       <ToastContainer
//         draggable={false}
//         autoClose={2000}
//         position={"top-center"}
//         hideProgressBar={false}
//         newestOnTop={true}
//         closeOnClick={false}
//         theme="dark"
//       />
//     </>
//   );
// }

// export default AddQuestion;
import React, { useEffect, useState } from "react";
import MultiSelection from "../Ui/MultiSelection";
import { VscSaveAs } from "react-icons/vsc";
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

  // State Management
  const [type, setType] = useState("concept");
  const [questionType, setQuestionType] = useState("normal");
  const [selectedSubtopic, setSelectedSubtopic] = useState([]);
  const [subjectname, setSubjectname] = useState(subject.name);
  const [addQuestion, setAddQuestion] = useState({
    subjectId: subject._id,
    classesId: classId,
    subtopicIds: selectedSubtopic,
    type: "concept",
    questionType: "",
    englishQuestion: {
      question: "",
      answer: "",
      solution: "",
      options: { A: "", B: "", C: "", D: "" },
    },
    hindiQuestion: {
      question: "",
      answer: "",
      solution: "",
      options: { A: "", B: "", C: "", D: "" },
    },
  });

  const [subtopics, setSubtopics] = useState([]);
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

  // Event Handlers
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
    setAddQuestion((prev) => ({ ...prev, type: event.target.value }));
  };

  const handleSubjectChange = (event) => {
    const { value } = event.target;
    setAddQuestion((prev) => ({ ...prev, subjectId: value._id }));
  };

  const handleSubtopicChange = (event) => {
    const { value } = event.target;
    setAddQuestion((prev) => ({
      ...prev,
      subjectId: value._id,
    }));
    setSelectedSubtopic(value);
    // setSelectedSubject(value);
  };

  const [currentEngStatement, setCurrentEngStatement] = useState("");
  const [currentHindiStatement, setCurrentHindiStatement] = useState("");
  const [currentEngPair, setCurrentEngPair] = useState("");
  const [currentHindiPair, setCurrentHindiPair] = useState("");

  const addStatementQuestion = (language) => {
    const currentStatement =
      language === "english" ? currentEngStatement : currentHindiStatement;
    if (!currentStatement.trim()) {
      toast.error("Please enter a statement.");
      return;
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
    setAddQuestion((prev) => ({
      ...prev,
      [language]: {
        ...prev[language],
        pairQuestion: [
          ...prev[language].pairQuestion,
          { question: "", answer: "" },
        ],
      },
    }));
  };

  useEffect(() => {
    console.log("QUESTION", addQuestion);
  }, [addQuestion]);
  // Form Validation
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
    if (isEmpty()) {
      toast.warning("Please fill up empty fields.");
      return;
    }
    try {
      const response = await axios.post(
        "https://api-bef.hkdigiverse.com/question/add",
        addQuestion,
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Question added successfully!");
        navigate("/subjectDetails");
      } else {
        toast.error("Failed to add question");
      }
    } catch (error) {
      toast.error("An error occurred while adding the question.");
    }
  };

  // Fetching Data
  const fetchData = async () => {
    try {
      const urlSubtopics = `https://api-bef.hkdigiverse.com/sub-topic/all?page=1&limit=10`;
      const urlSubjectName = `https://api-bef.hkdigiverse.com/subject/${subject._id}`;
      const [response1, response2] = await Promise.all([
        axios.get(urlSubtopics, { headers: { Authorization: accessToken } }),
        axios.get(urlSubjectName, { headers: { Authorization: accessToken } }),
      ]);

      setSubtopics(response1.data.data.sub_topic_data);
      setSubjectname(response2.data.data);
    } catch (error) {
      toast.error("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg border-2 border-slate-300 font-sans">
      <div className="py-8 px-4 space-y-2 lg:px-6">
        <div className="space-y-4">
          <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
            Add Question
          </p>
          <p className="text-xl tracking-tight font-medium text-left text-slate-600 dark:text-white">
            Fill in the details below to create a new question.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
          <div className="space-y-2">
            <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
              Subject
            </label>
            <SingleSelect
              label="Subject"
              value={subjectname}
              onChange={handleSubjectChange}
              options={subjectname}
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
              Subtopic
            </label>
            <MultiSelection
              value={selectedSubtopic}
              onChange={handleSubtopicChange}
              options={subtopics}
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
              Question Type
            </label>
            <RadioButtons
              checkedValue={type} onChange={handleTypeChange}
            />
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

        {questionType === "pair" ? (
          <EnglishQuestionPairForm
            addQuestion={addQuestion}
            setAddQuestion={setAddQuestion}
            currentEngPair={currentEngPair}
            setCurrentEngPair={setCurrentEngPair}
            addPairQuestion={handleAddPair}
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
            handleAddStatement={addStatementQuestion}
          />
        ) : (
          <NormalquestionBaseForm
            addQuestion={addQuestion}
            setAddQuestion={setAddQuestion}
            handleChange={handleChange}
            handleCheck={handleCheck}
            optionsArray1={optionsArray1}
          />
        )}

        {questionType === "pair" ? (
          <HindiQuestionPairForm
            addQuestion={addQuestion}
            setAddQuestion={setAddQuestion}
            currentHindiPair={currentHindiPair}
            addPairQuestion={handleAddPair}
            handleChange={handleChange}
            handleCheck={handleCheck}
            optionsArray1={optionsArray1}
            handlePairQuestionChange={handlePairQuestionChange}
            handleAddPair={addStatementQuestion}
          />
        ) : questionType === "statement" ? (
          <HindiQueStatementBaseform
            addQuestion={addQuestion}
            setAddQuestion={setAddQuestion}
            currentStatement={currentHindiStatement}
            setCurrentStatement={setCurrentHindiStatement}
            handleChange={handleChange}
            handleCheck={handleCheck}
            optionsArray1={optionsArray1}
            handlePairQuestionChange={handleStatementQuestionChange}
            handleAddStatement={addStatementQuestion}
          />
        ) : (
          <NormalHindQueBaseForm
            addQuestion={addQuestion}
            setAddQuestion={setAddQuestion}
            handleChange={handleChange}
            handleCheck={handleCheck}
            optionsArray1={optionsArray1}
          />
        )}

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={addNewQuestion}
            className="inline-flex items-center py-2 px-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
          >
            <VscSaveAs className="mr-2" />
            Save Question
          </button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default AddQuestion;
