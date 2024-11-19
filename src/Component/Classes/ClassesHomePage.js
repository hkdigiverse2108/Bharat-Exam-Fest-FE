import React, { useEffect, useState } from "react";
// import { LuPencilLine } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import AddClasses from "./AddClasses";
import Pagination from "../Pagination/Pagination";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export default function ClassesHomePage() {
  // const navigate = useNavigate();
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
    (state) => state.authConfig.userInfo[0].token
  );
  const [input, setInput] = useState({
    classname: "",
    referralcode: "",
  });

  function handleNavigate() {
    setConfirm(!confirm);
  }

  const handleSuccess = (message) => {
    console.log("API call was successful:", message);
    handleNavigate();
  };

 
  const fetchClassData = async () => {
    try {
      const response = await axios.get(
        "https://api-bef.hkdigiverse.com/classes/all?page=1&limit=10",
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data.data.classes_data);

      setData(response.data.data.classes_data);
      setDataToDisplay(response.data.data.classes_data.slice(0, itemsPerPage));
    } catch (err) {
      setError(err.message);
    }
  };

  const deleteSubject = async (value) => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://api-bef.hkdigiverse.com//contest/delete/${value}`,
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);

          toast.success("Subject delete");
          fetchClassData();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err.message);
    }
  };


  useEffect(() => {
    setDataToDisplay(data.slice(start, end));
  }, [currentPage]);

  useEffect(() => {
    fetchClassData();
  }, []);

  return (
    <>
      <section className="shadow-md">
        <div className="bg-white  px-4 py-2 flex  items-center justify-between rounded-xl">
          <p className="text-2xl text-left font-semibold text-slate-800 uppercase">
            classes
          </p>
          <button
            onClick={handleNavigate}
            className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
          >
            <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
              <FaPlus />
            </svg>
            <p className=" font-semibold">Add Class</p>
          </button>
        </div>
        <div className="bg-white overflow-auto px-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    S/N
                    <svg viewBox="0 0 24 24" className="h-4 w-4">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                      ></path>
                    </svg>
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Classes Name
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Referral Code
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Uploaded PDF
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Tearms & Condition
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
                    Privacy Policy
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors ">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal">
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
                      {start + index + 1}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {value.name}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {value.referralCode}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <button
                      className="relative select-none max-w-12 max-h-12 rounded-lg text-md align-middle font-sansfont-medium uppercase transition-all disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button"
                    >
                      <img src={value.image} alt="" className="w-full h-full" />
                    </button>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {value.referralCode}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {value.referralCode}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      onClick={() => deleteSubject(value._id)}
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg  align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                        <svg viewBox="0 0 16 16" className="w-6 h-6">
                          <AiOutlineDelete />
                        </svg>
                      </span>
                    </button>
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
      <div className={`${confirm === true ? "block" : "hidden"}`}>
        <AddClasses confirm={confirm} onClose={handleSuccess} />
      </div>
    </>
  );
}
