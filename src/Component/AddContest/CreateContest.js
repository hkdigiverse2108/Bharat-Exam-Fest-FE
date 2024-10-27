import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import DropDown from "../Ui/DropDown";
import Calander from "../Ui/Calander";
import TimeSelector from "../Ui/TimeSelector";

export default function CreateContest() {
  const [date, setDate] = useState(false);
  const [time, setTime] = useState(false);
  function handleDateshow() {
    setDate(!date);
  }
  function handleTimeshow() {
    setTime(!time);
  }
  return (
    <>
      <section className="bg-white dark:bg-gray-900 h-full overflow-y-auto p-4 rounded-lg border-2 border-slate-300 font-sans">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              contest creation
            </p>
            <p className="text-xl tracking-tight font-medium text-left text-slate-600 dark:text-white ">
              Manage your contests easily from here.
            </p>
          </div>
          <div className="space-y-6 px-2">
            <div className="space-y-2">
              <p className="flex items-center capitalize text-xl font-medium text-gray-900 dark:text-white">
                classes Name
              </p>
              <ul className="max-w-2xl grid grid-cols-1 md:grid-cols-4 text-sm font-medium text-gray-900  text-start dark:text-white">
                <li className="flex items-center justify-start space-x-2">
                  <input
                    id="checkbox1"
                    type="checkbox"
                    value=""
                    name="checkbox1"
                    className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600  dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="checkbox1"
                    className=" py-3 text-base font-normal capitalize text-slate-900 dark:text-gray-300"
                  >
                    bharat exam fest
                  </label>
                </li>
                <li className="flex items-center justify-start space-x-2">
                  <input
                    id="checkbox2"
                    type="checkbox"
                    value=""
                    name="checkbox2"
                    className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600  dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="checkbox2"
                    className=" py-3 text-base font-normal capitalize text-slate-900 dark:text-gray-300"
                  >
                    tathastu ICS
                  </label>
                </li>
                <li className="flex items-center justify-start space-x-2">
                  <input
                    id="checkbox3"
                    type="checkbox"
                    value=""
                    name="checkbox3"
                    className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600  dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="checkbox3"
                    className=" py-3 text-base font-normal capitalize text-slate-900 dark:text-gray-300"
                  >
                    sarthi IAS
                  </label>
                </li>
                <li className=" flex items-center justify-start space-x-2">
                  <input
                    id="checkbox4"
                    type="checkbox"
                    value=""
                    name="checkbox4"
                    className="w-4 h-4 text-orange-600 bg-orange-600 border-orange-600  dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor="checkbox4"
                    className="py-3 text-base font-normal capitalize text-slate-900 dark:text-gray-300"
                  >
                    understand UPSC
                  </label>
                </li>
              </ul>
            </div>
            <div>
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-4 2xl:grid-cols-4 2xl:gap-6">
                <li>
                  <label
                    htmlFor="q1"
                    className="capitalize text-base font-medium text-gray-800 dark:text-white"
                  >
                    contest name
                  </label>
                  <input
                    type="text"
                    name="q1"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter contest name"
                    maxLength="19"
                  />
                </li>
                <li>
                  <label
                    htmlFor="q2"
                    className="capitalize text-base font-medium text-gray-800 dark:text-white"
                  >
                    contest type
                  </label>
                  <input
                    type="text"
                    name="q2"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter contest type"
                    maxLength="19"
                  />
                </li>
                <li>
                  <label
                    htmlFor="q3"
                    className="capitalize text-base font-medium text-gray-800 dark:text-white"
                  >
                    contest starting/ending time
                  </label>
                  <input
                    type="text"
                    name="q3"
                    onClick={()=> setDate(!date)}
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Choose starting/ending time"
                  />
                </li>
                <li>
                  <label
                    htmlFor="q4"
                    className="capitalize text-base font-medium text-gray-800 dark:text-white"
                  >
                    contest starting/ending date
                  </label>
                  <input
                    type="text"
                    name="q4"
                    onClick={()=> setTime(!time)}
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Choose starting/ending date"
                    maxLength="19"
                  />
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xl tracking-tight font-medium text-left text-gray-900 dark:text-white capitalize">
                participation and rewards
              </p>
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2 2xl:grid-cols-4 2xl:gap-6">
                <li>
                  <label
                    htmlFor="q1"
                    className="capitalize text-base font-medium text-gray-800 dark:text-white"
                  >
                    Total Spots
                  </label>
                  <input
                    type="text"
                    name="q1"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter Total Spots"
                    maxLength="19"
                  />
                </li>
                <li>
                  <label
                    htmlFor="q2"
                    className="capitalize text-base font-medium text-gray-800 dark:text-white"
                  >
                    Fees
                  </label>
                  <input
                    type="text"
                    name="q2"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter Fees"
                    maxLength="19"
                  />
                </li>
                <li>
                  <label
                    htmlFor="q3"
                    className="capitalize text-base font-medium text-gray-800 dark:text-white"
                  >
                    winning amount per fee
                  </label>
                  <input
                    type="text"
                    name="q3"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter winning amount per fee"
                  />
                </li>
                <li>
                  <label
                    htmlFor="q4"
                    className="capitalize text-base font-medium text-gray-800 dark:text-white"
                  >
                    winner percentage
                  </label>
                  <input
                    type="text"
                    name="q4"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter winner percentage"
                    maxLength="19"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xl tracking-tight font-medium text-left text-gray-900 dark:text-white capitalize">
              rank section
            </p>
            <div className="flex items-center justify-between">
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2 ">
                <li>
                  <label
                    htmlFor="q1"
                    className="capitalize text-base font-medium text-gray-800 dark:text-white"
                  >
                    1st/2nd/3rd place
                  </label>
                  <DropDown />
                </li>
                <li>
                  <label
                    htmlFor="q2"
                    className="capitalize text-base font-medium text-gray-800 dark:text-white"
                  >
                    price
                  </label>
                  <input
                    type="text"
                    name="q2"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter Fees"
                    maxLength="19"
                  />
                </li>
              </ul>
              <button
                //   onClick={() => handleAddContest()}
                className="h-10 inline-flex items-center space-x-2 text-nowrap rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90 "
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <FaPlus />
                </svg>
                <p className="font-semibold">Add More Rank</p>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className={`${date === true ? "block" : "hidden"}`}>
        <Calander confirm={date} setConfirm={() => handleDateshow()} />
      </div>
      <div className={`${time === true ? "block" : "hidden"}`}>
        <TimeSelector confirm={time} setConfirm={() => handleTimeshow()} />
      </div>
    </>
  );
}
