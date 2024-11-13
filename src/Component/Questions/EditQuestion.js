import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdStar } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import axios from "axios";
import MultipleSelect from "../Ui/MultiSelection";
import SingleSelect from "../Ui/SingleSelect";
import RadioButtons from "../Ui/RadioButtons";

function EditQuestion() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const [editQuestion, setEditQuestion] = useState(state);

  const [type, setType] = useState("");
  const [questionType, setQuestionType] = useState("normal");
  const [subtopics, setSubtopics] = useState([]);
  const [classNames, setClassNames] = useState([]);

  const [selectedClass, setSelectedClass] = useState([]);
  const [subTopicName, setSubTopicName] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState([]);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  const [options, setOptions] = useState({
    english: { A: false, B: false, C: false, D: false },
    hindi: { A: false, B: false, C: false, D: false },
  });
  const optionsArray1 = Object.keys(options.english).map((key) => ({
    label: `Option ${key}`,
    value: key,
    checked: options.english[key],
  }));
  const optionsArray2 = Object.keys(options.hindi).map((key) => ({
    label: `Option ${key}`,
    value: key,
    checked: options.hindi[key],
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
  };

  useEffect(() => {
    console.log("edit", editQuestion);
  }, [editQuestion]);

  const handleTypeChange = (event) => {
    const { value } = event.target;

    setType(event.target.value);
    setEditQuestion((prev) => ({
      ...prev,
      type: value,
    }));
  };

  const handleClassChange = (event) => {
    const { value } = event.target;
    const selectedClass = classNames.find(
      (classItem) => classItem.name === value
    );
    setSelectedClass(value);
    setEditQuestion((prev) => ({
      ...prev,
      classesId: selectedClass?._id,
    }));
  };

  const handleSubtopicChange = (event) => {
    const { value } = event.target;
    const dataId = value.map((res) => res?._id);
    setSubTopicName(dataId);
    setSelectedSubtopic(value);
    setEditQuestion((prev) => ({
      ...prev,
      subtopicIds: dataId,
    }));
  };

  // const handleChange = (event) => {
  //   const { name, value } = event.target;

  //   if (name.startsWith("englishQuestion.")) {
  //     const fieldName = name.split(".")[1];
  //     if (fieldName === "options") {
  //       const optionKey = name.split(".")[2];
  //       setEditQuestion((prev) => ({
  //         ...prev,
  //         englishQuestion: {
  //           ...prev.englishQuestion,
  //           options: {
  //             ...prev.englishQuestion.options,
  //             [optionKey]: value,
  //           },
  //         },
  //       }));
  //     } else {
  //       setEditQuestion((prev) => ({
  //         ...prev,
  //         englishQuestion: {
  //           ...prev.englishQuestion,
  //           [fieldName]: value,
  //         },
  //       }));
  //     }
  //   } else if (name.startsWith("hindiQuestion.")) {
  //     const fieldName = name.split(".")[1];
  //     if (fieldName === "options") {
  //       const optionKey = name.split(".")[2];
  //       setEditQuestion((prev) => ({
  //         ...prev,
  //         hindiQuestion: {
  //           ...prev.hindiQuestion,
  //           options: {
  //             ...prev.hindiQuestion.options,
  //             [optionKey]: value,
  //           },
  //         },
  //       }));
  //     } else {
  //       setEditQuestion((prev) => ({
  //         ...prev,
  //         hindiQuestion: {
  //           ...prev.hindiQuestion,
  //           [fieldName]: value,
  //         },
  //       }));
  //     }
  //   } else {
  //     // Update the type field directly
  //     setEditQuestion((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }));
  //   }
  // };

  const [statement, setStatement] = useState([]);
  const [inputValue, setInputValue] = useState("");

  function handleAddValue(e) {
    const { value } = e.target;
    if (value !== "") {
      setInputValue(value);
    }
  }

  function AddStatement() {
    setStatement([...statement, inputValue]);
    setInputValue("");
  }

  // const [editQuestion, setEditQuestion] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");

    // Update nested state
    setEditQuestion((prev) => {
      const newState = { ...prev };
      let temp = newState;

      // Traverse the keys to set the value
      keys.forEach((key, index) => {
        if (index === keys.length - 1) {
          temp[key] = value;
        } else {
          temp = temp[key];
        }
      });

      return newState;
    });
  };

  const handleOptionChange = (e, optionType) => {
    const { value } = e.target;
    setEditQuestion((prev) => ({
      ...prev,
      [optionType]: {
        ...prev[optionType],
        answer: value,
      },
    }));
  };

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

        axios
          .request(config)
          .then((response) => {
            if (response.status === 200) {
              console.log("success", response.data);
              console.log("msg", response.message);
              // navigate("/classes");
              // toast.success(response.message);
            } else {
              console.log("failed", response);
              console.log("msg", response.message);

              // toast.error(response.message);
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

  const fetchClassname = async () => {
    try {
      const response = await axios.get(
        "https://api-bef.hkdigiverse.com/question/all?page=1&limit=10",
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      // console.log(response.data.data.question_data);

      const classes = response.data.data.question_data.map(
        (question) => question.classes
      );

      const uniqueData = classes.reduce((acc, current) => {
        const exist = acc.find((item) => item._id === current._id);
        if (!exist) {
          acc.push(current);
        }
        return acc;
      }, []);
      const existSubtopic = classes
        .filter((item) => item.includes(item._id))
        .map((item) => item);

      // console.log(response.data.data.sub_topic_data);
      console.log("filter", existSubtopic);
      setClassNames(uniqueData);
      //   console.log(uniqueData);
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
      const subtopic = response.data.data.sub_topic_data.map(
        (question) => question.sub_topic_data
      );
      const uniqueData = subtopic.reduce((acc, current) => {
        const exist = acc.find((item) => item.name === current.name);
        if (!exist) {
          acc.push(current);
        }
        return acc;
      }, []);
      const existSubtopic = response.data.data.sub_topic_data
        .filter((item) => editQuestion.subtopicIds.includes(item._id))
        .map((item) => item);

      // console.log(response.data.data.sub_topic_data);
      // console.log("filter", existSubtopic);
      setSubtopics(uniqueData);
      setSelectedSubtopic(existSubtopic);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchClassname();
    fetchSubtopics();
    console.log("edit", state);
  }, []);

  function handleAddValue(e) {
    const { value } = e.target;
    if (value !== "") {
      setInputValue(value);
    }
  }

  function AddStatement() {
    setStatement([...statement, inputValue]);
    setInputValue("");
  }


  // useEffect(() => {

  // }, []);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 overflow-y-auto rounded-lg border-2 border-slate-300 font-sans">
        <div className="py-8 px-4 space-y-2 lg:px-6">
          <div className="space-y-4">
            <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              Edit question
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2  lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
            <div>
              <label className=" text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                Classes
              </label>
              <SingleSelect
                label="Class"
                value={selectedClass}
                onChange={handleClassChange}
                options={classNames}
              />
            </div>
            <div>
              <label className=" text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                Subtopics
              </label>
              <MultipleSelect
                label="Subtopics"
                value={selectedSubtopic}
                onChange={handleSubtopicChange}
                options={subtopics}
              />
            </div>
            <div>
              <label className=" text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                Question bank
              </label>
              <MultipleSelect
                label="Subtopics"
                value={selectedSubtopic}
                onChange={handleSubtopicChange}
                options={subtopics}
              />
            </div>

            <div className="space-y-3">
              <label className=" text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                Type
              </label>
              <RadioButtons onChange={handleTypeChange} />
            </div>
          </div>
          {/* English Question Section */}
          <div className="space-y-4">
            <p className="text-2xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              English Question Section
            </p>
            <input
              type="text"
              placeholder="Question"
              name="englishQuestion.question"
              value={editQuestion.englishQuestion.question}
              onChange={handleChange}
              className="block w-full p-2 border rounded-lg"
            />
            <div className="flex space-x-3">
              {["A", "B", "C", "D"].map((option) => (
                <div key={option} className="w-1/4">
                  <label className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                    Option - {option}
                    <MdStar className="text-orange-400 h-3 w-3" />
                  </label>
                  <input
                    type="text"
                    name={`englishQuestion.options.${option}`}
                    value={editQuestion.englishQuestion.options[option]}
                    onChange={handleChange}
                    className="block w-full p-2 border rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                Answer
              </label>
              <div className="flex space-x-3">
                {["A", "B", "C", "D"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      value={option}
                      checked={editQuestion.englishQuestion.answer === option}
                      onChange={(e) => handleOptionChange(e, "englishQuestion")}
                      className="w-4 h-4 text-blue-600 border-gray-300"
                    />
                    <label className="ml-2">{`Option ${option}`}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                Solution
              </label>
              <textarea
                rows="4"
                name="englishQuestion.solution"
                value={editQuestion.englishQuestion.solution}
                onChange={handleChange}
                className="block w-full p-2 border rounded-lg"
                placeholder="Your solution..."
              />
            </div>
          </div>
          {/* Hindi Question Section */}
          <div className="space-y-4">
            <p className="text-2xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              Hindi Question Section
            </p>
            <input
              type="text"
              placeholder="Question"
              name="hindiQuestion.question"
              value={editQuestion.hindiQuestion.question}
              onChange={handleChange}
              className="block w-full p-2 border rounded-lg"
            />
            <div className="flex space-x-3">
              {["A", "B", "C", "D"].map((option) => (
                <div key={option} className="w-1/4">
                  <label className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                    Option - {option}
                    <MdStar className="text-orange-400 h-3 w-3" />
                  </label>
                  <input
                    type="text"
                    name={`hindiQuestion.options.${option}`}
                    value={editQuestion.hindiQuestion.options[option]}
                    onChange={handleChange}
                    className="block w-full p-2 border rounded-lg"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                Answer
              </label>
              <div className="flex space-x-3">
                {["A", "B", "C", "D"].map((option) => (
                  <div key={option} className="flex items-center">
                    <input
                      type="radio"
                      value={option}
                      checked={editQuestion.hindiQuestion.answer === option}
                      onChange={(e) => handleOptionChange(e, "hindiQuestion")}
                      className="w-4 h-4 text-blue-600 border-gray-300"
                    />
                    <label className="ml-2">{`Option ${option}`}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                Solution
              </label>
              <textarea
                rows="4"
                name="hindiQuestion.solution"
                value={editQuestion.hindiQuestion.solution}
                onChange={handleChange}
                className="block w-full p-2border rounded-lg"
                placeholder="Your solution..."
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              onClick={EditQuestion}
              className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90"
            >
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <VscSaveAs />
              </svg>
              <p className="font-medium">Save Question</p>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditQuestion;
