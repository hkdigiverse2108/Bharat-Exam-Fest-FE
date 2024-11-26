import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdStar } from "react-icons/md";

const EnglishQueStatementBaseform = ({
  addQuestion,
  setAddQuestion,
  currentStatement,
  setCurrentStatement,
  handleChange,
  handleCheck,
  optionsArray1,
  handleStatementQuestionChange,
  handleAddStatement,
}) => {
  return (
    <div className="duration-300 space-y-2">
      {/* Input for the question */}
      <input
        className="border-2 pl-2 text-lg  border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Enter question"
        onChange={handleChange}
        name="englishQuestion.question"
      />
      
      {/* Button to add statement */}
      <div className="flex items-center justify-end w-full">
        <button
          onClick={() => handleAddStatement("english")}
          className="inline-flex items-center space-x-2 rounded-lg p-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90"
        >
          <FaPlus className="font-bold text-white w-4 h-4" />
          <p className="font-semibold">Add Statement</p>
        </button>
      </div>
      
      {/* Input for the statement */}
      <div className="space-y-2">
        <input
          className="border-2 pl-2 text-lg  border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Enter Statement"
          value={currentStatement}
          onChange={(e) => setCurrentStatement(e.target.value)}
          name="englishQuestion.statementQuestion"
        />
        
        {/* Display list of statements */}
        <div className="space-y-2">
          {addQuestion.englishQuestion.statementQuestion.map((value, index) => (
            <div
              key={index}
              className="rounded-md border px-6 py-4 text-md text-justify font-normal text-gray-500 dark:text-gray-400 shadow-inner"
            >
              {value}
            </div>
          ))}
        </div>
      </div>

      {/* Input for suggestions */}
      <input
        className="border-2 pl-2 text-lg  border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
        id="username"
        type="text"
        placeholder="Enter suggestion"
        onChange={handleChange}
        name="englishQuestion.lastQuestion"
      />

      {/* Options section */}
      <div className="p-4 space-y-4">
        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
          options
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
              <input
                type="text"
                name={`englishQuestion.options.${option}`}
                value={addQuestion.englishQuestion.options[option]}
                onChange={handleChange}
                className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                placeholder={`Option ${option}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Answer section */}
      <div className="p-4 space-y-4">
        <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
          answer
        </p>
        <div className="md:flex sm:flex text-sm font-medium text-gray-900 space-x-6 text-start dark:text-white">
          <ul className="flex items-center justify-start gap-x-6 w-full text-sm font-medium text-gray-900">
            {optionsArray1.map((option, index) => (
              <li
                className="border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                key={index}
              >
                <div className="flex items-center ps-3">
                  <input
                    id={`radio${option.label}`}
                    type="radio"
                    value={option.value}
                    checked={addQuestion.englishQuestion.answer === option.value}
                    onChange={(e) => handleCheck("englishQuestion", e)}
                    className="w-4 h-4 text-blue-600 border-gray-300 checked:bg -blue-600 checked:outline-none"
                  />
                  <label
                    htmlFor={`radio${option.label}`}
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Option {option.value}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Solution section */}
      <div className="space-y-2">
        <p className="flex items-center capitalize text-lg font-medium text-gray-900 dark:text-white">
          solution
        </p>
        <textarea
          id="message"
          rows="4"
          name={addQuestion.englishQuestion.solution}
          className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full min-h-[100px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
          onChange={(e) =>
            setAddQuestion((prev) => ({
              ...prev,
              englishQuestion: {
                ...prev.englishQuestion,
                solution: e.target.value,
              },
            }))
          }
        />
      </div>
    </div>
  );
};

export default EnglishQueStatementBaseform;
