import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { AiOutlineDelete } from "react-icons/ai";
import Pagination from "../Pagination/Pagination";
import FilterdropDown from "../ContestEarning/FilterdropDown";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { howtoplayList } from "../../Context/Action";
import { toast } from "react-toastify";

export default function HowToPlay() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token)
  const [toggle, setToggle] = useState(false);
  function handleNavigate() {
    navigate("/addIntroduction");
  }
  const [howToPlayData, setHowToPlayData] = useState(null);
  const [howToPlayList, setHowToPlayList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchHowToPlayAPI = async () => {
    const url = `https://api-bef.hkdigiverse.com/how-to-play/all?page=1&limit=10`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "*/*",
          Authorization: accessToken,
        },
      });

      // console.log("URL:", url);
      const decodedData = await response.json();
      // console.log("Response Body:", decodedData.data.how_to_play_data);

      if (response.status === 200) {
        const parsedData = decodedData;
        setHowToPlayData(parsedData);
        setHowToPlayList(parsedData.data?.how_to_play_data || []);
        dispatch(howtoplayList(parsedData.data?.how_to_play_data));
        setIsLoading(false);
        // toast.success(parsedData.message);
      } else {
        setIsLoading(false);
        const errorMsg = `Failed to load data. Status code: ${response.status}`;
        console.error(errorMsg);
        setErrorMessage(errorMsg);
        // toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error fetching how to play data:", error);
      setIsLoading(false);
      setErrorMessage("An error occurred while fetching data.");
      console.error("An error occurred while fetching data.");
    }
  };

  const deleteSubtopic = async (value) => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `https://api-bef.hkdigiverse.com/how-to-play/delete/${value}`,
        headers: {
          Authorization: accessToken,
          "Content-Type": "application/json",
        },
      };

      axios
        .request(config)
        .then((response) => {
          if (response.status === 200) {
            toast.success("How to Play entry deleted successfully");

            fetchHowToPlayAPI();
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (err) {
      console.error(err.message);
    }
  };
  
  useEffect(() => {
    fetchHowToPlayAPI();
    // fetchData();
  }, []);

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
              {howToPlayList.map((item, index) => (
                <tr key={index}> 
                  <td className="p-4 border-b border-blue-gray-50">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {index + 1}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <img
                      src={item.image}
                      alt="Foo eating a sandwich."
                      className="w-42 mx-auto h-30"
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <p className="block antialiased font-sans text-sm leading-normal font-normal">
                      {item.title}
                    </p>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50 overflow-hidden text-wrap  max-w-xs">
                    <a
                      href={item.link}
                      className="text-sm text-sky-500 underline antialiased font-sans leading-normal font-normal"
                    >
                      {item.link}
                    </a>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <button
                      className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sansfont-medium uppercase text-slate-900 transition-all hover:bg-slate-900/10 active:bg-slate-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none "
                      type="button"
                      onClick={() => deleteSubtopic(item._id)}
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
        <Pagination />
      </section>
    </>
  );
}
