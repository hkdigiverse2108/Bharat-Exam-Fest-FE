import React, { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FiBox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function SubjectPage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [classNames, setClassNames] = useState([]);

  const [error, setError] = useState(null);

  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].token
  );

  function handleSubject(value) {
    // const id = value.map((res) => res?._id);
    // const name = value.map((res) => res?.subjectName);
    navigate("/subjectDetails", {
      state: value,
    });
  }

  const fetchSubjects = async () => {
    try {
      const response = await axios.get(
        "https://api-bef.hkdigiverse.com/question/subject-wise-question-count",
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      console.log(response.data.data);

      setData(response.data.data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSubjects();

    console.log(classNames);
  }, []);

  return (
    <>
      <section>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-3 2xl:grid-cols-4 2xl:gap-6">
          {data.map((value, index) => (
            <div
              className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
              onClick={() => handleSubject(value)}
              key={index}
            >
              <div className="flex flex-row items-center justify-between">
                <p className="font-semibold text-left text-lg uppercase text-orange-500">
                  {value.subjectName}
                </p>
                <div className="pr-4">
                  <svg
                    className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                    viewBox="0 0 22 22"
                  >
                    <HiOutlineUserGroup />
                  </svg>
                </div>
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-600 text-xl capitalize">
                  total questions{" "}
                </p>
                <p className="text-2xl text-gray-800 font-medium ">
                  {value.count}
                </p>
              </div>
            </div>
          ))}
          {/* <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                polity & gov
              </p>

              <svg
                className="bg-yellow-200 w-16 h-16 text-yellow-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                viewBox="0 0 22 22"
              >
                <FiBox />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium text-slate-600 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                geography
              </p>

              <svg
                className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                viewBox="0 0 22 22"
              >
                <HiOutlineUserGroup />
              </svg>
            </div>
            <div className="text-start">
              <p className="font-normal text-slate-700 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                refind pyq's
              </p>

              <svg
                className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                viewBox="0 0 22 22"
              >
                <HiOutlineUserGroup />
              </svg>
            </div>
            <div className="text-start">
              <p className="font-normal text-slate-700 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                modren history
              </p>

              <svg
                className="bg-yellow-200 w-16 h-16 text-yellow-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                viewBox="0 0 22 22"
              >
                <FiBox />
              </svg>
            </div>
            <div className="text-start">
              <p className="font-normal text-slate-700 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                cureent affairs
              </p>

              <svg
                className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                viewBox="0 0 22 22"
              >
                <HiOutlineUserGroup />
              </svg>
            </div>
            <div className="text-start">
              <p className="font-normal text-slate-700 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                full length
              </p>

              <svg
                className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                viewBox="0 0 22 22"
              >
                <HiOutlineUserGroup />
              </svg>
            </div>
            <div className="text-start">
              <p className="font-normal text-slate-700 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                art and culture
              </p>

              <svg
                className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                viewBox="0 0 22 22"
              >
                <HiOutlineUserGroup />
              </svg>
            </div>
            <div className="text-start">
              <p className="font-normal text-slate-700 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                environment & agriculture
              </p>

              <svg
                className="bg-yellow-200 w-16 h-16 text-yellow-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                viewBox="0 0 22 22"
              >
                <FiBox />
              </svg>
            </div>
            <div className="text-start">
              <p className="font-normal text-slate-700 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                ancient mediaeval history
              </p>

              <svg
                className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                viewBox="0 0 22 22"
              >
                <HiOutlineUserGroup />
              </svg>
            </div>
            <div className="text-start">
              <p className="font-normal text-slate-700 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div>
          <div
            className="bg-white shadow-md border rounded-lg p-5 space-y-4 cursor-pointer"
            onClick={() => handleSubject()}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="font-semibold text-left text-lg uppercase text-orange-500">
                science and technology
              </p>

              <svg
                className="bg-purple-200 w-16 h-16 text-purple-500 rounded-full px-1 py-3 text-xl dark:fill-white"
                viewBox="0 0 22 22"
              >
                <HiOutlineUserGroup />
              </svg>
            </div>
            <div className="text-start">
              <p className="font-normal text-slate-700 text-xl capitalize">
                total questions{" "}
              </p>
              <p className="text-2xl text-gray-800 font-medium ">70</p>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
}
export default SubjectPage;
