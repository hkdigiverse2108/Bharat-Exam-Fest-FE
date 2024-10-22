import React from "react";
import { LuPencilLine } from "react-icons/lu";
import Pagination from "../Pagination/Pagination";

export default function ResultBanner() {
  return (
    <>
      <section className="mx-auto space-y-6 ">
        {/* result banner */}
        <h3 className="text-2xl text-left  font-semibold text-slate-800">
          Result Banner
        </h3>
        <div className="relative flex flex-col w-full h-full text-slate-700 bg-white shadow-md rounded-xl bg-clip-border">
          <div className="overflow-x-auto">
            <table className="w-full  text-left table-auto min-w-max">
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
                    Image
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
                  <td className="p-2 border-b border-slate-200  overflow-hidden text-ellipsis ">
                    <img
                      src="i1.png"
                      alt="Foo eating a sandwich."
                      className="w-42 mx-auto h-30"
                    />
                  </td>
                  <td className="p-2 border-b border-slate-200 text-center overflow-hidden text-ellipsis">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-md align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button"
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                        <svg viewBox="0 0 16 16" className="w-6 h-6">
                          <LuPencilLine />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* pagination */}
         <Pagination/>
        </div>
      </section>
    </>
  );
}
