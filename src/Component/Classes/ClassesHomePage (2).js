import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import AddClasses from "./AddClasses";
import Pagination from "../Pagination/Pagination";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../Api/ApiHandle";

export default function ClassesHomePage() {
  const [data, setData] = useState(null);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );

  const [confirm, setConfirm] = useState(false);
  const [input, setInput] = useState({
    classname: "",
    referralcode: "",
  });
  const { classname, referralcode } = input;
  function handleChange(e) {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  }
  function handleNavigate() {
    setConfirm(!confirm);
  }

  async function addClass() {
    try {
      if (!classname || !referralcode) {
        toast.warning("Fill up empty space");
      } else {
        if (accessToken) {
          await axios
            .post(
              `https://api-bef.hkdigiverse.com/classes/add`,
              {
                headers: {
                  "Content-Type": "application/json",
                },
                validateStatus: function (status) {
                  return status >= 200 && status < 400;
                },
              },
              JSON.stringify(input)
            )
            .then((response) => {
              const { status, data, message, error } = response.data;
              console.log("Backend response", message);
              if (status === 200) {
                console.log("Backend response", data);
                // setConfirm(!confirm);
                // console.log(input);
                // setInput({ classname: "", referralcode: "" });
                // toast.success(message);
              } else {
                console.log("Backend response", error);
                console.warn("Not Successfully");
              }
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
     fetch(`https://api-bef.hkdigiverse.com/classes/all`, {
          headers: {
            "Content-Type": "application/json",
          },
          validateStatus: function (status) {
            return status >= 200 && status < 400;
          },
        })

        .then((response) => response.json())
        .then((data) => setData(data));
      console.log(data);
    }

    // fetchData();
  }, []);

  return (
    <>
      <section className="mx-auto  space-y-6">
        {/* classes */}

        <div className="relative flex flex-col w-full h-full border text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="flex flex-row items-center  justify-between p-4 overflow-hidden rounded-t-xl text-slate-700 bg-white bg-clip-border">
            <p className="text-3xl tracking-tight font-semibold text-left text-gray-900 dark:text-white capitalize">
              Classes
            </p>

            <div className="flex  items-center justify-end">
              <button
                onClick={() => handleNavigate()}
                className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
              >
                <svg
                  className="font-bold text-white w-4 h-4"
                  viewBox="0 0 16 16"
                >
                  <FaPlus />
                </svg>
                <p className=" font-semibold">Add Classes</p>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full  text-center table-auto min-w-max">
              <thead>
                <tr>
                  <th className="px-2 py-4 transition-colors cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200">
                    <div className="flex items-center justify-evenly gap-2 font-sans text-sm font-medium leading-none text-slate-800">
                      S/N
                      <svg viewBox="0 0 24 24" className="w-4 h-4">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        ></path>
                      </svg>
                    </div>
                  </th>
                  <th className="px-2 py-4 text-center font-sans text-sm font-medium leading-none text-slate-800 transition-colors cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200">
                    Classes Name
                  </th>
                  <th className="px-2 py-4 text-center font-sans text-sm font-medium leading-none text-slate-800 transition-colors cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200">
                    Referral Code
                  </th>
                  <th className="px-2 py-4 text-center font-sans text-sm font-medium leading-none text-slate-800 transition-colors cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">001</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis">
                    <p className="text-sm text-slate-500">Class name</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden uppercase text-ellipsis">
                    <p className="text-sm text-slate-500">ABC123AWRII3469</p>
                  </td>
                  <td className="p-2 border-b border-slate-200 overflow-hidden text-ellipsis font-sans text-md text-center font-medium leading-none text-slate-800">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
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
              </tbody>
            </table>
          </div>
          {/* pagination */}
          <Pagination />
        </div>
        <div className={`${confirm === true ? "block" : "hidden"}`}>
          <AddClasses
            confirm={confirm}
            setConfirm={() => addClass()}
            inputValue={input}
            value={(e) => handleChange(e)}
          />
        </div>
      </section>
    </>
  );
}
