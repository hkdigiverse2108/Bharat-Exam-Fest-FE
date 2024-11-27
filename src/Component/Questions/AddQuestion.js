import React, { useEffect, useMemo, useState } from "react";
import MultiSelection from "../Ui/MultiSelection";
import { VscSaveAs } from "react-icons/vsc";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SingleSelect from "../Ui/SingleSelect";
import RadioButtons from "../Ui/RadioButtons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HindiQuestionPairForm from "./QuestionType/Add/HindiQuestionBase/HindiQuestionPairForm";
import EnglishQuestionPairForm from "./QuestionType/Add/EnglishQuestionBase/EnglishQuestionPairForm";
import EnglishQueStatementBaseform from "./QuestionType/Add/EnglishQuestionBase/EnglishQueStatmentBaseform";
import NormalquestionBaseForm from "./QuestionType/Add/EnglishQuestionBase/NormalQuestionBaseForm";
import NormalHindQueBaseForm from "./QuestionType/Add/HindiQuestionBase/NormalHindQueBaseForm";
import HindiQueStatementBaseform from "./QuestionType/Add/HindiQuestionBase/HindiQueStatementBaseform";

function AddQuestion() {
  const navigate = useNavigate();
  const classId = useSelector((state) => state.authConfig.userInfo[0].data._id);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );
  const subject = useSelector((state) => state.userConfig.CurrentSubject);
  // console.log(subject);

  // State Management
  const [type, setType] = useState("concept");
  const [questionType, setQuestionType] = useState("normal");
  const memoizedQuestionType = useMemo(() => questionType, [questionType]);
  const [selectedSubtopic, setSelectedSubtopic] = useState([]);
  const [subjectname, setSubjectname] = useState([]);
  const [addQuestion, setAddQuestion] = useState({
    subjectId: subject._id,
    classesId: classId,
    subtopicIds: [],
    type: "concept",
    questionType: "",
    englishQuestion: {
      question: "",
      answer: "",
      solution: "",
      options: { A: "", B: "", C: "", D: "" },
      statementQuestion: [],
      pairQuestion: [],
      lastQuestion: "",
    },
    hindiQuestion: {
      question: "",
      answer: "",
      solution: "",
      options: { A: "", B: "", C: "", D: "" },
      statementQuestion: [],
      pairQuestion: [],
      lastQuestion: "",
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
    const [lang, field, option] = name.split("."); // Split the name to get the language, field, and option

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
            [field]: value, // Update the field (solution in this case)
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

  const handleCheck = (language, event) => {
    const selectedValue = event.target.value;

    // Update the options state
    setOptions((prev) => {
      const newOptions = { ...prev };

      // Ensure options exist for the given language
      if (!newOptions[language]) {
        newOptions[language] = { A: false, B: false, C: false, D: false };
      }

      // Set all options to false and mark the selected one as true
      Object.keys(newOptions[language]).forEach((key) => {
        newOptions[language][key] = key === selectedValue;
      });

      return newOptions;
    });

    // Update the selected answer in addQuestion state
    setAddQuestion((prev) => ({
      ...prev,
      [language]: {
        ...prev[language],
        answer: selectedValue, // Save the selected value as the answer
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

    const uniqueValues = Array.from(new Set(value.map((item) => item._id)));
    setSelectedSubtopic(value);
    setAddQuestion((prev) => ({
      ...prev,
      subtopicIds: uniqueValues,
    }));
    // const selectedId = value[0]?._id;
    // // Check if the subtopicId already exists in the array
    // const isSelected = addQuestion.subtopicIds.includes(selectedId);

    // // If it's selected, remove it, otherwise add it
    // const subtopicIds = isSelected
    //   ? addQuestion.subtopicIds.filter((id) => id !== selectedId) // Remove from subtopicIds
    //   : [...addQuestion.subtopicIds, selectedId];

    // setAddQuestion((prev) => ({
    //   ...prev,
    //   subtopicIds: subtopicIds,
    // }));

    // const updatedSelectedSubtopics = isSelected
    //   ? value.filter((subtopic) => subtopic._id !== selectedId) // Remove from selectedSubtopic
    //   : [...selectedSubtopic, value[0]]; // Add to selectedSubtopic
    // setSelectedSubtopic(updatedSelectedSubtopics);
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

  const handleStatementQuestionChange = (event) => {
    const { name, value } = event.target;
    const [lang, field, option] = name.split(".");
    const currentQuestionType = addQuestion.questionType;

    if (currentQuestionType === "pair") {
      const updatedPairQuestions = [value];

      setAddQuestion((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: updatedPairQuestions,
          lastQuestion: value,
        },
      }));
    } else if (currentQuestionType === "statement") {
      // Logic for handling normal statement questions
      const updatedStatements = [...addQuestion[lang].statements, value];

      setAddQuestion((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: updatedStatements,
          lastQuestion: value,
        },
      }));
    }
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

  const [inputs, setInputs] = useState({
    input1: "",
    input2: "",
  });

  // Handle input change for both input1 and input2
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleAddPair = (language) => {
    if (inputs.input1.trim() !== "" && inputs.input2.trim() !== "") {
      const combinedValue = `${inputs.input1} - ${inputs.input2}`;
      console.log(combinedValue);
      setAddQuestion((prev) => ({
        ...prev,
        [language]: {
          ...prev[language],
          pairQuestion: [...prev[language].pairQuestion, combinedValue],
        },
      }));
      setInputs({
        input1: "",
        input2: "",
      });
    } else {
      toast.warn("Fillup empty space!");
    }
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
              label="Subtopics"
              value={selectedSubtopic}
              onChange={handleSubtopicChange}
              options={subtopics}
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium text-gray-900 text-start capitalize text-md dark:text-white">
              Question Type
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
                checked={memoizedQuestionType === option}
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
            handleStatementQuestionChange={handleStatementQuestionChange}
            inputs={inputs} // Pass inputs as prop
            handleInputChange={handleInputChange}
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
            handleStatementQuestionChange={handleStatementQuestionChange}
            handleAddPair={handleAddPair}
            inputs={inputs} // Pass inputs as prop
            handleInputChange={handleInputChange}
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
      <ToastContainer
        draggable={false}
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        theme="dark"
      />
    </section>
  );
}

export default AddQuestion;
