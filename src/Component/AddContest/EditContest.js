import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import Calander from "../Ui/Calander";
import TimeSelector from "../Ui/TimeSelector";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addClassesData } from "../../Context/Action";
import ContestTypeDropDown from "../Ui/ContestTypeDropDow";
import InputField from "../Ui/InputField";
import { editContest, fetchClassData } from "../../Hooks/contestService";

export default function EditContest() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const [date, setDate] = useState(false);
  const [dateRang, setDateRange] = useState("");
  const [time, setTime] = useState(false);
  const [timeRang, setTimeRange] = useState("");
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
    (state) => state.authConfig.userInfo[0].data.token
  );
  const contestFromRedux = useSelector(
    (state) => state.userConfig.editContestData
  );

  const [contestData, setContestData] = useState({
    name: "",
    type: "",
    startDate: "",
    endDate: "",
    totalSpots: 0,
    fees: 0,
    winningAmountPerFee: 0,
    winnerPercentage: 0,
    ranks: [
      {
        startPlace: "",
        endPlace: "",
        price: 0,
      },
    ],
    totalQuestions: 0,
    totalTime: "",
    totalMarks: 0,
    classesId: "",
  });

  const isEmpty = () => {
    const {
      name,
      type,
      startDate,
      endDate,
      totalSpots,
      fees,
      winningAmountPerFee,
      winnerPercentage,
      totalQuestions,
      totalTime,
      totalMarks,
      classesId,
      ranks,
    } = contestData;

    const isRanksEmpty = ranks.every(
      (rank) =>
        rank.startPlace === "" && rank.endPlace === 0 && rank.price === 0
    );

    return (
      name === "" &&
      type === "" &&
      startDate === "" &&
      endDate === "" &&
      totalSpots === 0 &&
      fees === 0 &&
      winningAmountPerFee === 0 &&
      winnerPercentage === 0 &&
      totalQuestions === 0 &&
      totalTime === "" &&
      totalMarks === 0 &&
      classesId === "" &&
      isRanksEmpty
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContestData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRankChange = (index, field, value) => {
    const updatedRanks = [...contestData.ranks];
    updatedRanks[index][field] = value;
    setContestData((prevData) => ({ ...prevData, ranks: updatedRanks }));
  };

  const handleAddRank = () => {
    setContestData((prevData) => ({
      ...prevData,
      ranks: [...prevData.ranks, { startPlace: "", price: 0 }],
    }));
  };

  const className = data.map((classItem) => ({
    id: classItem._id,
    label: classItem.name,
  }));
  const [selectedValues, setSelectedValues] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((id) => id !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const [startDate, setStartDate] = useState(contestData.startDate);
  const [endDate, setEndDate] = useState(contestData.endDate);
  const formatDate = (
    dateString,
    options = { year: "numeric", month: "2-digit", day: "2-digit" },
    locale = "en-US"
  ) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }
    return date.toLocaleDateString(locale, options);
  };

  const handleDateRangeChange = (start, end, dateRang) => {
    setStartDate(start);
    setEndDate(end);
    setDateRange(dateRang);
    setContestData((prevData) => ({
      ...prevData,
      startDate: start,
      endDate: end,
    }));
  };

  const getCombinedDate = (value) => {
    try {
      if (!value || !value.startDate || !value.endDate) {
        console.error("Invalid date values");
      }

      const startDateFormatted = formatDate(new Date(value.startDate));
      const endDateFormatted = formatDate(new Date(value.endDate));

      return `${startDateFormatted} - ${endDateFormatted}`;
    } catch (error) {
      console.error("Error formatting dates:", error.message);
      return null;
    }
  };

  const handleTimeRangeChange = (timerange) => {
    setTimeRange(timerange);
    setContestData((prevData) => ({
      ...prevData,
      totalTime: timerange,
    }));
  };

  const handleEditContest = async () => {
    try {
      if (isEmpty()) {
        toast.warning("Fill up empty space");
      } else {
        const response = await editContest(contestData, accessToken);
        if (response.status === 200) {
          toast.success("Contest edited successfully");
          dispatch(addClassesData(response.data)); // Adjust based on your response structure
          // Optionally, you can fetch class data again to refresh the list
          loadClassData();
        } else {
          console.error("Failed to edit contest: " + response);
        }
      }
    } catch (error) {
      console.error(error);
      console.error("An error occurred: " + error.message);
    }
  };

  const loadClassData = async () => {
    try {
      const classes = await fetchClassData(accessToken);
      setData(classes);
    } catch (error) {
      console.error(error);
      console.error("An error occurred: " + error.message);
    }
  };

  useEffect(() => {
    loadClassData();
  }, [accessToken]);

  useEffect(() => {
    fetchClassData();
    console.log("data", contestFromRedux);
  }, [contestFromRedux]);

  useEffect(() => {
    if (contestFromRedux) {
      setContestData({
        name: contestFromRedux.name,
        type: contestFromRedux.type,
        startDate: contestFromRedux.startDate,
        endDate: contestFromRedux.endDate,
        totalSpots: contestFromRedux.totalSpots,
        fees: contestFromRedux.fees,
        winningAmountPerFee: contestFromRedux.winningAmountPerFee,
        winnerPercentage: contestFromRedux.winnerPercentage,
        ranks: contestFromRedux.ranks.map((rank) => ({
          startPlace: rank.startPlace || "", // Map place to startPlace
          endPlace: rank.endPlace || "", // Initialize endPlace
          price: rank.price || 0, // Initialize price
        })),
        totalQuestions: contestFromRedux.totalQuestions,
        totalTime: contestFromRedux.totalTime,
        totalMarks: contestFromRedux.totalMarks,
        classesId: contestFromRedux.classesId,
      });
      setSelectedValues([contestFromRedux.classesId]);
      const combinedDate = getCombinedDate(contestFromRedux);
      setDateRange(combinedDate);
    }
    console.log(contestData);
  }, [contestFromRedux]);

  return (
    <>
      <section className="bg-white dark:bg-gray-900 h-auto overflow-y-auto p-4 space-y-6 rounded-lg border border-slate-300 font-sans">
        <div className="space-y-6 ">
          <div className="space-y-2">
            <p className="text-3xl tracking-tight font-medium text-left text-gray-900 dark:text-white capitalize">
              Contest Edit
            </p>
            <p className="text-lg font-normal text-left text-slate-700 dark:text-white">
              Manage your contests easily from here.
            </p>
          </div>
          <div className="space-y-6 px-2">
            <div className="space-y-2 w-full">
              <p className="flex items-center capitalize text-xl font-medium text-slate-800 dark:text-white">
                Classes Name
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 md:gap-4 2xl:grid-cols-4 2xl:gap-4 text-sm font-medium text-gray-900 text-start dark:text-white">
                {className.map((option, index) => (
                  <div
                    key={index}
                    className="space-x-2 inline-flex items-center"
                  >
                    <input
                      type="checkbox"
                      value={option.id} // Use option.id, which corresponds to _id
                      checked={selectedValues.includes(option.id)} // Check if the current id is in selectedValues
                      onChange={handleCheckboxChange}
                      id={option.id}
                    />
                    <label
                      htmlFor={option.id}
                      className="gap-2 py-3 text-base text-nowrap font-normal capitalize text-slate-900 dark:text-gray-300"
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
                    htmlFor="name"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Contest Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter contest name"
                    maxLength="19"
                    value={contestData.name}
                    onChange={handleChange}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="type"
                    className="capitalize text-base font-medium text-slate-800 dark:text-white"
                  >
                    Contest Type
                  </label>

                  <ContestTypeDropDown
                    value={contestData.type}
                    onChange={handleChange}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="dateRange"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Contest Starting/Ending Date
                  </label>
                  <input
                    type="text"
                    id="dateRange"
                    name="dateRange"
                    value={dateRang}
                    onChange={(e) => setDateRange(e.target.value)}
                    onClick={() => setDate(!date)}
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Choose starting/ending time"
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="timeRange"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Contest Starting/Ending Time
                  </label>
                  <input
                    type="text"
                    id="timeRange"
                    name="timeRange"
                    value={contestData.totalTime}
                    onChange={(e) => setTimeRange(e.target.value)}
                    onClick={() => setTime(!time)}
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Choose starting/ending date"
                    maxLength="19"
                  />
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-xl tracking-tight font-medium text-left text-gray-700 dark:text-white capitalize">
                Participation and Rewards
              </p>
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2 2xl:grid-cols-4 2xl:gap-6">
                <li className="space-y-1">
                  <label
                    htmlFor="totalSpots"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Total Spots
                  </label>
                  <input
                    type="number"
                    id="totalSpots"
                    name="totalSpots"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter Total Spots"
                    value={contestData.totalSpots}
                    onChange={handleChange}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="fees"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Fees
                  </label>
                  <input
                    type="number"
                    id="fees"
                    name="fees"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter Fees"
                    value={contestData.fees}
                    onChange={handleChange}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="winningAmountPerFee"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Winning Amount Per Fee
                  </label>
                  <input
                    type="number"
                    id="winningAmountPer Fee"
                    name="winningAmountPerFee"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter winning amount per fee"
                    value={contestData.winningAmountPerFee}
                    onChange={handleChange}
                  />
                </li>
                <li className="space-y-1">
                  <label
                    htmlFor="winnerPercentage"
                    className="capitalize text-base font-medium text-gray-700 dark:text-white"
                  >
                    Winner Percentage
                  </label>
                  <input
                    type="number"
                    id="winnerPercentage"
                    name="winnerPercentage"
                    className="block w-full p-2 border rounded-lg bg-white placeholder-gray-400 text-gray-600 border-gray-300 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:outline-none"
                    placeholder="Enter winner percentage"
                    value={contestData.winnerPercentage}
                    onChange={handleChange}
                  />
                </li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xl font-medium text-left text-gray-800 dark:text-white capitalize">
              Rank Section
            </p>
            <div className="flex items-center justify-between">
              <ul className="text-start grid grid-cols-2 gap-2 md:grid-cols-2">
                {contestData.ranks.map((rank, index) => (
                  <React.Fragment key={index}>
                    <li className="space-y-1">
                      <InputField
                        value={rank.startPlace}
                        onChange={(e) =>
                          handleRankChange(index, "startPlace", e.target.value)
                        }
                        placeholder="Rank"
                      />
                    </li>

                    <li className="space-y-1">
                      <InputField
                        value={rank.price}
                        onChange={(e) =>
                          handleRankChange(
                            index,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        placeholder="Prize"
                        type="number"
                      />
                    </li>
                  </React.Fragment>
                ))}
              </ul>
              <button
                onClick={handleAddRank}
                className="h-10 inline-flex items-center space-x-2 text-nowrap rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90"
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
        <div className="flex items-center justify-center border-t border-gray-400 py-2">
          <button
            onClick={handleEditContest}
            className="inline-flex items-center space-x-2 rounded-lg px-10 py-2 text-lg text-center uppercase text-white bg-orange-500 hover:bg-opacity-90"
          >
            <FaSave className="mr-2" />
            Save
          </button>
        </div>
      </section>

      <div className={`${date === true ? "block" : "hidden"}`}>
        <Calander
          onChange={handleChange}
          confirm={date}
          onClose={handleDateshow}
          selected={dateRang}
          onChangeStartdate={(date) => {
            setStartDate(date);
            setContestData((prevData) => ({
              ...prevData,
              startDate: date,
            }));
          }}
          onChangeEnddate={(date) => {
            setEndDate(date);
            setContestData((prevData) => ({
              ...prevData,
              endDate: date,
            }));
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="yyyy/MM/dd"
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      <div className={`${time === true ? "block" : "hidden"}`}>
        <TimeSelector
          onChange={handleChange}
          confirm={date}
          onClose={handleTimeshow}
          selected={startDate}
          onChangeTimeRange={(time) => {
            setContestData((prevData) => ({
              ...prevData,
              totalTime: time,
            }));
          }}
          onTimeRangeChange={handleTimeRangeChange}
          setConfirm={() => handleTimeshow()}
        />
      </div>
      <ToastContainer
        draggable={false}
        autoClose={2000}
        position={"top-center"}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={false}
        theme="dark"
      />
    </>
  );
}