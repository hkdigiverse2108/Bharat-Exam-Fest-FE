import React, { useEffect, useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import Pagination from "../Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function BannerData({ onShow }) {
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const DataList = useSelector((state) => state.userConfig.bannerDataList[0]);
//   console.log(DataList);

  const [bannerData, setBannerData] = useState(DataList);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;
  const Totalpage = Math.ceil(bannerData.length / ITEMS_PER_PAGE);

  useEffect(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    setDataToDisplay(bannerData.slice(start, end));
  }, [currentPage]);

  return (
    <>
      <div className="mx-auto space-y-6 ">
        {/* home banner */}
        <h3 className="text-2xl text-left  font-semibold text-slate-800">
          Home Banner
        </h3>
        <div className=" overflow-auto px-0 rounded-md">
          <table className="w-full min-w-max table-auto text-left bg-white">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
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
                <th className="cursor-pointer border-y border-slate-200 bg-slate-300 hover:bg-slate-200 p-4 transition-colors">
                  <p className="block antialiased font-sans text-sm leading-normal font-normal">
                    Image
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
                  <td className="p-4 w-[50px]">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {index + 1}
                    </p>
                  </td>
                  <td className="p-4 overflow-hidden text-wrap  max-w-xs">
                    <img
                      src={value.image}
                      alt="Foo eating a sandwich."
                      className="w-42 mx-auto h-30"
                    />
                  </td>
                  <td className="p-4 w-[40px] text-center">
                    <button
                      className="relative h-10 w-10 select-none rounded-lg text-md align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button"
                      onClick={onShow}
                    >
                      <span className="absolute transform -translate-x-1/2 -translate-y-1/2">
                        <svg viewBox="0 0 16 16" className="w-6 h-6">
                          <LuPencilLine />
                        </svg>
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            total={Totalpage}
            page={setCurrentPage}
            current={currentPage}
          />
        </div>
      </div>
    </>
  );
}

export default BannerData;
