import React, { useState } from "react";
// import { LuPencilLine } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../Pagination/Pagination";
import FilterdropDown from "../ContestEarning/FilterdropDown";
// import AddIntroduction from "./AddIntroduction";

export default function HowToPlay() {
  const [toggle, setToggle] = useState(false);

  const navigate = useNavigate();
  function handleNavigate() {
    // setConfirm(!confirm);
    navigate("/addIntroduction");
  }

  return (
    <>
      <section className="shadow-md pb-2">
        <div className="relative w-full inline-flex items-center justify-between rounded-t-xl px-4 py-2 overflow-hidden text-slate-700 bg-white  bg-clip-border">
          <p className="text-2xl text-left font-semibold text-slate-800 uppercase">
            how to play
          </p>
          <div className="flex  items-center justify-end">
            <button
              onClick={() => handleNavigate()}
              className="inline-flex items-center space-x-2 rounded-lg px-2 py-2 text-md text-center text-white bg-orange-500 hover:bg-opacity-90  "
            >
              <svg className="font-bold text-white w-4 h-4" viewBox="0 0 16 16">
                <FaPlus />
              </svg>
              <p className=" font-semibold">Add Introduction</p>
            </button>
            <FilterdropDown toggle={toggle} />
          </div>
        </div>
        <div className="bg-white overflow-auto px-0">
          <table className=" w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="antialiased font-sans text-sm flex items-center justify-between gap-2 font-normal leading-none opacity-70">
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
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    Image
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    Name
                  </p>
                </th>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    Youtube Link
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
              <tr>
                <td className="p-4 border-b border-blue-gray-50">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    dear
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                  <img
                    src="i1.png"
                    alt="Foo eating a sandwich."
                    className="w-42 mx-auto h-30"
                  />
                </td>
                <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    name
                  </p>
                </td>
                <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                  <a
                    href="https://youtu.be/Njyx5ZuwEHI?list=RDIl9si46XKzs"
                    className="text-sm text-sky-500 underline antialiased font-sans leading-normal font-normal"
                  >
                    https://youtu.be/Njyx5ZuwEHI?list=RDIl9si46XKzs
                  </a>
                </td>
                <td className="p-4 border-b border-blue-gray-50">
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
        <Pagination />
      </section>
    </>
  );
}
