import React from "react";
import { FaPlus } from "react-icons/fa";
import { MdStar } from "react-icons/md";

const HindiQuestionPairForm = ({
  addQuestion,
  setAddQuestion,
  currentHindiPair,
  setCurrentHindiPair,
  addPairQuestion,
  handleChange,
  handleCheck,
  optionsArray1,
  handlePairQuestionChange,
  handleAddPair,
  handleRemovePair,
}) => {
  return (
    <div className="duration-300 space-y-2">
      {/* Add Pair Button */}
      <div className="space-y-2 flex flex-col items-center">
        <button
          onClick={() => handleAddPair("hindiQuestion")}
          className="inline-flex items-end space-x-2 rounded-lg p-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90"
        >
          <FaPlus className="font-bold text-white w-4 h-4" />
          <p className="font-semibold">Add Pair</p>
        </button>

        {/* Question Input */}
        <div className="grid grid-cols-2 items-center gap-x-2 w-full">
          <div className="space-y-2">
            <label className="font-medium text-gray-900 dark:text-white text-md capitalize">
              Question
            </label>
            <input
              type="text"
              value={addQuestion.hindiQuestion.question}
              onChange={(e) =>
                handleChange("hindiQuestion", "question", e)
              }
              className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
            />
          </div>
          <div className="space-y-2">
            <label className="font-medium text-gray-900 dark:text-white text-md capitalize">
              Answer
            </label>
            <input
              type="text"
              value={addQuestion.hindiQuestion.answer}
              onChange={(e) =>
                handleChange("hindiQuestion", "answer", e)
              }
              className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
            />
          </div>
        </div>
      </div>

      {/* Pair Questions */}
      <div className="space-y-2">
        {addQuestion.hindiQuestion.pairQuestion &&
          addQuestion.hindiQuestion.pairQuestion.map((pair, index) => (
            <div
              key={index}
              className="grid grid-cols-2 items-center gap-x-2 w-full"
            >
              <p className="border-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline">
                {pair.question}
              </p>
              <p className="border-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline">
                {pair.answer}
              </p>
            </div>
          ))}
      </div>

      {/* Statement Question */}
      <div className="space-y-2">
        <label className="font-medium text-gray-900 dark:text-white text-md capitalize">
          Statement Question
        </label>
        <textarea
          value={addQuestion.hindiQuestion.statementQuestion.join(", ")}
          onChange={(e) =>
            handleChange(
              "hindiQuestion",
              "statementQuestion",
              e.target.value.split(",")
            )
          }
          className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full min-h-[100px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
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
                htmlFor={`hindiQuestion.options.${option}`}
                className="flex mb-2 text-start capitalize text-base font-medium text-gray-700 dark:text-white"
              >
                Option - {option}
                <MdStar className="text-orange-400 h-3 w-3" />
              </label>
              <input
                type="text"
                name={`hindiQuestion.options.${option}`}
                value={addQuestion.hindiQuestion.options[option]}
                onChange={handleChange}
                className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
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
            {optionsArray1.map((option) => (
              <li
                key={option.value}
                className="border-b border-gray-200 rounded-t-lg dark:border-gray-600"
              >
                <div className="flex items-center ps-3">
                  <input
                    id={`radio${option.value}`}
                    type="radio"
                    value={option.value}
                    checked={addQuestion.hindiQuestion.answer[option.value]}
                    onChange={(e) => handleCheck("hindiQuestion", e)}
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
          className="border-2 pl-2 text-md border-gray-400 hover:border-gray-400 transition-colors rounded-md w-full min-h-[100px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
          placeholder="Enter solution"
          onChange={handleChange}
          name="hindiQuestion.solution"
        />
      </div>
    </div>
  );
};

export default HindiQuestionPairForm;
