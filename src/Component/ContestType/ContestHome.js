import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { LuPencilLine } from "react-icons/lu";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../Pagination/Pagination";
import AddContest from "./AddContest";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationPage from "./ConfirmationPage";
import useGetAllContestData from "../../Hooks/useGetAllContestData";
import { contestTypeData, editContestTypeData } from "../../Context/Action";
import EditContestType from "./EditContestType";

export default function ContestHome() {
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [contest, setContest] = useState([]);
  const [contestDataShow, setContestDataShow] = useState([]);
  const [error, setError] = useState(null);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );
  // const DataList = useSelector((state) => state.userConfig.contestType);

  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const Totalpage = Math.ceil(contest.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  // const navigate = useNavigate();
  function handleNavigate() {
    setConfirm(!confirm);
  }

  const fetchContestTypeData = async () => {
    try {
      const response = await axios.get(
        "https://api-bef.hkdigiverse.com/contest-type/all?page=1&limit=10",
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("contest_type_data", response.data.data.contest_type_data);
        const responseData = response.data.data.contest_type_data;
        setContest(responseData);
        setContestDataShow(responseData.slice(0, end));
        dispatch(contestTypeData(responseData));
      } else {
        console.error(response.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // const contestFromRedux = useSelector(
  //   (state) => state.userConfig.editContestTypeData
  // );

  const [input, setInput] = useState({
    contestTypeId: "",
    name: "",
  });

  const handleData = (value) => {
    dispatch(editContestTypeData(value));
    setInput({ contestTypeId: value._id, name: value.name });
    setShow(!show);
  };
  const handleShow = () => {
    setShow(!show);
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
    
  }

  const isEmpty = () => {
    if (input.name === "" && input.contestTypeId === "") {
      return true;
    }
    return false;
  };

  const editContestType = async () => {
    try {
      if (isEmpty()) {
        toast.warning("Fill up empty space");
      } else {
        let userData = JSON.stringify(input);

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "https://api-bef.hkdigiverse.com/contest-type/edit",
          headers: {
            Authorization: accessToken,
            "Content-Type": "application/json",
          },
          data: userData,
        };
        const response = await axios.request(config);

        const { status, data, message, error } = response.data;

        if (status === 200) {
          // console.log("Backend response", data);
          handleShow();
          toast.success(message);
          dispatch(editContestTypeData());
          fetchContestTypeData();
        } else {
          console.warn("contest add failed:", error);
        }
      }
    } catch (err) {
      console.error("Error add contest:", err.message);
    }
  };


  const deleteContestType = async () => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://api-bef.hkdigiverse.com/contest-type/delete/${itemToDelete}`,
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
          // console.log(response.data);
          toast.success(response.data.message);
          handleDelete();
          fetchContestTypeData();
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  function handleDelete(value) {
    setItemToDelete(value);
    setToggle(!toggle);
  }

  useEffect(() => {
    setContestDataShow(contest.slice(start, end));
  }, [contest, currentPage, end, start]);

  useEffect(() => {
    fetchContestTypeData();
    // console.log(DataList);
  }, [confirm]);

  return (
    <>
      <section className="shadow-md">
        <div className="bg-white  px-4 py-2 flex  items-center justify-between rounded-xl">
          <p className="text-2xl text-left font-semibold text-slate-800 uppercase">
            contest type
          </p>
          <button
            onClick={() => handleNavigate()}
            className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
          >
            <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
              <FaPlus />
            </svg>
            <p className=" font-semibold">Add ContestType</p>
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
                    Contest Name
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
              {contestDataShow.map((value, index) => (
                <tr key={index}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {index + 1}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {value.name}
                    </p>
                  </td>

                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center justify-evenly font-sans text-md font-medium leading-none text-slate-800">
                      <button
                        className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        type="button"
                        onClick={() => handleData(value)}
                        title="Edit"
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
                        title="Delete"
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
      <div className={`${confirm === true ? "block" : "hidden"}`}>
        <AddContest confirm={confirm} onClose={handleNavigate} />
      </div>
      <div className={`${show === true ? "block" : "hidden"}`}>
        <EditContestType
          show={show}
          editData={input}
          onClose={handleShow}
          onChange={handleChange}
          onSubmit={editContestType}
        />
      </div>
      <div className={`${toggle === true ? "block" : "hidden"}`}>
        <ConfirmationPage
          confirm={toggle}
          onDelete={deleteContestType}
          onCancel={handleDelete}
        />
      </div>
    </>
  );
}
