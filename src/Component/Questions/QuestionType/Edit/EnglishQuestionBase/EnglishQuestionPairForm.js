import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdStar } from "react-icons/md";

const EnglishQuestionPairForm = ({
  editQuestion,
  currentStatement,
  handleChange,
  handleCheck,
  optionsArray,
  handleStatementQuestionChange,
  handleAddPair,
  handleInputChange,
  inputs,
}) => {
  return (
    <div className="space-y-4 duration-300 ease-in-out">
      <p className="text-2xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
        english question section
      </p>
      {/* Question Input */}
      <div className="space-y-2">
        <label className="text-lg font-medium text-gray-900 dark:text-white">
          Write Question
        </label>
        <input
          className="border-2 border-gray-300 hover:border-gray-400 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-purple-600 focus:border-purple-600"
          id="question"
          type="text"
          placeholder="Add question"
          name="englishQuestion.question"
          value={editQuestion.englishQuestion.question}
          onChange={handleChange}
        />
      </div>
      {/* Question Input */}
      <div className="space-y-2 flex flex-col items-center">
        <button
          onClick={() => handleAddPair("english")}
          className="inline-flex items-center space-x-2 rounded-lg px-6 py-2 text-md text-white bg-orange-500 hover:bg-opacity-90"
        >
          <FaPlus className="font-bold text-white w-4 h-4" />
          <p className="font-semibold">Add Pair</p>
        </button>
        <div className="grid grid-cols-2 items-center gap-x-2 w-full">
          <div className="space-y-2 ">
            <label
              htmlFor="english.input1"
              className="font-medium text-gray-900 dark:text-white text-md capitalize"
            >
              Question
            </label>
            <input
              type="text"
              placeholder="Enter answer"
              id="english.input1"
              name="input1"
              onChange={(e) => handleInputChange("english", e)} // Call handler with "english"
              className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
            />
          </div>
          <div className="space-y-2 ">
            <label
              htmlFor="english.input2"
              className="font-medium text-gray-900 dark:text-white text-md capitalize"
            >
              Answer
            </label>
            <input
              type="text"
              placeholder="Enter answer"
              id="english.input2"
              name="input2"
              onChange={(e) => handleInputChange("english", e)} // Call handler with "english"
              className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
            />
          </div>
        </div>
      </div>
      {/* Pair Questions */}
      <div className="space-y-2">
        {editQuestion.englishQuestion?.pairQuestion?.length > 0 &&
          editQuestion.englishQuestion.pairQuestion.map((pair, index) => {
            const [question, answer] = pair.split(" - ");
            return (
              <div
                key={index}
                className="grid grid-cols-2 items-center gap-x-2 w-full"
              >
                <span className="rounded-md border border-green-300 p-2 text-md text-justify font-normal text-gray-600 dark:text-gray-400">
                  {question}
                </span>
                <span className="rounded-md border border-green-300 p-2 text-md text-justify font-normal text-gray-600 dark:text-gray-400">
                  {answer}
                </span>
              </div>
            );
          })}
      </div>
      <div className="space-y-2">
        <label className="text-lg font-medium text-gray-900 dark:text-white">
          Enter Statement
        </label>
        <input
          className="border-2 border-gray-300 hover:border-gray-400 rounded-md w-full py-2 px-3 text-gray-800 focus:outline-none focus:ring-purple-600 focus:border-purple-600"
          id="statement"
          type="text"
          placeholder="Enter statement"
          value={editQuestion.englishQuestion.lastQuestion}
          onChange={handleStatementQuestionChange}
          name="englishQuestion.statementQuestion"
        />
      </div>
      {/* Options A, B, C, D */}
      <div className="space-y-4 p-4">
        <p className="text-xl font-medium text-gray-900 dark:text-white">
          Options
        </p>
        <div className="flex flex-row items-center space-x-3">
          {["A", "B", "C", "D"].map((option) => (
            <div key={option} className="w-1/4">
              <label
                htmlFor={`englishQuestion.options.${option}`}
                className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
              >
                Option - {option}
                <MdStar className="text-orange-400 h-3 w-3" />
              </label>
              <textarea
                rows="3"
                name={`englishQuestion.options.${option}`}
                value={editQuestion.englishQuestion.options[option]}
                onChange={handleChange}
                className="block w-full min-h-22 max-h-22 p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                placeholder={`Option ${option}`}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Answer Section */}
      <div className="space-y-4 p-4">
        <p className="text-xl font-medium text-gray-900 dark:text-white">
          Answer
        </p>
        <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6 text-start dark:text-white">
          <ul className="flex items-center justify-start gap-x-6 w-full text-sm font-medium text-gray-900">
            {optionsArray.map((option) => (
              <li key={option.value}>
                <div className="flex items-center ps-3">
                  <input
                    id={`radio${option.value}`}
                    type="radio"
                    name="englishQuestion.answer" // Use the appropriate name for your state structure
                    value={option.value}
                    checked={
                      editQuestion.englishQuestion.answer === option.value
                    } // Ensure the correct radio button is checked
                    onChange={(e) => handleCheck("englishQuestion", e)} // Call handleCheck for englishQuestion selection
                    className="w-4 h-4 text-blue-600 border-gray-300 checked:bg-blue-600 checked:outline-none"
                  />
                  <label
                    htmlFor={`radio${option.value}`}
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    {option.label}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Solution Section */}
      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          Solution
        </p>
        <textarea
          name="englishQuestion.solution" // Use a name that the handleChange function can understand
          className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full min-h-[100px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
          placeholder="Enter solution"
          value={editQuestion.englishQuestion.solution} // Bind the value to the state
          onChange={handleChange} // Use handleChange for updating the value
        />
      </div>
    </div>
  );
};

export default EnglishQuestionPairForm;
