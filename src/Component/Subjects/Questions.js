import React from "react";
import {
  TfiStatsUp,
  TfiStatsDown,
  TfiPlus,
  TfiFile,
  TfiHelpAlt,
  TfiSettings,
} from "react-icons/tfi";
import { useNavigate } from "react-router-dom";

function Questions() {
  const navigate = useNavigate();

  function handleNavigate(params) {
    navigate("/addQuestion")
  }

  return (
    <>
      <section className="bg-white dark:bg-gray-900 overflow-y-auto rounded-lg border-2 border-slate-300 font-sans">
        <div className="py-8 px-4 space-y-6  sm:py-16 lg:px-6">
          <div className="space-y-6">
            <div className="flex  items-center justify-end">
              <button 
              onClick={()=> handleNavigate()}
              className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center uppercase text-white bg-orange-400 hover:bg-opacity-90  ">
                <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                  <TfiPlus />
                </svg>
                <p className=" font-semibold">create new question</p>
              </button>
            </div>
            <p className="text-4xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              questions
            </p>
            <p className="text-xl tracking-tight font-medium text-left text-slate-600 dark:text-white ">
              Fill in the details below to create a new question.
            </p>
          </div>
          <div className="w-full space-y-4 pt-8 text-left border-t border-gray-400 md:gap-16 dark:border-gray-700 font-sans">
            <ul className="space-y-4">
              <li className="space-y-2">
                <p className="flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  1. What is ReactJS?
                </p>
                <div className="rounded-md border border-gray-300 px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
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
              </li>
              <li className="space-y-2">
                <p className="flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  1. What is ReactJS?
                </p>
                <div className="rounded-md border border-gray-300 px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
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
              </li>
              <li className="space-y-2">
                <p className="flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  1. What is ReactJS?
                </p>
                <div className="rounded-md border border-gray-300 px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
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
              </li>
              <li className="space-y-2">
                <p className="flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  1. What is ReactJS?
                </p>
                <div className="rounded-md border border-gray-300 px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
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
              </li>
              <li className="space-y-2">
                <p className="flex items-center text-lg font-medium text-gray-900 dark:text-white">
                  1. What is ReactJS?
                </p>
                <div className="rounded-md border border-gray-300 px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner">
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
              </li>
            </ul>
          </div>
        </div>
      </section>
     
    </>
  );
}
export default Questions;
