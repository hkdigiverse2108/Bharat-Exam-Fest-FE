import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdStar } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import SingleSelect from "../Ui/SingleSelect";
import RadioButtons from "../Ui/RadioButtons";
import HindiQuestionPairForm from "./QuestionType/Edit/HindiQuestionBase/HindiQuestionPairForm";
import EnglishQuestionPairForm from "./QuestionType/Edit/EnglishQuestionBase/EnglishQuestionPairForm";
import EnglishQueStatementBaseform from "./QuestionType/Edit/EnglishQuestionBase/EnglishQueStatmentBaseform";
import NormalquestionBaseForm from "./QuestionType/Edit/EnglishQuestionBase/NormalQuestionBaseForm";
import NormalHindQueBaseForm from "./QuestionType/Edit/HindiQuestionBase/NormalHindQueBaseForm";
import HindiQueStatementBaseform from "./QuestionType/Edit/HindiQuestionBase/HindiQueStatementBaseform";
import MultipleSelect from "../Ui/MultiSelection";

function EditQuestion() {
  const navigate = useNavigate();
  const classId = useSelector((state) => state.authConfig.userInfo[0].data._id);
  const subject = useSelector((state) => state.userConfig.CurrentQue[0]);

  const [editQuestion, setEditQuestion] = useState({
    questionId: "",
    subjectId: "",
    classesId: "",
    subtopicIds: [],
    questionBank: "",
    type: "",
    questionType: "",
    englishQuestion: {
      question: "",
      options: { A: "", B: "", C: "", D: "" },
      answer: "",
      solution: "",
      statementQuestion: [],
      pairQuestion: [],
      lastQuestion: "",
    },
    hindiQuestion: {
      question: "",
      options: { A: "", B: "", C: "", D: "" },
      answer: "",
      solution: "",
      statementQuestion: [],
      pairQuestion: [],
      lastQuestion: "",
    },
  });

  // const memoizedQuestionType = useMemo(() => questionType, [questionType]);

  const [type, setType] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [subTopicName, setSubTopicName] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjectname, setSubjectname] = useState([]);

  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );
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
        setEditQuestion((prev) => ({
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
        setEditQuestion((prev) => ({
          ...prev,
          [lang]: {
            ...prev[lang],
            [field]: value, // Update the field (solution in this case)
          },
        }));
      }
    } else {
      setEditQuestion((prev) => ({
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

    // Update the selected answer in editQuestion state
    setEditQuestion((prev) => ({
      ...prev,
      [language]: {
        ...prev[language],
        answer: selectedValue, // Save the selected value as the answer
      },
    }));
  };

  const handleTypeChange = (event) => {
    setEditQuestion((prev) => ({ ...prev, type: event.target.value }));
  };

  const handleSubjectChange = (event) => {
    const { value } = event.target;
    setEditQuestion((prev) => ({ ...prev, subjectId: value._id }));
  };

  const handleSubtopicChange = (event) => {
    const { value } = event.target;

    const uniqueValues = Array.from(new Set(value.map((item) => item._id)));
    setSelectedSubtopic(value);
    setEditQuestion((prev) => ({
      ...prev,
      subtopicIds: uniqueValues,
    }));
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

    setEditQuestion((prev) => ({
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
    const currentQuestionType = editQuestion.questionType;

    if (currentQuestionType === "pair") {
      const updatedPairQuestions = [value];

      setEditQuestion((prev) => ({
        ...prev,
        [lang]: {
          ...prev[lang],
          [field]: updatedPairQuestions,
          lastQuestion: value,
        },
      }));
    } else if (currentQuestionType === "statement") {
      // Logic for handling normal statement questions
      const updatedStatements = [...editQuestion[lang].statements, value];

      setEditQuestion((prev) => ({
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
    const updatedPairQuestion = [...editQuestion[language].pairQuestion];
    updatedPairQuestion[index] = {
      ...updatedPairQuestion[index],
      [field]: value,
    };
    setEditQuestion({
      ...editQuestion,
      [language]: {
        ...editQuestion[language],
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
      setEditQuestion((prev) => ({
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
    console.log("EDIT", editQuestion);
  }, [editQuestion]);

  const isEmpty = () => {
    if (
      !editQuestion.subjectId ||
      !editQuestion.classesId ||
      editQuestion.subtopicIds.length === 0 ||
      !editQuestion.type ||
      !editQuestion.questionType ||
      !editQuestion.englishQuestion.question ||
      !editQuestion.englishQuestion.answer ||
      !editQuestion.englishQuestion.solution ||
      !editQuestion.hindiQuestion.question ||
      !editQuestion.hindiQuestion.answer ||
      !editQuestion.hindiQuestion.solution
    ) {
      return true;
    }

    const englishOptions = editQuestion.englishQuestion.options;
    const hindiOptions = editQuestion.hindiQuestion.options;

    if (
      !englishOptions.A ||
      !englishOptions.B ||
      !englishOptions.C ||
      !englishOptions.D ||
      !hindiOptions.A ||
      !hindiOptions.B ||
      !hindiOptions.C ||
      !hindiOptions.D
    ) {
      return true;
    }

    return false;
  };

  const EditQuestion = async () => {
    try {
      if (isEmpty()) {
        toast.warning("Please fill up empty fields.");
      } else {
        let data = JSON.stringify(editQuestion);
        console.log(editQuestion);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/question/edit",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          data: data,
        };

        const response = await axios.request(config);

        if (response.status === 200) {
          toast.success(response.data);
          console.log("success", response.data);
          navigate("/subjectDetails");
        } else {
          console.log("failed", response);
          console.log("msg", response.message);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  // const fetchSubjectname = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api-bef.hkdigiverse.com/subject/${subject.subjectId}`,
  //       {
  //         headers: {
  //           Authorization: accessToken,
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     console.log(response.data.data);

  //     setSubjectname(response.data.data);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
  // const fetchSubtopics = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api-bef.hkdigiverse.com/sub-topic/all?page=1&limit=10",
  //       {
  //         headers: {
  //           Authorization: accessToken,
  //           Accept: "application/json",
  //         },
  //       }
  //     );
  //     const Subtopics = response.data.data.sub_topic_data.map(
  //       (question) => question
  //     );

  //     const uniqueData = Subtopics.reduce((acc, current) => {
  //       const exist = acc.find((item) => item._id === current._id);
  //       if (!exist) {
  //         acc.push(current);
  //       }
  //       return acc;
  //     }, []);

  //     const existSubtopic = editQuestion.subtopicIds.map((id) => {
  //       const found = uniqueData.find((item) => item._id === id);
  //       return found;
  //     });

  //     setSubtopics(uniqueData);
  //     setSelectedSubtopic(existSubtopic);

  //     // console.log(response.data.data.sub_topic_data);
  //     // console.log("filter", existSubtopic);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const fetchData = async () => {
    try {
      const urlSubtopics = `https://api-bef.hkdigiverse.com/sub-topic/all?page=1&limit=10`;
      const urlSubjectName = `https://api-bef.hkdigiverse.com/subject/${subject.subjectId}`;
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
        const filteredData = response1.data.data.sub_topic_data.filter((item) =>
          subject.subtopicIds.includes(item._id)
        );
        setSelectedSubtopic(filteredData);
        // console.log(
        //   "Data from subject:",
        //   response2.data.data.question_data
        // );
        setSubjectname(response2.data.data);
        setSelectedSubject(response2.data.data.name);
        // toast.success("Data fetched successfully!");
      } else {
        toast.error("Failed to fetch data from one or both endpoints.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      console.log("An error occurred while fetching data.");
    }
  };
  useEffect(() => {
    // Ensure the options are defined before proceeding
    const englishOptions = editQuestion.englishQuestion.options || {};
    const hindiOptions = editQuestion.hindiQuestion.options || {};

    // Copy the existing options structure
    const newOptions = { ...options };

    // Loop through the English options and update based on the selected answer
    Object.keys(englishOptions).forEach((key) => {
      newOptions.englishQuestion[key] =
        editQuestion.englishQuestion.answer === key;
    });

    // Loop through the Hindi options and update based on the selected answer
    Object.keys(hindiOptions).forEach((key) => {
      newOptions.hindiQuestion[key] = editQuestion.hindiQuestion.answer === key;
    });

    // Update the options state
    setOptions({
      englishQuestion: { ...newOptions.englishQuestion },
      hindiQuestion: { ...newOptions.hindiQuestion },
    });
  }, [
    editQuestion.englishQuestion.answer,
    editQuestion.englishQuestion.options,
    editQuestion.hindiQuestion.answer,
    editQuestion.hindiQuestion.options,
    options,
  ]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Check if responseData exists and auto-fill the state
    if (subject) {
      // Auto-fill the 'type' and 'questionType' from subject
      setType(subject.type || "");
      setQuestionType(subject.questionType || "");

      // Assuming the 'subtopicIds' field contains the list of subtopic IDs
      // You can fill `subTopicName` based on the available subtopic names or IDs.
      setSubTopicName(subject.subtopicIds || []);
      setSelectedSubtopic(subject.subtopicIds || []);

      // For the subject name, assuming it's the 'subjectId' or a name field
      setSelectedSubject(subject.subjectId || "");

      // Assuming 'subjectname' contains a list of names or objects, here we set it accordingly
      // (Modify this based on the actual structure of the response data)
      setSubjectname(subject._id); // Just a placeholder example
    }
  }, [subject]);

  useEffect(() => {
    if (subject) {
      setEditQuestion({
        questionId: subject._id,
        subjectId: subject.subjectId,
        classesId: subject.classesId,
        subtopicIds: subject.subtopicIds,
        questionBank: subject.questionBank,
        type: subject.type,
        questionType: subject.questionType,
        englishQuestion: {
          question: subject.englishQuestion.question,
          options: subject.englishQuestion.options,
          answer: subject.englishQuestion.answer,
          solution: subject.englishQuestion.solution,
          statementQuestion: subject.englishQuestion.statementQuestion,
          pairQuestion: subject.englishQuestion.pairQuestion || [],
          lastQuestion: subject.englishQuestion.lastQuestion,
        },
        hindiQuestion: {
          question: subject.hindiQuestion.question,
          options: subject.hindiQuestion.options,
          answer: subject.hindiQuestion.answer,
          solution: subject.hindiQuestion.solution,
          statementQuestion: subject.hindiQuestion.statementQuestion,
          pairQuestion: subject.hindiQuestion.pairQuestion || [],
          lastQuestion: subject.hindiQuestion.lastQuestion,
        },
      });
      console.log(subject);
    }
  }, [subject]);

  // useEffect(() => {
  //   const getContestData = async () => {
  //     try {
  //       const data = await fetchContestData(tokenFromRedux);
  //       setContesTypeData(data);
  //     } catch (err) {
  //       console.error(
  //         err || "An error occurred while fetching the contest data"
  //       );
  //     }
  //   };

  //   getContestData(); // Call the function to fetch data
  // }, [tokenFromRedux]);

  // useEffect(() => {
  //   if (contestFromRedux) {
  //     setContestData({
  //       name: contestFromRedux.name,
  //       contestTypeId: contestFromRedux.type,
  //       startDate: contestFromRedux.startDate,
  //       endDate: contestFromRedux.endDate,
  //       totalSpots: contestFromRedux.totalSpots,
  //       fees: contestFromRedux.fees,
  //       winningAmountPerFee: contestFromRedux.winningAmountPerFee,
  //       winnerPercentage: contestFromRedux.winnerPercentage,
  //       ranks: contestFromRedux.ranks.map((rank) => ({
  //         startPlace: rank.startPlace || "", // Map place to startPlace
  //         endPlace: rank.endPlace || "", // Initialize endPlace
  //         price: rank.price || 0, // Initialize price
  //       })),
  //       totalQuestions: contestFromRedux.totalQuestions,
  //       totalTime: contestFromRedux.totalTime,
  //       totalMarks: contestFromRedux.totalMarks,
  //       classesId: contestFromRedux.classesId,
  //     });
  //     setSelectedValues([contestFromRedux.classesId]);
  //     // selectedContestType(contestFromRedux.contestTypeId);
  //     const combinedDate = getCombinedDate(contestFromRedux);
  //     setDateRange(combinedDate);
  //   }
  //   console.log(contestData);
  // }, [contestFromRedux]);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 rounded-lg border-2 border-slate-300 font-sans">
        <div className="py-8 px-4 space-y-2 lg:px-6">
          <div className="space-y-4">
            <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              Edit Question
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
              <MultipleSelect
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
              <div
                className="flex items-center justify-start space-x-2"
                key={index}
              >
                <input
                  type="radio"
                  id={`type-${option}`}
                  value={option}
                  name="questionType"
                  checked={editQuestion.questionType === option} // Set checked based on the current questionType
                  onChange={(e) => {
                    setEditQuestion((prev) => ({
                      ...prev,
                      questionType: e.target.value, // Update questionType in the state
                    }));
                    setQuestionType(e.target.value); // If you also want to update this state
                  }}
                  className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor={`type-${option}`}
                  className="w-full py-3 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>

          {questionType === "pair" ? (
            <EnglishQuestionPairForm
              editQuestion={editQuestion}
              setEditQuestion={setEditQuestion}
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
              editQuestion={editQuestion}
              setEditQuestion={setEditQuestion}
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
              editQuestion={editQuestion}
              setEditQuestion={setEditQuestion}
              handleChange={handleChange}
              handleCheck={handleCheck}
              optionsArray1={optionsArray1}
            />
          )}

          {questionType === "pair" ? (
            <HindiQuestionPairForm
              editQuestion={editQuestion}
              setEditQuestion={setEditQuestion}
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
              editQuestion={editQuestion}
              setEditQuestion={setEditQuestion}
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
              editQuestion={editQuestion}
              setEditQuestion={setEditQuestion}
              handleChange={handleChange}
              handleCheck={handleCheck}
              optionsArray1={optionsArray1}
            />
          )}

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={EditQuestion}
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
    </>
  );
}

export default EditQuestion;
