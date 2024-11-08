import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import DropDown from "../Ui/DropDown";
import Calander from "../Ui/Calander";
import TimeSelector from "../Ui/TimeSelector";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateContest() {
  const [date, setDate] = useState(false);
  const [time, setTime] = useState(false);
  function handleDateshow() {
    setDate(!date);
  }
  function handleTimeshow() {
    setTime(!time);
  }

  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );

  const [input, setInput] = useState({
    contestName: "",
    contestType: "",
    date: "",
    time: "",
  });
  const { name } = input;
  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }

  const options = [
    { id: 1, label: "bharat exam fest" },
    { id: 2, label: "tathastu ICS" },
    { id: 3, label: "sarthi IAS" },
    { id: 4, label: "understand UPSC" },
  ];
  const [selectedValues, setSelectedValues] = useState([]);
  // useEffect(() => {
  //   console.log(selectedValues);
  // }, [selectedValues]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedValues((prevSelectedValues) => {
      if (prevSelectedValues.includes(value)) {
        return prevSelectedValues.filter((v) => v !== value);
      } else {
        return [...prevSelectedValues, value];
      }
    });
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  // useEffect(() => {
  //   console.log(startDate);
  //   console.log(endDate);
  // }, [endDate, startDate]);
  const [dateRange, setDateRange] = useState(null);

  const handleDateRangeChange = (range) => {
    // setDateRange(range);
    console.log(range);
    handleDateshow();
  };
  // Handle date change
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  // };

  const addNewContest = async () => {
    try {
      if (!name) {
        toast.warning("Fill up empty space");
      } else {
        let data = JSON.stringify(input);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/contest/add",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          data: data,
        };

        axios
          .request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            navigate("/subject");
            toast.success("Subject added");
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
      <section className="bg-white dark:bg-gray-900 h-full overflow-y-auto p-4 rounded-lg border border-slate-300 font-sans">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-3xl tracking-tight font-medium text-left text-gray-900 dark:text-white capitalize">
              contest creation
            </p>
            <p className="text-lg font-normal text-left text-slate-700 dark:text-white ">
              Manage your contests easily from here.
            </p>
          </div>
          <div className="space-y-6 px-2">
            <div className="space-y-2">
              <p className="flex items-center capitalize text-xl font-medium text-slate-800 dark:text-white">
                classes Name
              </p>
              <div className="max-w-2xl grid grid-cols-1 md:grid-cols-4 text-sm font-medium text-gray-900  text-start dark:text-white">
                {options.map((option) => (
                  <div key={option.id} className="space-x-2">
                    <input
                      type="checkbox"
                      value={option.label}
                      checked={selectedValues.includes(option.label)}
                      onChange={handleCheckboxChange}
                      id={option.id}
                    />
                    <label
                      htmlFor={option.id}
                      className="gap-2 py-3 text-base font-normal capitalize text-slate-900 dark:text-gray-300"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2 md:gap-4 2xl:grid-cols-4 2xl:gap-6">
                <li className="space-y-1">
                  <label
                    htmlFor="q1"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    contest name
                  </label>
                  <input
                    type="text"
                    id="q1"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter contest name"
                    maxLength="19"
                    name="contestName"
                    onChange={(e) => handleChange(e)}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="q2"
                    className="capitalize text-base font-medium text-slate-800 dark:text-white"
                  >
                    contest type
                  </label>
                  <input
                    type="text"
                    id="q2"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter contest type"
                    maxLength="19"
                    name="contestType"
                    onChange={(e) => handleChange(e)}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="q3"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    contest starting/ending time
                  </label>
                  <input
                    type="text"
                    id="q3"
                    value={dateRange}
                    onClick={() => setDate(!date)}
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Choose starting/ending time"
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="q4"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    contest starting/ending date
                  </label>
                  <input
                    type="text"
                    id="q4"
                    onClick={() => setTime(!time)}
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Choose starting/ending date"
                    maxLength="19"
                  />
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xl tracking-tight font-medium text-left text-gray-700 dark:text-white capitalize">
                participation and rewards
              </p>
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2 2xl:grid-cols-4 2xl:gap-6">
                <li className="space-y-1">
                  <label
                    htmlFor="q1"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Total Spots
                  </label>
                  <input
                    type="text"
                    id="q1"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter Total Spots"
                    maxLength="19"
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="q2"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Fees
                  </label>
                  <input
                    type="text"
                    id="q2"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter Fees"
                    maxLength="19"
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="q3"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    winning amount per fee
                  </label>
                  <input
                    type="text"
                    id="q3"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter winning amount per fee"
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="q4"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    winner percentage
                  </label>
                  <input
                    type="text"
                    id="q4"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600  border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500   dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter winner percentage"
                    maxLength="19"
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xl font-medium text-left text-gray-800 dark:text-white capitalize">
              rank section
            </p>
            <div className="flex items-center justify-between">
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2 ">
                <li className="space-y-1">
                  <label
                    htmlFor="q1"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    1st/2nd/3rd place
                  </label>
                  <DropDown />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="q2"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    price
                  </label>
                  <input
                    type="text"
                    id="q2"
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
        <Calander
          onChange={handleChange}
          confirm={date}
          setConfirm={() => handleDateshow()}
          selected={startDate}
          onChangeStartdate={(date) => setStartDate(date)}
          onChangeEnddate={(date) => setEndDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      <div className={`${time === true ? "block" : "hidden"}`}>
        <TimeSelector confirm={time} setConfirm={() => handleTimeshow()} />
      </div>
    </>
  );
}
