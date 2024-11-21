import React, { useEffect, useState } from "react";
import { HiOutlineUserGroup } from "react-icons/hi";
import { FiBox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CurrentData, SubjectData } from "../../Context/Action/index";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function SubjectPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [totalQuestion, setTotalQuestion] = useState([]);
  const [error, setError] = useState(null);
  const accessToken = useSelector(
    (state) => state.authConfig.userInfo[0].data.token
  );

  function handleSubject(value) {
    dispatch(CurrentData(value));
    navigate("/subjectDetails");
  }

  const fetchSubjects = async () => {
    try {
      const response1 = await axios.get(
        `https://api-bef.hkdigiverse.com/question/subject-wise-question-count`,
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      const response2 = await axios.get(
        `https://api-bef.hkdigiverse.com/subject/all?page=1&limit=10`,
        {
          headers: {
            Authorization: accessToken,
            Accept: "application/json",
          },
        }
      );
      if (response1 && response2) {
        console.log(response2.data.data.subject_data);
        dispatch(SubjectData(response2.data.data.subject_data));
        setTotalQuestion(response1.data.data);
        setData(response2.data.data.subject_data);
      } else {
        console.error(response1.data.message);
        console.error(response2.data.message);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSubjects();
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
                  {value.name}
                </p>
                <div className="pr-4">
                  <img
                    src={value.image}
                    className=" block w-24 h-20 px-5 py-2 shadow-sm rounded-full bg-white placeholder-gray-400 text-gray-700 text-base p-2  focus:outline-none focus:border-indigo-500 placeholder:text-gray-500"
                    alt={value.name}
                  />
                </div>
              </div>
              <div className="text-left">
                <p className="font-medium text-slate-600 text-xl capitalize">
                  total questions{" "}
                </p>
                <p className="text-2xl text-gray-800 font-medium ">
                  { totalQuestion.count || 0}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default SubjectPage;
