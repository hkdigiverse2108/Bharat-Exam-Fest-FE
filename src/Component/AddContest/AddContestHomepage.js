import React, { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { editContestData } from "../../Context/Action";
import { fetchContestData } from "../../Hooks/contestApi";
import { deleteContestData } from "../../Hooks/contestService";

export default function AddContestHomepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState(false);
  const [data, setData] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const Totalpage = Math.ceil(data.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );
  const DataList = useSelector((state) => state.userConfig.contestData);

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
        place: "",
      },
    ],
    totalQuestions: 0,
    totalTime: "",
    totalMarks: 0,
    classesId: "",
  });

  function handleAddContest() {
    navigate("/createContest");
  }
  const handleData = (value) => {
    dispatch(editContestData(value));
    navigate("/editContest");
  };

  const SimpleDate = ({ dateString }) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString();

    return (
      <p className="block antialiased font-sans text-sm leading-normal font-normal">
        {formattedDate}
      </p>
    );
  };

  const getContestData = async () => {
    try {
      const data = await fetchContestData(accessToken);
      if (data) {
        setContestData(data); // Set the questions directly
        setDataToDisplay(data.slice(0, itemsPerPage));
      } else {
        // Set the questions directly
      }
      console.log("res", data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const responseData = await deleteContestData(id, accessToken);
      console.log(responseData);
      getContestData();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setDataToDisplay(data.slice(start, end));
  }, [currentPage]);

  useEffect(() => {
    getContestData();
  }, [accessToken]);

  return (
    <>
      <section className="shadow-md">
        <div className="relative w-full flex flex-col items-center rounded-t-xl px-4 py-2 overflow-hidden text-slate-700 bg-white  bg-clip-border">
          <p className="text-2xl text-left w-full font-semibold text-slate-800 uppercase">
            Contest
          </p>
          <div className="flex  items-center justify-between gap-2 w-full">
            <p className="text-lg text-left font-normal text-slate-600 ">
              Enter ther subject name to create a new subject for the class
              curriculum.
            </p>
            <button
              onClick={() => handleAddContest()}
              className="h-10 inline-flex items-center space-x-2  text-nowrap rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90 "
            >
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <FaPlus />
              </svg>
              <p className="font-semibold">Create New Contest</p>
            </button>
          </div>
        </div>
        <div className="bg-white overflow-auto px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Product Name
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    Location
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    Start Date
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    End Date
                  </p>
                </th>

                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    Spots
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    Fees
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    status
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {dataToDisplay.map((value, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                     {value.name}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      Guaranted
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden">
                    <SimpleDate dateString={value.startDate} />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden">
                    <SimpleDate dateString={value.endDate} />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {value.totalSpots || 0}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {value.fees || "₹ 0"}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden">
                    <li className="py-1 px-2 max-w-[10rem] text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-500">
                      Active{" "}
                    </li>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 w-[20px] text-center">
                    <div className="flex items-center justify-evenly  gap-2 font-sans text-md font-medium leading-none text-slate-800">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => handleData(value)}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg viewBox="0 0 16 16" className="w-5 h-5">
                            <LuPencilLine />
                          </svg>
                        </span>
                      </button>
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-md align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                        type="button"
                        onClick={() => handleDelete(value._id)}
                      >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                          <svg viewBox="0 0 16 16" className="w-6 h-6">
                            <AiOutlineDelete />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          total={Totalpage}
          page={setCurrentPage}
          current={currentPage}
        />
      </section>
    </>
  );
}
