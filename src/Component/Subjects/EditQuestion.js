import React from "react";
import MultiSelection from "../Ui/MultiSelection";
import { MdStar } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";

function EditQuestion() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 overflow-y-auto rounded-lg border-2 border-slate-300 font-sans">
        <div className="py-8 px-4 space-y-2  sm:py-16 lg:px-6">
          <div className="space-y-6">
            <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              edit question
            </p>
            <p className="text-xl tracking-tight font-medium text-left text-slate-600 dark:text-white ">
              Fill in the details below to edit question.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2  lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
            <MultiSelection />
          </div>
          <div className="space-y-4">
            <p className="text-2xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              english question section
            </p>
            <div className="space-y-2">
              <div className="space-y-2">
                <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                  write question
                </p>
                <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                  React, also known as ReactJS, is a popular and powerful
                  JavaScript library used for building dynamic and interactive
                  user interfaces, primarily for single-page applications
                  (SPAs). It was developed and maintained by Facebook and has
                  gained significant popularity due to its efficient rendering
                  techniques, reusable components, and active community support.
                  In this article, we will explore React Introduction, what
                  React is, its key features, benefits, and why it’s a great
                  choice for modern web development.
                </div>
              </div>
              <div className="p-4 space-y-4">
                <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                  options
                </p>
                <ul className="grid grid-cols-2 gap-2 md:grid-cols-2  lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
                  <li>
                    <label
                      htmlFor="q1"
                      className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                    >
                      a- option
                      <MdStar className="text-orange-400 h-3 w-3" />
                    </label>
                    <input
                      type="text"
                      name="q1"
                      className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                      placeholder="Enter Question"
                      strokeWidth="19"
                    />
                  </li>
                  <li>
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
                  </li>
                  <li>
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
                  </li>
                  <li>
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
                  </li>
                </ul>
              </div>
              <div className=" p-4 space-y-4">
                <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                  answer
                </p>
                <ul className="max-w-md grid grid-cols-1 md:grid-cols-4  text-sm font-medium text-gray-900   text-start dark:text-white">
                  <li className="flex  items-center justify-start space-x-2">
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
                  </li>
                  <li className="flex items-center space-x-2">
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
                  </li>
                  <li className="flex items-center space-x-2">
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
                  </li>
                  <li className="flex items-center space-x-2">
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
                  </li>
                </ul>
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
                  techniques, reusable components, and active community support.
                  In this article, we will explore React Introduction, what
                  React is, its key features, benefits, and why it’s a great
                  choice for modern web development.
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <p className="text-2xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              hindi question section
            </p>
            <div className="space-y-2">
              <div className="space-y-2">
                <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
                  write question
                </p>
                <div className="rounded-md border  px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
                  React, also known as ReactJS, is a popular and powerful
                  JavaScript library used for building dynamic and interactive
                  user interfaces, primarily for single-page applications
                  (SPAs). It was developed and maintained by Facebook and has
                  gained significant popularity due to its efficient rendering
                  techniques, reusable components, and active community support.
                  In this article, we will explore React Introduction, what
                  React is, its key features, benefits, and why it’s a great
                  choice for modern web development.
                </div>
              </div>
              <div className="p-4 space-y-4">
                <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                  options
                </p>
                <ul className="grid grid-cols-2 gap-2 md:grid-cols-2  lg:grid-cols-4 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
                  <li>
                    <label
                      htmlFor="q1"
                      className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
                    >
                      a- option
                      <MdStar className="text-orange-400 h-3 w-3" />
                    </label>
                    <input
                      type="text"
                      name="q1"
                      className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                      placeholder="Enter Question"
                      maxLength="19"
                    />
                  </li>
                  <li>
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
                  </li>
                  <li>
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
                  </li>
                  <li>
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
                  </li>
                </ul>
              </div>
              <div className=" p-4 space-y-4">
                <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                  answer
                </p>
                <ul className="max-w-md grid grid-cols-1 md:grid-cols-4  text-sm font-medium text-gray-900   text-start dark:text-white">
                  <li className="flex  items-center justify-start space-x-2">
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
                  </li>
                  <li className="flex items-center space-x-2">
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
                  </li>
                  <li className="flex items-center space-x-2">
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
                  </li>
                  <li className="flex items-center space-x-2">
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
                  </li>
                </ul>
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
                  techniques, reusable components, and active community support.
                  In this article, we will explore React Introduction, what
                  React is, its key features, benefits, and why it’s a great
                  choice for modern web development.
                </div>
              </div>
            </div>
          </div>
          <div className="flex  items-center justify-center">
            <button className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-400 hover:bg-opacity-90  ">
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <VscSaveAs />
              </svg>
              <p className="font-semibold">save details</p>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditQuestion;
