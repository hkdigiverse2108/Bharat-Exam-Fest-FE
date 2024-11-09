import React, { useState } from "react";
import MultiSelection from "../Ui/MultiSelection";
import { MdStar } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { FaPlus } from "react-icons/fa6";

function AddQuestion() {
  const [type, setType] = useState("Normal");
  const handleChange = (e) => {
    const { value } = e.target;
    setType(value);
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
                    </div>
                  ) : (
                    <div className=" rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                      React, also known as ReactJS, is a popular and powerful
                      JavaScript library used for building dynamic and
                      interactive user interfaces, primarily for single-page
                      applications (SPAs). It was developed and maintained by
                      Facebook and has gained significant popularity due to its
                      efficient rendering techniques, reusable components, and
                      active community support. In this article, we will explore
                      React Introduction, what React is, its key features,
                      benefits, and why it’s a great choice for modern web
                      development.
                    </div>
                  )}

                  <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                    React, also known as ReactJS, is a popular and powerful
                    JavaScript library used for building dynamic and interactive
                    user interfacespopularity due to its efficient rendering
                    techniques, reusable components, and active community
                    support. In this article, we will explore React
                    Introduction, what React is, its key features, benefits, and
                    why it’s a great choice for modern web development.
                  </div>
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
                    </div>
                  ) : (
                    <div className=" rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                      React, also known as ReactJS, is a popular and powerful
                      JavaScript library used for building dynamic and
                      interactive user interfaces, primarily for single-page
                      applications (SPAs). It was developed and maintained by
                      Facebook and has gained significant popularity due to its
                      efficient rendering techniques, reusable components, and
                      active community support. In this article, we will explore
                      React Introduction, what React is, its key features,
                      benefits, and why it’s a great choice for modern web
                      development.
                    </div>
                  )}
                  <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                    React, also known as ReactJS, is a popular and powerful
                    JavaScript library used for building dynamic and interactive
                    user interfacespopularity due to its efficient rendering
                    techniques, reusable components, and active community
                    support. In this article, we will explore React
                    Introduction, what React is, its key features, benefits, and
                    why it’s a great choice for modern web development.
                  </div>
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
            <button className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-500 hover:bg-opacity-90  ">
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
