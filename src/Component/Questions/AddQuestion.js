import React, { useState } from "react";
import MultiSelection from "../Ui/MultiSelection";
import { MdStar } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddQuestion() {
  const navigate = useNavigate();
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  const [type, setType] = useState("Normal");
  const [option, setOption] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
  });

  const [addQuestion, setAddQuestion] = useState({
    type: type,
    englishQuestion: {
      question: "string",
      options: {
        A: "string",
        B: "string",
        C: "string",
        D: "string",
      },
      answer: "string",
      solution: "string",
    },
    hindiQuestion: {
      question: "string",
      options: {
        A: "string",
        B: "string",
        C: "string",
        D: "string",
      },
      answer: "string",
      solution: "string",
    },
  });

  // console.log(addQuestion);

  const handleCheck = (event) => {
    const { value } = event.target;

    setOption({
      A: false,
      B: false,
      C: false,
      D: false,
      [value]: true,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name.startsWith("englishQuestion.")) {
      const fieldName = name.split(".")[1]; // Get the field name after 'englishQuestion.'
      if (fieldName === "options") {
        const optionKey = name.split(".")[2]; // Get the option key (A, B, C, D)
        setAddQuestion((prev) => ({
          ...prev,
          englishQuestion: {
            ...prev.englishQuestion,
            options: {
              ...prev.englishQuestion.options,
              [optionKey]: value,
            },
          },
        }));
      } else {
        setAddQuestion((prev) => ({
          ...prev,
          englishQuestion: {
            ...prev.englishQuestion,
            [fieldName]: value,
          },
        }));
      }
    } else if (name.startsWith("hindiQuestion.")) {
      const fieldName = name.split(".")[1]; // Get the field name after 'hindiQuestion.'
      if (fieldName === "options") {
        const optionKey = name.split(".")[2]; // Get the option key (A, B, C, D)
        setAddQuestion((prev) => ({
          ...prev,
          hindiQuestion: {
            ...prev.hindiQuestion,
            options: {
              ...prev.hindiQuestion.options,
              [optionKey]: value,
            },
          },
        }));
      } else {
        setAddQuestion((prev) => ({
          ...prev,
          hindiQuestion: {
            ...prev.hindiQuestion,
            [fieldName]: value,
          },
        }));
      }
    } else {
      // Update the type field directly
      setAddQuestion((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

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

  const addNewQuestion = async () => {
    try {
      if (!addQuestion.type) {
        toast.warning("Fill up empty space");
      } else {
        let data = JSON.stringify(addQuestion);
        console.log(addQuestion);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/question/add",
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
              // navigate("/classes");
              // toast.success(response.message);
            } else {
              console.log("failed", response);
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
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2  lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
            <MultiSelection />
          </div>
          <div className="p-4 md:flex sm:flex text-sm font-medium text-gray-900 space-x-6  text-start dark:text-white">
            <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
              Question Type :
            </p>
            <div className="flex  items-center justify-start space-x-2">
              <input
                id="normal"
                type="radio"
                name="list-radio"
                value="Normal"
                onChange={(e) => handleChange(e)}
                checked={type === "Normal"}
                className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600  dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="normal"
                className="w-full py-3 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
              >
                normal
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="statement"
                type="radio"
                name="list-radio"
                value="Statement"
                onChange={(e) => handleChange(e)}
                checked={type === "Statement"}
                className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="statement"
                className="w-full py-3 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
              >
                statement
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="pair"
                type="radio"
                name="list-radio"
                value="Pair"
                onChange={(e) => handleChange(e)}
                checked={type === "Pair"}
                className="w-4 h-4 text-orange-600 bg-orange-600 border border-orange-600 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="pair"
                className="w-full py-3 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
              >
                pair
              </label>
            </div>
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
                <div className="space-y-2">
                  <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                    write question
                  </p>
                  {type === "Pair" ? (
                    <div className="duration-300 space-y-2">
                      <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                        React, also known as ReactJS, is a popular and powerful
                        JavaScript library used for building dynamic and
                        interactive user interfaces, primarily for single-page
                        applications (SPAs). It was developed and maintained by
                        Facebook and has gained significant popularity due to
                        its efficient rendering techniques, reusable components,
                        and active community support. In this article, we will
                        explore React Introduction, what React is, its key
                        features, benefits, and why it’s a great choice for
                        modern web development.
                      </div>
                      <div className="flex items-center justify-end w-full">
                        <button
                          onClick={AddStatement}
                          className="inline-flex items-center space-x-2 rounded-lg p-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
                        >
                          <svg
                            className="font-bold text-white w-4 h-4"
                            viewBox="0 0 16 16"
                          >
                            <FaPlus />
                          </svg>
                          <p className=" font-semibold">Add Pair</p>
                        </button>
                      </div>
                      <div className="">
                        <input
                          className=" border-2 pl-10 border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Add"
                          onChange={(e) => handleAddValue(e)}
                        />
                      </div>
                      <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 ">
                        {statement.map(function (item, index) {
                          return (
                            <div
                              key={index}
                              className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner"
                            >
                              {item}
                            </div>
                          );
                        })}
                        <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces.
                        </div>
                        <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces.
                        </div>
                        <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces.
                        </div>
                        <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces.
                        </div>
                      </div>
                      {/* options */}
                      <div className=" p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          options
                        </p>
                        <div className="flex flex-row items-center  space-x-3">
                          <div className="w-1/4">
                            <label
                              htmlFor="q1"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              a- option
                              <MdStar className="text-orange-400  h-3 w-3 " />
                            </label>
                            <input
                              type="text"
                              name="q1"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                          <div className="w-1/4">
                            <label
                              htmlFor="q2"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              b- option
                              <MdStar className="text-orange-400 h-3 w-3" />
                            </label>
                            <input
                              type="text"
                              name="q2"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                          <div className="w-1/4">
                            <label
                              htmlFor="q3"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              c- option
                              <MdStar className="text-orange-400 h-3 w-3" />
                            </label>
                            <input
                              type="text"
                              name="q3"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                          <div className="w-1/4">
                            <label
                              htmlFor="q4"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              d- option
                              <MdStar className="text-orange-400 h-3 w-3" />
                            </label>
                            <input
                              type="text"
                              name="q4"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                        </div>
                      </div>
                      {/* answer */}
                      <div className="p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          answer
                        </p>

                        <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6  text-start dark:text-white">
                          <ul className="flex items-center justify-start gap-x-6 w-full text-sm font-medium text-gray-900">
                            <li className="border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio1"
                                  type="radio"
                                  value="A"
                                  checked={option.A}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600  border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio1"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option A
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio2"
                                  type="radio"
                                  value="B"
                                  checked={option.B}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio2"
                                  className=" py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option B
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio3"
                                  type="radio"
                                  value="C"
                                  checked={option.C}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio3"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option C
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio4"
                                  type="radio"
                                  value="D"
                                  checked={option.D}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio4"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option D
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* solution */}
                      <div className="space-y-2">
                        <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                          solution
                        </p>
                        <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces, primarily for
                          single-page applications (SPAs). It was developed and
                          maintained by Facebook and has gained significant
                          popularity due to its efficient rendering techniques,
                          reusable components, and active community support. In
                          this article, we will explore React Introduction, what
                          React is, its key features, benefits, and why it’s a
                          great choice for modern web development.
                        </div>
                      </div>
                    </div>
                  ) : type === "Statement" ? (
                    <div className="duration-300 space-y-2">
                      <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                        React, also known as ReactJS, is a popular and powerful
                        JavaScript library used for building dynamic and
                        interactive user interfaces, primarily for single-page
                        applications (SPAs). It was developed and maintained by
                        Facebook and has gained significant popularity due to
                        its efficient rendering techniques, reusable components,
                        and active community support. In this article, we will
                        explore React Introduction, what React is, its key
                        features, benefits, and why it’s a great choice for
                        modern web development.
                      </div>
                      <div className="flex items-center justify-end w-full">
                        <button
                          onClick={AddStatement}
                          className="inline-flex items-center space-x-2 rounded-lg p-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
                        >
                          <svg
                            className="font-bold text-white w-4 h-4"
                            viewBox="0 0 16 16"
                          >
                            <FaPlus />
                          </svg>
                          <p className=" font-semibold">Add Statement</p>
                        </button>
                      </div>
                      <input
                        className=" border-2 pl-10 border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Add"
                        onChange={(e) => handleAddValue(e)}
                      />
                      <div className="space-y-2">
                        {statement.map(function (item, index) {
                          return (
                            <div
                              key={index}
                              className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner"
                            >
                              {item}
                            </div>
                          );
                        })}
                        <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces.
                        </div>
                      </div>
                      {/* options */}
                      <div className=" p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          options
                        </p>
                        <div className="flex flex-row items-center  space-x-3">
                          <div className="w-1/4">
                            <label
                              htmlFor="q1"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              a- option
                              <MdStar className="text-orange-400  h-3 w-3 " />
                            </label>
                            <input
                              type="text"
                              name="q1"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                          <div className="w-1/4">
                            <label
                              htmlFor="q2"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              b- option
                              <MdStar className="text-orange-400 h-3 w-3" />
                            </label>
                            <input
                              type="text"
                              name="q2"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                          <div className="w-1/4">
                            <label
                              htmlFor="q3"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              c- option
                              <MdStar className="text-orange-400 h-3 w-3" />
                            </label>
                            <input
                              type="text"
                              name="q3"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                          <div className="w-1/4">
                            <label
                              htmlFor="q4"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              d- option
                              <MdStar className="text-orange-400 h-3 w-3" />
                            </label>
                            <input
                              type="text"
                              name="q4"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                        </div>
                      </div>
                      {/* answer */}
                      <div className="p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          answer
                        </p>

                        <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6  text-start dark:text-white">
                          <ul className="flex items-center justify-start gap-x-6 w-full text-sm font-medium text-gray-900">
                            <li className="border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio1"
                                  type="radio"
                                  value="A"
                                  checked={option.A}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600  border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio1"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option A
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio2"
                                  type="radio"
                                  value="B"
                                  checked={option.B}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio2"
                                  className=" py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option B
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio3"
                                  type="radio"
                                  value="C"
                                  checked={option.C}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio3"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option C
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio4"
                                  type="radio"
                                  value="D"
                                  checked={option.D}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio4"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option D
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* solution */}
                      <div className="space-y-2">
                        <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                          solution
                        </p>
                        <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces, primarily for
                          single-page applications (SPAs). It was developed and
                          maintained by Facebook and has gained significant
                          popularity due to its efficient rendering techniques,
                          reusable components, and active community support. In
                          this article, we will explore React Introduction, what
                          React is, its key features, benefits, and why it’s a
                          great choice for modern web development.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <input
                        className=" border-2 pl-4 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                        id="question"
                        type="text"
                        placeholder="Add question"
                        name="englishQuestion.question"
                        onChange={handleChange}
                      />

                      {/* options */}
                      <div className=" p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          options
                        </p>
                        <div className="flex flex-row items-center space-x-3">
                          {["A", "B", "C", "D"].map((option) => (
                            <div key={option} className="w-1/4">
                              <label className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                                {option}- option
                                <MdStar className="text-orange-400 h-3 w-3" />
                              </label>
                              <input
                                type="text"
                                name={`englishQuestion.options.${option}`}
                                value={
                                  addQuestion.englishQuestion.options[option]
                                }
                                onChange={handleChange}
                                className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                                placeholder={`Enter Option ${option}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* answer */}
                      <div className="p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          answer
                        </p>
                        <div className="flex flex-row items-center  space-x-3">
                          {["A", "B", "C", "D"].map((option) => (
                            <div
                              key={option}
                              className="flex flex-row items-center justify-start gap-x-6 text-sm font-medium text-gray-900 rounded-t-lg dark:border-gray-600"
                            >
                              <div className="flex items-center ps-3">
                                <input
                                  id={`radio${option}`}
                                  type="radio"
                                  value={option}
                                  checked={
                                    addQuestion.englishQuestion.answer ===
                                    option
                                  }
                                  onChange={(e) =>
                                    setAddQuestion((prev) => ({
                                      ...prev,
                                      englishQuestion: {
                                        ...prev.englishQuestion,
                                        answer:
                                          addQuestion.englishQuestion.options[
                                            option
                                          ],
                                      },
                                    }))
                                  }
                                  className="w-4 h-4 text-blue-600 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor={`radio${option}`}
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option {option}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* solution */}
                      <div className="space-y-2">
                        <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                          solution
                        </p>
                        <textarea
                          id="message"
                          rows="4"
                          name={addQuestion.englishQuestion.solution}
                          onChange={handleChange}
                          className="block rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner p-2.5 w-full text-md bg-gray-50  border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Your solution..."
                        ></textarea>
                        <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces, primarily for
                          single-page applications (SPAs). It was developed and
                          maintained by Facebook and has gained significant
                          popularity due to its efficient rendering techniques,
                          reusable components, and active community support. In
                          this article, we will explore React Introduction, what
                          React is, its key features, benefits, and why it’s a
                          great choice for modern web development.
                        </div>
                      </div>
                    </>
                  )}
                </div>
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
                  {type === "Pair" ? (
                    <div className="duration-300 space-y-2">
                      <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                        React, also known as ReactJS, is a popular and powerful
                        JavaScript library used for building dynamic and
                        interactive user interfaces, primarily for single-page
                        applications (SPAs). It was developed and maintained by
                        Facebook and has gained significant popularity due to
                        its efficient rendering techniques, reusable components,
                        and active community support. In this article, we will
                        explore React Introduction, what React is, its key
                        features, benefits, and why it’s a great choice for
                        modern web development.
                      </div>
                      <div className="flex items-center justify-end w-full">
                        <button
                          onClick={AddStatement}
                          className="inline-flex items-center space-x-2 rounded-lg p-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
                        >
                          <svg
                            className="font-bold text-white w-4 h-4"
                            viewBox="0 0 16 16"
                          >
                            <FaPlus />
                          </svg>
                          <p className=" font-semibold">Add Pair</p>
                        </button>
                      </div>
                      <div className="">
                        <input
                          class=" border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Add"
                          onChange={(e) => handleAddValue(e)}
                        />
                      </div>
                      <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 ">
                        {statement.map(function (item, index) {
                          return (
                            <div
                              key={index}
                              className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner"
                            >
                              {item}
                            </div>
                          );
                        })}
                        <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces.
                        </div>
                        <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces.
                        </div>
                        <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces.
                        </div>
                        <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces.
                        </div>
                      </div>
                      {/* options */}
                      <div className=" p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          options
                        </p>
                        <div className="flex flex-row items-center  space-x-3">
                          <div className="w-1/4">
                            <label
                              htmlFor="q1"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              a- option
                              <MdStar className="text-orange-400  h-3 w-3 " />
                            </label>
                            <input
                              type="text"
                              name="q1"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                          <div className="w-1/4">
                            <label
                              htmlFor="q2"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              b- option
                              <MdStar className="text-orange-400 h-3 w-3" />
                            </label>
                            <input
                              type="text"
                              name="q2"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                          <div className="w-1/4">
                            <label
                              htmlFor="q3"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              c- option
                              <MdStar className="text-orange-400 h-3 w-3" />
                            </label>
                            <input
                              type="text"
                              name="q3"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                          <div className="w-1/4">
                            <label
                              htmlFor="q4"
                              className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                            >
                              d- option
                              <MdStar className="text-orange-400 h-3 w-3" />
                            </label>
                            <input
                              type="text"
                              name="q4"
                              className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                              placeholder="Enter Question"
                              maxLength="19"
                            />
                          </div>
                        </div>
                      </div>
                      {/* answer */}
                      <div className="p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          answer
                        </p>

                        <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6  text-start dark:text-white">
                          <ul className="flex items-center justify-start gap-x-6 w-full text-sm font-medium text-gray-900">
                            <li className="border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio1"
                                  type="radio"
                                  value="A"
                                  checked={option.A}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600  border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio1"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option A
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio2"
                                  type="radio"
                                  value="B"
                                  checked={option.B}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio2"
                                  className=" py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option B
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio3"
                                  type="radio"
                                  value="C"
                                  checked={option.C}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio3"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option C
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio4"
                                  type="radio"
                                  value="D"
                                  checked={option.D}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio4"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option D
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {/* solution */}
                      <div className="space-y-2">
                        <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                          solution
                        </p>
                        <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces, primarily for
                          single-page applications (SPAs). It was developed and
                          maintained by Facebook and has gained significant
                          popularity due to its efficient rendering techniques,
                          reusable components, and active community support. In
                          this article, we will explore React Introduction, what
                          React is, its key features, benefits, and why it’s a
                          great choice for modern web development.
                        </div>
                      </div>
                    </div>
                  ) : type === "Statement" ? (
                    <div className="duration-300 space-y-2">
                      <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                        React, also known as ReactJS, is a popular and powerful
                        JavaScript library used for building dynamic and
                        interactive user interfaces, primarily for single-page
                        applications (SPAs). It was developed and maintained by
                        Facebook and has gained significant popularity due to
                        its efficient rendering techniques, reusable components,
                        and active community support. In this article, we will
                        explore React Introduction, what React is, its key
                        features, benefits, and why it’s a great choice for
                        modern web development.
                      </div>
                      <div className="flex items-center justify-end w-full">
                        <button
                          onClick={AddStatement}
                          className="inline-flex items-center space-x-2 rounded-lg p-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
                        >
                          <svg
                            className="font-bold text-white w-4 h-4"
                            viewBox="0 0 16 16"
                          >
                            <FaPlus />
                          </svg>
                          <p className=" font-semibold">Add Statement</p>
                        </button>
                      </div>
                      <input
                        class=" border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Add"
                        onChange={(e) => handleAddValue(e)}
                      />
                      <div className="space-y-2">
                        {statement.map(function (item, index) {
                          return (
                            <div
                              key={index}
                              className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner"
                            >
                              {item}
                            </div>
                          );
                        })}
                        <div className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces.
                        </div>
                      </div>
                      {/* options */}
                      <div className=" p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          options
                        </p>
                        <div className="flex flex-row items-center space-x-3">
                          {["A", "B", "C", "D"].map((option) => (
                            <div key={option} className="w-1/4">
                              <label className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                                {option}- option
                                <MdStar className="text-orange-400 h-3 w-3" />
                              </label>
                              <input
                                type="text"
                                name={`englishQuestion.options.${option}`}
                                value={
                                  addQuestion.englishQuestion.options[option]
                                }
                                onChange={handleChange}
                                className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                                placeholder={`Enter Option ${option}`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* answer */}
                      <div className="p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          answer
                        </p>
                        <div className="flex flex-row items-center  space-x-3">
                          {["A", "B", "C", "D"].map((option) => (
                            <div
                              key={option}
                              className="flex flex-row items-center justify-start gap-x-6 text-sm font-medium text-gray-900 rounded-t-lg dark:border-gray-600"
                            >
                              <div className="flex items-center ps-3">
                                <input
                                  id={`radio${option}`}
                                  type="radio"
                                  value={option}
                                  checked={
                                    addQuestion.englishQuestion.answer ===
                                    option
                                  }
                                  onChange={(e) =>
                                    setAddQuestion((prev) => ({
                                      ...prev,
                                      englishQuestion: {
                                        ...prev.englishQuestion,
                                        answer: e.target.value,
                                      },
                                    }))
                                  }
                                  className="w-4 h-4 text-blue-600 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor={`radio${option}`}
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option {option}
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6  text-start dark:text-white">
                          <ul className="flex items-center justify-start gap-x-6 w-full text-sm font-medium text-gray-900">
                            <li className="border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio1"
                                  type="radio"
                                  value="A"
                                  checked={option.A}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600  border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio1"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option A
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio2"
                                  type="radio"
                                  value="B"
                                  checked={option.B}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio2"
                                  className=" py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option B
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio3"
                                  type="radio"
                                  value="C"
                                  checked={option.C}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio3"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option C
                                </label>
                              </div>
                            </li>
                            <li className=" border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                              <div className="flex items-center ps-3">
                                <input
                                  id="radio4"
                                  type="radio"
                                  value="D"
                                  checked={option.D}
                                  onChange={handleCheck}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                />
                                <label
                                  htmlFor="radio4"
                                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                  Option D
                                </label>
                              </div>
                            </li>
                          </ul>
                        </div> */}
                      </div>
                      {/* solution */}
                      <div className="space-y-2">
                        <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                          solution
                        </p>
                        <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces, primarily for
                          single-page applications (SPAs). It was developed and
                          maintained by Facebook and has gained significant
                          popularity due to its efficient rendering techniques,
                          reusable components, and active community support. In
                          this article, we will explore React Introduction, what
                          React is, its key features, benefits, and why it’s a
                          great choice for modern web development.
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <input
                        className=" border-2 pl-4 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                        id="question"
                        type="text"
                        placeholder="Add question"
                        name="englishQuestion.question"
                        onChange={handleChange}
                      />
                      {/* options */}
                      <div className=" p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          options
                        </p>
                        <div className="flex flex-row items-center space-x-3">
                          {["A", "B", "C", "D"].map((option) => (
                            <div className="w-1/4" key={option}>
                              <label className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white">
                                {option}- option
                                <MdStar className="text-orange-400 h-3 w-3" />
                              </label>
                              <input
                                type="text"
                                name={`hindiQuestion.options.${option}`}
                                value={
                                  addQuestion.hindiQuestion.options[option]
                                }
                                onChange={handleChange}
                                className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                                placeholder="Enter Option"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* answer */}
                      <div className="p-4 space-y-4">
                        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                          answer
                        </p>

                        <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6 text-start dark:text-white">
                          <ul className="flex items-center justify-start gap-x-6 w-full text-sm font-medium text-gray-900">
                            {["A", "B", " C", "D"].map((option) => (
                              <li
                                key={option}
                                className="border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                              >
                                <div className="flex items-center ps-3">
                                  <input
                                    id={`hindiRadio${option}`}
                                    type="radio"
                                    value={option}
                                    checked={
                                      addQuestion.hindiQuestion.answer === option
                                    }
                                    onChange={(e) =>
                                      setAddQuestion((prev) => ({
                                        ...prev,
                                        hindiQuestion: {
                                          ...prev.hindiQuestion,
                                          answer: addQuestion.englishQuestion.options[option],
                                        },
                                      }))
                                    }
                                    className="w-4 h-4 text-blue-600 border-gray-300 checked:bg-blue-600 checked:outline-none"
                                  />
                                  <label
                                    htmlFor={`hindiRadio${option}`}
                                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  >
                                    Option {option}
                                  </label>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* solution */}
                      <div className="space-y-2">
                        <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                          solution
                        </p>
                        <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                          React, also known as ReactJS, is a popular and
                          powerful JavaScript library used for building dynamic
                          and interactive user interfaces, primarily for
                          single-page applications (SPAs). It was developed and
                          maintained by Facebook and has gained significant
                          popularity due to its efficient rendering techniques,
                          reusable components, and active community support. In
                          this article, we will explore React Introduction, what
                          React is, its key features, benefits, and why it’s a
                          great choice for modern web development.
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className=" p-4 space-y-4">
                  <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                    options
                  </p>
                  <div className="flex flex-row items-center  space-x-3">
                    <div className="w-1/4">
                      <label
                        htmlFor="q1"
                        className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                      >
                        a- option
                        <MdStar className="text-orange-400  h-3 w-3 " />
                      </label>
                      <input
                        type="text"
                        name="q1"
                        className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                        placeholder="Enter Question"
                        maxLength="19"
                      />
                    </div>
                    <div className="w-1/4">
                      <label
                        htmlFor="q2"
                        className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                      >
                        b- option
                        <MdStar className="text-orange-400 h-3 w-3" />
                      </label>
                      <input
                        type="text"
                        name="q2"
                        className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                        placeholder="Enter Question"
                        maxLength="19"
                      />
                    </div>
                    <div className="w-1/4">
                      <label
                        htmlFor="q3"
                        className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                      >
                        c- option
                        <MdStar className="text-orange-400 h-3 w-3" />
                      </label>
                      <input
                        type="text"
                        name="q3"
                        className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                        placeholder="Enter Question"
                        maxLength="19"
                      />
                    </div>
                    <div className="w-1/4">
                      <label
                        htmlFor="q4"
                        className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                      >
                        d- option
                        <MdStar className="text-orange-400 h-3 w-3" />
                      </label>
                      <input
                        type="text"
                        name="q4"
                        className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                        placeholder="Enter Question"
                        maxLength="19"
                      />
                    </div>
                  </div>
                </div>
                <div className=" p-4 space-y-4">
                  <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                    answer
                  </p>
                  <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6  text-start dark:text-white">
                    <div className="flex  items-center justify-start space-x-2">
                      <input
                        id="horizontal-list-radio-license"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600  dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="horizontal-list-radio-license"
                        className="w-full py-3 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
                      >
                        option a
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="horizontal-list-radio-id"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="horizontal-list-radio-id"
                        className="w-full py-3 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
                      >
                        option b
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="horizontal-list-radio-military"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="w-4 h-4 text-orange-600 bg-orange-600 border border-orange-600 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="horizontal-list-radio-military"
                        className="w-full py-3 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
                      >
                        option c
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        id="horizontal-list-radio-military"
                        type="radio"
                        value=""
                        name="list-radio"
                        className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600 focus:border-none dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor="horizontal-list-radio-military"
                        className="w-full py-3 text-sm font-medium capitalize text-gray-900 dark:text-gray-300"
                      >
                        option d
                      </label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                    solution
                  </p>
                  <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                    React, also known as ReactJS, is a popular and powerful
                    JavaScript library used for building dynamic and interactive
                    user interfaces, primarily for single-page applications
                    (SPAs). It was developed and maintained by Facebook and has
                    gained significant popularity due to its efficient rendering
                    techniques, reusable components, and active community
                    support. In this article, we will explore React
                    Introduction, what React is, its key features, benefits, and
                    why it’s a great choice for modern web development.
                  </div>
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
    </>
  );
}

export default AddQuestion;
